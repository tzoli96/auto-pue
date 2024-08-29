import { Domain } from '../types/domain';
import apiClient from '../api/apiClient';

// Összes domain lekérése
export async function getDomains(): Promise<Domain[]> {
    const response = await apiClient.get<Domain[]>('/domains');
    return response.data;
}

export async function getFillteredDomains(): Promise<Domain[]> {
    const response = await apiClient.get<Domain[]>('/filltered-domains');
    return response.data;
}

export async function exportCSV(): Promise<void> {
    try {
        const response = await apiClient.get('/export-csv', {
            responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'domains.csv');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.error('Failed to export CSV:', error);
    }
}


export async function updateDomain(domainId, updateData): Promise<Domain[]> {
    const response = await apiClient.put<Domain[]>(`/domains/${domainId}`,updateData);
    return response.data;
}

export async function getDomainByDomainId(domainId): Promise<Domain[]> {
    const response = await apiClient.get<Domain[]>(`/domains/${domainId}`);
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
