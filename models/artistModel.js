import { supabase } from "../config/supabase.js";

export class artistModel {
    static async getAllArtists() {
        try {
            let { data, error } = await supabase
                .from("artists")
                .select(`id, name`);
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke hente kunstnere, ${error}`);
        }
    }

    static async getArtistById(id) {
        try {
            let { data, error } = await supabase
                .from("artists")
                .select("*")
                .eq("id", id)
                .single();
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke hente kunstner, ${error}`);
        }
    }
}
