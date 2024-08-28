const { chromium } = require('playwright');

class PlaywrightService {
    async getDOM(url) {
        const browser = await chromium.launch();
        const page = await browser.newPage();

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
}

module.exports = new PlaywrightService();
