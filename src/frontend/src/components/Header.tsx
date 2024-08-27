import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Auto PUE</h1>
                <div>
                    <button
                        onClick={handleLogout}
                        className="text-gray-700 hover:text-gray-900"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
