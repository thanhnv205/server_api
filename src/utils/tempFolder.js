import path from 'path'
import fs from 'fs'

export const createTempFolder = (dir) => {
  const dirTempFolder = path.join(__dirname, `../../tmp${dir}`)

  const parts = dirTempFolder.split(path.sep)
  for (let i = 1; i <= parts.length; i++) {
    const partialPath = path.join(...parts.slice(0, i))
    if (!fs.existsSync(partialPath)) {
      fs.mkdirSync(partialPath)
    }
  }
}

export const deleteAllFileTempFolder = () => {
  const dirTempFolder = path.join(__dirname, '../../tmp')

  fs.readdir(dirTempFolder, (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(dirTempFolder, file), (unlinkErr) => {
        if (unlinkErr) throw unlinkErr
      })
    }
  })
}