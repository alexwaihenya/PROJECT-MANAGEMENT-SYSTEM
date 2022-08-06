import express, { json, Router } from 'express';
import router from './Routes/projectRoute';

const app = express();
app.use(json());

app.use("/projects",router)

app.listen(5000,()=>{
    console.log("App is running...");
    
})

