import {Request} from 'express'

interface projectCustom extends Request{
    body:{
        id:number;
        project_name:string;
        project_desc:string;
        project_timeline:string;
        project_status:string;
        is_deleted:boolean;
        user_id:string;


    }
}
export default projectCustom;