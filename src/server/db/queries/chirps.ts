import { Query } from "..";
import { Chirp } from "../../../types";

const getAll = () => Query<Chirp[]>("SELECT * FROM chirps");
const getById = (id: number) => Query<Chirp[]>("SELECT * FROM chirps WHERE id=?", [id]);
const create = (userid: number, content: string) => Query("INSERT INTO chirps (userid, content) VALUES (?, ?)", [userid, content]);
const update = (id: number, content: string) => Query("UPDATE chirps SET content=? WHERE id=?", [content, id]);
const destroy = (id: number) => Query("DELETE FROM chirps WHERE id=?", [id]);

export default {
    getAll,
    getById,
    create,
    update,
    destroy
};