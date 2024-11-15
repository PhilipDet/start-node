import { supabase } from "../config/supabase.js";

export class songModel {
    static async getAllSongs() {
        try {
            let { data, error } = await supabase
                .from("songs")
                .select(
                    "title, content, created_at, artists(name, albums(title))"
                );
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke hente sangliste, ${error}`);
        }
    }
}
