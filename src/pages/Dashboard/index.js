import { useState } from 'react';
import Header from '../../components/Header';
import './dashboard.css'
import Title from '../../components/Title'
import { FiMessageCircle, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Dashboard(){

    const [ chamados, setChamados ] = useState([1]);

    return(
        <div className='d-container'>
            <Header/>
            <div className='content'>
                <Title name='Atendimentos'>
                    <FiMessageCircle size={25}/>
                </Title>

                {chamados.length === 0 ? (
                    <div className='container-profile dashboard'>
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
                                <tr>
                                    <td data-label='Cliente'>Sujeto</td>

                                    <td data-label='Assunto'>Suporte</td>

                                    <td data-label='Status'>
                                        <span className='badge' style={{backgroundColor: '#5cb85c'}}>Em aberto</span>
                                    </td>

                                    <td data-label='Cadastrado'>20/06/2022</td>

                                    <td data-label='#' >

                                        <button style={{backgroundColor: '#3583f6'}} className='action'>
                                            <FiSearch color='#fff' size={17}/>
                                        </button>

                                        <button style={{backgroundColor: '#f6a935'}} className='action'>
                                            <FiEdit2 color='#fff' size={17}/>
                                        </button>

                                    </td>
                                </tr>

                                
                            </tbody>

                        </table>
                    </>
                )}
                
            </div>
        </div>
    );
}