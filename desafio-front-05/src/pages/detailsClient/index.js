import NavBar from '../../components/navbar'
import './styles.css'
import clienteicone from '../../assets/clienteicon.svg'
import lapisicone from '../../assets/lapisicone.svg'
import setabaixocima from '../../assets/setabaixocima.svg'
import lapisEditar from '../../assets/lapiseditar.svg'
import iconeExcluir from '../../assets/iconeexcluir.svg'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Perfil from '../../components/customPerfil'
import useUser from '../../hooks/useUser';
import ModalEditarUsuario from '../../components/customModalEditarPerfil';
import ModalCadastrarCobranca from '../../components/customModalCadastrarCobranca'
import ModalAzul from '../../components/customModalAzulSucesso';
import ModalEditarCliente from '../../components/customModalEditarCliente'
import ModalEditarCobranca from '../../components/customModalEditarCobranca'
import ModalExcluirCobranca from '../../components/customModalExcluirCobranca'
import xvermelho from '../../assets/xvermelho.svg'
import circulovermelhox from '../../assets/circulovermelhox.svg'
import ModalDetalheCobranca from '../../components/customModalDetalheCobranca'



function DetalheCliente() {
    const { openModalEditarUsuario, abrirModalCadastrarCobranca, setAbrirModalCadastrarCobranca, abrirModalAzulCobranca,
        abrirAzulCobranca, setAbrirAzulCobranca, abrirModalEditarCliente, setAbrirModalEditarCliente, abrirModalAzulEditarCliente,
        abrirAzulEditarCliente, setAbrirAzulEditarCliente,
        abrirModalEditarCobranca, setAbrirModalEditarCobranca,
        abrirModalAzulEditarCobranca,
        abrirAzulCobrancaCliente, setAbrirAzulCobrancaCliente, abrirModalExcluirCobranca, setAbrirModalExcluirCobranca,
        abrirModalAzulExcluirCobranca, abrirAzulExcluirCliente, setAbrirAzulExcluirCliente, abrirModalVermelhoExcluirCobranca,
        abrirVermelhoExcluirCliente, setAbrirVermelhoExcluirCliente, setAbrirModalVermelhoExcluirCobranca, abrirModalDetalharCobranca,
        setAbrirModalDetalharCobranca } = useUser()

    const [cliente, setCliente] = useState()
    const [cobranca, setCobranca] = useState([])


    useEffect(() => {
        dataCliente()
        dataCobranca()
    }, [])

    useEffect(() => {
        dataCobranca()
    }, [abrirAzulCobrancaCliente, abrirAzulExcluirCliente])

    useEffect(() => {
        dataCliente()
    }, [abrirAzulEditarCliente])

    setTimeout(() => {
        if (abrirModalAzulCobranca) {
            setAbrirAzulCobranca(true)
        }
        if (abrirModalAzulEditarCliente) {
            setAbrirAzulEditarCliente(true)
        }
        if (abrirModalAzulEditarCobranca) {
            setAbrirAzulCobrancaCliente(true)
        }
        if (abrirModalAzulExcluirCobranca) {
            setAbrirAzulExcluirCliente(true)
        }
        if (abrirModalVermelhoExcluirCobranca) {
            setAbrirVermelhoExcluirCliente(true)
        }

    }, 1000);


    async function dataCliente() {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('idCliente')

        try {
            const response = await api.get(`/cliente/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCliente(response.data)

        } catch (error) {

        }

    }


    async function dataCobranca() {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('idCliente')

        try {
            const response = await api.get(`/cobranca/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCobranca(response.data)


        } catch (error) {
            console.log(error.response)
        }
    }


    function handleAbrirModalEditarCobranca({ item }) {
        localStorage.setItem('idCobranca', item.id)
        setAbrirModalEditarCobranca(true)
    }

    function handleAbrirModalExcluirCobranca({ item }) {
        localStorage.setItem('idCobranca', item.id)
        setAbrirModalExcluirCobranca(true)
    }

    function fecharModalVermelho() {
        setAbrirModalVermelhoExcluirCobranca(false)
        setAbrirVermelhoExcluirCliente(false)
    }

    function handleAbrirModalDetalheCobranca({ item }) {
        setAbrirModalDetalharCobranca(true)
        localStorage.setItem('idCobranca', item.id)
    }

    return (
        <div className='container-detalhar-cliente'>

            {openModalEditarUsuario && <ModalEditarUsuario />}
            {abrirModalCadastrarCobranca && <ModalCadastrarCobranca />}
            {abrirModalEditarCliente && <ModalEditarCliente />}
            {abrirModalEditarCobranca && <ModalEditarCobranca />}
            {abrirModalExcluirCobranca && <ModalExcluirCobranca />}
            {abrirModalDetalharCobranca && <ModalDetalheCobranca />}

            <NavBar page={2} />

            <div>

                <header className='header-clientes'>
                    <span className='span-cliente'>Clientes <span style={{ color: '#747488', marginLeft: '25px', marginRight: '25px' }}>{'>'}</span> <span style={{ color: '#747488' }}>Detalhes do cliente</span> </span>
                    <Perfil />
                </header>

                <div className='container-div-detalhe-cliente-tabela'>

                    <div className='div-cliente-nome'>
                        <img alt='icone-cliente' src={clienteicone}></img>
                        <h1>{cliente?.nome}</h1>
                    </div>

                    <div className='tabela-detalhe-cliente'>

                        <div className='tabela-detalhe-cliente-header'>
                            <h4>Dados do cliente</h4>
                            <button onClick={() => setAbrirModalEditarCliente(true)}><img alt='lapis-editar' src={lapisicone}></img>Editar Cliente</button>
                        </div>

                        <div className='div-grande-dados-cliente'>
                            <div style={{ width: '260px' }} className='divs-pequenas-dados-cliente'>
                                <h5>E-mail</h5>
                                <span>{cliente?.email}</span>
                            </div>
                            <div style={{ width: '180px' }} className='divs-pequenas-dados-cliente'>
                                <h5>Telefone</h5>
                                <span>{cliente?.telefone}</span>
                            </div>
                            <div className='divs-pequenas-dados-cliente'>
                                <h5>CPF</h5>
                                <span>{cliente?.cpf}</span>
                            </div>
                        </div>

                        <div style={{ width: '100%', marginBottom: '0px' }} className='div-grande-dados-cliente'>
                            <div style={{ width: '260px' }} className='divs-pequenas-dados-cliente'>
                                <h5>Endereço</h5>
                                <span>{cliente?.logradouro}</span>
                            </div>
                            <div style={{ width: '180px' }} className='divs-pequenas-dados-cliente'>
                                <h5>Bairro</h5>
                                <span>{cliente?.bairro}</span>
                            </div>
                            <div style={{ width: '250px' }} className='divs-pequenas-dados-cliente'>
                                <h5>Complemento</h5>
                                <span>{cliente?.complemento}</span>
                            </div>
                            <div style={{ width: '150px' }} className='divs-pequenas-dados-cliente'>
                                <h5>CEP</h5>
                                <span>{cliente?.cep}</span>
                            </div>
                            <div style={{ width: '170px' }} className='divs-pequenas-dados-cliente'>
                                <h5>Cidade</h5>
                                <span>{cliente?.cidade}</span>
                            </div>
                            <div className='divs-pequenas-dados-cliente'>
                                <h5>UF</h5>
                                <span>{cliente?.estado}</span>
                            </div>
                        </div>

                    </div>

                    <div className='container-cobrando-do-cliente'>

                        <div className='container-cobrando-do-cliente-header'>
                            <h4>Cobranças do Cliente</h4>
                            <button type='button' onClick={() => setAbrirModalCadastrarCobranca(true)}>+ Nova cobrança</button>
                        </div>

                        <div className='labels-cobrando-do-cliente'>
                            <div>
                                <img style={{ marginRight: '7px' }} alt='cimaBaixo' src={setabaixocima}></img>
                                <h5>ID Cob.</h5>
                            </div>
                            <div>
                                <img style={{ marginRight: '7px' }} alt='cimaBaixo' src={setabaixocima}></img>
                                <h5>Data de Venc.</h5>
                            </div>
                            <div style={{ marginLeft: '20px' }}>
                                <h5>Valor</h5>
                            </div>
                            <div>
                                <h5>Status</h5>
                            </div>
                            <div>
                                <h5>Descrição</h5>
                            </div>
                        </div>

                        {cobranca.map((item) => (
                            <div key={item.id} className='div-span-tabela-cobranca-cliente'>
                                <span style={{ width: '130px', cursor: 'pointer' }} onClick={() => handleAbrirModalDetalheCobranca({ item })}>{item.id}</span>
                                <span style={{ width: '150px' }}>{`${item.data_vencimento.substr(8, 2)}/${item.data_vencimento.substr(5, 2)}/${item.data_vencimento.substr(0, 4)} `}</span>
                                <span style={{ width: '125px' }}>{`R$ ${item.valor}`}</span>
                                <div style={{ width: '135px' }}>
                                    <div className={item.status === 'Paga' ? 'tabela-cobranca-cliente-paga' : item.status === 'Pendente' ? 'tabela-cobranca-cliente-pendente' : 'tabela-cobranca-cliente-vencida'}>{item.status}</div>
                                </div>
                                <span style={{ width: '330px' }}>{item.descricao}</span>
                                <img onClick={() => handleAbrirModalEditarCobranca({ item })} style={{ cursor: 'pointer' }} alt='icone-editar' src={lapisEditar}></img>
                                <img onClick={() => handleAbrirModalExcluirCobranca({ item })} style={{ cursor: 'pointer' }} alt='icone-deletar' src={iconeExcluir}></img>
                            </div>
                        ))}

                        {abrirAzulCobranca && <ModalAzul width={'330px'} text={'Cobrança cadastrada com sucesso'} top={'750px'} left={'970px'} />}
                        {abrirAzulEditarCliente && <ModalAzul width={'430px'} text={'Edições do cadastro concluídas com sucesso'} top={'750px'} left={'880px'} />}
                        {abrirAzulCobrancaCliente && <ModalAzul width={'354px'} text={'Cobrança editada com sucesso!'} top={'750px'} left={'880px'} />}
                        {abrirAzulExcluirCliente && <ModalAzul width={'354px'} text={'Cobrança excluída com sucesso!'} top={'750px'} left={'880px'} />}
                        {abrirVermelhoExcluirCliente &&
                            <div className='div-modal-vermelho'>
                                <img alt='erro-icone' src={circulovermelhox}></img>
                                <span>Esta cobrança não pode ser excluída!</span>
                                <img onClick={() => fecharModalVermelho()} style={{ cursor: 'pointer' }} alt='' src={xvermelho}></img>
                            </div>
                        }
                    </div>


                </div>
            </div>

        </div>
    )
}


export default DetalheCliente;