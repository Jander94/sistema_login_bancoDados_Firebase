import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConection';

export const AuthContext = createContext({});

function AuthProvider({ children }){

    const [ user, setUser ] = useState(null);
    const [ loadingAuth, setLoadingAuth ] = useState(false);
    //const [ loading, setLoading ] = useState(true;)

    return(
        <AuthContext.Provider value={{ signed: !!user, user }}>
            { children }
        </AuthContext.Provider>
    );
}
export default AuthProvider;

// !!user -> converte a useState em booleano, se tiver algo é true, senão é false