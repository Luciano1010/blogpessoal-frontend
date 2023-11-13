import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import { atualizar,buscar,cadastrar } from "../../../service/Service";
import { toastAlerta } from '../../../utils/toastAlerta';
import { useState, useContext, useEffect, ChangeEvent} from "react";
import Usuario from '../../../models/Usuario';
import { RotatingLines } from "react-loader-spinner";

function FormularioUsuario(){

    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<Usuario>({
        nome:'Usuario',
        foto:'',
    } as Usuario);
   
    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPorId(id: string) {
        try {
            // diferença é a busca sera por id (/temas/${id})
            await buscar(`/user/${id}`, setUser, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', "info")
                handleLogout()
            }
        }
    }
    
    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', "info")
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        
        setUser({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    async function gerarNovaFoto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/user`, user, setUser, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Foto atualizado com successo', "success")

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', "info")
                    handleLogout()
                } else {
                    toastAlerta('Erro ao atualizar a foto', "erro")
                }
            }

        } else {
            try {
                await cadastrar(`/user`, user, setUser, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Foto cadastrado com successo', "success")

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', "info")
                    handleLogout()
                } else {
                    toastAlerta('Erro ao cadastrar a Foto', "erro")
                }
            }
        }

        setIsLoading(false)
        retornar()

}
function retornar() {
    navigate("/perfil")
  }

    return(
    
    <div className="container flex flex-col items-center justify-center mx-auto">
    <h1 className="text-4xl text-center my-8">
    {id === undefined ? 'Cadastrar Foto' : 'Editar Foto'} 
    </h1>

    <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaFoto} >
        <div className="flex flex-col gap-2">
            <label htmlFor="urlInput">Url</label>
            <input
               type="url"
               placeholder="Foto"
               name='foto'
               className="border-2 border-slate-700 rounded p-2"
               value={user.foto}
               onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
        </div>
        <button
           className="rounded text-slate-100 bg-indigo-400 
           hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center" type="submit">

           {isLoading ?
               <RotatingLines
                   strokeColor="white"
                   strokeWidth="5"
                   animationDuration="0.75"
                   width="24"
                   visible={true}
               /> :
               <span>Confirmar</span>
           }
        </button>
     
    </form>
     </div>
     
    );
        
  
}

export default FormularioUsuario;
    


