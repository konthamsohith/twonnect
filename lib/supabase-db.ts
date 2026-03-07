import { supabase } from "./supabase";

export interface Profile {
    id: string;
    email: string | null;
    display_name: string | null;
    photo_url: string | null;
    last_login: string;
}

export interface Idea {
    id?: string;
    author_id: string;
    title: string;
    description: string;
    impact: string;
    status: "Draft" | "Refinement" | "Collaborative";
    collaborators: number;
    created_at: string;
    author_name: string;
    target_audience?: "Developer" | "Investor";
    valuation?: string;
    funding_required?: string;
    equity_offered?: string;
}

export interface Chat {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    role: string;
    tag: 'co-founder' | 'ai' | 'investor';
    type: 'dm' | 'group' | 'ai';
    unread: number;
    last_message?: string;
    last_message_at?: string;
}

export interface ChatMessage {
    id: number;
    chat_id: number;
    sender_id: string;
    text: string;
    created_at: string;
}

/**
 * Fetches a user profile from Supabase.
 */
export const getUserProfile = async (uid: string) => {
    if (!supabase) return null;
    try {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", uid)
            .single();

        if (error) throw error;
        return data as Profile;
    } catch (error) {
        console.error("Error fetching user profile:", JSON.stringify(error, null, 2));
        return null;
    }
};

/**
 * Updates a user profile in Supabase.
 */
export const updateUserProfile = async (uid: string, data: Partial<Profile>) => {
    if (!supabase) return;
    try {
        const { error } = await supabase
            .from("profiles")
            .update(data)
            .eq("id", uid);

        if (error) throw error;
    } catch (error) {
        console.error("Error updating user profile:", JSON.stringify(error, null, 2));
        throw error;
    }
};

/**
 * Creates a new idea in the 'ideas' table.
 */
export const createIdea = async (ideaData: Omit<Idea, "id" | "created_at" | "collaborators">) => {
    if (!supabase) throw new Error("Supabase not initialized");
    try {
        const { data, error } = await supabase
            .from("ideas")
            .insert([
                {
                    ...ideaData,
                    collaborators: 0,
                    created_at: new Date().toISOString()
                }
            ])
            .select()
            .single();

        if (error) throw error;
        return data.id;
    } catch (error) {
        console.error("Error creating idea:", JSON.stringify(error, null, 2));
        throw error;
    }
};

/**
 * Fetches all ideas for the marketplace.
 */
export const getAllIdeas = async (limit?: number) => {
    if (!supabase) return [];
    try {
        let query = supabase
            .from("ideas")
            .select("*")
            .order("created_at", { ascending: false });

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        return data as Idea[];
    } catch (error) {
        console.error("Error fetching all ideas:", JSON.stringify(error, null, 2));
        return [];
    }
};

/**
 * Fetches ideas submitted by a specific user.
 */
export const getUserIdeas = async (uid: string) => {
    if (!supabase) return [];
    try {
        const { data, error } = await supabase
            .from("ideas")
            .select("*")
            .eq("author_id", uid)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data as Idea[];
    } catch (error) {
        console.error("Error fetching user ideas:", JSON.stringify(error, null, 2));
        return [];
    }
};

/**
 * Updates an existing idea.
 */
export const updateIdea = async (id: string, ideaData: Partial<Idea>) => {
    if (!supabase) throw new Error("Supabase not initialized");
    try {
        const { error } = await supabase
            .from("ideas")
            .update(ideaData)
            .eq("id", id);

        if (error) throw error;
    } catch (error) {
        console.error("Error updating idea:", JSON.stringify(error, null, 2));
        throw error;
    }
};

/**
 * Deletes an idea.
 */
export const deleteIdea = async (id: string) => {
    if (!supabase) throw new Error("Supabase not initialized");
    try {
        const { error } = await supabase
            .from("ideas")
            .delete()
            .eq("id", id);

        if (error) throw error;
    } catch (error) {
        console.error("Error deleting idea:", JSON.stringify(error, null, 2));
        throw error;
    }
};
/**
 * Fetches all ideas marked as 'Collaborative'.
 */
export const getCollaborativeIdeas = async () => {
    if (!supabase) return [];
    try {
        const { data, error } = await supabase
            .from("ideas")
            .select("*")
            .eq("status", "Collaborative")
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data as Idea[];
    } catch (error) {
        console.error("Error fetching collaborative ideas:", JSON.stringify(error, null, 2));
        return [];
    }
};

/**
 * Fetches all chats for a specific user.
 */
export const getUserChats = async (userId: string) => {
    if (!supabase) return [];
    try {
        // First get the chat IDs the user is a participant in
        const { data: participation, error: pError } = await supabase
            .from("chat_participants")
            .select("chat_id")
            .eq("user_id", userId);

        if (pError) throw pError;
        if (!participation || participation.length === 0) return [];

        const chatIds = participation.map(p => p.chat_id);

        const { data, error } = await supabase
            .from("chats")
            .select("*")
            .in("id", chatIds)
            .order("updated_at", { ascending: false });

        if (error) throw error;
        return data as Chat[];
    } catch (error: any) {
        console.error("Error fetching user chats:", JSON.stringify(error, null, 2));
        return [];
    }
};

/**
 * Fetches all chats (Legacy/Admin potentially, but used for AI chats).
 */
export const getChats = async () => {
    if (!supabase) return [];
    try {
        const { data, error } = await supabase
            .from("chats")
            .select("*")
            .order("updated_at", { ascending: false });

        if (error) throw error;
        return data as Chat[];
    } catch (error: any) {
        if (error.code !== "PGRST205") { // Ignore missing table error during initial setup
            console.error("Error fetching chats:", JSON.stringify(error, null, 2));
        }
        return [];
    }
};

/**
 * Fetches messages for a specific chat.
 */
export const getMessages = async (chatId: number) => {
    if (!supabase) return [];
    try {
        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .eq("chat_id", chatId)
            .order("created_at", { ascending: true });

        if (error) throw error;
        return data as ChatMessage[];
    } catch (error: any) {
        if (error.code !== "PGRST205") { // Ignore missing table error during initial setup
            console.error("Error fetching messages:", JSON.stringify(error, null, 2));
        }
        return [];
    }
};

/**
 * Sends a message in a specific chat.
 */
export const sendChatMessage = async (chatId: number, text: string, senderId: string = "me") => {
    if (!supabase) return null;
    try {
        const { data, error } = await supabase
            .from("messages")
            .insert([{ chat_id: chatId, text, sender_id: senderId }])
            .select()
            .single();

        if (error) throw error;

        // Update the chat's updated_at timestamp AND the last_message preview
        await supabase.from("chats").update({
            updated_at: new Date().toISOString(),
            last_message: text,
            last_message_at: new Date().toISOString()
        }).eq("id", chatId);

        return data as ChatMessage;
    } catch (error) {
        console.error("Error sending message:", JSON.stringify(error, null, 2));
        return null;
    }
};

/**
 * Gets an existing private chat or creates a new one.
 */
export const getOrCreatePrivateChat = async (user1Id: string, user2Id: string, name2: string) => {
    if (!supabase) return null;
    try {
        // Use the RPC function we defined in the schema
        const { data: existingChat, error: rpcError } = await supabase
            .rpc('get_private_chat', { user1_id: user1Id, user2_id: user2Id });

        if (rpcError) throw rpcError;

        if (existingChat && existingChat.length > 0) {
            return existingChat[0].chat_id as number;
        }

        // Otherwise create a new chat
        const { data: newChat, error: createError } = await supabase
            .from("chats")
            .insert([{ name: name2, role: "Direct Message", tag: "co-founder", type: "dm" }])
            .select()
            .single();

        if (createError) throw createError;

        // Add both participants
        await supabase.from("chat_participants").insert([
            { chat_id: newChat.id, user_id: user1Id },
            { chat_id: newChat.id, user_id: user2Id }
        ]);

        return newChat.id as number;
    } catch (error) {
        console.error("Error in getOrCreatePrivateChat:", JSON.stringify(error, null, 2));
        return null;
    }
};

/**
 * Ensures the user has a personal AI assistant chat.
 */
export const ensureAIChat = async (userId: string): Promise<number | null> => {
    if (!supabase) return null;
    try {
        // 1. Check if user already has an AI chat participant record
        const { data: existing, error: findError } = await supabase
            .from("chat_participants")
            .select("chat_id")
            .eq("user_id", userId);

        if (findError) throw findError;

        const chatIds = existing.map(e => e.chat_id);
        if (chatIds.length > 0) {
            const { data: aiChat } = await supabase
                .from("chats")
                .select("id")
                .in("id", chatIds)
                .eq("type", "ai")
                .limit(1)
                .single();

            if (aiChat) return aiChat.id;
        }

        // 2. Create new AI chat specifically for this user
        const { data: newChat, error: createError } = await supabase
            .from("chats")
            .insert([{
                name: "TWONNECT Assistant",
                role: "AI Collaborator",
                tag: "ai",
                type: "ai",
                last_message: "Hello! I'm your TWONNECT Assistant. How can I help you today?",
                last_message_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (createError) throw createError;

        // 3. Add participant
        await supabase.from("chat_participants").insert([
            { chat_id: newChat.id, user_id: userId }
        ]);

        // 4. Add initial message in the table
        await supabase.from("messages").insert([
            { chat_id: newChat.id, text: "Hello! I'm your TWONNECT Assistant. How can I help you today?", sender_id: "ai_bot" }
        ]);

        return newChat.id as number;
    } catch (error) {
        console.error("Error in ensureAIChat:", JSON.stringify(error, null, 2));
        return null;
    }
};

export interface CollaborationRequest {
    id: number;
    idea_id: string;
    user_id: string;
    status: 'pending' | 'accepted' | 'rejected';
    message: string;
    created_at: string;
    idea_title?: string;
    user_email?: string;
}

/**
 * Resets unread count for a chat in the database.
 */
export const resetUnread = async (chatId: number) => {
    if (!supabase) return;
    try {
        await supabase.from("chats").update({ unread: 0 }).eq("id", chatId);
    } catch (error) {
        console.error("Error resetting unread count:", error);
    }
};

/**
 * Creates a collaboration request for an idea.
 */
export const createCollaborationRequest = async (ideaId: string, userId: string, message: string) => {
    if (!supabase) return null;
    try {
        const { data, error } = await supabase
            .from("collaboration_requests")
            .insert([{ idea_id: ideaId, user_id: userId, message }])
            .select()
            .single();

        if (error) throw error;
        return data as CollaborationRequest;
    } catch (error) {
        console.error("Error creating collaboration request:", JSON.stringify(error, null, 2));
        return null;
    }
};

/**
 * Fetches inbound collaboration requests for an owner's ideas.
 */
export const getInboundCollaborationRequests = async (ownerId: string) => {
    if (!supabase) return [];
    try {
        // First get ideas owned by the user
        const { data: userIdeas, error: ideasError } = await supabase
            .from("ideas")
            .select("id, title")
            .eq("author_id", ownerId);

        if (ideasError) throw ideasError;
        if (!userIdeas || userIdeas.length === 0) return [];

        const ideaIds = userIdeas.map(i => i.id);

        const { data, error } = await supabase
            .from("collaboration_requests")
            .select(`
                *,
                ideas (title),
                user_email:user_id
            `)
            .in("idea_id", ideaIds)
            .eq("status", "pending")
            .order("created_at", { ascending: false });

        if (error) throw error;

        // Note: Map data to include titles if needed, or rely on join
        return data.map(req => ({
            ...req,
            idea_title: (req.ideas as any)?.title,
            // Since we don't have a direct join to auth.users easily here without more setup, 
            // we'll just return user_id as email for now or fetch profiles if needed.
        })) as CollaborationRequest[];
    } catch (error) {
        console.error("Error fetching inbound requests:", JSON.stringify(error, null, 2));
        return [];
    }
};

/**
 * Updates the status of a collaboration request.
 */
export const updateCollaborationRequestStatus = async (requestId: number, status: 'accepted' | 'rejected') => {
    if (!supabase) return false;
    try {
        // If accepted, we might want to increment collaborator count
        if (status === 'accepted') {
            const { data: request } = await supabase
                .from("collaboration_requests")
                .select("idea_id")
                .eq("id", requestId)
                .single();

            if (request) {
                // Increment collaborators count on the idea
                const { data: idea } = await supabase
                    .from("ideas")
                    .select("collaborators")
                    .eq("id", request.idea_id)
                    .single();

                if (idea) {
                    await supabase.from("ideas").update({
                        collaborators: (idea.collaborators || 0) + 1
                    }).eq("id", request.idea_id);
                }
            }
        }

        const { error } = await supabase
            .from("collaboration_requests")
            .update({ status })
            .eq("id", requestId);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error("Error updating collaboration request status:", JSON.stringify(error, null, 2));
        return false;
    }
};

/**
 * Checks if a user has already requested collaboration for an idea.
 */
export const getUserCollaborationRequest = async (ideaId: string, userId: string) => {
    if (!supabase) return null;
    try {
        const { data, error } = await supabase
            .from("collaboration_requests")
            .select("*")
            .eq("idea_id", ideaId)
            .eq("user_id", userId)
            .maybeSingle();

        if (error) throw error;
        return data as CollaborationRequest | null;
    } catch (error) {
        console.error("Error fetching user collaboration request:", JSON.stringify(error, null, 2));
        return null;
    }
};


