const { PrismaClient } = require("@prisma/client")
const { hashPassword } = require("../utils/crypto")

const prisma = new PrismaClient()

module.exports = {
  async get(userId) {
    const data = await prisma.profile.findFirst({
      where: {
        id: userId
      }
    })

    return {
      name: data.name,
      avatar: data.avatar,
      "monthly-budget": data.monthly_budget,
      "days-per-week": data.days_per_week,
      "hours-per-day": data.hours_per_day,
      "vacation-per-year": data.vacation_per_year,
      "value-hour": data.value_hour
    }
  },

  async create(newUser) {
    try {
      const userCreated = await prisma.profile.create({
        data: {
          name: newUser.name,
          email: newUser.email,
          password: await hashPassword(newUser.password)
        }
      })

      await prisma.$disconnect()
      return userCreated
    } catch (error) {
      await prisma.$disconnect()
      return { error: true, code: error.code, meta: error.meta.target }
    }
  },

  async get_by_email(email) {
    const user = await prisma.profile.findUnique({
      where: {
        email: email
      }
    })

    if (user) {
      return user
    }
  },

  async get_by_email_include_posts(email) {
    const user = await prisma.profile.findUnique({
      where: {
        email: email
      },
      select: {
        jobs: {
          select: {
            id: true
          }
        }
      }
    })

    if (user) {
      return user
    }
  },

  async update(userId, newData) {
    await prisma.profile.update({
      where: {
        id: userId
      },
      data: {
        name: newData.name,
        avatar: newData.avatar,
        monthly_budget: newData["monthly-budget"],
        days_per_week: newData["days-per-week"],
        hours_per_day: newData["hours-per-day"],
        vacation_per_year: newData["vacation-per-year"],
        value_hour: newData["value-hour"]
      }
    })

    await prisma.$disconnect()
  }
}
