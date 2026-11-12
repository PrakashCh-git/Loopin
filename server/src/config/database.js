import mongoose from 'mongoose'



async function connecttoDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("Connected to the Database successfully")})
}


export default connecttoDB