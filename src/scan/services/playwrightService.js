const { chromium } = require('playwright');

class PlaywrightService {

    async getDOM(url) {
        let browser;
        let page;
        let content;

        // Ensure the URL includes the protocol
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }

        try {
            browser = await chromium.launch({ ignoreHTTPSErrors: true });
            page = await browser.newPage();
            await page.goto(url);
            content = await page.content();
        } catch (error) {
            // If HTTP fails, retry with HTTPS
            if (url.startsWith('http://')) {
                try {
                    console.log('HTTP failed, retrying with HTTPS...');
                    url = url.replace('http://', 'https://');
                    await page.goto(url);
                    content = await page.content();
                } catch (httpsError) {
                    if (httpsError.message && httpsError.message.includes('net::ERR_NAME_NOT_RESOLVED')) {
                        console.error('DNS resolution failed (net::ERR_NAME_NOT_RESOLVED):', httpsError);
                        content = "ERR_NAME_NOT_RESOLVED";
                    } else {
                        console.error('HTTPS retry failed as well:', httpsError);
                        throw httpsError;
                    }
                }
            } else {
                console.error('Error fetching the DOM:', error);
                throw error;
            }
        } finally {
            if (browser) {
                await browser.close();
            }
        }

        return content;
    }

    async getLastModifiedDate(url) {
        let browser;
        let page;
        let lastModifiedDate;

        try {
            browser = await chromium.launch({ ignoreHTTPSErrors: true });
            page = await browser.newPage();
            await page.goto(url);

            lastModifiedDate = await page.$eval('body', body => {
                const text = body.innerText;
                const match = text.match(/Utolsó módosítás:\s*(.*)\s*CEST/);
                return match ? match[1].trim() : null;
            });
        } catch (error) {
            // If HTTP fails, retry with HTTPS
            if (url.startsWith('http://')) {
                try {
                    console.log('HTTP failed, retrying with HTTPS...');
                    url = url.replace('http://', 'https://');
                    await page.goto(url);
                    lastModifiedDate = await page.$eval('body', body => {
                        const text = body.innerText;
                        const match = text.match(/Utolsó módosítás:\s*(.*)\s*CEST/);
                        return match ? match[1].trim() : null;
                    });
                } catch (httpsError) {
                    if (httpsError.message && httpsError.message.includes('net::ERR_NAME_NOT_RESOLVED')) {
                        console.error('DNS resolution failed (net::ERR_NAME_NOT_RESOLVED):', httpsError);
                        content = "ERR_NAME_NOT_RESOLVED";
                    } else {
                        console.error('HTTPS retry failed as well:', httpsError);
                        throw httpsError;
                    }
                }
            } else {
                console.error('Error fetching the last modified date:', error);
                throw error;
            }
        } finally {
            if (browser) {
                await browser.close();
            }
        }

        return lastModifiedDate;
    }
}

module.exports = new PlaywrightService();
