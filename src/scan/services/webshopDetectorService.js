const playwrightService = require('./playwrightService');

class WebshopDetectorService {
    constructor() {
        // List of keywords that are typically found on webshop pages
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

        // List of keywords to filter out server provider ads
        this.serverProviderKeywords = [
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

        // Regular expressions to detect phone numbers and email addresses
        this.phoneRegex = /\+?\d[\d\s\-\(\)]{7,}\d/g;
        this.emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}/g;
        this.companyNameRegex = /\b(cég|kft|bt|zrt|rt|vállalat|központ)\b/i;
    }

    /**
     * Checks if a given URL belongs to a webshop by looking for specific keywords, contact details, and company names in the DOM content.
     * It also filters out pages likely to belong to server providers.
     * @param {string} url - The URL of the website to check.
     * @returns {Promise<object>} - Returns an object with detailed information about whether the site is likely a webshop.
     */
    async isWebshop(url) {
        try {
            const domContent = await playwrightService.getDOM(url);

            // Convert the DOM content to lowercase for case-insensitive keyword matching
            const lowerCaseContent = domContent.toLowerCase();

            // Check for server provider keywords to filter out such content
            for (const keyword of this.serverProviderKeywords) {
                if (lowerCaseContent.includes(keyword.toLowerCase())) {
                    console.log('Detected server provider content, filtering out.');
                    return {
                        isWebshop: false,
                        reason: 'Server provider content detected',
                    };
                }
            }

            // Count the number of webshop-related keywords found in the DOM content
            let foundKeywords = [];
            for (const keyword of this.webshopKeywords) {
                if (lowerCaseContent.includes(keyword.toLowerCase())) {
                    foundKeywords.push(keyword);
                }
            }

            // Find phone numbers, email addresses, and company names
            const phoneNumbers = domContent.match(this.phoneRegex) || [];
            const emailAddresses = domContent.match(this.emailRegex) || [];
            const companyNames = lowerCaseContent.match(this.companyNameRegex) || [];

            // Determine if the page is likely a webshop based on the presence of keywords and contact/company info
            const isLikelyWebshop = foundKeywords.length >= 2 || phoneNumbers.length > 0 || emailAddresses.length > 0 || companyNames.length > 0;

            // Return a detailed result
            return {
                isWebshop: isLikelyWebshop,
                foundKeywords,
                phoneNumbers,
                emailAddresses,
                companyNames
            };
        } catch (error) {
            console.error(`Failed to determine if the site is a webshop: ${error.message}`);
            return {
                isWebshop: false,
                reason: 'Error occurred during analysis',
            };
        }
    }
}

module.exports = new WebshopDetectorService();
