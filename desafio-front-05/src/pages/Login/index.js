import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import unsplash from '../../assets/unsplash.svg';
import { useState } from 'react';
import api from '../../services/api'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const [formErrors, setFormErrors] = useState()

    async function handleSubmit(event) {
        event.preventDefault();

        try {

            if (!email || !senha) {
                return setFormErrors('Todos os campos são obrigatorios!')
            }

            const response = await api.post('/login', {
                email,
                senha
            })

            const { token } = response.data
            localStorage.setItem('token', token)

            navigate('/home')

        } catch (error) {
            setFormErrors(error.response.data)
        }
    }

    return (
        <>
            <div className='container-form-login'>
                <img src={unsplash} className='img-login' alt='unsplash'></img>
                <h1 className='texto-img-login'>
                    Gerencie todos os pagamentos da sua empresa em um só lugar.
                </h1>
                <form className='form-login' onSubmit={handleSubmit}>
                    <h2>Faça seu login!</h2>
                    <label className='msg-email-login'>
                        E-mail
                    </label>
                    <input
                        name='email'
                        type='email'
                        placeholder='Digite seu email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>
                    <div className='msg-senha-login'>
                        <label>
                            Senha
                        </label>
                        <Link className='link-esqueceu-senha'>Esqueceu sua senha?</Link>
                    </div>
                    <input
                        name='password'
                        type='password'
                        placeholder='Digite sua senha'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    >
                    </input>
                    {formErrors && <span className='error-msg-login'>{formErrors}</span>}
                    <button type='submit'>Entrar</button>
                    <span className='cadastro-msg'>Ainda não possui conta?
                        <Link to='/cadastro' className='link-cadastro'>Cadastre-se</Link>
                    </span>
                </form>
            </div >
        </>
    );
}

export default Login;
