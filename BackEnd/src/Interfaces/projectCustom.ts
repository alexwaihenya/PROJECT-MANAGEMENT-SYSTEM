import {Request} from 'express'

interface projectCustom extends Request{
    body:{
        projectId:number;
        projectName:string;
        projectDescription:string;
        projectTimeLine:string;
        projectStatus:string;


    }
}
export default projectCustom;