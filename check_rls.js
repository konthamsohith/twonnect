const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'TwOnnect@2007',
    host: 'db.yzjbfyemlaccgsqsznjf.supabase.co',
    port: 5432,
    database: 'postgres',
    ssl: { rejectUnauthorized: false } // Supabase usually requires SSL
});

async function main() {
    await client.connect();

    try {
        const res = await client.query(`
            SELECT 
                schemaname, 
                tablename, 
                policyname, 
                permissive, 
                roles, 
                cmd, 
                qual, 
                with_check 
            FROM pg_policies 
            WHERE tablename = 'chats';
        `);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error("Error running query:", err);
    } finally {
        await client.end();
    }
}

main();
