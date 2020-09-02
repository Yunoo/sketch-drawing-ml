import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import path from 'path'

import upload from './upload'
import { watcher, jsonFileReader } from './fileWatcher'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.render(path.resolve('public', 'index.html'))
})

app.post('/upload', upload.single('image'), async (req, res, next) => {
  const { body, file } = req
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  console.log(file)
  console.log(JSON.stringify(body))

  const uuid = file.path |> path.basename |> path.parse |> (_ => _.name)

  const fileEvent = async (filePath, resolve) => {
    console.log(`File ${filePath} has been added`)
    try {
      const json = await jsonFileReader(filePath, uuid)
      if (json) resolve(json)
    } catch {
      console.log('Cannot read JSON file')
    }
  }

  // Await for a JSON file to be created
  const result = await new Promise(resolve => {
    watcher(uuid)
      .on('add', async filePath => fileEvent(filePath, resolve))
      .on('change', async filePath => fileEvent(filePath, resolve))
  })

  console.log(`Result: ${JSON.stringify(result)}`)
  return res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
