import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}
