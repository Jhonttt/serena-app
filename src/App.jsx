import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta privada normal */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Rutas por rol */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <h1>Admin Dashboard</h1>
            </PrivateRoute>
          }
        />

        <Route
          path="/psychologist"
          element={
            <PrivateRoute allowedRoles={['psychologist']}>
              <h1>Psychologist Dashboard</h1>
            </PrivateRoute>
          }
        />

        <Route
          path="/student"
          element={
            <PrivateRoute allowedRoles={['student']}>
              <h1>Student Dashboard</h1>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
