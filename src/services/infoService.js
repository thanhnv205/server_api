import { infoModel } from '~/models/infoModel'
import CodeIdGenerator from '~/utils/CodeIdGenerator'


const getInfo = async () => {
  try {
    return await infoModel.getInfo()
  } catch (error) {
    return error
  }
}

const getByEmail = async (email) => {
  try {
    return await infoModel.getByEmail(email)
  } catch (error) {
    return error
  }
}


const codeIdGenerator = new CodeIdGenerator('ID')
const createInfo = async (data) => {
  try {
    const newInfo = {
      ...data,
      code_id: codeIdGenerator.generateCodeId()
    }

    const createdUser = await infoModel.createInfo(newInfo)
    return await infoModel.findOneById(createdUser.insertedId)
  } catch (error) {
    return error
  }
}

export const infoService = {
  getInfo,
  getByEmail,
  createInfo
}