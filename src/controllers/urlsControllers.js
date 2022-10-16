import { connection } from '../database/database.js';

async function postShorten (req,res){
    const {url,shortUrl,userId}=res.locals.body;
    try {
        await connection.query(`
            INSERT INTO urls
            ("userId",url,"shortUrl")
            VALUES ($1, $2, $3);`,[userId,url,shortUrl]);
            res.status(201).send({shortUrl});
    } catch (error) {
        console.log(error);
    }
};

async function getUrlById (req,res){
    const id=req.params.id;
    try {
        const urlValidation = (await connection.query(`
            SELECT * 
            FROM urls
            WHERE id = $1; 
            `,[id])).rows[0];
        if(!urlValidation){
            res.sendStatus(404);
        }else{
            const {id,url,shortUrl}=urlValidation;
            const urlById={id,url,shortUrl};
            res.status(200).send(urlById);
        }   
    } catch (error) {
        console.log(error);
    }
};

async function getUrlByShortUrl (req,res){
    const shortUrl=req.params.shortUrl;
    
    try {
        const shortUrlValidation=(await connection.query(`
            SELECT * 
            FROM urls
            WHERE "shortUrl" = $1; 
            `,[shortUrl])).rows[0];   
             
        if(!shortUrlValidation){
            res.sendStatus(404);
        }else{
            let visitsUpdate=shortUrlValidation.visits+1
            await connection.query(`
            UPDATE urls
            SET visits = $1
            WHERE "shortUrl" = $2; 
            `,[visitsUpdate,shortUrl])
            res.redirect(shortUrlValidation.url);
        }
    } catch (error) {
        console.log(error);
    }
};

async function deleteById (req,res){
    const id = res.locals.id;
    await connection.query(`
        DELETE
        FROM urls
        WHERE id = $1;`,[id]);
    res.sendStatus(204);
};

export{postShorten,getUrlById,getUrlByShortUrl,deleteById}