import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';


export default function Dashboard(){

    const { logout } = useContext(AuthContext);

    return(
        <div>
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}