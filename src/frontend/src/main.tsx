import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import router from './routes/index';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"; // Importáld a Toaster komponenst

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
        <Toaster /> {/* Hozzáadjuk a Toaster komponenst */}
    </StrictMode>,
);
