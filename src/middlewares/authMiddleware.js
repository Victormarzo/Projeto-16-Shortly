import { connection } from '../database/database.js';

export default async function authUser (req,res,next){
    const {authorization} = req.headers
    if(!authorization){
        return res.sendStatus(401)
    }
    const token = authorization?.replace("Bearer ", "")
    try {
        const tokenValidation =(await connection.query(`
            SELECT * 
            FROM sessions
            WHERE token = $1;`,[token])).rows[0]; 
        if(!tokenValidation){
            res.sendStatus(401)
        }else{
            next()   
        }      
    } catch (error) {
        console.log(error)
    }
};
    