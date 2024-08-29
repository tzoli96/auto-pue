import { useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { DataTable } from "../components/data-table.tsx";
import { columns } from '../data/columns';
import LoadingBar from 'react-top-loading-bar';
import { useDomainActions } from '../hooks/useDomainActions';
import { exportCSV } from '../services/domainServices.ts';
import { Button } from "@/components/ui/button";

export default function Filltered() {
    const { data, loading, fillteredDomains } = useDomainActions();
    const loadingBarRef = useRef<any>(null);

    useEffect(() => {
        fillteredDomains();
    }, [fillteredDomains]);

    useEffect(() => {
        if (loading) {
            loadingBarRef.current.continuousStart();
        } else {
            loadingBarRef.current.complete();
        }
    }, [loading]);

    const handleDownloadCsv = async () => {
        try {
            const response = await fetch('/api/export-csv', {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/csv',
                },
            });

            if (response.ok) {
                await exportCSV()
            } else {
                console.error('Failed to download CSV');
            }
        } catch (error) {
            console.error('Error downloading CSV:', error);
        }
    };

    return (
        <Layout>
            <LoadingBar color="#3498db" ref={loadingBarRef} />
            <h2 className="text-2xl font-bold mb-4">Filltered</h2>
            <div className="container mx-auto py-10">
                <div className="mb-4 flex justify-end">
                    <Button variant="outline" onClick={handleDownloadCsv}>
                        Download Export CSV
                    </Button>
                </div>
                <DataTable columns={columns} data={data} />
            </div>
        </Layout>
    );
}
