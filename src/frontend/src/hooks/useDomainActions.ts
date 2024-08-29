import { useState, useCallback } from 'react';
import { updateDomain,getFillteredDomains, getDomains, resynchronizeDomains, verifyWebshopSync, getDomainByDomainId } from '../services/domainServices.ts';
import { useToast } from "@/components/ui/use-toast";
import { Domain } from '../types/domain';

export function useDomainActions() {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Domain[]>([]);
    const { toast } = useToast();

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

    const fillteredDomains = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getFillteredDomains();
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

    const handleGetDomainById = useCallback(async (domainId: string) => {
        setLoading(true);
        try {
            const domain = await getDomainByDomainId(domainId);
            return domain;
        } catch (error) {
            console.error(`Error fetching domain with ID ${domainId}:`, error);
            toast({
                variant: "destructive",
                title: 'Failed to load domain',
                description: error.message,
                status: 'error',
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    const handleUpdateDomain = useCallback(async (domainId: string, updateData: Partial<Domain>) => {
        setLoading(true);
        try {
            const updatedDomain = await updateDomain(domainId, updateData);
            toast({
                title: 'Domain updated successfully!',
                status: 'success',
            });
            return updatedDomain;
        } catch (error) {
            console.error(`Error updating domain with ID ${domainId}:`, error);
            toast({
                variant: "destructive",
                title: 'Failed to update domain',
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
        fillteredDomains,
        handleResyncDomains,
        handleVerifyWebshopSync,
        handleGetDomainById,
        handleUpdateDomain
    };
}
