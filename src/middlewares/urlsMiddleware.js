import {urlSchema} from "../schemas/schema.js"
import { nanoid } from 'nanoid'

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
export{urlValidation};