
import './styles.css'
import editar from '../../assets/lapiseditar.svg'
import sair from '../../assets/iconesair.svg'
import trianguloModal from '../../assets/triangulomodal.svg'
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';



function ModalPequeno() {

    const { setOpenModalEditarUsuario } = useUser()

    const navigate = useNavigate()


    function deslogar() {
        localStorage.clear()
        navigate('/')
    }

    return (

        <div className='div-modal-pequeno'>
            <img className='setinha-modal' alt='setinha' src={trianguloModal} />
            <div className='modal-perfil'>
                <img className='icones-modal-perfil' alt='icone-editar' src={editar} onClick={() => setOpenModalEditarUsuario(true)}></img>
                <img className='icones-modal-perfil' alt=' icone-sair' src={sair} onClick={deslogar}></img>
            </div>
        </div >

    )
}

export default ModalPequeno;