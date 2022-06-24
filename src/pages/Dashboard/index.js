import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';
import Header from '../../components/Header';



export default function Dashboard(){

    const { logout } = useContext(AuthContext);

    return(
        <div className='d-container'>
            <Header/>

            <h1>.................................Dashboard</h1>            
            <button onClick={logout}>.............................................................Logout</button>
        </div>
    );
}