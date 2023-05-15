import './styles.css'
import cancel from '../../assets/cancel.svg'
import cobrancaiconesmall from '../../assets/cobrancaiconesmall.svg'
import useUser from '../../hooks/useUser'
import { useEffect, useState } from 'react'
import api from '../../services/api'





function ModalDetalheCobranca() {

    const { setAbrirModalDetalharCobranca } = useUser()

    const [cobranca, setCobranca] = useState()
    const [cliente, setCliente] = useState()


    useEffect(() => {
        cobrancaDados()
        dataCliente()
    }, [])

    async function cobrancaDados() {
        const token = localStorage.getItem('token')
        const idCobranca = localStorage.getItem('idCobranca')

        try {

            const response = await api.get(`/cobranca/id/${idCobranca}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setCobranca(response.data)

        } catch (error) {
            console.log(error.response)
        }
    }

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
            console.log(error.response)
        }
    }

    return (
        <div className="modal">
            <div className='modal-detalhe-cobranca-conteudo'>

                <header className='header-modal-detalhe-cobranca'>
                    <img alt='' src={cobrancaiconesmall}></img>
                    <h2>Detalhe da Cobrança</h2>
                </header>

                <div className='div-second-modal-detalhe-cobranca'>
                    <label>Nome</label>
                    <span>{cliente?.nome}</span>
                    <label style={{ marginBottom: '4px' }}>Descrição</label>
                    <span style={{ width: '489px', height: '63px' }}>{cobranca?.descricao}</span>

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '146px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Vencimento</label>
                            <span>{`${cobranca?.data_vencimento.substr(8, 2)}/${cobranca?.data_vencimento.substr(5, 2)}/${cobranca?.data_vencimento.substr(0, 4)} `}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Valor</label>
                            <span>{`R$ ${cobranca?.valor}`}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '135px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ width: ' 96px' }}>ID cobranças</label>
                            <span>{cobranca?.id}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label>Status</label>
                            <div className={cobranca?.status === 'Paga' ? 'status-cliente-pago' : cobranca?.status === 'Vencido' ? 'status-cliente-vencida' : 'status-cliente-pendente'}>
                                {cobranca?.status}
                            </div>
                        </div>
                    </div>

                </div>

                <img className='fechar-modal-cadastrar-cliente' alt='fechar-x' src={cancel} onClick={() => setAbrirModalDetalharCobranca(false)} ></img>

            </div>
        </div>
    )
}

export default ModalDetalheCobranca;