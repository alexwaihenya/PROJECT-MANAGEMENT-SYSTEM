
import mssql, { RequestError } from "mssql";
import { sqlConfig } from "../Config/Config";
import { Response } from "express";
import { registerSchema, updateSchema, userLoginSchema } from "../Helpers/userValidator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request } from "express";
import { Data, userCustom, userDetails } from "../Interfaces/userCustom";
import { User } from "../Interfaces/userCustom";
import projectCustom, { project } from "../Interfaces/projectCustom";



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

export const getAllUsers = async(req:userCustom,res:Response)=>{
    try {
        
        const pool = await mssql.connect(sqlConfig);
        const results = await pool.request().query("select * from Users");
        if (results.recordset.length == 0) {
          return res.status(406).send("No Entries Found");
        }
        return res.status(201).send(results.recordset);
      } catch (error:any) {
        return res.status(401).send(error.message);
      }
  
}

export const pendingUsers = async(req:userCustom, res:Response)=>{
    try {
        const pool= await mssql.connect(sqlConfig)

        const users:userDetails[] = await(
            await pool.request().execute('IdleUsers')).recordset

        res.status(200).json(
            users
        )
        
    } catch (error) {
        error
    }
}

export const getHomepage=async(req:Extended, res:Response)=>{
    if(req.info){
      return res.json({message:`Welcome to the Homepage ${req.info.email}`})
    }
 }
 
 export const checkUser= async (req:Extended, res:Response)=>{
   if(req.info){
     res.json({name:req.info.username, role:req.info.role, email: req.info.email})
   }
 }

 export const updateComplete = async (req:projectCustom, res:Response)=>{
    try {
        const {id}= req.body;
        // const {error, value }= projectUserSchema2.validate(req.body)
        // if(error){
        //     return res.status(400).json({
        //         message:error.details[0].message
        //     })
        // }
        const pool = await mssql.connect(sqlConfig);

        await pool.request()
        .input('id', mssql.VarChar, id)
        .execute('setComplete')

        return res.status(200).json({
            message: "Task completed"
        })
    } catch (error) {
        if(error instanceof RequestError){
            res.status(404).json({
                message:"No Pending project with that ProjectId"
            })
        }
        else{
            res.status(500).json({
                message:"Internal Server Error"})
        }
    }
}

export const checkAssigned = async(req:userCustom, res:Response)=>{
    try {
        const pool= await mssql.connect(sqlConfig)

        const assignedproject: project[]= await(
            await pool.request()
            .execute('checkAssigned')).recordset

        res.status(200).json({
            assignedproject
        })
    } catch (error) {
        error
    }
}