import React, { createContext, useReducer, useContext } from 'react';

// Create the context
const AuthContext = createContext(null);

// Reducer function to manage state updates
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'UPDATE':
            return { ...state, user: { ...state.user, ...action.payload } };
        case 'LOGOUT':
            return { ...state, user: null };
        default:
            return state;
    }
};

// Provider component to wrap your app
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    const login = (userData) => {
        dispatch({ type: 'LOGIN', payload: userData });
    };

    const updateUser = (updatedData) => {
        dispatch({ type: 'UPDATE', payload: updatedData });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ user: state.user, login, updateUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
