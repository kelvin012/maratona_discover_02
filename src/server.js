const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")
const session = require("express-session")

require("dotenv/config")

// Definição da template engine
server.set("view engine", "ejs")

// Mudar a localização da pasta views
server.set("views", path.join(__dirname, "views"))

// Habilitar arquivos estaticos
server.use(express.static("public"))

//==========/ Usar o req.body /===========

// parse application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }))

// parse application/json
server.use(express.json())

//========================================

server.use(session({ secret: process.env.SECRET_SESSION, resave: false, saveUninitialized: false }))

// Rotas da aplicação
server.use(routes)

let porta_http = process.env.PORT || 3000

// Iniciando o servidor Node.js
server.listen(porta_http, () => console.log(`Servidor Node.JS Rodando. \n=> http://localhost:${porta_http}`))
