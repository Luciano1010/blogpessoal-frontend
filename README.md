# 🌐 Blog Pessoal - Frontend

Frontend do sistema Blog Pessoal desenvolvido em **React + TypeScript + Vite**, consumindo uma API REST em ASP.NET Core com autenticação JWT.

---

# 🚀 Demonstração

Aplicação publicada na Vercel:

👉 https://blogpessoal-frontend-4pjfzjxzs-lucianos-projects-3a172c93.vercel.app

---

# 🧠 Funcionalidades

- Cadastro de usuário
- Login com autenticação JWT
- Criação de postagens
- Listagem de temas
- Atualização de postagens
- Exclusão de postagens
- Rotas protegidas
- Consumo de API REST

---

# 🛠️ Tecnologias utilizadas

- React
- TypeScript
- Vite
- Axios
- React Router DOM
- Context API
- JWT Authentication

---

# 📡 Backend (API)

A aplicação consome a API hospedada na Render:

👉 https://blogpessoal-dj0e.onrender.com

---

# ⚙️ Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

VITE_API_URL=https://blogpessoal-dj0e.onrender.com

---

# ⚙️ Instalação local

## Clonar repositório

git clone https://github.com/Luciano1010/blogpessoal-frontend.git

---

## Entrar na pasta

cd blogpessoal-frontend

---

## Instalar dependências

npm install

---

## Rodar projeto

npm run dev

---

# 🏗️ Build de produção

npm run build

---

# 📁 Estrutura do projeto

src/
├── components/
├── pages/
├── services/
├── contexts/
├── routes/
├── models/
└── main.tsx

---

# 🔐 Autenticação JWT

Authorization: Bearer {token}

---

# 📦 Axios (API service)

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default api;

---

# ⚠️ Pontos em Melhorias (em correção)

## Erro 400 no cadastro
- Campos obrigatórios faltando
- JSON fora do padrão do backend
- Estrutura incorreta



## Erro de CORS
policy.AllowAnyOrigin()
      .AllowAnyMethod()
      .AllowAnyHeader();



## API não conecta
- Verificar .env
- Backend rodando no Render
- URL correta

---

# 🚀 Deploy

Frontend hospedado na Vercel com deploy automático via GitHub.

---

# 👨‍💻 Autor

Luciano Simões  
GitHub: https://github.com/Luciano1010

---

# 📌 Observação

Projeto full stack com foco em:
- API REST
- JWT Authentication
- Deploy cloud
- Integração frontend/backend
