import Popup from 'reactjs-popup';


import 'reactjs-popup/dist/index.css';
import './ModalFotoPerfil.css'
import FormularioUsuario from '../formularioUsuario/FormularioUsuario';

function ModalFotoPerfil() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2hover:bg-white hover:text-indigo-800'>
                        Editar Foto
                    </button>
                }
                
            >
                <FormularioUsuario />
            </Popup>
        </>
    );
}

export default ModalFotoPerfil