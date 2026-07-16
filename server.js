const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const TOKEN = process.env.DISCORD_TOKEN || "METS_TON_TOKEN_ICI";

app.post('/api/lookup', async (req, res) => {
    const { userId } = req.body;
    try {
        const config = { headers: { Authorization: TOKEN } };
        const user = await axios.get(`https://discord.com/api/v9/users/${userId}`, config);
        res.json(user.data);
    } catch (e) {
        res.status(500).json({ error: e.response ? e.response.data : e.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur prêt sur port ${port}`));
