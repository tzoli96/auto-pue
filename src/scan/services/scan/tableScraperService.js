const { chromium } = require('playwright');
const SYNCHRON = require('../../enums/synchron');

class TableScraperService {
    constructor(url = SYNCHRON.MAIN_DOMAIN_URL) {
        this.url = url;
    }

    async scrapeTable() {
        const browser = await chromium.launch();
        const page = await browser.newPage();

        try {
            await page.goto(this.url);

            const headers = await this._getHeaders(page);
            const rows = await this._getRows(page);
            const data = this._mapRowsToHeaders(headers, rows);

            await browser.close();
            return data;
        } catch (error) {
            console.error('Error scraping the table:', error);
            await browser.close();
            throw error;
        }
    }

    async _getHeaders(page) {
        return await page.$$eval('table tbody th', ths =>
            ths.map(th => th.innerText.trim())
        );
    }

    async _getRows(page) {
        return await page.$$eval('table tbody tr', trs =>
            trs.map(tr => {
                const cells = Array.from(tr.querySelectorAll('td'));
                return cells.map(td => td.innerText.trim());
            })
        );
    }

    _mapRowsToHeaders(headers, rows) {
        return rows.map(row => {
            let rowData = {};
            headers.forEach((header, index) => {
                switch (header) {
                    case 'Domain neve':
                        rowData['domain_url'] = row[index];
                        break;
                    case 'Igénylő':
                        rowData['domain_type'] = row[index];
                        break;
                    case 'Meghirdetés kezdő napja':
                        rowData['domain_created_date'] = row[index];
                        break;
                }
            });
            return rowData;
        });
    }
}

module.exports = TableScraperService;
