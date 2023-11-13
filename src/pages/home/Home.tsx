import ListaPostagens from "../../components/postagens/listaPostagens/ListaPostagens"
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem"

function Home() {
    return (
        <>
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-600 to-indigo-900 flex justify-center">
                <div className='container grid grid-cols-2 text-white'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                            Seja Bem Vindo!
                        </h2>
                        <p className='text-xl'>
                            Expresse aqui seus pensamentos e opniões
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className="flex justify-around gap-4">
                                <ModalPostagem />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img 
                            src="https://th.bing.com/th/id/OIG.yGNFWXvStGJxelHDvwsb?pid=ImgGn " 
                            alt="Imagem Página Home"
                            className='w-2/3 rounded-full'
                        />
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <ListaPostagens />
            </div>
        </>
    )
}

export default Home