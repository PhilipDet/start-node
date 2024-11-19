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

    static async createArtist(artist) {
        try {
            let { data, error } = await supabase
                .from("artists")
                .insert([
                    {
                        name: artist.name,
                        description: artist.description,
                        image: artist.image,
                    },
                ])
                .select();
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke oprette kunstner, ${error}`);
        }
    }

    /**
     *
     * @param {object} artist
     * @returns {object}
     */
    static async updateArtist(artist) {
        try {
            let { data, error } = await supabase
                .from("artists")
                .update({
                    name: artist.name,
                    description: artist.description,
                    image: artist.image,
                })
                .eq("id", artist.id)
                .select();
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke opdatere kunstner, ${error}`);
        }
    }
}
