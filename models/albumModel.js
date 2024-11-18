import { supabase } from "../config/supabase.js";

export class albumModel {
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

    static async getAlbumById(id) {
        try {
            let { data, error } = await supabase
                .from("albums")
                .select("*")
                .eq("id", id)
                .single();
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke hente album, ${error}`);
        }
    }

    static async createAlbum(album) {
        try {
            let { data, error } = await supabase.from("albums").insert([
                {
                    artist_id: album.artist_id,
                    title: album.title,
                    description: album.description,
                    image: album.image,
                    release_date: album.release_date,
                },
            ]);
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke oprette album, ${error}`);
        }
    }
}
