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

router.post('/novo-jogo', async (req, res) => {
    try {
        const novoJogo = new Jogo(req.body);
        await novoJogo.save();
        res.status(201).json(novoJogo);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});


router.put('/jogos/:id', async (req, res) => {
    try {
        const jogoAtualizado = await Jogo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );

        if (!jogoAtualizado) {
            return res.status(404).json({
                message: "Jogo não encontrado",
            });
        }
        res.status(200).json(jogoAtualizado);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});

router.delete('/deletar-jogo/:id', async (req, res) => {
    try {
        const jogoDeletado = await Jogo.findByIdAndDelete(req.params.id);

        if (!jogoDeletado) {
            return res.status(404).json({
                message: "Jogo não encontrado",
            });
        }

        res.status(200).json({
            message: "Jogo deletado com sucesso",
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});

router.get('/jogos/:id', async (req, res) => {
    try {
        const jogo = await Jogo.findById(req.params.id);

        if (!jogo) {
            return res.status(404).json({
                message: "Jogo não encontrado",
            });
        }
        res.status(200).json(jogo);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;