
import mssql, { RequestError } from "mssql";
import { sqlConfig } from "../Config/Config";
import { Response } from "express";
import { registerSchema, userLoginSchema } from "../Helpers/userValidator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request } from "express";
import { Data, userCustom } from "../Interfaces/userCustom";
import { User } from "../Interfaces/userCustom";



interface Extended extends Request{
    info?:Data
}


export const register = async(req:userCustom,res:Response)=>{
    try {
        

       

        const{ username,email, password}=req.body;
        const {error,value} = registerSchema.validate(req.body)
        const hashedPassword = await bcrypt.hash(password,10)
        if(error){
            return res.json({error:error.details[0].message})
        }
        
        const pool = await mssql.connect(sqlConfig)
        if(pool.connected){
            console.log("connected");

            
        }

        await pool.request()
        .input('username',mssql.VarChar,username)
        .input('email',mssql.VarChar,email)
        .input('password',mssql.VarChar,hashedPassword)
        .execute("registerUser")

        return res.json({
            message: "registered successfully..."
        })
        
    } catch (error) {
        // return res.status(400).json({
        //     message:error
        // })
        console.log(error);
        
      
        
    }

    
}

export const login = async(req:userCustom,res:Response)=>{
    try {

        const {email,password}= req.body;

     
        const{error,value}=userLoginSchema.validate(req.body)
        if(error){
            return res.json({error:error.details[0].message})
        }
        const pool = await mssql.connect(sqlConfig);

        const user:User[]= await(await pool.request()
        .input('email',mssql.VarChar,email)
        .execute('getUser')).recordset


        if(!user[0]){
            return res.json({message: "user not found"})
        }

        const validPassword = await bcrypt.compare(password,user[0].password)
        if(!validPassword){
            return res.json({message:"wrong password"})
        }

        const payLoad = user.map(item=>{
            const{password,...rest}=item
            return rest
        })

        const token = jwt.sign(payLoad[0],process.env.KEY as string,{expiresIn:'2000s'})
        res.json({
            message:"logged in",
            token
        })
        
    } catch (error) {
        console.log(error);
        
        // res.json({error})
        
    }
}

export const getHomepage=async(req:Extended, res:Response)=>{
    if(req.info){
      return res.json({message:`Welcome to the Homepage ${req.info.email}`})
    }
 }
 
 export const checkUser= async (req:Extended, res:Response)=>{
   if(req.info){
     res.json({name:req.info.username, role:req.info.role})
   }
 }