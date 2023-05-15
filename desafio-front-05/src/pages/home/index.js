import './styles.css';
import NavBar from '../../components/navbar';
import api from '../../services/api'
import cobrancaVerde from '../../assets/cobrancaverde.svg'
import inadimplenteicone from '../../assets/clienteinadimplente.svg'
import clienteemdiaicone from '../../assets/clienteemdia.svg'
import cobrancaPedente from '../../assets/cobrancapedente.svg'
import cobrancaVencida from '../../assets/cobrancavencida.svg'
import { useEffect, useState } from 'react'
import Perfil from '../../components/customPerfil';
import ModalEditarUsuario from '../../components/customModalEditarPerfil';
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';



function Main() {

    const { openModalEditarUsuario, setVerTodosClienteInadimplentes, setVerTodosClienteEmDia,
        setVerTodasCobrancasVencidas, setVerTodasCobrancasPagas, setVerTodasCobrancasPrevistas } = useUser()
    const [clientes, setClientes] = useState([])
    const [cobrancas, setCobrancas] = useState([])

    const clientesEmDia = clientes.filter(cliente => cliente.status === 'Em dia')
    const clientesInadimplentes = clientes.filter(cliente => cliente.status !== 'Em dia')

    const cobrancasPagas = cobrancas.filter((cobranca) => cobranca.status === 'Paga')
    const cobrancasVencidas = cobrancas.filter((cobranca) => cobranca.status === 'Vencido')
    const cobrancasPrevistas = cobrancas.filter((cobranca) => cobranca.status === 'Pendente')

    const boletoComNomePagas = cobrancasPagas.map((cobranca) => {
        const cliente = clientes.find((cli) => cli.id === cobranca.cliente_id);
        const nomeCliente = cliente ? cliente.nome : "Cliente não encontrado";

        return {
            nome: nomeCliente,
            id: cobranca.id,
            valor: cobranca.valor,
            data_vencimento: cobranca.data_vencimento,
            status: cobranca.status,
            descricao: cobranca.descricao,
        };
    });
    const boletoComNomeVencidas = cobrancasVencidas.map((cobranca) => {
        const cliente = clientes.find((cli) => cli.id === cobranca.cliente_id);
        const nomeCliente = cliente ? cliente.nome : "Cliente não encontrado";

        return {
            nome: nomeCliente,
            id: cobranca.id,
            valor: cobranca.valor,
            data_vencimento: cobranca.data_vencimento,
            status: cobranca.status,
            descricao: cobranca.descricao,
        };
    });
    const boletoComNomePrevistas = cobrancasPrevistas.map((cobranca) => {
        const cliente = clientes.find((cli) => cli.id === cobranca.cliente_id);
        const nomeCliente = cliente ? cliente.nome : "Cliente não encontrado";

        return {
            nome: nomeCliente,
            id: cobranca.id,
            valor: cobranca.valor,
            data_vencimento: cobranca.data_vencimento,
            status: cobranca.status,
            descricao: cobranca.descricao,
        };
    });


    const navigate = useNavigate()

    useEffect(() => {
        dataCliente()
        dataCobrancas()
        atualizar()

    }, [])


    async function atualizar() {
        const token = localStorage.getItem('token')

        try {
            const response = await api.put(`/atualizar`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response.data)

        } catch (error) {
            console.log(error.response)
        }
    }

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

    async function dataCobrancas() {
        const token = localStorage.getItem('token')

        try {
            const response = await api.get('/cobranca', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCobrancas(response.data)

        } catch (error) {
            console.log(error.response)
        }

    }

    function verTodosInadimplentes() {
        setVerTodosClienteInadimplentes(true)
        setVerTodosClienteEmDia(false)
        navigate('/clientes')
    }
    function verTodosEmDia() {
        setVerTodosClienteEmDia(true)
        setVerTodosClienteInadimplentes(false)
        navigate('/clientes')
    }
    function functionVerTodosVencidos() {
        setVerTodasCobrancasVencidas(true)
        setVerTodasCobrancasPagas(false)
        setVerTodasCobrancasPrevistas(false)
        navigate('/cobrancas')
    }
    function functionVerTodosPagos() {
        setVerTodasCobrancasVencidas(false)
        setVerTodasCobrancasPagas(true)
        setVerTodasCobrancasPrevistas(false)
        navigate('/cobrancas')
    }
    function functionVerTodosPrevistos() {
        setVerTodasCobrancasVencidas(false)
        setVerTodasCobrancasPagas(false)
        setVerTodasCobrancasPrevistas(true)
        navigate('/cobrancas')
    }

    return (
        <div className='main-div-cliente'>

            {openModalEditarUsuario && <ModalEditarUsuario />}

            <NavBar page={1} />

            <div className="container-main-div-clientes">

                <header className='header-clientes'>
                    <span className='span-home'>Resumo das cobranças</span>
                    <Perfil />
                </header>

                <div className='container-div-cobrancas-home'>

                    <div style={{ background: '#EEF7F7' }} className='divs-cobrancas-home'>
                        <img alt='cobrança-icone' src={cobrancaVerde}></img>
                        <div className='div-container-cobranca'>
                            <span className='span-cobrancas-pagas'>Cobranças pagas</span>
                            <span className='span-cobranca-valor'>{`R$ ${cobrancasPagas.reduce((acumulador, atual) => acumulador + Number(atual.valor), 0).toFixed(2)}`}</span>
                        </div>
                    </div>
                    <div style={{ background: '#FFEFEF' }} className='divs-cobrancas-home'>
                        <img alt='cobrança-icone' src={cobrancaVencida}></img>
                        <div className='div-container-cobranca'>
                            <span className='span-cobrancas-pagas'>Cobranças vencidas</span>
                            <span className='span-cobranca-valor'>{`R$ ${cobrancasVencidas.reduce((acumulador, atual) => acumulador + Number(atual.valor), 0).toFixed(2)}`}</span>
                        </div>
                    </div>
                    <div style={{ background: '#FCF6DC' }} className='divs-cobrancas-home'>
                        <img alt='cobrança-icone' src={cobrancaPedente}></img>
                        <div className='div-container-cobranca'>
                            <span className='span-cobrancas-pagas'>Cobranças previstas</span>
                            <span className='span-cobranca-valor'>{` R$ ${cobrancasPrevistas.reduce((acumulador, atual) => acumulador + Number(atual.valor), 0).toFixed(2)}`}</span>
                        </div>
                    </div>

                </div>

                <div className='container-div-tabelas-cobrancas-home'>

                    <div className='cobranca-tabela-home'>
                        <div className='header-tabela-cobrança'>
                            <span className='header-cobranca-table-span'>Cobranças Vencidas</span>
                            <div className='tabela-cobrança-numero'>{(cobrancasVencidas.length < 10 ? `0${cobrancasVencidas.length}` : cobrancasVencidas.length)}</div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <div className='label-tabela-cobranca'>
                                <h3 className='h3-tabela-cobranca'>Cliente</h3>
                                <h3 className='h3-tabela-cobranca'>ID da cob.</h3>
                                <h3 className='h3-tabela-cobranca'>Valor</h3>
                            </div>
                        </div>

                        {boletoComNomeVencidas.slice(0, 5).map((cobranca) => (<div style={{ width: '100%' }}>
                            <div className='div-span-tabela-cobranca'>
                                <span style={{ width: '132px' }} className='span-tabela-cobranca'>{cobranca.nome} </span>
                                <span style={{ width: '120px' }} className='span-tabela-cobranca'>{cobranca.id}</span>
                                <span className='span-tabela-cobranca'>{`R$ ${cobranca.valor}`}</span>
                            </div>
                        </div>))
                        }



                        <div style={{ top: '620px' }} className='div-vertodos'>
                            <span onClick={() => functionVerTodosVencidos()}>Ver todos</span>
                        </div>
                    </div>

                    <div className='cobranca-tabela-home'>
                        <div className='header-tabela-cobrança'>
                            <span className='header-cobranca-table-span'>Cobranças Previstas</span>
                            <div style={{ background: '#FCF6DC', color: '#C5A605' }} className='tabela-cobrança-numero'>{(cobrancasPrevistas.length < 10 ? `0${cobrancasPrevistas.length}` : cobrancasPrevistas.length)}</div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <div className='label-tabela-cobranca'>
                                <h3 className='h3-tabela-cobranca'>Cliente</h3>
                                <h3 className='h3-tabela-cobranca'>ID da cob.</h3>
                                <h3 className='h3-tabela-cobranca'>Valor</h3>
                            </div>
                        </div>

                        {boletoComNomePrevistas.slice(0, 5).map((cobranca) => (<div style={{ width: '100%' }}>
                            <div className='div-span-tabela-cobranca'>
                                <span style={{ width: '132px' }} className='span-tabela-cobranca'>{cobranca.nome} </span>
                                <span style={{ width: '120px' }} className='span-tabela-cobranca'>{cobranca.id}</span>
                                <span className='span-tabela-cobranca'>{`R$ ${cobranca.valor}`}</span>
                            </div>
                        </div>))
                        }

                        <div style={{ top: '620px' }} className='div-vertodos'>
                            <span onClick={() => functionVerTodosPrevistos()}>Ver todos</span>
                        </div>
                    </div>

                    <div className='cobranca-tabela-home'>
                        <div className='header-tabela-cobrança'>
                            <span className='header-cobranca-table-span'>Cobranças Pagas</span>
                            <div style={{ background: '#EEF6F6', color: '#1FA7AF' }} className='tabela-cobrança-numero'>{(cobrancasPagas.length < 10 ? `0${cobrancasPagas.length}` : cobrancasPagas.length)}</div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <div className='label-tabela-cobranca'>
                                <h3 className='h3-tabela-cobranca'>Cliente</h3>
                                <h3 className='h3-tabela-cobranca'>ID da cob.</h3>
                                <h3 className='h3-tabela-cobranca'>Valor</h3>
                            </div>
                        </div>

                        {boletoComNomePagas.slice(0, 5).map((cobranca) => (<div style={{ width: '100%' }}>
                            <div className='div-span-tabela-cobranca'>
                                <span style={{ width: '132px' }} className='span-tabela-cobranca'>{cobranca.nome} </span>
                                <span style={{ width: '120px' }} className='span-tabela-cobranca'>{cobranca.id}</span>
                                <span className='span-tabela-cobranca'>{`R$ ${cobranca.valor}`}</span>
                            </div>
                        </div>))
                        }


                        <div style={{ top: '620px' }} className='div-vertodos'>
                            <span onClick={() => functionVerTodosPagos()}>Ver todos</span>
                        </div>
                    </div>
                </div>

                <div className='container-tabela-clientes-main'>

                    <div className='div-tabela-cliente-main'>
                        <div className='header-tabela-cliente-main'>
                            <img style={{ marginLeft: '15px' }} alt='icone-inadimplente' src={inadimplenteicone}></img>
                            <span style={{ marginLeft: '15px' }} className='header-cobranca-table-span'>Clientes Inadimplentes</span>
                            <div style={{ background: '#FFEFEF', color: '#971D1D', marginLeft: '225px' }} className='tabela-cobrança-numero'>{(clientesInadimplentes.length < 10 ? `0${clientesInadimplentes.length}` : clientesInadimplentes.length)}</div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <div className='label-tabela-cliente-main'>
                                <h3 className='h3-tabela-cobranca'>Clientes</h3>
                                <h3 style={{ width: '100px' }} className='h3-tabela-cobranca'>ID do clie.</h3>
                                <h3 style={{ width: '50px' }} className='h3-tabela-cobranca'>CPF</h3>
                            </div>
                        </div>

                        {clientesInadimplentes && clientesInadimplentes.slice(0, 4).map((cliente) => (
                            <div key={cliente.id} style={{ width: '100%' }}>
                                <div className='div-span-tabela-clientes-main'>
                                    <span style={{ width: '220px' }} className='span-tabela-cobranca'>{cliente.nome} </span>
                                    <span style={{ width: '150px' }} className='span-tabela-cobranca'>{cliente.id}</span>
                                    <span style={{ width: '150px', display: 'flex', justifyContent: 'end' }} className='span-tabela-cobranca'>{`${cliente.cpf.slice(0, 3)}.${cliente.cpf.slice(3, 6)}.${cliente.cpf.slice(6, 9)}-${cliente.cpf.slice(9, 11)}`}</span>
                                </div>
                            </div>
                        ))}


                        <div style={{ top: '340px' }} className='div-vertodos'>
                            <span onClick={() => verTodosInadimplentes()}>Ver todos</span>
                        </div>

                    </div>

                    <div className='div-tabela-cliente-main'>
                        <div className='header-tabela-cliente-main'>
                            <img style={{ marginLeft: '15px', width: '25px' }} alt='icone-emdia' src={clienteemdiaicone}></img>
                            <span style={{ marginLeft: '15px' }} className='header-cobranca-table-span'>Clientes em dia</span>
                            <div style={{ background: '#EEF6F6', color: '#1FA7AF', marginLeft: '290px' }} className='tabela-cobrança-numero'>{(clientesEmDia.length < 10 ? `0${clientesEmDia.length}` : clientesEmDia.length)}</div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <div className='label-tabela-cliente-main'>
                                <h3 className='h3-tabela-cobranca'>Clientes</h3>
                                <h3 style={{ width: '100px' }} className='h3-tabela-cobranca'>ID do clie.</h3>
                                <h3 style={{ width: '50px' }} className='h3-tabela-cobranca'>CPF</h3>
                            </div>
                        </div>
                        {clientesEmDia && clientesEmDia.slice(0, 4).map((cliente) => (
                            <div key={cliente.id} style={{ width: '100%' }}>
                                <div className='div-span-tabela-clientes-main'>
                                    <span style={{ width: '220px' }} className='span-tabela-cobranca'>{cliente.nome} </span>
                                    <span style={{ width: '150px' }} className='span-tabela-cobranca'>{cliente.id}</span>
                                    <span style={{ width: '150px', display: 'flex', justifyContent: 'end' }} className='span-tabela-cobranca'>{`${cliente.cpf.slice(0, 3)}.${cliente.cpf.slice(3, 6)}.${cliente.cpf.slice(6, 9)}-${cliente.cpf.slice(9, 11)}`}</span>
                                </div>
                            </div>
                        ))}

                        <div style={{ top: '340px' }} className='div-vertodos'>
                            <span onClick={() => verTodosEmDia()}>Ver todos</span>
                        </div>

                    </div>

                </div>

            </div>



        </div>
    )
}


export default Main;