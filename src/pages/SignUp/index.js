import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';


function SignUn() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  

  function handleSubmit(e){
    e.preventDefault();  //pra não atualizar a pagina
    
  }
    return (
      <div className='container'>
        <div className='login'>
          
          <div className='area-logo'>
            <img src={logo} alt='logo do sistema'/>
          </div>

          <form >
            <h1>CADASTRO</h1>
            <input type='text' placeholder='Nome' value={nome} onChange={ (e) => setNome(e.target.value)}/>
            <input type='text' placeholder='email@email.com' value={email} onChange={ (e) => setEmail(e.target.value)}/>
            <input type='password' placeholder='Senha' value={senha} onChange={ (e) => setSenha(e.target.value)}/>
                        
            <button type='submit'>Cadastrar</button>
          </form>

          <Link to='/'>Já possuo uma conta</Link>
        </div>
      </div>
    );
  }
  
  export default SignUn;
