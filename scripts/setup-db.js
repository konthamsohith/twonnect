const { Client } = require('pg');

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("Missing DATABASE_URL");
    return;
  }
  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log("Connected to db, creating tables...");

    await client.query(`
      CREATE TABLE IF NOT EXISTS chats (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        tag TEXT NOT NULL,
        type TEXT DEFAULT 'dm',
        unread INTEGER DEFAULT 0,
        last_message TEXT,
        last_message_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS chat_participants (
        chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        PRIMARY KEY (chat_id, user_id)
      );

      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
        sender_id TEXT NOT NULL, 
        text TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE OR REPLACE FUNCTION get_private_chat(user1_id UUID, user2_id UUID)
      RETURNS TABLE (chat_id INTEGER) AS $$
      BEGIN
        RETURN QUERY
        SELECT cp1.chat_id
        FROM chat_participants cp1
        JOIN chat_participants cp2 ON cp1.chat_id = cp2.chat_id
        JOIN chats c ON c.id = cp1.chat_id
        WHERE cp1.user_id = user1_id
          AND cp2.user_id = user2_id
          AND c.type = 'dm'
        LIMIT 1;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TABLE IF NOT EXISTS collaboration_requests (
        id SERIAL PRIMARY KEY,
        idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'rejected'
        message TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(idea_id, user_id)
      );

      -- Enable RLS
      ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
      ALTER TABLE chat_participants ENABLE ROW LEVEL SECURITY;
      ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
      ALTER TABLE collaboration_requests ENABLE ROW LEVEL SECURITY;

      -- Policies for collaboration_requests
      DROP POLICY IF EXISTS "collab_req_select" ON collaboration_requests;
      CREATE POLICY "collab_req_select" ON collaboration_requests FOR SELECT USING (
        auth.uid() = user_id OR 
        EXISTS (SELECT 1 FROM ideas WHERE id = idea_id AND author_id = auth.uid())
      );

      DROP POLICY IF EXISTS "collab_req_insert" ON collaboration_requests;
      CREATE POLICY "collab_req_insert" ON collaboration_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

      DROP POLICY IF EXISTS "collab_req_update" ON collaboration_requests;
      CREATE POLICY "collab_req_update" ON collaboration_requests FOR UPDATE USING (
        EXISTS (SELECT 1 FROM ideas WHERE id = idea_id AND author_id = auth.uid())
      );

      -- Policies for chat_participants
      DROP POLICY IF EXISTS "chat_participants_select" ON chat_participants;
      CREATE POLICY "chat_participants_select" ON chat_participants FOR SELECT USING (auth.uid() = user_id);

      DROP POLICY IF EXISTS "chat_participants_insert" ON chat_participants;
      CREATE POLICY "chat_participants_insert" ON chat_participants FOR INSERT WITH CHECK (auth.role() = 'authenticated');

      -- Policies for chats
      DROP POLICY IF EXISTS "chats_select" ON chats;
      CREATE POLICY "chats_select" ON chats FOR SELECT USING (
        EXISTS (SELECT 1 FROM chat_participants WHERE chat_id = id AND user_id = auth.uid()) OR type = 'ai'
      );
      
      DROP POLICY IF EXISTS "chats_insert" ON chats;
      CREATE POLICY "chats_insert" ON chats FOR INSERT WITH CHECK (auth.role() = 'authenticated');

      -- Policies for messages
      DROP POLICY IF EXISTS "messages_select" ON messages;
      CREATE POLICY "messages_select" ON messages FOR SELECT USING (
        EXISTS (SELECT 1 FROM chat_participants WHERE chat_id = messages.chat_id AND user_id = auth.uid()) OR 
        EXISTS (SELECT 1 FROM chats WHERE id = messages.chat_id AND type = 'ai')
      );

      DROP POLICY IF EXISTS "messages_insert" ON messages;
      CREATE POLICY "messages_insert" ON messages FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM chat_participants WHERE chat_id = messages.chat_id AND user_id = auth.uid()) OR
        EXISTS (SELECT 1 FROM chats WHERE id = messages.chat_id AND type = 'ai')
      );
    `);

    // Enable realtime
    console.log("Enabling realtime...");
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_publication_tables 
          WHERE pubname = 'supabase_realtime' AND tablename = 'messages'
        ) THEN
          ALTER PUBLICATION supabase_realtime ADD TABLE messages;
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM pg_publication_tables 
          WHERE pubname = 'supabase_realtime' AND tablename = 'chat_participants'
        ) THEN
          ALTER PUBLICATION supabase_realtime ADD TABLE chat_participants;
        END IF;
      END $$;
    `);

    // Seed dummy chats (Disable RLS temporarily for seeding if needed, though running as postgres bypasses it)
    const res = await client.query(`SELECT COUNT(*) FROM chats`);
    if (res.rows[0].count === '0') {
      console.log("Seeding chats...");
      await client.query(`
        INSERT INTO chats (name, role, tag) VALUES 
        ('Sohith (Realtime)', 'Co-founder', 'co-founder'),
        ('TWONNECT Assistant', 'AI Collaborator', 'ai'),
        ('Investor Group #4', 'Seed Stage LP', 'investor');
      `);

      const chats = await client.query(`SELECT id FROM chats`);
      for (const row of chats.rows) {
        await client.query(`
              INSERT INTO messages (chat_id, sender_id, text) VALUES
              ($1, 'them', 'Hello! This is a test message from Supabase.'),
              ($1, 'them', 'We can now communicate in real-time.')
          `, [row.id]);
      }
    }

    console.log("DB Setup complete!");
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

main();
