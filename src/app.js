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

app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'))
})

app.post('/upload', upload.single('image'), async (req, res, next) => {
  const { file } = req
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  console.log(file)

  const fileEvent = async (filePath, resolve) => {
    console.log(`File ${filePath} has been added`)
    try {
      const json = await jsonFileReader(filePath, file.path)
      if (json) resolve(json)
    } catch {
      console.log('Cannot read JSON file')
    }
  }

  // Await for a JSON file to be created
  const result = await new Promise(resolve => {
    watcher
      .on('add', async filePath => fileEvent(filePath, resolve))
      .on('change', filePath => fileEvent(filePath, resolve))
  })

  return res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
