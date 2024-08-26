import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    role: 'user' | 'admin';
}

interface AuthState {
    token: string | null;
    user: User | null;
}

interface AuthContextProps {
    authState: AuthState;
    login: (user: User, token: string) => void;
    logout: () => void;
}

const defaultAuthState: AuthState = {
    token: null,
    user: null,
};

export const AuthContext = createContext<AuthContextProps>({
    authState: defaultAuthState,
    login: () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            setAuthState({
                token: storedToken,
                user: JSON.parse(storedUser),
            });
        }
    }, []);

    const login = useCallback((user: User, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({ token, user });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState(defaultAuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
