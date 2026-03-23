const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'TwOnnect@2007',
    host: 'db.yzjbfyemlaccgsqsznjf.supabase.co',
    port: 5432,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
});

async function main() {
    try {
        await client.connect();
        console.log("Connected to database");

        // Check policies on chats
        const policies = await client.query(`
            SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
            FROM pg_policies 
            WHERE tablename = 'chats';
        `);
        console.log("\n--- Policies on 'chats' ---");
        console.log(JSON.stringify(policies.rows, null, 2));

        // Check triggers on chats
        const triggers = await client.query(`
            SELECT trigger_name, event_manipulation, event_object_table, action_statement 
            FROM information_schema.triggers 
            WHERE event_object_table = 'chats';
        `);
        console.log("\n--- Triggers on 'chats' ---");
        console.log(JSON.stringify(triggers.rows, null, 2));

        // Check if there are any errors or triggers on chat_participants
        const participantsPolicies = await client.query(`
            SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
            FROM pg_policies 
            WHERE tablename = 'chat_participants';
        `);
        console.log("\n--- Policies on 'chat_participants' ---");
        console.log(JSON.stringify(participantsPolicies.rows, null, 2));

        await client.end();
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
