import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Layout/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';


function App() {
  return (
    <>
      <Routes>

        {/* Making the "dashboard" a protected route. */}
        <Route path="/dashboard" element={<PrivateRoute />} >
          <Route path="" element={<Dashboard />} />
        </Route>

        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />


      </Routes>

    </>
  );
}

export default App;
