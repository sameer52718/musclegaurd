import mongoose from "mongoose";


export const connectDB = () => {
    mongoose.connect(process.env.MONGO_DB_URL , {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    }).then(()=>{
        console.log("DB connection established");
    }).catch((err)=> {
        console.log(err);
    })
}
