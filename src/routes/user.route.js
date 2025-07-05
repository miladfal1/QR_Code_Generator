import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello users");
});

router.get("/:id", (req, res) => {
    res.send(`Hello user ${req.params.id}`);
});

export default router;