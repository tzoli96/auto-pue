const { chromium } = require('playwright');

class PlaywrightService {
    constructor() {
        this.errorMessages = [
            'net::ERR_NAME_NOT_RESOLVED',
            'ERR_CERT_COMMON_NAME_INVALID',
            'ERR_SSL_VERSION_OR_CIPHER_MISMATCH',
            'net::ERR_CONNECTION_TIMED_OUT',
            'net::ERR_CONNECTION_REFUSED',
            'Timeout 30000ms exceeded.',
        ];
    }

    async getDOM(url) {
        url = this.ensureProtocol(url);
        let browser, page, content;

        try {
            ({ browser, page, content } = await this.fetchContent(url));
        } catch (error) {
            if (url.startsWith('http://')) {
                console.log('HTTP failed, retrying with HTTPS...');
                url = this.switchToHttps(url);
                try {
                    ({ browser, page, content } = await this.fetchContent(url));
                } catch (httpsError) {
                    content = this.handleHttpsError(httpsError);
                }
            } else {
                console.error('Error fetching the DOM:', error);
                throw error;
            }
        } finally {
            await this.closeBrowser(browser);
        }

        return content;
    }

    async getLastModifiedDate(url) {
        url = this.ensureProtocol(url);
        let browser, page, lastModifiedDate;

        try {
            ({ browser, page, lastModifiedDate } = await this.fetchLastModifiedDate(url));
        } catch (error) {
            if (url.startsWith('http://')) {
                console.log('HTTP failed, retrying with HTTPS...');
                url = this.switchToHttps(url);
                try {
                    ({ browser, page, lastModifiedDate } = await this.fetchLastModifiedDate(url));
                } catch (httpsError) {
                    lastModifiedDate = this.handleHttpsError(httpsError);
                }
            } else {
                console.error('Error fetching the last modified date:', error);
                throw error;
            }
        } finally {
            await this.closeBrowser(browser);
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

    async fetchContent(url) {
        const browser = await chromium.launch({ ignoreHTTPSErrors: true });
        const page = await browser.newPage();
        await page.goto(url);
        const content = await page.content();
        return { browser, page, content };
    }

    async fetchLastModifiedDate(url) {
        const browser = await chromium.launch({ ignoreHTTPSErrors: true });
        const page = await browser.newPage();
        await page.goto(url);

        const lastModifiedDate = await page.$eval('body', body => {
            const text = body.innerText;
            const match = text.match(/Utolsó módosítás:\s*(.*)\s*CEST/);
            return match ? match[1].trim() : null;
        });

        return { browser, page, lastModifiedDate };
    }

    handleHttpsError(error) {
        if (error.message && this.errorMessages.some(msg => error.message.includes(msg))) {
            console.error('DNS resolution failed or another known error occurred:', error);
            return "ERR_NAME_NOT_RESOLVED";
        } else {
            console.error('HTTPS retry failed as well:', error);
            throw error;
        }
    }

    async closeBrowser(browser) {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports = new PlaywrightService();
