import { Request } from "express"


export interface userCustom extends Request{

    body:{
        id: number
        username:string
        email: string
        password: string
        role: string

    }

   
}

export interface User{
    id: number
    username:string
    email: string
    password: string

}

export interface Data {
    id: number
    username:string
    email: string
    password: string
    role: string
    iat:number
    exp: number
}
