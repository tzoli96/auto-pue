import { useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { DataTable } from "../components/data-table.tsx";
import { columns } from '../data/columns';
import { Button } from "@/components/ui/button";
import LoadingBar from 'react-top-loading-bar';
import { useDomainActions } from '../hooks/useDomainActions';

export default function Dashboard() {
    const { data, loading, loadDomains, handleResyncDomains, handleVerifyWebshopSync } = useDomainActions();
    const loadingBarRef = useRef<any>(null);

    useEffect(() => {
        loadDomains();
    }, [loadDomains]);

    useEffect(() => {
        if (loading) {
            loadingBarRef.current.continuousStart();
        } else {
            loadingBarRef.current.complete();
        }
    }, [loading]);

    return (
        <Layout>
            <LoadingBar color="#3498db" ref={loadingBarRef} />
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="container mx-auto py-10">
                <div className="flex justify-center space-x-4 mb-6">
                    <Button variant="outline" onClick={handleResyncDomains}>
                        Resynchronize Domains
                    </Button>
                    <Button variant="outline" onClick={handleVerifyWebshopSync}>
                        Verify Webshop Synchronization
                    </Button>
                </div>
                <DataTable columns={columns} data={data} />
            </div>
        </Layout>
    );
}
