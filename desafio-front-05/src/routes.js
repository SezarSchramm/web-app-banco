import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SingIn from './pages/Singin'
import Cliente from './pages/clients'
import Main from './pages/home'
import DetalheCliente from './pages/detailsClient'
import Cobranca from './pages/charges'



function ProtectRoute({ redirectTo }) {
    const isAuthenticated = localStorage.getItem('token')

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}


function MainRoutes() {


    return (
        <Routes>

            <Route path='/' element={<Login />} />
            <Route path='/cadastro' element={<SingIn />} />

            <Route element={<ProtectRoute redirectTo='/' />}>
                <Route path='/home' element={<Main />} />
                <Route path='/clientes' element={<Cliente />} />
                <Route path='/cobrancas' element={<Cobranca />} />
                <Route path='/detalhe' element={<DetalheCliente />} />
            </Route>



        </Routes>
    )
}

export default MainRoutes