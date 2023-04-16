import { Query } from "..";
import { User } from "../../../types";

const getAll = () => Query<User[]>("SELECT * FROM users");
const getById = (id: number) => Query<User[]>("SELECT * FROM users WHERE id=?", [id]);
const create = (name: string, email: string) => Query("INSERT INTO users (name, email) VALUES (?,?)", [name, email]);
const update = (id: number, name: string, email: string) => Query("UPDATE users SET name=?, email=? WHERE id=?", [name, email, id]);
const destroy = (id: number) => Query("DELETE FROM users WHERE id=?", [id]);

export default {
    getAll,
    getById,
    create,
    update,
    destroy
};