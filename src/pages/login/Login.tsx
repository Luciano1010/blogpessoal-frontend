import { Link, useNavigate } from "react-router-dom";
import UsuarioLogin from "../../models/UsuarioLogin";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

import './Login.css';



function Login (){

const navigate = useNavigate(); 
const { usuario, handleLogin, isLoading } = useContext(AuthContext); // useConext ele vai se conectar com minha context(authContext), e na const eu passo o que quero da Authcontext.





const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin // local que armazeno os dados digitados pelo usuario na pag logi
    );
    

useEffect(() => {
    if (usuario.token !== "") { // a função handlelogin verifica, se retorna um token é porque o usuario foi encotrado ai redireciona ela pra pg home (navigate(/home))
        setTimeout(() => {
          
            navigate('/home');
        }, 3000);
    }
}, [usuario])// quando o usuario logar na aplicação.


// aqui estou atualizando o estado inicial do input, onde o usuario ele ditigado seus dados e vai mudar seu estado inicial de vazio para preenchido
function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({ 
        ...usuarioLogin,// esquad ooperation ele serve pra reduzir o codigo em vez de trazer informações desnecessarias de setusuario login.
        [e.target.name]: e.target.value // campo dinamico do valores digitados - 'e' acessa o 'target(input)' e aceesa o campo 'name' do input e 'value' pega o valor e atualiza quando necessario.
    })
}

function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault() // impede o carregamento automatico da pagina
    handleLogin(usuarioLogin) // chamamos a funçao handlelogin- com o usuarioLogin preenchido com o as informações certas
  
}
  return (
    
        <>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
                <form className="flex justify-center items-center flex-col w-1/2 gap-4" 
                    onSubmit={login}>
                    <h2 className="text-slate-900 text-5xl ">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.senha} 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="rounded bg-indigo-400 flex justify-center
                                   hover:bg-indigo-900 text-white w-1/2 py-2">
                        {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                            <span>Entrar</span>}
                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div className="fundoLogin hidden lg:block"></div>
            </div>
        </>
  );
}
    export default Login


