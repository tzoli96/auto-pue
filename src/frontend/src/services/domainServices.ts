import { Domain } from '../types/domain';
import apiClient from '../api/apiClient';

// Összes domain lekérése
export async function getDomains(): Promise<Domain[]> {
    const response = await apiClient.get<Domain[]>('/domains');
    return response.data;
}

// Összes domain reszinkronizálása
export async function resynchronizeDomains(): Promise<void> {
    await apiClient.post('/resync-domains');
}

// Webshop szinkronizáció ellenőrzése az összes domain esetében
export async function verifyWebshopSync(): Promise<void> {
    await apiClient.post('/verify-webshop-sync');
}

// Egyedi domain reszinkronizálása
export async function resynchronizeDomainById(domainId: string): Promise<void> {
    await apiClient.post(`/domains/${domainId}/resync`);
}

// Webshop szinkronizáció ellenőrzése egyedi domain esetében
export async function verifyWebshopSyncById(domainId: string): Promise<void> {
    await apiClient.post(`/domains/${domainId}/verify-webshop-sync`);
}
