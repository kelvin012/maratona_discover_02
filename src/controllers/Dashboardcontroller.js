const Job = require("../models/Job")
const Profile = require("../models/Profile")
const JobUtils = require("../utils/JobUtils")

module.exports = {
  async index(req, res) {
    const jobs = await Job.get()
    const profile = await Profile.get()

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    // total de horas por dia de cada Jbo em progresso
    let jobtotalHours = 0

    const updatedJobs = jobs.map(job => {
      // ajustes no job
      const remaining = JobUtils.remaingdays(job)
      const status = remaining <= 0 ? "done" : "progress"

      // Incrementação do status
      statusCount[status] += 1

      jobtotalHours = status == "progress" ? jobtotalHours + Number(job["daily-hours"]) : jobtotalHours
      // if (status == "progress") {
      //   jobtotalHours += Number(job["daily-hours"])
      // }

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
      }
    })

    // qtd de horas/dia de cada job em progress
    const freeHours = profile["hours-per-day"] - jobtotalHours

    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
  }
}
