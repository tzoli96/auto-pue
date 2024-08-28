const playwrightService = require('./services/playwrightService');

async function run() {
    try {
        const url = 'https://info.domain.hu/varolista/hu/ido.html';
        const domContent = await playwrightService.getDOM(url);
        console.log('DOM content:', domContent);
    } catch (error) {
        console.error('Failed to fetch the DOM content:', error);
    }
}

module.exports = new PlaywrightService();
