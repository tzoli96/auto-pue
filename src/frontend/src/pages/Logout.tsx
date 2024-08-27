import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

export default function Logout() {
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        toast({
            title: 'Logout successful!',
            status: 'success',
        });

        const timer = setTimeout(() => {
            navigate('/login');
        }, 3000); // 3 másodperc

        return () => clearTimeout(timer);
    }, [navigate, toast]);

    return null;
}
