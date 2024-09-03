const { exec } = require('child_process');
const SYNCHRON = require('../../enums/synchron');

class TableScraperService {
    constructor(url = SYNCHRON.MAIN_DOMAIN_URL) {
        this.url = url;
    }

    async scrapeTable() {
        try {
            const htmlContent = await this._fetchHtmlWithCurl(this.url);

            const headers = this._getHeaders(htmlContent);
            const rows = this._getRows(htmlContent);
            const data = this._mapRowsToHeaders(headers, rows);

            return data;
        } catch (error) {
            console.error('Error scraping the table:', error);
            throw error;
        }
    }

    _fetchHtmlWithCurl(url) {
        return new Promise((resolve, reject) => {
            exec(`curl -s ${url}`, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error executing curl: ${error.message}`);
                } else if (stderr) {
                    reject(`Error in curl response: ${stderr}`);
                } else {
                    resolve(stdout);
                }
            });
        });
    }

    _getHeaders(htmlContent) {
        const headerMatches = [...htmlContent.matchAll(/<th[^>]*>(.*?)<\/th>/g)];
        return headerMatches.map(match => match[1].trim());
    }

    _getRows(htmlContent) {
        const rowMatches = [...htmlContent.matchAll(/<tr[^>]*>(.*?)<\/tr>/gs)];
        return rowMatches.map(row => {
            const cellMatches = [...row[1].matchAll(/<td[^>]*>(.*?)<\/td>/g)];
            return cellMatches.map(cell => cell[1].trim());
        });
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
