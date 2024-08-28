import { useState, useCallback } from 'react';
import { getDomains, resynchronizeDomains, verifyWebshopSync } from '../services/domainServices.ts';
import { useToast } from "@/components/ui/use-toast";

export function useDomainActions() {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Domain[]>([]);
    const { toast } = useToast();  // Toast hozzáadása

    const loadDomains = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getDomains();
            setData(result);
        } catch (error) {
            console.error('Error fetching domains:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleResyncDomains = useCallback(async () => {
        setLoading(true);
        try {
            await resynchronizeDomains();
            toast({
                title: 'Domains resynchronized successfully!',
                status: 'success',
            });
            await loadDomains();
        } catch (error) {
            console.error('Error during resync:', error);
            toast({
                variant: "destructive",
                title: 'Resynchronization failed',
                description: error.message,
                status: 'error',
            });
        } finally {
            setLoading(false);
        }
    }, [loadDomains, toast]);

    const handleVerifyWebshopSync = useCallback(async () => {
        setLoading(true);
        try {
            await verifyWebshopSync();
            toast({
                title: 'Webshop synchronization verified successfully!',
                status: 'success',
            });
        } catch (error) {
            console.error('Error during webshop sync verification:', error);
            toast({
                variant: "destructive",
                title: 'Verification failed',
                description: error.message,
                status: 'error',
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    return {
        data,
        loading,
        loadDomains,
        handleResyncDomains,
        handleVerifyWebshopSync,
    };
}
