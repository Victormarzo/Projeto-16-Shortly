import { connection } from '../database/database.js';

async function postSignUp (req,res){
    const {name,email,passwordHash}=res.locals.body;
    try {
        await connection.query(`INSERT INTO users 
        (name,email,password) 
        VALUES ($1, $2, $3);`,
        [name,email,passwordHash]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
    }
};

export {postSignUp};