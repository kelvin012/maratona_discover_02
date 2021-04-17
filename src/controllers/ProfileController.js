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

    userCreated.password = undefined

    req.session.user = userCreated

    return res.send(userCreated)
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
      return res.render("signin", { message: "Usuario não encontrado!", color: "red" }) // adicionar mensagem de error pela tecnica conhecida como Flash/Flush message ?
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.render("signin", { message: "Senha errada!", color: "red" })
    }

    user.password = undefined

    req.session.user = user

    return res.redirect("/")
    // return res.send(user)
    // return res.render("signin", { message: "logado com sucesso!", color: "green" })
    //falta criar o utils para verificar a hash com o hash da senha passada pelo user acho que vai ter que ser feita no model ?
  },

  async logout(req, res) {
    req.session.destroy(function (err) {
      return res.redirect("/login")
    })
  },

  async update(req, res) {
    // req.body para pegar os dados
    const data = req.body

    const userId = req.session.user.id

    // console.log(data)
    // TODO fazer uma verificação para os campos nao poderem ser nulos

    // definir quantas semanas tem num ano : 52
    const weekPerYear = 52

    // remover as semanas de ferias do ano, para pegar quantas semanas tem em 1 mês
    const weeksPerMonth = (weekPerYear - data["vacation-per-year"]) / 12

    // total de horas trabalhadas na semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

    // horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth

    // qual o será o valor da minha hora?
    // const valueHour = parseInt((data["value-hour"] = data["monthly-budget"] / monthlyTotalHours))
    // se tirar o parseint ele fica com numero muito quebrados
    const valueHour = Math.ceil((data["value-hour"] = data["monthly-budget"] / monthlyTotalHours))
    // coloquei o match.ceil

    const profile = await Profile.get(userId)

    // await Profile.update({
    //   ...profile,
    //   ...req.body,
    //   "value-hour": valueHour
    // })

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
