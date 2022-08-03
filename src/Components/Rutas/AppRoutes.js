import { Routes, Route } from 'react-router-dom'
import Compras from '../../Screens/Compras'
import Dashboard from '../../Screens/Dashboard'
import Productos from '../../Screens/Productos'
import Usuarios from '../../Screens/Usuarios'
import Ventas from '../../Screens/Ventas'

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/compras" element={<Compras />} />
                <Route path="/ventas" element={<Ventas />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </>
    )
}