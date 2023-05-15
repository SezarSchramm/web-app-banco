import './styles.css'
import clienteIcone from '../../assets/clienteicon.svg'
import cancel from '../../assets/cancel.svg'
import { useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import api from '../../services/api';

function ModalEditarCliente() {

    const { setAbrirModalAzulEditarCliente, setAbrirModalEditarCliente } = useUser()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [endereco, setEndereco] = useState('')
    const [complemento, setComplemento] = useState('')
    const [cep, setCep] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')

    const [erroNome, setErroNome] = useState('')
    const [erroEmail, setErroEmail] = useState('')
    const [erroCpf, setErroCpf] = useState('')
    const [erroTelefone, setErroTelefone] = useState('')
    const [erroCep, setErroCep] = useState('')

    useEffect(() => {
        dataCliente()
    }, [])


    async function consultarCep() {
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    throw new setErroCep('CEP não encontrado');
                }
                setErroCep('');
                setUf(data.uf)
                setCidade(data.localidade)
                setEndereco(data.logradouro)
                setBairro(data.bairro)
                return data;
            });
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
            setBairro(response.data.bairro)
            setCep(response.data.cep)
            setCidade(response.data.cidade)
            setComplemento(response.data.complemento)
            setCpf(response.data.cpf)
            setEmail(response.data.email)
            setUf(response.data.estado)
            setEndereco(response.data.logradouro)
            setNome(response.data.nome)
            setTelefone(response.data.telefone)


        } catch (error) {
            console.log(error.response)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const token = localStorage.getItem('token')
        const idCliente = localStorage.getItem('idCliente')

        let padrao = /@.+/;

        let resultado = email.match(padrao);

        setErroNome('')
        setErroEmail('')
        setErroCpf('')
        setErroTelefone('')

        try {


            if (!nome) {
                setErroNome('Este campo deve ser preenchido')
            }
            if (!email) {
                setErroEmail('Este campo deve ser preenchido')
            }
            if (!cpf) {
                setErroCpf('Este campo deve ser preenchido')
            }
            if (!telefone) {
                setErroTelefone('Este campo deve ser preenchido')
            }

            if (!nome || !email || !cpf || !telefone) {
                return
            }

            if (cpf.length !== 11) {
                return setErroCpf('CPF inválido')
            }

            if (!resultado) {
                setErroEmail('Email inválido')
                return
            }

            const response = await api.put(`/cliente/${idCliente}`, {
                nome,
                email,
                cpf,
                telefone,
                cep,
                logradouro: endereco,
                complemento,
                bairro,
                cidade,
                estado: uf,
                id: idCliente
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setAbrirModalAzulEditarCliente(true)
            setAbrirModalEditarCliente(false)

        } catch (error) {
            if (error.response.data === 'O email já existe') {
                setErroEmail(error.response.data)
            }
            if (error.response.data === 'O cpf já existe') {
                setErroCpf(error.response.data)
            }
            if (error.response.data === "update \"clientes\" set \"nome\" = $1, \"email\" = $2, \"cpf\" = $3, \"telefone\" = $4, \"cep\" = $5, \"logradouro\" = $6, \"complemento\" = $7, \"bairro\" = $8, \"cidade\" = $9, \"estado\" = $10 where \"id\" = $11 - duplicate key value violates unique constraint \"clientes_email_key\"") {
                setErroEmail('O email já existe')
            }
            if (error.response.data === "update \"clientes\" set \"nome\" = $1, \"email\" = $2, \"cpf\" = $3, \"telefone\" = $4, \"cep\" = $5, \"logradouro\" = $6, \"complemento\" = $7, \"bairro\" = $8, \"cidade\" = $9, \"estado\" = $10 where \"id\" = $11 - duplicate key value violates unique constraint \"clientes_cpf_key\"") {
                setErroCpf('O cpf já existe')
            }
            console.log(error.response)
        }

    }


    return (

        <div className="modal">
            <div className='modal-cadastro-cliente-conteudo'>

                <header className='header-modal-cadastrar-cliente'>
                    <img alt='icone-cliente' src={clienteIcone}></img>
                    <h2>Editar Cliente</h2>
                </header>

                <form className='form-modal-cadastar-cliente'>
                    <div className='div-input-modal-cadastrar-cliente'>
                        <label>Nome*</label>
                        <input className={!erroNome ? 'input-grande-modal-cadastrar-cliente' : 'input-grande-modal-cadastrar-cliente borda-vermelha-erro-modal-cadastrar-cliente'} type='text' placeholder='Digite o nome' value={nome} onChange={(e) => setNome(e.target.value)}></input>
                        {erroNome && <span>{erroNome}</span>}
                    </div>
                    <div className='div-input-modal-cadastrar-cliente'>
                        <label>E-mail*</label>
                        <input className={!erroEmail ? 'input-grande-modal-cadastrar-cliente' : 'input-grande-modal-cadastrar-cliente borda-vermelha-erro-modal-cadastrar-cliente'} type='email' placeholder='Digite o e-mail' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        {erroEmail && <span>{erroEmail}</span>}
                    </div>
                    <div className='div-form-lado-a-lado'>
                        <div className='div-input-modal-cadastrar-cliente'>
                            <label>CPF*</label>
                            <input className={!erroCpf ? 'input-metade-modal-cadastrar-cliente' : 'input-metade-modal-cadastrar-cliente borda-vermelha-erro-modal-cadastrar-cliente'} type='text' placeholder='Digite o CPF' value={cpf} onChange={(e) => setCpf(e.target.value)} maxLength="11"></input>
                            {erroCpf && <span>{erroCpf}</span>}
                        </div>
                        <div className='div-input-modal-cadastrar-cliente' >
                            <label>Telefone*</label>
                            <input className={!erroTelefone ? 'input-metade-modal-cadastrar-cliente' : 'input-metade-modal-cadastrar-cliente borda-vermelha-erro-modal-cadastrar-cliente'} type='tel' placeholder='Digite o telefone' value={telefone} onChange={(e) => setTelefone(e.target.value)}></input>
                            {erroTelefone && <span>{erroTelefone}</span>}
                        </div>
                    </div>
                    <div className='div-form-lado-a-lado'>
                        <div className='div-input-modal-cadastrar-cliente'>
                            <label>CEP</label>
                            <input onBlur={consultarCep} className='input-metade-modal-cadastrar-cliente' type='text' placeholder='Digite o CEP' value={cep} onChange={(e) => setCep(e.target.value)} maxLength="8"></input>
                            {erroCep && <span>{erroCep}</span>}
                        </div>
                        <div className='div-input-modal-cadastrar-cliente' >
                            <label>Bairro</label>
                            <input className='input-metade-modal-cadastrar-cliente' type='text' placeholder='Digite o bairro' value={bairro} onChange={(e) => setBairro(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='div-input-modal-cadastrar-cliente'>
                        <label>Endereço</label>
                        <input className='input-grande-modal-cadastrar-cliente' type='text' placeholder='Digite o endereço' value={endereco} onChange={(e) => setEndereco(e.target.value)}></input>
                    </div>
                    <div className='div-input-modal-cadastrar-cliente'>
                        <label>Complemento</label>
                        <input className='input-grande-modal-cadastrar-cliente' type='text' placeholder='Digite o complemento' value={complemento} onChange={(e) => setComplemento(e.target.value)}></input>
                    </div>

                    <div className='div-form-lado-a-lado'>
                        <div className='div-input-modal-cadastrar-cliente'>
                            <label>Cidade</label>
                            <input className='input-cidade-modal-cadastrar-cliente' type='text' placeholder='Digite a cidade' value={cidade} onChange={(e) => setCidade(e.target.value)}></input>
                        </div>
                        <div className='div-input-modal-cadastrar-cliente' >
                            <label>UF</label>
                            <input className='input-uf-modal-cadastrar-cliente' type='text' placeholder='Digite a UF' value={uf} onChange={(e) => setUf(e.target.value)} maxLength={2}></input>
                        </div>
                    </div>
                    <div className='div-form-lado-a-lado'>
                        <button className='botao-cancelar-modal-cadastrar-cliente' type='button' onClick={() => setAbrirModalEditarCliente(false)}>Cancelar</button>
                        <button className='botao-aplicar-modal-cadastrar-cliente' type='button' onClick={handleSubmit}>Aplicar</button>
                    </div>
                </form>

                <img className='fechar-modal-cadastrar-cliente' alt='fechar-x' src={cancel} onClick={() => setAbrirModalEditarCliente(false)}></img>

            </div>
        </div>

    )
}

export default ModalEditarCliente;