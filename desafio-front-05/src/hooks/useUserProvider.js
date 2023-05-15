import { useState } from 'react'


function useUserProvider() {

    const [openModalEditarUsuario, setOpenModalEditarUsuario] = useState(false)

    const [abrirModalCadastrarCobranca, setAbrirModalCadastrarCobranca] = useState(false)
    const [abrirModalAzulCobranca, setAbrirModalAzulCobranca] = useState(false)
    const [abrirAzulCobranca, setAbrirAzulCobranca] = useState(false)

    const [abrirModalCadastrarCliente, setAbrirModalCadastrarCliente] = useState(false)
    const [abrirModalAzulCliente, setAbrirModalAzulCliente] = useState(false)
    const [abrirAzulCliente, setAbrirAzulCliente] = useState(false)

    const [abrirModalEditarCliente, setAbrirModalEditarCliente] = useState(false)
    const [abrirModalAzulEditarCliente, setAbrirModalAzulEditarCliente] = useState(false)
    const [abrirAzulEditarCliente, setAbrirAzulEditarCliente] = useState(false)

    const [abrirModalEditarCobranca, setAbrirModalEditarCobranca] = useState(false)
    const [abrirModalAzulEditarCobranca, setAbrirModalAzulEditarCobranca] = useState(false)
    const [abrirAzulCobrancaCliente, setAbrirAzulCobrancaCliente] = useState(false)

    const [abrirModalDetalharCobranca, setAbrirModalDetalharCobranca] = useState(false)

    const [abrirModalExcluirCobranca, setAbrirModalExcluirCobranca] = useState(false)
    const [abrirModalAzulExcluirCobranca, setAbrirModalAzulExcluirCobranca] = useState(false)
    const [abrirAzulExcluirCliente, setAbrirAzulExcluirCliente] = useState(false)
    const [abrirModalVermelhoExcluirCobranca, setAbrirModalVermelhoExcluirCobranca] = useState(false)
    const [abrirVermelhoExcluirCliente, setAbrirVermelhoExcluirCliente] = useState(false)

    const [verTodosClienteInadimplentes, setVerTodosClienteInadimplentes] = useState(false)
    const [verTodosClienteEmDia, setVerTodosClienteEmDia] = useState(false)
    const [verTodasCobrancasVencidas, setVerTodasCobrancasVencidas] = useState(false)
    const [verTodasCobrancasPagas, setVerTodasCobrancasPagas] = useState(false)
    const [verTodasCobrancasPrevistas, setVerTodasCobrancasPrevistas] = useState(false)



    return {
        openModalEditarUsuario, setOpenModalEditarUsuario,
        abrirModalCadastrarCobranca, setAbrirModalCadastrarCobranca,
        abrirModalCadastrarCliente, setAbrirModalCadastrarCliente,
        abrirModalEditarCliente, setAbrirModalEditarCliente,
        abrirModalAzulCobranca, setAbrirModalAzulCobranca,
        abrirModalAzulCliente, setAbrirModalAzulCliente,
        abrirAzulCobranca, setAbrirAzulCobranca,
        abrirAzulCliente, setAbrirAzulCliente,
        abrirModalAzulEditarCliente, setAbrirModalAzulEditarCliente,
        abrirAzulEditarCliente, setAbrirAzulEditarCliente,
        abrirModalEditarCobranca, setAbrirModalEditarCobranca,
        abrirModalAzulEditarCobranca, setAbrirModalAzulEditarCobranca,
        abrirAzulCobrancaCliente, setAbrirAzulCobrancaCliente,
        abrirModalExcluirCobranca, setAbrirModalExcluirCobranca,
        abrirModalAzulExcluirCobranca, setAbrirModalAzulExcluirCobranca,
        abrirAzulExcluirCliente, setAbrirAzulExcluirCliente,
        abrirModalVermelhoExcluirCobranca, setAbrirModalVermelhoExcluirCobranca,
        abrirVermelhoExcluirCliente, setAbrirVermelhoExcluirCliente,
        verTodosClienteInadimplentes, setVerTodosClienteInadimplentes,
        verTodosClienteEmDia, setVerTodosClienteEmDia,
        abrirModalDetalharCobranca, setAbrirModalDetalharCobranca,
        verTodasCobrancasVencidas, setVerTodasCobrancasVencidas,
        verTodasCobrancasPagas, setVerTodasCobrancasPagas,
        verTodasCobrancasPrevistas, setVerTodasCobrancasPrevistas



    }

}


export default useUserProvider;
