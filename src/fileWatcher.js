import chokidar from 'chokidar'
import fs from 'fs-extra'
import path from 'path'

const watcher = chokidar.watch(path.resolve('data'), { ignored: /^\./, persistent: true })
const jsonFileReader = (imagePath, jsonPath) => {
  const uuid = jsonPath |> path.basename |> path.parse |> (_ => _.name)
  if (path.extname(imagePath) !== '.json') return false
  if (imagePath.includes(uuid)) return fs.readJson(imagePath)
  return false
}

export { watcher, jsonFileReader }
