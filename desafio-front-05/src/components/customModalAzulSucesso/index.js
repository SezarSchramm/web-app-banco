import './styles.css'
import sucessoModalAzul from '../../assets/sucessoModalAzul.svg'
import xModalAzul from '../../assets/xModalAzul.svg'
import useUser from '../../hooks/useUser'




function ModalAzul({ width, text, top, left }) {
    const { setAbrirAzulCobranca, setAbrirAzulCliente, setAbrirModalAzulCobranca, setAbrirModalAzulCliente,
        setAbrirModalAzulEditarCliente, setAbrirAzulEditarCliente,
        setAbrirModalAzulEditarCobranca, setAbrirAzulCobrancaCliente,
        setAbrirModalAzulExcluirCobranca, setAbrirAzulExcluirCliente } = useUser()

    function fecharModal() {
        setAbrirAzulCobranca(false)
        setAbrirAzulCliente(false)
        setAbrirModalAzulCobranca(false)
        setAbrirModalAzulCliente(false)
        setAbrirModalAzulEditarCliente(false)
        setAbrirAzulEditarCliente(false)
        setAbrirModalAzulEditarCobranca(false)
        setAbrirAzulCobrancaCliente(false)
        setAbrirModalAzulExcluirCobranca(false)
        setAbrirAzulExcluirCliente(false)

    }

    return (
        <div style={{ width: width, top: top, left: left }} className='div-modal-azul'>
            <img alt='' src={sucessoModalAzul}></img>
            <span>{text}</span>
            <img onClick={() => fecharModal()} style={{ cursor: 'pointer' }} alt='' src={xModalAzul}></img>
        </div>

    )
}


export default ModalAzul;