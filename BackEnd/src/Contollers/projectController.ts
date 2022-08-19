import {Response} from 'express'
import{ v4 as uid} from 'uuid'
import mssql, { connect, RequestError } from 'mssql'
import {sqlConfig} from "../Config/Config"
import projectCustom, { project } from '../Interfaces/projectCustom'
import { projectSchema, projectSchema2 } from '../Helpers/projectValidator'



export const createproject = async(req:projectCustom,res:Response)=>{
    try {

      
        const{project_name,project_desc,project_timeline,email} = req.body;
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
        .input('project_name',mssql.VarChar,project_name)
        .input('project_desc',mssql.VarChar,project_desc)
        .input('project_timeline',mssql.VarChar,project_timeline)
        .input('email',mssql.VarChar,email)
        .execute("createProject")

       
        return res.json({
            message:"project created successfully..."
        })
   
    } catch (error) {
    return res.status(400).json({
        message:error
    })

      
        
    }
}

export const deleteProject = async(req:projectCustom,res:Response)=>{
    try {
        const id = parseInt(req.params.id);

        const pool = await mssql.connect(sqlConfig);
        if(pool.connected){
            console.log("connected...");
            
        }

        await pool.request()
        .input('id', mssql.Int,id)

        .execute('deleteProject' )

        return res.json({
            message: "project deleted successfully"
        })
        
        
    } catch (error) {
        // console.log(error);
        
        return res.json({
            message: error
        })
        
    }
}

export const getAllProjects = async(req:projectCustom,res:Response)=>{
    try {
        
        const pool = await mssql.connect(sqlConfig);
        const results = await pool.request().query("select * from Projects");
        if (results.recordset.length == 0) {
          return res.status(406).send("No Entries Found");
        }
        return res.status(201).send(results.recordset);
      } catch (error:any) {
        return res.status(401).send(error.message);
      }
  
}
export const assignProject = async(req:projectCustom,res:Response)=>{
    try {
        const {email} = req.body
        const {error, value} = projectSchema2.validate(req.body)
        if(error){
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        

        const pool = await mssql.connect(sqlConfig)
        if (!email) {
            return res
              .status(400)
              .send({ message: "email cannot be empty" });
         }

         pool
         .request()
         .input("email", mssql.VarChar, email)
        //  .input("user_id", mssql.Int, user_id)
         .execute("assignProject", (error, results) => {
           if (error) {
             return res.status(500).send({ message: "Error" });
           }
           return res
             .status(201)
             .send({ message: `Project  Assigned Successfully to user ${email}` });
         });

    } catch (error) {
        console.log(error);
        
        
    }
}
// export const completeProject = async(req:projectCustom,res:Response)=>{
//     try {
//         const id = req.body.id;
//         const user_id = req.body.user_id

//         const pool = await mssql.connect(sqlConfig)
//         if (!id || !user_id) {
//             return res
//               .status(400)
//               .send({ message: "User ID and Project ID cannot be empty" });
//          }

//          pool
//          .request()
//          .input("id", mssql.Int, id)
//          .input("user_id", mssql.Int, user_id)
//          .execute("completeProjects", (error, results) => {
//            if (error) {
//              return res.status(500).send({ message: "Error" });
//            }
//            return res
//              .status(201)
//              .send({ message: "Project has been submitted..." });
//          });

//     } catch (error) {
//         console.log(error);
        
        
//     }
// }
export const completeProject = async (req:projectCustom, res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)

        const complete:project[] = await(
        await pool.request()
        .execute('completeProjects')).recordset

        res.status(200).json({
            complete
        })
    } catch (error) {
        error
    }
}
export const pendingProjects = async (req:projectCustom, res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig);

        const project: project[]= await(
        await pool.request()
        .execute('pendingProjects')).recordset

        res.status(200).json({
            project
        })
    } catch (error) {
        error
    }
}
