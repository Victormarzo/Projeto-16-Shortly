import bcrypt from "bcrypt"
import { connection } from "../database/database.js";
import {signUpSchema} from "../schemas/schema.js"

async function postSignUpValidation(req,res,next){
    const {email,password,name}=req.body;
    const validation = signUpSchema.validate(req.body,{abortEarly:false});
    
    if (validation.error){
        const errors=validation.error.details.map(detail=>detail.message);
        res.status(422).send({ errors: errors });
        return;
    }
    try {
        const emailValidation = (await connection.query(`
            SELECT * 
            FROM users 
            WHERE email = $1;`,[email])).rows[0];
        if (emailValidation){
            return res.sendStatus(409);
        }
        const passwordHash = bcrypt.hashSync(password, 10);
        let authBody={name,email,passwordHash}
        res.locals.body=authBody
         next();
    } catch (error) {
        console.log(error)
    }   
};

export{postSignUpValidation}