import './styles.css';
import clienteIcone from '../../assets/clienteicon.svg'
import filtroIcone from '../../assets/filtericon.svg'
import lupaIcone from '../../assets/lupaicon.svg'
import NavBar from '../../components/navbar';
import React, { useEffect, useState } from "react";
import Perfil from '../../components/customPerfil';
import useUser from '../../hooks/useUser';
import ModalEditarUsuario from '../../components/customModalEditarPerfil';
import ModalCadastrarCobranca from '../../components/customModalCadastrarCobranca';
import ModalAzul from '../../components/customModalAzulSucesso';
import ModalCadastroCliente from '../../components/customModalCadastroCliente';

import updown from '../../assets/updown.svg'
import cobrancaIcone from '../../assets/cobrancaicon.svg'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import lupavermelha from '../../assets/lupavermelha.svg'
import clientexvermelho from '../../assets/clientexvermelho.svg'


function Cliente() {
    const { openModalEditarUsuario, abrirModalCadastrarCobranca, abrirModalAzulCobranca, abrirModalCadastrarCliente, setAbrirModalCadastrarCliente,
        abrirModalAzulCliente, abrirAzulCobranca, setAbrirAzulCobranca, abrirAzulCliente, setAbrirAzulCliente, setAbrirModalCadastrarCobranca,
        verTodosClienteInadimplentes, verTodosClienteEmDia, setVerTodosClienteEmDia, setVerTodosClienteInadimplentes } = useUser()

    const [clientes, setClientes] = useState([{}])
    const [clientesOrdenados, setClientesOrdenados] = useState([])
    const [asc, setAsc] = useState(true)
    const [pesquisaAtiva, setPesquisaAtiva] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [clientesPesquisa, setClientesPesquisas] = useState([])

    const clientesEmDia = clientes.filter(cliente => cliente.status === 'Em dia')
    const clientesInadimplentes = clientes.filter(cliente => cliente.status !== 'Em dia')

    const navigate = useNavigate()

    setTimeout(() => {
        if (abrirModalAzulCobranca) {
            setAbrirAzulCobranca(true)
        }
        if (abrirModalAzulCliente) {
            setAbrirAzulCliente(true)
        }
    }, 1000);

    useEffect(() => {
        dataCliente()

    }, [])

    useEffect(() => {
        dataCliente()
    }, [abrirAzulCliente])

    useEffect(() => {
        if (verTodosClienteInadimplentes) {

            setClientesOrdenados([...clientesInadimplentes])
        }
        if (verTodosClienteEmDia) {

            setClientesOrdenados([...clientesEmDia])
        }
        if (pesquisaAtiva) {
            setVerTodosClienteEmDia(false)
            setVerTodosClienteInadimplentes(false)
        }
    })

    useEffect(() => {
        if (pesquisa === '') {
            setPesquisaAtiva(false)
            setClientesOrdenados([...clientesOrdenados])
        }
    }, [pesquisa])

    useEffect(() => {

        if (asc) {
            const nomeOrdenado = clientes.sort((a, b) => {
                return a.nome.toUpperCase() < b.nome.toUpperCase() ? -1 : a.nome.toUpperCase() > b.nome.toUpperCase() ? 1 : 0;
            })
            return setClientesOrdenados(nomeOrdenado)


        }
        const nomeOrdenado = clientes.sort((a, b) => {
            return b.nome.toUpperCase() < a.nome.toUpperCase() ? -1 : b.nome.toUpperCase() > a.nome.toUpperCase() ? 1 : 0;

        })
        setClientesOrdenados(nomeOrdenado)

    }, [asc, clientes])


    async function dataCliente() {
        const token = localStorage.getItem('token')

        try {
            const response = await api.get('/cliente', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setClientes(response.data)

        } catch (error) {

        }

    }

    async function pesquisarEnter(event) {
        const token = localStorage.getItem('token')
        const search = pesquisa
        try {

            if (event.key === 'Enter') {
                if (!pesquisa) {
                    return
                }

                const response = await api.get(`/cliente/pesquisa/${search}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setPesquisaAtiva(true)
                setClientesPesquisas([...response.data])
            }

        } catch (error) {
            console.log(error.response)
        }

    }
    async function pesquisarClick() {
        const token = localStorage.getItem('token')
        const search = pesquisa
        try {


            if (!pesquisa) {
                return
            }

            const response = await api.get(`/cliente/pesquisa/${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setPesquisaAtiva(true)
            setClientesPesquisas([...response.data])


        } catch (error) {
            console.log(error.response)
        }

    }

    async function paginaDetalhe({ cliente }) {
        const id = cliente.id
        localStorage.setItem('idCliente', id)

        navigate('/detalhe')


    }

    function handleCobranca({ cliente }) {
        localStorage.setItem('idCliente', cliente.id)
        setAbrirModalCadastrarCobranca(true)
    }


    return (
        <div className='main-div-cliente'>

            {openModalEditarUsuario && <ModalEditarUsuario />}
            {abrirModalCadastrarCobranca && <ModalCadastrarCobranca />}
            {abrirModalCadastrarCliente && <ModalCadastroCliente />}

            <NavBar page={2} />

            <div className="container-main-div-clientes">

                <header className='header-clientes'>
                    <span className='span-cliente'>Clientes</span>
                    <Perfil />
                </header>

                <div className='container-div-clientes'>
                    <img className='icone-cliente-clientes' src={clienteIcone} alt='cliente-icone'></img>
                    <h1>Clientes</h1>
                    <button onClick={() => setAbrirModalCadastrarCliente(true)} type='button'>+ Adicionar cliente</button>


                    <img src={filtroIcone} alt='filtro-icone'></img>
                    <input onKeyDownCapture={pesquisarEnter} placeholder='Pesquisa' type='text' value={pesquisa} onChange={(e) => setPesquisa(e.target.value)}></input>
                    <img onClick={() => pesquisarClick()} className='lupa-icone-clientes' src={lupaIcone} alt='lupa-icone' style={{ cursor: 'pointer' }} ></img>
                </div>

                <table className='div-tabela-clientes'>
                    {abrirAzulCliente && <ModalAzul width={'330px'} text={'Cadastro concluído com sucesso'} top={'590px'} left={'780px'} />}
                    {abrirAzulCobranca && <ModalAzul width={'330px'} text={'Cobrança cadastrada com sucesso'} top={'590px'} left={'780px'} />}

                    <thead >
                        <tr className='header-tabela-clientes'>
                            <th style={{ width: '200px' }}>
                                <img onClick={() => setAsc(!asc)} alt='updown' src={updown} style={{ cursor: 'pointer' }}></img>
                                Cliente
                            </th>
                            <th style={{ width: '195px' }}>CPF</th>
                            <th style={{ width: '215px' }}>E-mail</th>
                            <th style={{ width: '188px' }}>Telefone</th>
                            <th style={{ width: '160px' }}>Status</th>
                            <th style={{ width: '127px' }}>Criar Cobrança</th>
                        </tr>

                    </thead>

                    <tbody>
                        {pesquisaAtiva &&

                            clientesPesquisa.map((cliente) => (
                                <tr className='linha-tabela-dados-clientes'>
                                    <td onClick={() => paginaDetalhe({ cliente })} style={{ width: '200px', cursor: 'pointer' }}>{cliente.nome}</td>
                                    <td style={{ width: '190px' }}>{cliente.cpf}</td>
                                    <td style={{ width: '215px' }}>{cliente.email}</td>
                                    <td style={{ width: '185px' }}>{cliente.telefone}</td>
                                    <td style={{ width: '160px' }}>
                                        <div className={cliente.status === 'Em dia' ? 'div-status-emdia' : cliente.status === 'Inadimplente' ? 'div-status-inadimplente' : 'div-status-emdia'}>
                                            {cliente.status === null ? 'Em dia' : cliente.status}
                                        </div>
                                    </td>
                                    <td style={{ width: '127px' }}>
                                        <img onClick={() => handleCobranca({ cliente })} alt='icone-cobrança' src={cobrancaIcone} style={{ cursor: 'pointer' }}></img>
                                    </td>
                                </tr>
                            ))
                        }
                        {pesquisaAtiva && !clientesPesquisa.length &&
                            <div className='div-pesquisar-none'>
                                <img alt='' src={lupavermelha}></img>
                                <span className='nenhum-resultado-foi-encontrado'>Nenhum resultado foi encontrado!</span>
                                <span className='verifique-se-escrita-está-correta'>Verifique se escrita está correta</span>
                                <img className='icone-cliente-vermelho' alt='' src={clientexvermelho}></img>
                            </div>}

                        {!pesquisaAtiva &&

                            clientesOrdenados.map((cliente) => (
                                <tr className='linha-tabela-dados-clientes'>
                                    <td onClick={() => paginaDetalhe({ cliente })} style={{ width: '200px', cursor: 'pointer' }}>{cliente.nome}</td>
                                    <td style={{ width: '190px' }}>{cliente.cpf}</td>
                                    <td style={{ width: '215px' }}>{cliente.email}</td>
                                    <td style={{ width: '185px' }}>{cliente.telefone}</td>
                                    <td style={{ width: '160px' }}>
                                        <div className={cliente.status === 'Em dia' ? 'div-status-emdia' : cliente.status === 'Inadimplente' ? 'div-status-inadimplente' : 'div-status-emdia'}>
                                            {cliente.status === null ? 'Em dia' : cliente.status}
                                        </div>
                                    </td>
                                    <td style={{ width: '127px' }}>
                                        <img onClick={() => handleCobranca({ cliente })} alt='icone-cobrança' src={cobrancaIcone} style={{ cursor: 'pointer' }}></img>
                                    </td>
                                </tr>
                            ))

                        }
                    </tbody>

                </table>
            </div>

        </div>
    );
}

export default Cliente;
