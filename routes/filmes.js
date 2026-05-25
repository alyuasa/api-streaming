const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const filmesSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    ano: Number,
    nota: Number,
    disponivel: Boolean,
    atores: Object,
    detalhes: Object
});

const Filme = mongoose.model('filmes', filmesSchema);

router.get('/', async (req, res) => {
    try{
        const filmes = await Filme.find();
        res.json(filmes);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

module.exports = router;