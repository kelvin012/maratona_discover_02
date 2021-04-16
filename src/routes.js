const express = require("express")
const routes = express.Router()
const ProfileController = require("./controllers/ProfileController")
const JobController = require("./controllers/JobController")
const Dashboardcontroller = require("./controllers/Dashboardcontroller")
const { requireLogin, redirectHome } = require("../src/controllers/Middleware")

routes.get("/", requireLogin, Dashboardcontroller.index)
// trocar "/" por "/home" e criar uma pagina inicial simples ?

routes.get("/job", requireLogin, JobController.create)
routes.post("/job", requireLogin, JobController.save)

routes.get("/job/:id", requireLogin, JobController.show)
routes.post("/job/:id", requireLogin, JobController.update)

routes.post("/job/delete/:id", requireLogin, JobController.delete)

routes.get("/profile", requireLogin, ProfileController.index)
routes.post("/profile", requireLogin, ProfileController.update)

routes.get("/register", redirectHome, ProfileController.signup)
routes.post("/register", redirectHome, ProfileController.create)

routes.get("/login", redirectHome, ProfileController.signin)
routes.post("/login", redirectHome, ProfileController.login)

routes.get("/logout", requireLogin, ProfileController.logout)
module.exports = routes
