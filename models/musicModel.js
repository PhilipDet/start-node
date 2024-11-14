import { supabase } from "../config/supabase.js";

export class musicModel {
    static async getAllSongs() {
        try {
            let { data, error } = await supabase
                .from("songs")
                .select("id, title, content, created_at, artists(name)");
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke hente sangliste, ${error}`);
        }
    }

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

    static async getAllAlbums() {
        try {
            let { data, error } = await supabase
                .from("albums")
                .select(`id, title, artists(name), release_date`);
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke hente albumliste, ${error}`);
        }
    }
}
