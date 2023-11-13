import { createContext, ReactNode, useState } from "react"
import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../service/Service"
import { toastAlerta } from "../utils/toastAlerta"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps) //  criando o contexto, {}é objeto e o 'AS' ele mostra pra esse objto {} que pode confiar que authcontextppos tem todos os parametros preenchidos.


// é um componenenet que vai envolver os componetes da context para serem exibidos na telas
export function AuthProvider({ children }: AuthProviderProps) {

    // tipando a model usuariologin para fazer o logout
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState(false) // processo de carregamento começa como falso

    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true) // quando clicar pra login mudo status isloading de falso para verdadeiro
        try {
            await login(`/usuarios/logar`, userLogin, setUsuario) // url do login, objeto userlogin, setusuario ele verifica se se tudo foi preenchido do objeto usuario, senão vai pro catch como dados nao encontrados

            toastAlerta('Usuário logado com sucesso', "success")
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            toastAlerta('Dados do usuário inconsistentes', "erro")
            setIsLoading(false)
        }
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider> // local onde aplicação ira manipular todas informações adquiridas
    )
}

