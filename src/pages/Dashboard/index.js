import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';


export default function Dashboard(){

    const { logout,user } = useContext(AuthContext);

    return(
        <div>
            <h1>Dashboard</h1>
            <h1>{user.nome}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}