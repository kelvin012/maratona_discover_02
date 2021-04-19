const Profile = require("../models/Profile")
const bcrypt = require("bcryptjs")

module.exports = {
  async index(req, res) {
    const { id } = req.session.user
    return res.render("profile", { profile: await Profile.get(id) })
  },

  async create(req, res) {
    const userCreated = await Profile.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    if (userCreated.error) {
      if (userCreated.code == "P2002") {
        return res.render("signup", { message: "Email ja cadastrado!", color: "#f8d7da" })
      }

      return res.render("signup", { message: "Error interno tente novamente.", color: "#f8d7da" })
    }

    userCreated.password = undefined

    req.session.user = userCreated

    return res.redirect("/profile")
  },

  async signup(req, res) {
    return res.render("signup")
  },

  async signin(req, res) {
    return res.render("signin")
  },

  async login(req, res) {
    const { email, password } = req.body

    const user = await Profile.get_by_email(email)

    if (!user) {
      return res.render("signin", { message: "Usuario não encontrado!", color: "#f8d7da" }) // adicionar mensagem de error pela tecnica conhecida como Flash?Flush message ?
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.render("signin", { message: "Senha errada!", color: "#f8d7da" })
    }

    user.password = undefined

    req.session.user = user

    return res.redirect("/")
  },

  async logout(req, res) {
    req.session.destroy(function (err) {
      return res.redirect("/login")
    })
  },

  async update(req, res) {
    const data = req.body

    const userId = req.session.user.id

    // definir quantas semanas tem num ano : 52
    const weekPerYear = 52

    // remover as semanas de ferias do ano, para pegar quantas semanas tem em 1 mês
    const weeksPerMonth = (weekPerYear - data["vacation-per-year"]) / 12

    // total de horas trabalhadas na semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

    // horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth

    // qual o será o valor da minha hora?
    const valueHour = Math.ceil((data["value-hour"] = data["monthly-budget"] / monthlyTotalHours))

    const profile = await Profile.get(userId)

    await Profile.update(userId, {
      ...profile,
      name: req.body.name,
      avatar: req.body.avatar,
      "monthly-budget": Number(req.body["monthly-budget"]),
      "hours-per-day": Number(req.body["hours-per-day"]),
      "days-per-week": Number(req.body["days-per-week"]),
      "vacation-per-year": Number(req.body["vacation-per-year"]),
      "value-hour": valueHour
    })

    return res.redirect("/profile")
  }
}
