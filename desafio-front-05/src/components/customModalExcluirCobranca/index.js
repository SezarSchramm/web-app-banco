import './styles.css'
import alertaicone from '../../assets/alertaicone.svg'
import cancel from '../../assets/cancel.svg'
import useUser from '../../hooks/useUser'
import api from '../../services/api'





function ModalExcluirCobranca() {

    const { setAbrirModalExcluirCobranca, setAbrirModalAzulExcluirCobranca, setAbrirModalVermelhoExcluirCobranca } = useUser()


    const handleExcluirCobranca = async () => {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('idCobranca')

        try {
            const response = await api.delete(`/cobranca/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })



            setAbrirModalExcluirCobranca(false)
            setAbrirModalAzulExcluirCobranca(true)
        } catch (error) {
            if (error.response.data === "Esta cobrança não pode ser excluída!") {
                setAbrirModalExcluirCobranca(false)
                setAbrirModalVermelhoExcluirCobranca(true)
            }
            console.log(error.response)
        }


    }



    return (

        <div className="modal-excluir-cobranca">
            <div className="modal-content-excluir-cobranca">
                <img alt='alerta-icone' src={alertaicone}></img>
                <span>Tem certeza que deseja excluir esta cobrança?</span>
                <div style={{ gap: '16px', display: "flex" }}>
                    <button onClick={() => setAbrirModalExcluirCobranca(false)} className='modal-excluir-nao' type='button'>Não</button>
                    <button onClick={() => handleExcluirCobranca()} className='modal-excluir-sim' type='button'>Sim</button>
                </div>
                <img onClick={() => setAbrirModalExcluirCobranca(false)} className='x-modal-excluir-cobrança' alt='x' src={cancel}></img>
            </div>
        </div >

    )
}


export default ModalExcluirCobranca;