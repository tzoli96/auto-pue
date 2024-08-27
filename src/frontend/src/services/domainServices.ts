import { Domain } from '../types/domain';
import axios from 'axios';

// Összes domain lekérése
export async function getDomains(): Promise<Domain[]> {
    const response = await axios.get<Domain[]>('/api/domains');
    return response.data;
}

// Összes domain reszinkronizálása
export async function resynchronizeDomains(): Promise<void> {
    await axios.post('/api/resync-domains');
}

// Webshop szinkronizáció ellenőrzése az összes domain esetében
export async function verifyWebshopSync(): Promise<void> {
    await axios.post('/api/verify-webshop-sync');
}

// Egyedi domain reszinkronizálása
export async function resynchronizeDomainById(domainId: string): Promise<void> {
    await axios.post(`/api/domains/${domainId}/resync`);
}

// Webshop szinkronizáció ellenőrzése egyedi domain esetében
export async function verifyWebshopSyncById(domainId: string): Promise<void> {
    await axios.post(`/api/domains/${domainId}/verify-webshop-sync`);
}
