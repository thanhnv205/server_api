import moment from 'moment'
import path from 'path'

export const generateFileName = (fileName) => {
  const extname = path.extname(fileName).slice(1)
  const currentDate = moment().format('DD-MM-YYYY-HH-mm-ss')
  const uniqueSuffix = Math.round(Math.random() * 1E9)

  const file_name = `${uniqueSuffix}-${currentDate}.${extname}`
  return { file_name, extname }
}
