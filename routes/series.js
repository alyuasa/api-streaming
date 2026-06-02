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

router.post('/nova-serie', async (req, res) => {
    try {
        const novaSerie = new Serie(req.body);
        await novaSerie.save();
        res.status(201).json(novaSerie);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});


router.put('/series/:id', async (req, res) => {
    try {
        const serieAtualizada = await Serie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );

        if (!serieAtualizada) {
            return res.status(404).json({
                message: "Série não encontrada",
            });
        }
        res.status(200).json(serieAtualizada);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});

router.delete('/deletar-serie/:id', async (req, res) => {
    try {
        const serieDeletada = await Serie.findByIdAndDelete(req.params.id);

        if (!serieDeletada) {
            return res.status(404).json({
                message: "Série não encontrada",
            });
        }

        res.status(200).json({
            message: "Série deletada com sucesso",
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});

router.get('/series/:id', async (req, res) => {
    try {
        const serie = await Serie.findById(req.params.id);

        if (!serie) {
            return res.status(404).json({
                message: "Série não encontrada",
            });
        }
        res.status(200).json(serie);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;