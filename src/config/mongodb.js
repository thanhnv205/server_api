import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// khởi tạo 1 đối tượng trelloDatabaseInstance ban đầu là null (vì chưa connect)
let trelloDatabaseInstance = null

// khởi tạo đôi tượng client instance để connect mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

// kết nối database
export const connectDB = async () => {
    await mongoClientInstance.connect()

    // kết nối thành công => lấy ra database theo tên và gán vào biến trelloDatabaseInstance
    trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}


// export trelloDatabaseInstance sau khi connect thành công tới mongoDB
export const getDB = () => {
    if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')

    return trelloDatabaseInstance
}

// đóng kết nối database
export const closeDB = async () => {
    await mongoClientInstance.close()
}