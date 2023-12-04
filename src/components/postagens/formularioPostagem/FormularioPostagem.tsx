import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

import { atualizar, buscar, cadastrar } from "../../../service/Service";
import { AuthContext } from '../../../contexts/AuthContext';

import Tema from '../../../models/Tema';
import Postagem from '../../../models/Postagem';
import { toastAlerta } from '../../../utils/toastAlerta';

function FormularioPostagem()
{

    const navigate = useNavigate(); // navegações indiretas, quando usuario finalizar algo ir para alguma pagina

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [temas, setTemas] = useState<Tema[]>([]) // traz todos os temas do back

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', }) 
    
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token


    // as 3 funções abaixo eu usei a service pra usar o 'buscar'
    async function buscarPostagemPorId(id: string) {
        await buscar(`/postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token,
            },
        })
    }

    // função que vai fazer a lista de todos os temas para ser escolhido
    async function buscarTemaPorId(id: string) {
        await buscar(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token,
            },
        })
    }

    async function buscarTemas() {
        await buscar('/temas', setTemas, {
            headers: {
                Authorization: token,
            },
        })
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', "info")
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id]) // o id ja foi inicilaido quando o hook (useparemts) pegar o id pela url e isso segue para todos.

    // é que vai atualizar caso o usuario queria atualizar o tema escolhido para aquela postagem.
    useEffect(() => {
        setPostagem({
            ...postagem, // usado o squadoperator traz meu array de postagem
            tema: tema, // aqui atualiza os temas -
        })
    }, [tema]);

   

    // vai pegar a informações do usuario e fazendo os relacionamento
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault() 
        setIsLoading(true)

        if (id != undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                toastAlerta('Postagem atualizada com successo', "success")

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', "info")
                    handleLogout()
                } else {
                    toastAlerta('Erro ao atualizar a Postagem', "error")
                }
            }

        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                })

                toastAlerta('Postagem cadastrada com sucesso', "sucess")

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', "info")
                    handleLogout()
                } else {
                    toastAlerta('Erro ao cadastrar a Postagem', "error")
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoTema = tema.descricao === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Título da Postagem</label>
                    <input
                        value={postagem.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Insira aqui o Título"
                        name="titulo"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Texto da Postagem</label>

                    <input
                        value={postagem.texto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Adicione aqui o Texto da Postagem"
                        name="texto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                
                <div className="flex flex-col gap-2">
                    
                    <p>Tema da Postagem</p>

                    <select name="tema" id="tema" className='border p-2 border-slate-800 rounded'
                     onChange={(e) => buscarTemaPorId(e.currentTarget.value)} 
                     >
                        <option value="" selected disabled>Selecione um Tema</option> // 
                        {temas.map((tema) => (
                            <>
                                <option key={tema.id} value={tema.id}>{tema.descricao}</option>
                            </>
                        ))}
                   
                    </select>
                </div>
                <button
                    type='submit'
                    disabled={carregandoTema}
                    className='flex justify-center rounded disabled:bg-slate-200 bg-indigo-400 
                            hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2'
                >
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
   export default FormularioPostagem;

