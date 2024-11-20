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

    static async getRecordById(id) {
        try {
            let { data, error } = await supabase
                .from("songs")
                .select("*")
                .eq("id", id)
                .single();
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke hente sang, ${error}`);
        }
    }

    /**
     *
     * @param {object} song
     * @returns {object}
     */
    static async createRecord(song) {
        try {
            let { data, error } = await supabase
                .from("songs")
                .insert([
                    {
                        title: song.title,
                        content: song.content,
                        lyrics: song.lyrics,
                        artist_id: song.artist_id,
                    },
                ])
                .select();
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke oprette sang, ${error}`);
        }
    }

    /**
     * Update Record
     * @param {object} song
     * @returns {object}
     */
    static async updateRecord(song) {
        try {
            let { data, error } = await supabase
                .from("songs")
                .update({
                    title: song.title,
                    content: song.content,
                    lyrics: song.lyrics,
                    artist_id: song.artist_id,
                })
                .eq("id", song.id)
                .select();
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke opdatere sang, ${error}`);
        }
    }

    /**
     * Delete Record
     * @param {object} song
     * @returns {object}
     */
    static async deleteRecord(song) {
        try {
            let { data, error } = await supabase
                .from("songs")
                .delete()
                .eq("id", song.id)
                .select();
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke slette sang, ${error}`);
        }
    }
}
