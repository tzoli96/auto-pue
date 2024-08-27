const fakeDomains = [
    { id: '1', url: 'example.com', synced: true },
    { id: '2', url: 'example.net', synced: false },
    { id: '3', url: 'example.org', synced: true },
];

class DomainService {
    getDomains() {
        return fakeDomains;
    }

    resynchronizeDomains() {
        // Itt történne a valós logika
        return 'All domains resynchronized successfully.';
    }

    verifyWebshopSync() {
        // Itt történne a valós logika
        return 'Webshop synchronization verified for all domains.';
    }

    resynchronizeDomainById(domainId) {
        const domain = fakeDomains.find(d => d.id === domainId);
        if (domain) {
            return `Domain ${domain.name} resynchronized successfully.`;
        } else {
            throw new Error('Domain not found.');
        }
    }

    verifyWebshopSyncById(domainId) {
        const domain = fakeDomains.find(d => d.id === domainId);
        if (domain) {
            return `Webshop synchronization verified for domain ${domain.name}.`;
        } else {
            throw new Error('Domain not found.');
        }
    }
}

module.exports = new DomainService();
