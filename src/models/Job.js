const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = {
  async get(userId) {
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
    const deletedJob = await prisma.job.delete({
      where: {
        id: Number(jobId)
      }
    })

    await prisma.$disconnect()
  },

  async create(userId, newJob) {
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
  }
}
