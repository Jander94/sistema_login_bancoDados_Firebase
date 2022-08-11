import './dashboard.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import firebase from '../../services/firebaseConection';
import Modal from '../../components/Modal';
import { useState, useEffect } from 'react';
import { FiMessageCircle, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import { toast } from 'react-toastify';

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');  //ordenar por ordem 'desc' decrescente ou 'asc' crescente

export default function Dashboard(){    

    const [ chamados, setChamados ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ loadingMore, setLoadingMore ] = useState(false);
    const [ isEmpty, setIsEmpty ] = useState(false);
    const [ lastDocs, setLastDocs ] = useState();
    const [ showPostModal, setShowPostModal ] = useState(false);
    const [ detail, setDetail ] = useState();

    useEffect( () => {

        async function loadChamados(){
            await listRef.limit(4).get()
            .then((snapshot)=>{
                updateState(snapshot);
            })
            .catch((error)=>{
                toast.error('Ops, algo deu errado...')
                console.log("erro encontrado: ", error);
                setLoadingMore(false)
            })
            setLoading(false);
        };

        loadChamados();

        return () => {}
    }, [])

    

    async function updateState(snapshot){
        const isCollectionEmpty = snapshot.size === 0;

        if (!isCollectionEmpty){
            let lista = [];

            snapshot.forEach((doc)=>{
                lista.push({
                    id: doc.id,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    assunto: doc.data().assunto,
                    status: doc.data().status,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),  //formatar a data
                    complemento: doc.data().complemento
                })                
            })
            const lastDoc = snapshot.docs[snapshot.docs.length -1]; //Pegando o ultimo documento buscado;
            setChamados(chamados => [...chamados, ...lista]);
            setLastDocs(lastDoc);
        }else{
            setIsEmpty(true);
        }
        setLoadingMore(false);
    };

    async function handleMore(){
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(4).get()     //começar depois da state lastDocs (ultimo item)
        .then((snapshot) => {
            updateState(snapshot)
        })
        .catch((error) => {
            toast.error('Ops, algo deu errado...')
            console.log(error)
        })  
        
    }

    function styleStatus(item){
        if(item === 'Aberto'){
            return(
                {backgroundColor:'#FFA500'}
            );
        }else if(item === 'Em progresso'){
            return(
                {backgroundColor:'#B0E0E6'}
            );
        }else if(item === 'Atendido'){
            return(
                {backgroundColor:'#5cb85c'}
            );
        }
    }

    function togglePostModal(item){
        setShowPostModal(!showPostModal);
        setDetail(item);        
    }

    if(loading){
        return(
            <div>
                <Header/>
                <div className='content'>
                    <Title name='Atendimentos'>
                        <FiMessageCircle size={25}/>
                    </Title>

                    <div className='container-profile'>
                        <span>Buscando Chamados...</span>
                    </div>
                </div>

                
            </div>
        );
    }

    return(
        <div className='d-container'>
            <Header/>
            <div className='content'>
                <Title name='Atendimentos'>
                    <FiMessageCircle size={25}/>
                </Title>

                {chamados.length === 0 ? (
                    <div className='container-profile'>
                        <span>Nenhum chamado registrado...</span>

                        <Link to="/new" className='new'>
                            <FiPlus size={25}/>
                            Novo Chamado
                        </Link>
                    </div>
                ):(
                    <>
                        <Link to="/new" className='new'>
                            <FiPlus size={25}/>
                            Novo Chamado
                        </Link>

                        <table>

                            <thead>
                                <tr>
                                    <th scope='col'>Cliente</th>
                                    <th scope='col'>Assunto</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Cadastrado em</th>
                                    <th scope='col'>#</th>
                                </tr>
                            </thead>

                            <tbody>
                                {chamados.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td data-label='Cliente'>{item.cliente}</td>

                                            <td data-label='Assunto'>{item.assunto}</td>

                                            <td data-label='Status'>
                                                <span className='badge' style={styleStatus(item.status)}>{item.status}</span>
                                            </td>

                                            <td data-label='Cadastrado'>{item.createdFormated}</td>

                                            <td data-label='#' >

                                                <button style={{backgroundColor: '#3583f6'}} className='action' onClick={() => togglePostModal(item)}>
                                                    <FiSearch color='#fff' size={17}/>
                                                </button>

                                                <Link style={{backgroundColor: '#f6a935'}} className='action' to={`/new/${item.id}`}>
                                                    <FiEdit2 color='#fff' size={17}/>
                                                </Link>

                                            </td>
                                        </tr>
                                    );
                                })}

                                
                            </tbody>

                        </table>
                        
                        {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Buscando dados...</h3>}
                        {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}
                    </>
                )}
                
            </div>
            {showPostModal && (
                <Modal
                conteudo={detail}
                close={togglePostModal}
                />
            )}
        </div>
    );

}