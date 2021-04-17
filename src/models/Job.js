const Database = require("../db/config")

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = {
  async get(userId) {
    // ------- antigo -----------------------
    // const db = await Database()
    // const jobs = await db.all(`SELECT * FROM jobs`)
    // await db.close()

    // return jobs.map(job => ({
    //   id: job.id,
    //   name: job.name,
    //   "daily-hours": job.daily_hours,
    //   "total-hours": job.total_hours,
    //   created_at: job.created_at
    // }))
    // ------- antigo -----------------------

    const allJobsUser = await prisma.job.findMany({
      where: {
        profileId: userId
      }
    })

    await prisma.$disconnect()

    return allJobsUser.map(job => ({
      id: job.id,
      name: job.name,
      "daily-hours": job.daily_hours,
      "total-hours": job.total_hours,
      created_at: job.created_at
    }))
  },

  async update(updatedJob, jobId) {
    // ------- antigo -----------------------
    // const db = await Database()

    // await db.run(`UPDATE jobs SET
    //   name = "${updatedJob.name}",
    //   daily_hours = ${updatedJob["daily-hours"]},
    //   total_hours = ${updatedJob["total-hours"]}
    //   WHERE id = ${jobId}
    // `)

    // await db.close()
    // ------- antigo -----------------------

    // const jobData = await prisma.job.update({
    //   where: {
    //     id: jobId
    //   },
    //   data: {
    //     name: updatedJob.name,
    //     daily_hours: updatedJob["daily-hours"],
    //     total_hours: updatedJob["total-hours"]
    //   }
    // })

    const jobData = await prisma.job.update({
      where: { id: jobId },
      data: {
        name: updatedJob.name,
        daily_hours: updatedJob["daily-hours"],
        total_hours: updatedJob["total-hours"]
      }
    })

    await prisma.$disconnect()
  },

  async delete(jobId) {
    // ------- antigo -----------------------
    // const db = await Database()
    // await db.run(`DELETE FROM jobs WHERE id = ${id}`)
    // await db.close()
    // ------- antigo -----------------------

    const deletedJob = await prisma.job.delete({
      where: {
        id: Number(jobId)
      }
    })

    await prisma.$disconnect()
  },

  async create(userId, newJob) {
    // ------- antigo -----------------------
    // const db = await Database()
    // await db.run(`INSERT INTO jobs (
    //   name,
    //   daily_hours,
    //   total_hours,
    //   created_at
    // ) VALUES (
    //   "${newJob.name}",
    //   ${newJob["daily-hours"]},
    //   ${newJob["total-hours"]},
    //   ${newJob.created_at}
    // )`)
    // await db.close()
    // ------- antigo -----------------------

    const createdJob = await prisma.job.create({
      data: {
        profileId: userId,
        name: newJob.name,
        daily_hours: newJob["daily-hours"],
        total_hours: newJob["total-hours"],
        created_at: newJob.created_at
      }
    })

    await prisma.$disconnect()

    // console.dir(createdJob)
  }
}
