import './new.css';
import firebase from "../../services/firebaseConection";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiPlusCircle } from 'react-icons/fi';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../contexts/auth';
import { toast } from "react-toastify";
import { useHistory, useParams } from 'react-router-dom';

export default function New(){

    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const history = useHistory();

    const [ assunto, setAssunto ] = useState('Suporte');
    const [ status, setStatus ] = useState('Aberto');
    const [ complemento, setComplemento ] = useState('');
    const [ idCustomer, setIdCustomer ] = useState(false);

    const [ clientes, setClientes ] = useState([]);
    const [ loadClientes, setLoadClientes ] = useState(true);
    const [ clienteSelecionado, setClienteSelecionado ] = useState(0);

    useEffect(() => {
        async function loadCustomers(){
            await firebase.firestore().collection('customers').get().then( (snapshot) => {
                let lista = [];
                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia,
                    })
                })
                if(lista.length === 0){
                    toast.info('Nenhum Cliente encontrado!')
                    setClientes([{id: 1, nomeFantasia: ''}])
                    setLoadClientes(false);
                    return;
                }
                setClientes(lista);
                setLoadClientes(false);
                
                if(id){
                   loadId(lista); 
                }

            }).catch( (error) => {
                toast.error('Ops, algo deu errado...');
                console.log(error);
                setLoadClientes(false);
                setClientes([{id: 1, nomeFantasia: ''}])
            })
        }

        loadCustomers();

    }, [id]);

    async function loadId(lista){
        await firebase.firestore().collection('chamados').doc(id).get()
        .then((snapshot) => {
            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento);

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
            setClienteSelecionado(index);
            setIdCustomer(true);
        })
        .catch((error) => {
            toast.error(' Ops, erro no ID...')
            console.log(error)
            setIdCustomer(false)
        })
    }

    async function handleRegister(e){
        e.preventDefault();

        if(idCustomer){
            await firebase.firestore().collection('chamados').doc(id)
            .update({
                cliente: clientes[clienteSelecionado].nomeFantasia,
                clienteId: clientes[clienteSelecionado].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid
            })
            .then(() => {
                toast.success('Chamado editado com sucesso!')
                setClienteSelecionado(0);
                setComplemento('');
                history.push('/dashboard');
            }).catch( (error) => {
                toast.error('Ops, algo deu errado...')
                console.log(error)
            })

            return;
        }

        await firebase.firestore().collection('chamados').add({
            created: new Date(),
            cliente: clientes[clienteSelecionado].nomeFantasia,
            clienteId: clientes[clienteSelecionado].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
        }).then( () => {
            toast.success('Chamado cadastrado com sucesso!')
            setComplemento('');
            setClienteSelecionado(0);
            setAssunto('Suporte');
            setStatus('Aberto');
            history.push('/dashboard');

        }).catch( (error) => {
            toast.error('Ops, algo deu errado...')
            console.log(error)
        })
        

    }

    function handleChangeSelect(e){
        setAssunto(e.target.value);
    }

    function handleOptionChange(e){
        setStatus(e.target.value);
    }

    function handleChangeCustomers(e){
        setClienteSelecionado(e.target.value)
    }


    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name='Editando chamado'>
                    <FiPlusCircle size={25}/>
                </Title>

                <div className='container-profile'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Cliente:</label>
                        {loadClientes ? (
                            <input type='text' disabled value='Carregando clientes...'/>
                        ):(
                            <select value={clienteSelecionado} onChange={handleChangeCustomers}>
                                {clientes.map((item, index) => {
                                    return(
                                        <option key={item.id} value={index}>
                                            {item.nomeFantasia}
                                        </option>
                                    );
                                })}
                            </select>
                        )}
                        

                        <label>Assunto:</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value='Suporte'>Suporte</option>
                            <option value='Visita Tecnica'>Visita Técnica</option>
                            <option value='Financeiro'>Financeiro</option>
                        </select>

                        <label>Status:</label>
                        <div className="status">
                            <input type='radio' name='radio' value='Aberto' onChange={handleOptionChange} checked={ status === 'Aberto' }/> <span>Aberto</span>
                            <input type='radio' name='radio' value='Em progresso' onChange={handleOptionChange} checked={ status === 'Em progresso' }/> <span>Em progresso</span>
                            <input type='radio' name='radio' value='Atendido' onChange={handleOptionChange} checked={ status === 'Atendido' }/> <span>Atendido</span>
                        </div><br/><br/>

                        <label>Complemento:</label>
                        <textarea type='text' value={complemento} onChange={(e) => setComplemento(e.target.value)} placeholder="Opcional..."/>

                        <button type="submit">Salvar</button>

                    </form>
                    
                </div>
            </div>
            
        </div>
    );
}