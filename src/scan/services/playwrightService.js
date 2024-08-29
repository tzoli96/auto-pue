const { chromium } = require('playwright');

class PlaywrightService {

    async getDOM(url) {
        const browser = await chromium.launch();
        const page = await browser.newPage();

        // Ensure the URL includes the protocol
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }

        try {
            await page.goto(url);
            const content = await page.content();
            await browser.close();
            return content;
        } catch (error) {
            console.error('Error fetching the DOM:', error);
            await browser.close();
            throw error;
        }
    }

    async getLastModifiedDate(url) {
        const browser = await chromium.launch();
        const page = await browser.newPage();

        try {
            await page.goto(url);
            const lastModifiedDate = await page.$eval('body', body => {
                const text = body.innerText;
                const match = text.match(/Utolsó módosítás:\s*(.*)\s*CEST/);
                return match ? match[1].trim() : null;
            });
            await browser.close();
            return lastModifiedDate;
        } catch (error) {
            console.error('Error fetching the last modified date:', error);
            await browser.close();
            throw error;
        }
    }
}

module.exports = new PlaywrightService();
