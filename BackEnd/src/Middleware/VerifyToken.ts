import { NextFunction, Request,Response } from "express";
import { Data } from "../Interfaces/userCustom";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

interface Extended extends Request{
    info?:Data
}




export const VerifyToken = (req:Extended,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers['token'] as string

        if(!token){
            return res.json({message:'You are not allowed to access this route'})
        }
        const data = jwt.verify(token,process.env.KEY as string) as Data
        req.info= data


    } catch (error) {

        return res.json({error})
        
    }
    next()
}