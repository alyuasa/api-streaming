const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const seriesSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    ano: Number,
    nota: Number,
    disponivel: Boolean,
    temporadas: Number,
    atores: Object,
    detalhes: Object
});

const Serie = mongoose.model('series', seriesSchema);

router.get('/', async (req, res) => {
    try{
        const series = await Serie.find();
        res.json(series);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;