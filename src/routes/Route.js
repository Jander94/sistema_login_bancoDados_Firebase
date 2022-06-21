import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}){
const { signed } = useContext(AuthContext); //coloca o que vai usar do AuthContext

    const loading = false;
    

    if(loading){
        return(
            <div>
                <h1>CARREGANDO...</h1>
            </div>
        );
    }

    if(!signed && isPrivate){
      return <Redirect to="/"/>  
    }

    if(signed && !isPrivate){
        return <Redirect to="/dashboard"/>
    }

    return(
        <Route
            {...rest}
            render={ props => (
                <Component {...props}/>
            )}
        />
    );
}