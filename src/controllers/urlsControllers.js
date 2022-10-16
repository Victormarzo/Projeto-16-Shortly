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
export{postShorten}