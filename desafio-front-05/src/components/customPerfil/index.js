import './styles.css'
import setaBaixo from '../../assets/setabaixo.svg'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import ModalPequeno from '../customModalPerfil';
import useUser from '../../hooks/useUser';


function Perfil({ setOpenModalEditarUsuario }) {

    const [usuario, setUsuario] = useState()
    const [openModalPequeno, setOpenModalPequeno] = useState(false)
    const { openModalEditarUsuario } = useUser()


    useEffect(() => {
        dataUsuario()

    }, [])

    useEffect(() => {
        dataUsuario()
    }, [openModalEditarUsuario])

    async function dataUsuario() {
        const token = localStorage.getItem('token')

        try {

            const response = await api.get('/usuario', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setUsuario(response.data)
        } catch (error) {


        }
    }


    return (
        <div style={{ position: 'relative' }} className='div-cliente-perfil'>
            <div className='div-perfil'>{usuario?.nome && `${usuario.nome[0].toUpperCase()}${usuario.nome[2].toUpperCase()}`}</div>
            <span className='span-profile'>{usuario?.nome && `${usuario.nome}`}</span>
            <img style={{ cursor: 'pointer' }} alt='seta-baixo' src={setaBaixo} onClick={() => setOpenModalPequeno(!openModalPequeno)}></img>

            {openModalPequeno && <ModalPequeno setOpenModalEditarUsuario={setOpenModalEditarUsuario} />}

        </div>
    )
}

export default Perfil