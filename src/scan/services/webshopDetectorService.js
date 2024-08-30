const playwrightService = require('./playwrightService');

class WebshopDetectorService {
    constructor() {
        this.webshopKeywords = [
            'Kosár',
            'kosárhoz ad',
            'kosárba teszem',
            'elállási szabályzat',
            'szállítási információk',
            'rendelés',
            'vásárlás',
            'termékek',
            'checkout',
            'fizetés',
            'szállítás'
        ];

        this.serverProviderKeywords = [
            'is registered with FORPSI and there is no content on it yet.',
            'https://admin.websupport.hu/',
            'https://www.domdom.hu/honlap/honlapkeszites',
            'isrc = "HU/index.html";',
            'https://www.rackhost.hu',
            'https://go.cpanel.net/cleardnscache',
            'Apache is functioning normally',
            'https://dotroll.com/',
            'Hosting',
            'Server hosting',
            'Domain registration',
            'Domain regisztráció',
            'VPS',
            'VPS szolgáltatás',
            'Dedicated server',
            'Dedikált szerver',
            'Cloud hosting',
            'Felhő tárhely',
            'Server rental',
            'Szerver bérlés',
            'Web hosting',
            'Webtárhely',
            'SSL certificate',
            'SSL tanúsítvány',
            'Server management',
            'Szerverkezelés',
            'Szerver üzemeltetés'
        ];

        this.phoneRegex = /(?:\+36|06|36)\s*\d{1,2}\s*\d{3}\s*\d{4}/g;
        this.emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}/g;
        this.companyNameRegex = /\b(?:cég|kft|bt|zrt|vállalat|központ)\b\s*(kft|bt|zrt|rt|vállalat)?/gi;

        this.phoneNumbers = new Set();
        this.emailAddresses = new Set();
        this.companyNames = new Set();
    }

    async isWebshop(url) {
        try {
            let domContent = await playwrightService.getDOM(url);
            let lowerCaseContent = domContent.toLowerCase();

            if (domContent === "ERR_NAME_NOT_RESOLVED") {
                return {
                    defaultHostingPage: false,
                    isWebshop: false,
                    foundKeywords: false,
                    phoneNumbers: false,
                    emailAddresses:false,
                    companyNames: false,
                    error_code: true,
                };
            }

            if (this._containsServerProviderKeywords(lowerCaseContent)) {
                console.log('Detected server provider content, filtering out:' + url);
                return {
                    defaultHostingPage: true,
                    isWebshop: false,
                    reason: 'Server provider content detected',
                };
            }

            const foundKeywords = this._findWebshopKeywords(lowerCaseContent);

            this._extractContactInfo(domContent);

            if (this.phoneNumbers.size === 0 || this.emailAddresses.size === 0 || this.companyNames.size === 0) {
                const contactPageLinks = this._findContactPageLinks(domContent);
                if (contactPageLinks.length > 0) {
                    for (const link of contactPageLinks) {
                        const contactDomContent = await playwrightService.getDOM(link);
                        this._extractContactInfo(contactDomContent);

                        if (this.phoneNumbers.size > 0 || this.emailAddresses.size > 0 || this.companyNames.size > 0) {
                            break;
                        }
                    }
                } else {
                    if (this.phoneNumbers.size === 0 || this.emailAddresses.size === 0 || this.companyNames.size === 0) {
                        const predefinedPaths = ['/contact', '/kapcsolat', '/rolunk', '/about', '/aboutus'];
                        for (const path of predefinedPaths) {
                            const contactUrl = new URL(path, url).toString();
                            try {
                                const contactDomContent = await playwrightService.getDOM(contactUrl);
                                this._extractContactInfo(contactDomContent);

                                if (this.phoneNumbers.size > 0 || this.emailAddresses.size > 0 || this.companyNames.size > 0) {
                                    break;
                                }
                            } catch (e) {
                                console.log(`Failed to fetch contact page at ${contactUrl}: ${e.message}`);
                            }
                        }
                    }
                }
            }

            console.log(foundKeywords)
            const isLikelyWebshop = this._isLikelyWebshop(foundKeywords);

            return {
                defaultHostingPage: false,
                isWebshop: isLikelyWebshop,
                foundKeywords: this._convertSetToObject(foundKeywords, 'keyword'),
                phoneNumbers: this._convertSetToObject(this.phoneNumbers, 'phone'),
                emailAddresses: this._convertSetToObject(this.emailAddresses, 'email'),
                companyNames: this._convertSetToObject(this.companyNames, 'company')
            };
        } catch (error) {
            console.error(url);
            console.error(`Failed to determine if the site is a webshop: ${error.message}`);
            return {
                isWebshop: false,
                reason: 'Error occurred during analysis',
            };
        }
    }

    _extractContactInfo(domContent) {
        const phones = domContent.match(this.phoneRegex) || [];
        const emails = domContent.match(this.emailRegex) || [];
        const companies = domContent.match(this.companyNameRegex) || [];

        phones.forEach(phone => this.phoneNumbers.add(phone.trim()));
        emails.forEach(email => this.emailAddresses.add(email.trim()));
        companies.forEach(company => this.companyNames.add(company.trim()));
    }

    _containsServerProviderKeywords(content) {
        return this.serverProviderKeywords.some(keyword => content.includes(keyword.toLowerCase()));
    }

    _findWebshopKeywords(content) {
        return new Set(this.webshopKeywords.filter(keyword => content.includes(keyword.toLowerCase())));
    }

    _findContactPageLinks(domContent) {
        const linkRegex = /<a[^>]+href="([^"]+)"[^>]*>(kapcsolat|rólunk|about|contact|contact us)<\/a>/gi;
        const links = new Set();
        let match;
        while ((match = linkRegex.exec(domContent)) !== null) {
            links.add(match[1]);
        }
        return Array.from(links);
    }

    _isLikelyWebshop(foundKeywords) {
        return foundKeywords.size >= 2;
    }

    _convertSetToObject(set, prefix) {
        const obj = {};
        let index = 1;
        set.forEach(item => {
            obj[`${prefix}_${index}`] = item;
            index++;
        });
        return obj;
    }
}

module.exports = new WebshopDetectorService();
