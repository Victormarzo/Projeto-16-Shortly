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
        console.log(error)
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
            res.status(200).send(urlById)
        }   
    } catch (error) {
    console.log(error)
    }
};



export{postShorten,getUrlById}