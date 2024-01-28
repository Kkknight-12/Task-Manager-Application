import mongoose from "mongoose"

console.log(process.env.MONGO_URL)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      maxPoolSize: 5,
    })
    console.log(`MongoDb Connected:: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
