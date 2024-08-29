const unidecode = require('unidecode');

/**
 * Sanitizes a domain URL by removing or replacing characters that are not allowed in domain names.
 * @param {string} url - The URL to sanitize.
 * @returns {string} - The sanitized URL.
 */
function sanitizeDomainUrl(url) {
    // Convert accented characters to their ASCII equivalents
    let sanitizedUrl = unidecode(url);

    // Remove any characters that are not allowed in domain names
    sanitizedUrl = sanitizedUrl.replace(/[^a-zA-Z0-9.-]/g, '');

    return sanitizedUrl;
}

module.exports = { sanitizeDomainUrl };
