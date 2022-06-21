import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConection';

export const AuthContext = createContext({});

function AuthProvider({ children }){

    const [ user, setUser ] = useState(null);
    const [ loadingAuth, setLoadingAuth ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    useEffect( () => {
        function loadStorage(){
            const storageUser = localStorage.getItem('SistemaUser');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);           
        }

        loadStorage();
    }, [])

    async function cadastrar(email, password, nome){
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async(value) => {
            let uid = value.user.uid;

            await firebase.firestore().collection('users').doc(uid).set({
                nome: nome,
                avatarUrl: null
            })
            .then( () => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
        })
        .catch( (error) => {
            alert(error);
            setLoadingAuth(false);
        })
    }

    async function logout(){
        await firebase.auth().signOut();
        localStorage.removeItem("SistemaUser");
        setUser(null);
    }

    function storageUser(data){
        localStorage.setItem("SistemaUser",JSON.stringify(data))
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, loading, cadastrar, logout }}>
            { children }
        </AuthContext.Provider>
    );
}
export default AuthProvider;

// !!user -> converte a useState em booleano, se tiver algo é true, senão é false