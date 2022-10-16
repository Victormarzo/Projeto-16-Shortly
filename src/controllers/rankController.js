import { connection } from '../database/database.js';
export default async function getRank(req,res){
    try {
        const rank=(await connection.query(`
            SELECT u.id,
            u.name,
            COUNT(s.id)AS "linksCount",
            COALESCE(SUM(s.visits),0) AS "visitCount"
            FROM users u
            LEFT JOIN urls s ON u.id=s."userId"
            GROUP BY u.id
            ORDER BY "visitCount" DESC
            LIMIT 10;
            `)).rows
        res.status(200).send(rank);
    } catch (error) {
        console.log(error)
    }
};