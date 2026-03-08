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
    valuation?: string | number;
    funding_required?: string | number;
    equity_offered?: string;
    amount_raised?: number;
}

export interface Chat {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    role: string;
    tag: 'ai' | 'investor' | 'co-founder' | 'group';
    type: 'dm' | 'group' | 'ai';
    unread: number;
    last_message?: string;
    last_message_at?: string;
    idea_id?: string;
    participants?: { user_id: string, full_name: string, avatar_url?: string }[];
}

export interface Profile {
    id: string;
    full_name: string;
    avatar_url?: string;
    updated_at: string;
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

        const { data, error: chatsError } = await supabase
            .from("chats")
            .select("*")
            .in("id", chatIds)
            .neq("type", "ai")
            .order("updated_at", { ascending: false });

        if (chatsError) throw chatsError;

        // Fetch participants for these chats to resolve names
        const { data: participants, error: p2Error } = await supabase
            .from("chat_participants")
            .select(`
                chat_id,
                user_id,
                profiles:user_id (full_name, avatar_url)
            `)
            .in("chat_id", chatIds);

        if (p2Error) throw p2Error;

        // Map participants to chats
        const chatsWithParticipants = data.map(chat => ({
            ...chat,
            participants: participants
                ?.filter(p => p.chat_id === chat.id)
                .map(p => ({
                    user_id: p.user_id,
                    full_name: (p.profiles as any)?.full_name || "User",
                    avatar_url: (p.profiles as any)?.avatar_url
                }))
        }));

        return chatsWithParticipants as Chat[];
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
            .insert([{ name: name2 || "Private Message", role: "Direct Message", tag: "co-founder", type: "dm" }])
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


export interface CollaborationRequest {
    id: number;
    idea_id: string;
    user_id: string;
    status: 'pending' | 'accepted' | 'rejected';
    message: string;
    created_at: string;
    idea_title?: string;
    idea_author_id?: string;
    user_email?: string;
    user_full_name?: string;
    user_avatar_url?: string;
}

export interface Investment {
    id?: number;
    user_id: string;
    idea_id: string;
    amount: number;
    entry_valuation: string;
    status: string;
    created_at?: string;
    idea_title?: string;
    idea_description?: string;
}

/**
 * Fetches outbound collaboration requests sent by the user.
 */
export const getOutboundCollaborationRequests = async (userId: string) => {
    if (!supabase) return [];
    try {
        const { data, error } = await supabase
            .from("collaboration_requests")
            .select(`
                *,
                ideas (title, author_id)
            `)
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) throw error;

        return data.map(req => ({
            ...req,
            idea_title: (req.ideas as any)?.title,
            idea_author_id: (req.ideas as any)?.author_id
        })) as CollaborationRequest[];
    } catch (error) {
        console.error("Error fetching outbound requests:", JSON.stringify(error, null, 2));
        return [];
    }
};

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
                profiles!user_id (full_name, avatar_url)
            `)
            .in("idea_id", ideaIds)
            .order("created_at", { ascending: false });

        if (error) throw error;

        return data.map(req => ({
            ...req,
            idea_title: (req.ideas as any)?.title,
            user_full_name: (req.profiles as any)?.full_name,
            user_avatar_url: (req.profiles as any)?.avatar_url
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

        // If accepted, ensure a group chat exists for the project
        if (status === 'accepted') {
            const { data: request } = await supabase
                .from("collaboration_requests")
                .select("idea_id, user_id")
                .eq("id", requestId)
                .single();

            if (request) {
                // Check if group chat exists for this idea
                const { data: existingChat } = await supabase
                    .from("chats")
                    .select("id")
                    .eq("idea_id", request.idea_id)
                    .eq("type", "group")
                    .maybeSingle();

                let chatId;
                if (!existingChat) {
                    // Get idea title
                    const { data: idea } = await supabase.from("ideas").select("title, author_id").eq("id", request.idea_id).single();
                    // Create group chat
                    const { data: newChat, error: chatError } = await supabase
                        .from("chats")
                        .insert({
                            name: `${idea?.title} (Team)`,
                            role: "Project Group",
                            tag: "group",
                            type: "group",
                            idea_id: request.idea_id,
                            updated_at: new Date().toISOString()
                        })
                        .select()
                        .single();

                    if (newChat) {
                        chatId = newChat.id;
                        // Add owner and first collaborator
                        await supabase.from("chat_participants").insert([
                            { chat_id: chatId, user_id: idea?.author_id },
                            { chat_id: chatId, user_id: request.user_id }
                        ]);
                    }
                } else {
                    chatId = existingChat.id;
                    // Add new collaborator to existing group
                    await supabase.from("chat_participants").upsert({
                        chat_id: chatId,
                        user_id: request.user_id
                    });
                    // Touch the chat to trigger real-time refresh for all participants
                    await supabase.from("chats").update({ updated_at: new Date().toISOString() }).eq("id", chatId);
                }

                // --- ALSO CREATE PRIVATE DM ---
                const { data: ideaDetail } = await supabase.from("ideas").select("author_id, author_name").eq("id", request.idea_id).single();
                const { data: collabProfile } = await supabase.from("profiles").select("full_name").eq("id", request.user_id).single();

                if (ideaDetail && collabProfile) {
                    // Create exactly ONE DM for the pair. 
                    // The UI will handle displaying the correct name based on who is viewing.
                    await getOrCreatePrivateChat(ideaDetail.author_id, request.user_id, collabProfile.full_name);
                }
            }
        }

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


/**
 * Fetches participants for a chat.
 */
export const getChatParticipants = async (chatId: number) => {
    if (!supabase) return [];
    try {
        const { data, error } = await supabase
            .from("chat_participants")
            .select(`
                user_id,
                profiles (full_name, avatar_url)
            `)
            .eq("chat_id", chatId);

        if (error) throw error;
        return data.map(p => ({
            user_id: p.user_id,
            full_name: (p.profiles as any)?.full_name || "Unknown User",
            avatar_url: (p.profiles as any)?.avatar_url
        }));
    } catch (error) {
        console.error("Error fetching chat participants:", error);
        return [];
    }
};

/**
 * Creates a new investment record.
 */
export const createInvestment = async (investmentData: Omit<Investment, "id" | "created_at">) => {
    if (!supabase) return null;
    try {
        const { data, error } = await supabase
            .from("investments")
            .insert([investmentData])
            .select()
            .single();

        if (error) throw error;
        return data as Investment;
    } catch (error) {
        console.error("Error creating investment:", JSON.stringify(error, null, 2));
        return null;
    }
};

/**
 * Fetches user's investments and joined venture data.
 */
export const getUserInvestments = async (userId: string) => {
    if (!supabase) return [];
    try {
        const { data, error } = await supabase
            .from("investments")
            .select(`
                *,
                ideas (title, description)
            `)
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data.map(inv => ({
            ...inv,
            idea_title: (inv.ideas as any)?.title,
            idea_description: (inv.ideas as any)?.description
        })) as Investment[];
    } catch (error) {
        console.error("Error fetching user investments:", JSON.stringify(error, null, 2));
        return [];
    }
};

/**
 * Deletes an investment record.
 */
export const deleteInvestment = async (investmentId: number) => {
    if (!supabase) return false;
    try {
        const { error } = await supabase
            .from("investments")
            .delete()
            .eq("id", investmentId);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error("Error deleting investment:", JSON.stringify(error, null, 2));
        return false;
    }
};

/**
 * Syncs user profile metadata.
 */
export const syncProfile = async (userId: string, fullName: string, avatarUrl?: string) => {
    if (!supabase) return;
    try {
        await supabase.from("profiles").upsert({
            id: userId,
            full_name: fullName,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error syncing profile:", error);
    }
};
