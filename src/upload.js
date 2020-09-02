import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    const uuid = uuidv4()
    cb(null, `${uuid}${path.extname(file.originalname)}`)
  },
})

const fileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname)
  if (['.png', '.jpg', '.jpeg'].includes(ext)) return callback(null, true)
  return callback(new Error('Only images are allowed'))
}

export default multer({ storage, fileFilter })
