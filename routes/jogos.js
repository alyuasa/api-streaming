const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const jogosSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    ano: Number,
    nota: Number,
    disponivel: Boolean,
    detalhes: Object
});

const Jogo = mongoose.model('jogos', jogosSchema);

router.get('/', async (req, res) => {
    try{
        const jogos = await Jogo.find();
        res.json(jogos)
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

module.exports = router;