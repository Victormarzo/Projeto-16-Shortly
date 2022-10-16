import {urlSchema} from "../schemas/schema.js"
import { nanoid } from 'nanoid'
import { connection } from "../database/database.js";

async function urlValidation (req,res,next){
    const {url}=req.body;
    const {userId}=res.locals;
    const validation = urlSchema.validate(req.body,{abortEarly:false});
    if (validation.error){
        const errors=validation.error.details.map(detail=>detail.message);
        res.status(422).send({ errors: errors });
        return;
    }else{
        let shortUrl=nanoid(8);
        res.locals.body={url,shortUrl,userId};
        next();
    }
}
async function deleteByIdValidation (req,res,next){
    const {userId}=res.locals;
    const id=req.params.id;
    try {
        const shortValidation = (await connection.query(`
            SELECT *
            FROM urls
            WHERE id = $1;`,[id])).rows[0];
        if(!shortValidation){
            res.sendStatus(404);
        }
        const userValidation = (await connection.query(`
            SELECT * 
            FROM urls
            WHERE id = $1
            AND
            "userId" = $2;`,[id,userId])).rows[0];    
        if(!userValidation){
            res.sendStatus(401);
        }

        res.locals.id=id;
        next();
        
    } catch (error) {
        console.log(error);
    }
    
    
};

export{urlValidation,deleteByIdValidation};