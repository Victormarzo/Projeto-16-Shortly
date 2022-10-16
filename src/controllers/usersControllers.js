import { connection } from '../database/database.js';

async function postSignUp (req,res){
    const {name,email,passwordHash}=res.locals.body;
    try {
        await connection.query(`
            INSERT INTO users 
            (name,email,password) 
            VALUES ($1, $2, $3);`,
        [name,email,passwordHash]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
    }
};

async function postSignIn(req,res){
    const {id,token}=res.locals.body;
    try {
        await connection.query(`
            INSERT INTO sessions 
            ("userId",token) 
            VALUES ($1, $2);`,
        [id,token]);
        res.send({token:token}).status(200);
    } catch (error) {
        console.log(error)
    }
};

async function getMe (req,res){
    const id = res.locals.id;
    try {
        const getFirst = (await connection.query(`
            SELECT id,"shortUrl",url,visits AS "visitCount"
            FROM urls
            WHERE "userId"=$1
            
            `,[id])).rows;
        const getSecond = (await connection.query(`
            SELECT u.id,u.name, COALESCE(SUM(s.visits),0) AS "visitCount"
            FROM users u
            LEFT JOIN urls s ON u.id=s."userId"
            WHERE u.id=$1
            GROUP BY u.id;
        
        `,[id])).rows[0];
        const response={...getSecond,shortenedUrls:getFirst};
        res.status(200).send(response);
    } catch (error) {
        console.log(error)
    }
}

export {postSignUp,postSignIn,getMe};