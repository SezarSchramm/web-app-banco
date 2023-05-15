import './styles.css'
import VerticalLinearStepper from '../../components/customstepper';
import { useState } from 'react';
import sucess from '../../assets/sucess.svg'
import sucess2 from '../../assets/sucess2.png'
import openEye from '../../assets/openeye.svg'
import closeEye from '../../assets/closeeye.svg'
import { Link, useNavigate } from 'react-router-dom';

import api from '../../services/api'



function SingIn() {
    const [stepNumber, setStepNumber] = useState(0)

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha1, setSenha1] = useState('')
    const [senha2, setSenha2] = useState('')

    const [verSenha1, setVerSenha1] = useState(false)
    const [verSenha2, setVerSenha2] = useState(false)

    const [erro, setErro] = useState(false)
    const [erromensagem, setErroMensagem] = useState('')


    const navigate = useNavigate();

    const handleStepButton = (e) => {
        e.preventDefault()

        let padrao = /@.+/;

        let resultado = email.match(padrao);

        if (!nome || !email) {
            setErro(true)
            setErroMensagem('Todos os campos são obrigatórios!')
            return
        }

        if (!resultado) {
            setErro(true)
            setErroMensagem('E-mail inválido!')
            return
        }

        setErro(false)
        setStepNumber(stepNumber + 1)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {

            if (senha1 !== senha2) {
                setErro(true)
                setErroMensagem('As senhas não coincidem!')
                return
            }

            const response = await api.post('/usuario', {
                nome,
                email,
                senha: senha1
            })

            setStepNumber(stepNumber + 1)


        } catch (error) {
            setErro(true)
            setErroMensagem(error.response.data)

        }

    }

    return (
        <div className="container-singin">
            <div className="container-singin-left">
                <div className='margin-top174px'>
                    <VerticalLinearStepper stepNumber={stepNumber} />
                </div>

            </div>
            <div className="container-singin-right">
                <div className={stepNumber !== 2 ? 'container-div-form' : 'container-div-form-sucess'} >

                    <form className='form-singin'>
                        {stepNumber === 0 &&
                            <>
                                <h2 className='h2-form-singing'>Adicione seus dados</h2>
                                <label>Nome*</label>
                                <input type='text' placeholder='Digite seu nome' value={nome} onChange={(e) => { setNome(e.target.value) }}></input>
                                <label>E-mail*</label>
                                <input type="email" placeholder='Digite seu e-mail' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                                {erro && <p className='p-erro-singin'>{erromensagem}</p>}
                                <button onClick={handleStepButton} type='button'>Continuar</button>
                                <span>Já possui uma conta? Faça seu <Link style={{ color: '#DA0175', fontWeight: '600', marginLeft: '6px' }} to={'/'}> Login.</Link></span>
                            </>
                        }
                        {stepNumber === 1 &&
                            <>
                                <h2 className='h2-form-singing'>Adicione seus dados</h2>
                                <label>Senha*</label>
                                <input style={{ width: '344px' }} type={verSenha1 ? 'text' : 'password'} placeholder='••••••••' value={senha1} onChange={(e) => { setSenha1(e.target.value) }}></input>
                                <label>Repita a senha*</label>
                                <input style={{ width: '344px' }} type={verSenha2 ? 'text' : 'password'} placeholder='••••••••' value={senha2} onChange={(e) => { setSenha2(e.target.value) }}></input>
                                {erro && <p className='p-erro-singin'>{erromensagem} </p>}
                                <button onClick={handleSubmit} type='submit'>Finalizar cadastro</button>
                                <span>Já possui uma conta? Faça seu <Link style={{ color: '#DA0175', fontWeight: 'bold', marginLeft: '7px' }} to={'/'}>Login</Link></span>
                                <img className={!erro ? 'olho-senha1-singin' : 'olho-senha1-singin-erro'} src={verSenha1 ? openEye : closeEye} alt='icon-senha' onClick={() => { setVerSenha1(!verSenha1) }} />
                                <img className={!erro ? 'olho-senha2-singin' : 'olho-senha2-singin-erro'} src={verSenha2 ? openEye : closeEye} alt='icon-senha' onClick={() => { setVerSenha2(!verSenha2) }} />

                            </>
                        }
                        {stepNumber === 2 &&
                            <>
                                <div className='container-div-cadastro-sucesso' >
                                    <img src={sucess} alt='sucesso'></img>
                                    <span>Cadastro realizado com sucesso!</span>
                                    <img className='icone-sucesso-absolut' src={sucess2} alt='sucesso2'></img>

                                </div>
                                <button onClick={() => navigate('/')}>Ir para Login</button>
                            </>
                        }
                    </form>
                </div>

                <div className='container-div-stepper'>
                    <div className={stepNumber === 0 ? 'stepper-div-green' : 'stepper-div'}></div>
                    <div className={stepNumber === 1 ? 'stepper-div-green' : 'stepper-div'}></div>
                    <div className={stepNumber === 2 ? 'stepper-div-green' : 'stepper-div'}></div>
                </div>

            </div>
        </div >
    )
}


export default SingIn