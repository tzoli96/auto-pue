import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../services/authService';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = await AuthService.login(email, password);
            toast.success('Login successful!', {
                position: "top-right"
            });
            navigate('/dashboard');
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Login failed: ' + error.message, {
                    position: "top-right"
                });
            } else {
                toast.error('An unexpected error occurred', {
                    position: "top-right"
                });
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <ToastContainer />
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
