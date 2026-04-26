const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let players = {}; // temporary memory

// SIGNUP
app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    if (players[username]) {
        return res.json({ success: false, message: "User exists" });
    }

    players[username] = {
        password,
        level: 1,
        xp: 0
    };

    res.json({ success: true });
});

// LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = players[username];

    if (!user || user.password !== password) {
        return res.json({ success: false });
    }

    res.json({
        success: true,
        data: user
    });
});

// SAVE DATA
app.post("/save", (req, res) => {
    const { username, level, xp } = req.body;

    if (!players[username]) {
        return res.json({ success: false });
    }

    players[username].level = level;
    players[username].xp = xp;

    res.json({ success: true });
});

// GET PLAYER
app.get("/player/:username", (req, res) => {
    const user = players[req.params.username];

    if (!user) return res.json({ success: false });

    res.json(user);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
