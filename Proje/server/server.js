const express = require("express")
var cors = require("cors")
const app = express()

app.use(cors())

app.get("/jobs", (req, res) =>
  res.json([
    {
      jobName: "Yapılan işlerle activity kayıtları oluşturmam gerekiyor",
      tags: ["Regular"],
      id: 2,
      jobPriority: 2,
    },
    {
      jobName: "Adaylarla iligli teknik bir ödev hazırlamam gerekiyor",
      tags: ["Urgent"],
      id: 1,
      jobPriority: 1,
    },
    {
      jobName: "Teknik taskları planlayacağım",
      tags: ["Trivial"],
      id: 3,
      jobPriority: 3,
    },
  ])
)

const PORT = 8080

app.listen(PORT, console.log(`Server started on ${PORT}`))
