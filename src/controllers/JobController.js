const Job = require("../models/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require("../models/Profile")

module.exports = {
  create(req, res) {
    return res.render("job")
  },

  async save(req, res) {
    const userId = req.session.user.id

    await Job.create(userId, {
      name: req.body.name,
      "daily-hours": Number(req.body["daily-hours"]),
      "total-hours": Number(req.body["total-hours"]),
      created_at: Date.now() // Atribuindo a data de hoje
    })

    return res.redirect("/")
  },

  async show(req, res) {
    const jobId = req.params.id
    const userId = req.session.user.id
    const jobs = await Job.get(userId)

    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send("Job not found!")
    }

    const profile = await Profile.get(userId)

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

    return res.render("job-edit", { job })
  },

  async update(req, res) {
    const jobId = Number(req.params.id)

    const updatedJob = {
      name: req.body.name,
      "total-hours": Number(req.body["total-hours"]),
      "daily-hours": Number(req.body["daily-hours"])
    }

    await Job.update(updatedJob, jobId)

    res.redirect("/job/" + jobId)
  },

  async delete(req, res) {
    const jobId = req.params.id
    const { email } = req.session.user

    const jobWithUser = await Profile.get_by_email_include_posts(email)

    // console.dir(jobWithUser.jobs)
    // console.dir(jobId)

    let deleted_success = false

    jobWithUser.jobs.forEach(element => {
      if (element.id == jobId) {
        deleted_success = true
      }
    })

    if (deleted_success) {
      await Job.delete(jobId)
      // const teeeeee = await Job.delete(jobId)
      // console.dir(teeeeee)
    }

    // console.dir(resultado)
    // if (!deleted_success) {
    //   return res.redirect("/error")
    // }

    return res.redirect("/")
  }
}
