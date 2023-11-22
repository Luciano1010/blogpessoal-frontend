import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { toastAlerta } from '../../utils/toastAlerta'



function Perfil() {

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            toastAlerta('Voce precisa estar logado', "erro")
            navigate("/login")
        }
    }, [usuario.token])

    return (

        <> 

        <div className='flex'>
             
        <div className='container w-1/4 h-[100] min-h-screen bg-purple-400 dark:bg-purple-800 '>

            
            <img 
                className='w-full h-72 object-cover border-b-8 border-white' 
                src="https://i.imgur.com/ZZFAmzo.jpg" alt="Capa do Perfil" />
            
            <img 
                className='rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10' 
                src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />
               <div className='flex justify-around gap-4 '>
               
               <div className=" ml-2 mt-2 flex flex-col text-white text-xl justify-center">
                        <p className=' font-bold'>Nome:</p>
                        <p>{usuario.nome}</p>
                        <p className='font-bold'>Email:</p>
                        <p> {usuario.usuario}</p>
                        <hr className='mb-5'/>
               
                <Link to={`/cadastro/${usuario.id}`}  >
                        <button className='bg-purple-800 hover:bg-purple-500 border-double border-white border-4 p justify-center w-full  h-10 text-white text-[18px]'>EDITAR</button>
                </Link>
                        
                </div>
             
                 
               
            </div>
       
            </div>
            <div 
                className="relative mt-[-6rem] h-72 flex flex-col 
            bg-sky-500 text-white text-2xl items-center justify-center"
            >
                
            </div>

        </div>
      </>
    )
}

export default Perfil