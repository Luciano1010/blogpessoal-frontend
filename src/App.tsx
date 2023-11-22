import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Cadastro from './pages/cadastro/Cadastro';
import ListaTemas from './components/temas/listaTema/ListaTemas';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import FormularioTema from './components/temas/formularioTema/FormularioTema';
import ListaPostagens from './components/postagens/listaPostagens/ListaPostagens';
import FormularioPostagem from './components/postagens/formularioPostagem/FormularioPostagem';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import Perfil from './pages/perfil/Perfil';

import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <AuthProvider> 
    <ToastContainer />
      <BrowserRouter>
        <Navbar />
          <div className='min-h-[80vh] '>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/atualizarUsuario/:id" element={<Cadastro />}/>
              <Route path="/temas" element={<ListaTemas />} />
              <Route path="/cadastroTema" element={<FormularioTema />} />
              <Route path="/editarTema/:id" element={<FormularioTema />} />
              <Route path="/deletarTema/:id" element={<DeletarTema />} />
              <Route path="/postagens" element={<ListaPostagens />} />
              <Route path="/cadastroPostagem" element={<FormularioPostagem />} />
              <Route path="/editarPostagem/:id" element={<FormularioPostagem />} />
              <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
              <Route path="/perfil" element={<Perfil />} />
              
             

            </Routes>
          </div>  
        <Footer />
      </BrowserRouter>
      </AuthProvider>   
    </>
  );
}

export default App;