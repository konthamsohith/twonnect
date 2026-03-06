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
}

/**
 * Fetches a user profile from Supabase.
 */
export const getUserProfile = async (uid: string) => {
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
export const getAllIdeas = async () => {
    try {
        const { data, error } = await supabase
            .from("ideas")
            .select("*")
            .order("created_at", { ascending: false });

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
