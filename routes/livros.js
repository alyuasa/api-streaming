const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const livrosSchema = new mongoose.Schema({
    titulo: String,
    autor: String,
    genero: String,
    ano: Number,
    paginas: Number,
    disponivel: Boolean,
    detalhes: Object
});

const Livro = mongoose.model('livros', livrosSchema);

router.get('/', async (req, res) => {
    try{
        const livros = await Livro.find();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;