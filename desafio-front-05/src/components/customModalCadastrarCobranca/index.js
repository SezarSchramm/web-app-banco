import './styles.css'
import { useEffect, useState } from 'react';
import adicionarCobranca from '../../assets/adicionarcobranca.svg'
import useUser from '../../hooks/useUser';
import cancel from '../../assets/cancel.svg'
import api from '../../services/api';





function ModalCadastrarCobranca() {

    const { setAbrirModalCadastrarCobranca, setAbrirModalAzulCobranca } = useUser()

    const [erroNome, setErroNome] = useState('')
    const [erroDescricao, setErroDescricao] = useState('')
    const [erroData, setErroData] = useState('')
    const [erroValor, setErroValor] = useState('')
    const [erroStatus, setErroStatus] = useState('')


    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [data, setData] = useState('')
    const [valor, setValor] = useState('')
    const [status, setStatus] = useState('')


    useEffect(() => {
        dataCliente()
    }, [])

    // const dataAtual = new Date()

    async function dataCliente() {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('idCliente')

        try {
            const response = await api.get(`/cliente/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setNome(response.data.nome)

        } catch (error) {
            console.log(error.response)
        }

    }

    async function handleSubmit(event) {
        event.preventDefault()
        event.stopPropagation()

        const token = localStorage.getItem('token')
        const idCliente = localStorage.getItem('idCliente')

        setErroNome('')
        setErroDescricao('')
        setErroData('')
        setErroValor('')
        setErroStatus('')

        try {
            if (!nome) {
                setErroNome('Este campo deve ser preenchido')
            }
            if (!descricao) {
                setErroDescricao('Este campo deve ser preenchido')
            }
            if (!data) {
                setErroData('Este campo deve ser preenchido')
            }
            if (!valor) {
                setErroValor('Este campo deve ser preenchido')
            }
            if (!status) {
                setErroStatus('Este campo deve ser preenchido')
            }

            if (!nome || !descricao || !data || !valor || !status) {
                return
            }

            // if (dataAtual.toISOString() > data) {
            //     return setErroData('Data inválida')
            // }


            const response = await api.post(`/cobranca`, {
                nome,
                descricao,
                data_vencimento: data,
                valor,
                status,
                cliente_id: idCliente
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            setAbrirModalCadastrarCobranca(false)
            setAbrirModalAzulCobranca(true)

        } catch (error) {
            console.log(error.response)
        }

    }

    return (
        <>

            <div className="modal-criar-cobranca">
                <div className="modal-content-criar-cobranca">

                    <div className='div-header-modal-criar-cobranca'>
                        <img alt='icone-cobranca' src={adicionarCobranca}></img>
                        <h2>Cadastro de cobrança</h2>
                    </div>

                    <form className='form-modal-criar-cobrança'>
                        <div style={{ marginBottom: "16px" }}>
                            <label>Nome*</label>
                            <input className={!erroNome ? 'input-name-modal-criar-cobranca' : 'input-name-modal-criar-cobranca borda-red-erro'} type='text' placeholder='Digite o nome do cliente' value={nome} disabled></input>
                            {erroNome && <span className='erro-span-modal-criar-cobranca'>Este  campo deve ser preenchido</span>}
                        </div>
                        <div style={{ marginBottom: "16px" }}>
                            <label>Descrição*</label>
                            <textarea className={!erroDescricao ? 'input-descricao-modal-criar-cobranca' : 'input-descricao-modal-criar-cobranca borda-red-erro'} type='textarea' placeholder='Digite a descrição' value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                            {erroDescricao && <span className='erro-span-modal-criar-cobranca'>Este  campo deve ser preenchido</span>}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '24px', marginBottom: "16px" }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Vencimento*</label>
                                <input className={!erroData ? 'input-vencimento-modal-criar-cobranca' : 'input-vencimento-modal-criar-cobranca borda-red-erro'} type='date' placeholder='Data de vencimento' value={data} onChange={(e) => setData(e.target.value)}></input>
                                {erroData && <span className='erro-span-modal-criar-cobranca'>{erroData} </span>}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Valor*</label>
                                <input className={!erroValor ? 'input-valor-modal-criar-cobranca' : 'input-valor-modal-criar-cobranca borda-red-erro'} type='text' placeholder='Digite o valor' value={`${valor}`} onChange={(e) => setValor(e.target.value)}></input>
                                {erroValor && <span className='erro-span-modal-criar-cobranca'>Este  campo deve ser preenchido</span>}
                            </div>
                        </div>

                        <label style={{ marginBottom: '16px' }}>Status*</label>

                        <div className='div-input-radio-modal-criar-cobranca'>
                            <input type="radio" id="cobrancaPaga" name="input-radio" value='Paga' onChange={(e) => setStatus(e.target.value)} />
                            <label htmlFor="cobrancaPaga">Cobrança Paga</label>
                        </div>
                        <div style={{ marginTop: '8px' }} className='div-input-radio-modal-criar-cobranca'>
                            <input type="radio" id="CobrancaPendente" name="input-radio" value='Pendente' onChange={(e) => setStatus(e.target.value)} />
                            <label htmlFor="CobrancaPendente">Cobrança Pendente</label>
                        </div>
                        {erroStatus && <span className='erro-span-modal-criar-cobranca'>{erroStatus}</span>}
                        <div className='div-botoes-modal-criar-cobranca'>
                            <button onClick={() => setAbrirModalCadastrarCobranca(false)} type='button' className='button-cancelar-modal-criar-cobranca'>Cancelar</button>
                            <button onClick={handleSubmit} type='submit' className='button-aplicar-modal-criar-cobranca'>Aplicar</button>
                        </div>

                    </form>


                    <img onClick={() => setAbrirModalCadastrarCobranca(false)} className='x-modal-criar-cobranca' alt='x-icone' src={cancel}></img>
                </div>
            </div >


        </>
    )
}

export default ModalCadastrarCobranca;