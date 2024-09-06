const { exec } = require('child_process');

class CurlService {
    constructor() {
        this.errorMessages = [
            'Could not resolve host',
            'SSL certificate problem',
            'Timeout',
            'Connection refused',
        ];
    }

    async getDOM(url) {
        url = this.ensureProtocol(url);
        let content;

        try {
            content = await this.fetchContent(url);
        } catch (error) {
            if (url.startsWith('http://')) {
                console.log('HTTP failed, retrying with HTTPS...');
                url = this.switchToHttps(url);
                try {
                    content = await this.fetchContent(url);
                } catch (httpsError) {
                    content = this.handleCurlError(httpsError);
                }
            } else {
                console.error('Error fetching the DOM:', error);
                throw error;
            }
        }

        return content;
    }

    async getLastModifiedDate(url) {
        url = this.ensureProtocol(url);
        let lastModifiedDate;

        try {
            lastModifiedDate = await this.fetchLastModifiedDate(url);
        } catch (error) {
            if (url.startsWith('http://')) {
                console.log('HTTP failed, retrying with HTTPS...');
                url = this.switchToHttps(url);
                try {
                    lastModifiedDate = await this.fetchLastModifiedDate(url);
                } catch (httpsError) {
                    lastModifiedDate = this.handleCurlError(httpsError);
                }
            } else {
                console.error('Error fetching the last modified date:', error);
                throw error;
            }
        }

        return lastModifiedDate;
    }

    ensureProtocol(url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return 'http://' + url;
        }
        return url;
    }

    switchToHttps(url) {
        return url.replace('http://', 'https://');
    }

    fetchContent(url) {
        return new Promise((resolve, reject) => {
            exec(`curl -sL --max-time 30 ${url}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`curl error for URL ${url}: ${stderr || error.message}`);
                    reject(stderr || error.message);
                } else if (stderr) {
                    console.error(`curl stderr for URL ${url}: ${stderr}`);
                    reject(stderr);
                } else {
                    resolve(stdout);
                }
            });
        });
    }



    fetchLastModifiedDate(url) {
        return new Promise((resolve, reject) => {
            exec(`curl -sI --max-time 30 ${url} | grep 'Last-Modified'`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`curl error for URL ${url}: ${stderr || error.message}`);
                    reject(stderr || error.message);
                } else {
                    const match = stdout.match(/Last-Modified:\s*(.*)/);
                    resolve(match ? match[1].trim() : null);
                }
            });
        });
    }

    handleCurlError(error) {
        if (this.errorMessages.some(msg => error.includes(msg))) {
            console.error('DNS resolution failed or another known error occurred:', error);
            return "ERR_NAME_NOT_RESOLVED";
        } else {
            console.error('HTTPS retry failed as well:', error);
            throw new Error(error);
        }
    }
}

module.exports = new CurlService();
