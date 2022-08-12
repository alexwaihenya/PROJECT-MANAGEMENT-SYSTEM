import express, { json, Router, text } from 'express';
import router from './Routes/projectRoute';
import router1 from './Routes/userRoute';
const app = express();
app.use(json());

app.use("/projects",router)
app.use("/users",router1)


app.listen(5000,()=>{
    console.log("App is running...");
    
})



