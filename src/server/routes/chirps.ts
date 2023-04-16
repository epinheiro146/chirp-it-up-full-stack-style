import * as express from "express";
import Chirps from "../db/queries/chirps";

const router = express.Router();

// GET /api/chirps
router.get('/', async (req, res) => {
    try {
        const chirps = await Chirps.getAll();
        res.json(chirps);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting all chirps, but something went wrong." })
    }
});

// GET /api/chirps/?
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const chirp = await Chirps.getById(id);
        res.json(chirp[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting a chirp, but something went wrong." })
    }
});

router.post('/', async (req, res) => {
    try {
        const { content } = req.body;
        const userid = 12;

        if (!content || typeof content !== "string" || content.length > 280) {
            return res.status(400).json({ message: "Sorry, chirps must be between 1 and 280 characters." });
        };

        const results = await Chirps.create(userid, content);
        res.status(201).json({ message: "Posted new chirp!", id: results.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried posting a chirp, but something went wrong." })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { content } = req.body;

        if (!content || typeof content !== "string" || content.length > 280) {
            return res.status(400).json({ message: "Sorry, chirps must be between 1 and 280 characters." });
        };

        await Chirps.update(id, content);

        res.status(201).json({ message: "Chirp has been updated." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried updating chirp, but something went wrong." })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const metaDataResults = await Chirps.destroy(id);
        if (metaDataResults.affectedRows) {
            res.json({ message: "Chirp successfully deleted." });
        } else {
            res.status(404).json({ message: "Chirp either doesn't exist or has already been deleted." })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried deleting chirp, but something went wrong." })
    }
});

export default router;