import { useState } from 'react';
import { getDomains , resynchronizeDomains, verifyWebshopSync } from '../services/domainServices.ts';

export function useDomainActions() {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Domain[]>([]);

    const loadDomains = async () => {
        setLoading(true);
        try {
            const result = await getDomains();
            setData(result);
        } catch (error) {
            console.error('Error fetching domains:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleResyncDomains = async () => {
        setLoading(true);
        try {
            await resynchronizeDomains();
            await loadDomains();
        } catch (error) {
            console.error('Error during resync:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyWebshopSync = async () => {
        setLoading(true);
        try {
            await verifyWebshopSync();
        } catch (error) {
            console.error('Error during webshop sync verification:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        loadDomains,
        handleResyncDomains,
        handleVerifyWebshopSync,
    };
}
