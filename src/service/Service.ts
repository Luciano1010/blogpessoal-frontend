import axios from "axios";

const api = axios.create({
    baseURL: 'https://blogpessoal-93bx.onrender.com'
})

// a setDados ele atualiza a variavel de estado em listaTema
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const cadastrarUsuario = async(url: string, dados: Object, setDados: Function) => { 
    const resposta = await api.post(url,dados)
    setDados(resposta.data)
  }

  export const buscar = async(url: string, setDados: Function, header:object) => { 
    const resposta = await api.get(url,header)
    setDados(resposta.data)
  }

  export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {

    try {
       
        await api.options(url, header);
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
        } catch (error) {
            console.error("Erro ao tentar fazer a solicitação PUT", error);
           
        }
}