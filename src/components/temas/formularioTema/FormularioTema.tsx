import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../service/Service";
import { RotatingLines } from "react-loader-spinner";
import { toastAlerta } from "../../../utils/toastAlerta";

function FormularioTema() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tema, setTema] = useState<Tema>({} as Tema);

    const { id } = useParams<{ id: string }>(); // ele pega um parametro da url e esse parametro é o id de cada tema - eu definio uma variavel na app.tsx ':id'

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPorId(id: string) {
        try {
            // diferença é a busca sera por id (/temas/${id})
            await buscar(`/temas/${id}`, setTema, {
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
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Tema atualizado com successo', "success")

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', "info")
                    handleLogout()
                } else {
                    toastAlerta('Erro ao atualizar o Tema', "erro")
                }
            }

        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Tema cadastrado com successo', "success")

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', "info")
                    handleLogout()
                } else {
                    toastAlerta('Erro ao cadastrar o Tema', "erro")
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/temas")
    }
    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
            {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'} 
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema} >
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                       type="text"
                       placeholder="Descreva aqui seu tema"
                       name='descricao'
                       className="border-2 border-slate-700 rounded p-2"
                       value={tema.descricao}
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

export default FormularioTema;