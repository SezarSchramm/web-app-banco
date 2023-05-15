import { useEffect, useState } from 'react';
import './styles.css'
import x from '../../assets/cancel.svg'
import api from '../../services/api'
import iconeConcluido from '../../assets/iconeconcluido.svg'
import useUser from '../../hooks/useUser';


function ModalEditarUsuario() {

    const [erroNome, setErroNome] = useState('')
    const [erroEmail, setErroEmail] = useState('')
    const [erroSenha1, setErroSenha1] = useState('')
    const [erroSenha2, setErroSenha2] = useState('')
    const [id, setIdUsuario] = useState("")
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [telefone, setTelefone] = useState("")
    const [senha1, setSenha1] = useState("")
    const [senha2, setSenha2] = useState("")

    const [step, setStep] = useState(0)

    const { setOpenModalEditarUsuario } = useUser()

    useEffect(() => {
        dataUsuario()

    }, [])


    async function editarUsuario() {

        const token = localStorage.getItem('token')

        setErroNome('')
        setErroEmail('')
        setErroSenha1('')
        setErroSenha2('')
        try {

            if (!nome) {
                setErroNome('Este campo deve ser preenchido')
            }
            if (!email) {
                setErroEmail('Este campo deve ser preenchido')
            }
            if (!senha1) {
                setErroSenha1('Este campo deve ser preenchido')
            }
            if (!senha2) {
                setErroSenha2('Este campo deve ser preenchido')
            }

            if (senha1 !== senha2) {
                return setErroSenha2('As senhas não coincidem')
            }

            if (!nome || !email || !senha1 || !senha2) {
                return
            }


            const response = await api.put(`/usuario/${id}`, {
                nome,
                email,
                senha: senha1,
                cpf,
                telefone
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setStep(1)

        } catch (error) {
            setErroEmail('E-mail já cadastrado')
            console.log(error.response)
        }

    }

    async function dataUsuario() {
        const token = localStorage.getItem('token')

        try {

            const response = await api.get('/usuario', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setIdUsuario(response.data.id)
            setNome(response.data.nome)
            setEmail(response.data.email)
            setCpf(response.data.cpf)
            setTelefone(response.data.telefone)

        } catch (error) {


        }
    }


    return (

        <div className="modal">
            <div className={step === 0 ? "modal-content-step-0" : 'modal-content-step-1'}>

                {step === 0 &&
                    <>
                        <span className='span-h1-modal-editar-usuario'>Edite seu cadastro</span>
                        <img className='x-modal-editar-usuario' alt='icone-x' src={x} onClick={() => setOpenModalEditarUsuario(false)}></img>

                        <form className='form-modal-editar-usuario'>
                            <div className={!erroNome ? 'div-form-label-input' : 'div-form-label-input-erro'}>
                                <label>Nome*</label>
                                <input className={!erroNome ? 'input-grande-editar-usuario' : 'input-grande-editar-usuario border-red-error '} type='text' placeholder='Digite seu nome' value={nome} onChange={(e) => setNome(e.target.value)}></input>
                                {erroNome && <span >{erroNome}</span>}
                            </div>
                            <div className={!erroEmail ? 'div-form-label-input' : 'div-form-label-input-erro'}>
                                <label >E-mail*</label>
                                <input className={!erroEmail ? 'input-grande-editar-usuario' : 'input-grande-editar-usuario border-red-error '} type='email' placeholder='Digite seu e-mail' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                {erroEmail && <span style={{ marginBottom: '20px' }}>{erroEmail}</span>}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label >CPF</label>
                                    <input style={{ marginBottom: '20px' }} className='input-pequeno-editar-usuario' type='email' placeholder='Digite seu CPF' value={cpf} onChange={(e) => setCpf(e.target.value)}></input>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label >Telefone</label>
                                    <input style={{ marginBottom: '20px' }} className='input-pequeno-editar-usuario' type='email' placeholder='Digite seu telefone' value={telefone} onChange={(e) => setTelefone(e.target.value)}></input>
                                </div>
                            </div>
                            <div className={!erroSenha1 ? 'div-form-label-input' : 'div-form-label-input-erro'}>
                                <label >Nova Senha*</label>
                                <input className={!erroSenha1 ? 'input-grande-editar-usuario' : 'input-grande-editar-usuario border-red-error '} type='password' placeholder='••••••••' value={senha1} onChange={(e) => setSenha1(e.target.value)} ></input>
                                {erroSenha1 && <span style={{ marginBottom: '20px' }}>{erroSenha1}</span>}
                            </div>
                            <div className={!erroSenha2 ? 'div-form-label-input' : 'div-form-label-input-erro'}>
                                <label >Confirmar Senha*</label>
                                <input className={!erroSenha2 ? 'input-grande-editar-usuario' : 'input-grande-editar-usuario border-red-error '} type='password' placeholder='••••••••' value={senha2} onChange={(e) => setSenha2(e.target.value)} ></input>
                                {erroSenha2 && <span style={{ marginBottom: '20px' }}>{erroSenha2}</span>}
                            </div>
                            <button onClick={editarUsuario} type='button' style={{ marginTop: '30px' }}>Aplicar</button>

                        </form>
                    </>}

                {step === 1 &&
                    <div className='div-editar-usuario-step-1' onClick={() => setOpenModalEditarUsuario(false)} >
                        <img alt='icone-concluido' src={iconeConcluido}></img>
                        <span className='modal-editar-usuario-span-concluido'>Cadastro Alterado com sucesso!</span>
                    </div>
                }

            </div>
        </div>

    )
}

export default ModalEditarUsuario;