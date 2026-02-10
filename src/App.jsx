import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

// Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Resources from "./pages/Resources";
import SettingsPage from "./pages/SettingsPage";
import CreateResource from "./pages/CreateResource";
import NotFoundPage from "./pages/NotFoundPage";

// Components
import ProtectedRoute from "./middleware/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminRoute from "./middleware/AdminRoute";
import { ChatbotButton } from './components/ui'

// Layout con Navbar y Footer
function MainLayout() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow flex flex-col justify-center px-4 bg-gray-100">
        <Outlet />
      </main>
      <Footer />

      {isAuthenticated && <ChatbotButton />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas y protegidas CON Layout (Navbar + Footer) */}
          <Route element={<MainLayout />}>
            {/* Redirect raíz a login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Rutas públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/resources" element={<Resources />} />
              <Route element={<AdminRoute />}>
                <Route path="/upload" element={<CreateResource />} />
              </Route>
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
