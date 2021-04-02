const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// Definição da template engine
server.set("view engine", "ejs")

// Mudar a localização da pasta views
server.set("views", path.join(__dirname, "views"))

// Habilitar arquivos estaticos
server.use(express.static("public"))

// Usar o req.body
server.use(express.urlencoded({ extended: true }))

// Rotas da aplicação
server.use(routes)

// Iniciando o servidor Node.js na porta 3000
server.listen(3000, () => console.log("Servidor Node Rodando!"))
