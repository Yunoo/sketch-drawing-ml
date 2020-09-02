import chokidar from 'chokidar'
import fs from 'fs-extra'
import path from 'path'

const watcher = filename =>
  chokidar.watch(path.resolve('data', `${filename}.json`), { ignored: /^\./, persistent: true, awaitWriteFinish: true })

const jsonFileReader = (imagePath, uuid) => {
  if (path.extname(imagePath) !== '.json') return false
  if (imagePath.includes(uuid)) return fs.readJson(imagePath)
  return false
}

export { watcher, jsonFileReader }
