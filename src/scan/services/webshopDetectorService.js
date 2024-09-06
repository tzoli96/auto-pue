const curlService = require('./curlService');
const unidecode = require('unidecode');

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

        this.phoneRegex = /\b(?:\+36|06|36)[-\s]?\d{1,2}[-\s]?\d{3}[-\s]?\d{4}\b/g;
        this.emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}/g;
        this.companyNameRegex = /(?:\b\w+\.?(?:\s+)?(?:cég|kft|bt|zrt|vállalat|központ)\b(?:\.|\s*)?(?:kft|bt|zrt|vállalat)?)/gi;
    }

    async isWebshop(url) {
        try {
            this.phoneNumbers = new Set();
            this.emailAddresses = new Set();
            this.companyNames = new Set();


            let domContent = await curlService.getDOM(url);
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
                        const contactDomContent = await curlService.getDOM(link);
                        this._extractContactInfo(contactDomContent);

                        if (this.phoneNumbers.size > 0 || this.emailAddresses.size > 0 || this.companyNames.size > 0) {
                            break;
                        }
                    }
                } else {
                    if (this.phoneNumbers.size === 0 || this.emailAddresses.size === 0 || this.companyNames.size === 0) {
                        const predefinedPaths = ['/contact', '/kapcsolat', '/rolunk', '/about', '/aboutus'];
                        for (const path of predefinedPaths) {
                            try {
                                const validUrl = this.ensureProtocol(url);

                                if (!validUrl || !this.isValidUrl(validUrl)) {
                                    throw new Error(`Invalid base URL: ${validUrl}`);
                                }

                                const contactUrl = new URL(path, validUrl).toString();
                                const contactDomContent = await curlService.getDOM(contactUrl);
                                this._extractContactInfo(contactDomContent);

                                if (this.phoneNumbers.size > 0 || this.emailAddresses.size > 0 || this.companyNames.size > 0) {
                                    break;
                                }
                            } catch (e) {
                                console.log(`Failed to fetch contact page at ${path}: ${e.message}`);
                            }
                        }
                    }
                }
            }

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
            console.error(`Failed to determine if the site is a webshop for URL: ${url}`);
            console.error('Error stack:', error.stack); // Teljes hibakövetés
            console.error('Error message:', error.message); // Hibaüzenet

            // Logold le a hibás URL-t és a HTTP státuszkódot, ha van
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                console.error('Response data:', error.response.data);
            } else if (error.request) {
                console.error('Request was made but no response received.');
                console.error('Request:', error.request);
            }

            return {
                isWebshop: false,
                reason: 'Error occurred during analysis',
            };
        }
    }

    isValidUrl(url) {
        try {
            new URL(url);  // Ha ez nem dob hibát, akkor érvényes az URL
            return true;
        } catch (error) {
            return false;
        }
    }

    ensureProtocol(url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return 'http://' + url;
        }
        return url;
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
            obj[`${prefix}_${index}`] = unidecode(item);
            index++;
        });
        return obj;
    }
}

module.exports = new WebshopDetectorService();
