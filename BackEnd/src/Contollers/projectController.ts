import {Request,Response} from 'express'
import{ v4 as uid} from 'uuid'
import mssql from 'mssql'
import {sqlConfig} from "../Config/Config"
import projectCustom from '../Interfaces/projectCustom'
import { projectSchema } from '../Helpers/projectValidator'



export const projectController = async(req:projectCustom,res:Response)=>{
    try {

        // const id = uid();
        const{projectName,projectDescription,projectTimeLine} = req.body;
        const {error, value} = projectSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const pool = await mssql.connect(sqlConfig); 
        
        if(pool.connected){
            console.log("connected successfully");
            
        }
        await pool.request()
        .input('projectName',mssql.VarChar,projectName)
        .input('projectDescription',mssql.VarChar,projectDescription)
        .input('projectTimeline',mssql.VarChar,projectTimeLine)
        .execute("createProjects")

        return res.json({
            message:"project created successfully..."
        })
   
    } catch (error) {
    return res.status(400).json({
        message:error
    })

      
        
    }
}