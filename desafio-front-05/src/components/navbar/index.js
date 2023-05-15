import './styles.css'
import homeIcone from '../../assets/homenavbar.svg'
import homePink from '../../assets/homepink.svg'

import clienteIcone from '../../assets/clientenavbar.svg'
import clientePink from '../../assets/clientepink.svg'

import cobrancaIcone from '../../assets/cobrancanavbar.svg'
import cobrancaRosa from '../../assets/cobrancarosa.svg'

import { Link, useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'


function NavBar({ page }) {

    const { setVerTodosClienteInadimplentes, setVerTodosClienteEmDia,
        setVerTodasCobrancasVencidas, setVerTodasCobrancasPagas, setVerTodasCobrancasPrevistas } = useUser()

    const navigate = useNavigate()

    function irClientes() {
        setVerTodosClienteInadimplentes(false)
        setVerTodosClienteEmDia(false)
        navigate('/clientes')
    }

    function irCobrancas() {
        setVerTodasCobrancasVencidas(false)
        setVerTodasCobrancasPagas(false)
        setVerTodasCobrancasPrevistas(false)
        navigate('/cobrancas')
    }

    return (
        <>
            {page === 1 && <div className='barra-lateral'>
                <div onClick={() => navigate('/home')} className='div-barra-lateral-icones'>
                    <div></div>
                    <img alt='icone-home' src={homePink}></img>
                    <div className={page === 1 && 'pink'}></div>
                </div>
                <div onClick={() => irClientes()} className='div-barra-lateral-icones'>
                    <div></div>
                    <img alt='icone-cliente' src={clienteIcone}></img>
                    <div></div>
                </div>
                <div onClick={() => irCobrancas()} className='div-barra-lateral-icones'>
                    <div></div>
                    <img alt='icone-cliente' src={cobrancaIcone}></img>
                    <div></div>
                </div>
            </div>}
            {page === 2 && <div className='barra-lateral'>

                <div onClick={() => navigate('/home')} className='div-barra-lateral-icones'>
                    <div></div>
                    <img alt='icone-home' src={homeIcone}></img>
                    <div ></div>
                </div>


                <div onClick={() => irClientes()} className='div-barra-lateral-icones'>
                    <div></div>
                    <img alt='icone-cliente' src={clientePink}></img>
                    <div className={page === 2 && 'pink'}></div>
                </div>


                <div onClick={() => irCobrancas()} className='div-barra-lateral-icones'>
                    <div></div>
                    <img alt='icone-cliente' src={cobrancaIcone}></img>
                    <div></div>
                </div>

            </div>}
            {page === 3 && <div className='barra-lateral'>
                <div onClick={() => navigate('/home')} className='div-barra-lateral-icones'>
                    <div></div>
                    <img alt='icone-home' src={homeIcone}></img>
                    <div></div>
                </div>
                <div onClick={() => irClientes()} className='div-barra-lateral-icones'>
                    <div></div>
                    <img alt='icone-cliente' src={clienteIcone}></img>
                    <div></div>
                </div>
                <div onClick={() => irCobrancas()} className='div-barra-lateral-icones'>
                    <div></div>
                    <img alt='icone-cliente' src={cobrancaRosa}></img>
                    <div className={page === 3 && 'pink'}></div>
                </div>
            </div>}
        </>

    )
}



export default NavBar