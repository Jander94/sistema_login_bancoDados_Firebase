import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth';


function SignUn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  
  const { cadastrar, loadingAuth } = useContext(AuthContext); //coloca o que vai usar do AuthContext

  function handleSubmit(e){
    e.preventDefault();  //pra não atualizar a pagina
    
    if(nome !== '' && password !== '' && email !== ''){
      cadastrar(email, password, nome)
    }
  }
    return (
      <div className='container'>
        <div className='login'>
          
          <div className='area-logo'>
            <img src={logo} alt='logo do sistema'/>
          </div>

          <form onSubmit={handleSubmit}>
            <h1>CADASTRO</h1>
            <input type='text' placeholder='Nome' value={nome} onChange={ (e) => setNome(e.target.value)}/>
            <input type='text' placeholder='email@email.com' value={email} onChange={ (e) => setEmail(e.target.value)}/>
            <input type='password' placeholder='Senha' value={password} onChange={ (e) => setPassword(e.target.value)}/>
                        
            <button type='submit'>{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
          </form>

          <Link to='/'>Já possuo uma conta</Link>
        </div>
      </div>
    );
  }
  
  export default SignUn;
