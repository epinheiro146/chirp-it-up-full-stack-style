import * as express from "express";
import Users from '../db/queries/users';

const router = express.Router();

// GET /api/users
router.get('/', async (req, res) => {
    try {
        const users = await Users.getAll();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting all users, but something went wrong." })
    }
});

// GET /api/users/?
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await Users.getById(id);
        res.json(user[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting a user, but something went wrong." })
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.json({ message: "Need both a name and email to create a new user." });
        }
        const results = await Users.create(name, email);
        res.status(201).json({ message: "New user registered.", id: results.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried adding a user, but something went wrong." })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Please make sure both your username and email fields are filled out." });
        }

        await Users.update(id, name, email);

        res.status(201).json({ message: "User information has been updated." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried updating the user, but something went wrong." })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const metaDataResults = await Users.destroy(id);
        if (metaDataResults.affectedRows) {
            res.json({ message: "User successfully deleted." });
        } else {
            res.status(404).json({ message: "User either doesn't exist or has already been deleted." })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried deleting a user, but something went wrong." })
    }
});

export default router;