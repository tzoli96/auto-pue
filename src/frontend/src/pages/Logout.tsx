import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Kijelentkezés utáni sikerüzenet
        toast.success('Logout successful!', {
            position: "top-right"
        });

        const timer = setTimeout(() => {
            navigate('/login');
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <ToastContainer />
        </>
    );
}
