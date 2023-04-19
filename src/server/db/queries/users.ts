import { Query } from "..";
import { User, UserWMentions } from "../../../types";

const getAll = () => Query<User[]>("SELECT * FROM users");

const getById = (id: number) => Query<UserWMentions[]>(
    `SELECT
    u.*,
    c.id as chirpid,
    c.content,
    a.name as chirp_author_name,
    c.userid as chirp_author_id,
    c._created
    FROM users u
    JOIN mentions m on u.id = m.userid
    JOIN chirps c on m.chirpid = c.id
    JOIN users a on c.userid = a.id
    WHERE u.id = ?`, [id]);

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