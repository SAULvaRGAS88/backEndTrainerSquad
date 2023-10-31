const negocio = require('../negocio/personal_negocio')

// Iniciando CRUD

// Create
async function addUsuario(req, res) {
    const usuario = req.body

    try {
        const usuarios = await negocio.addUsuario(usuario)
        res.status(201).json(usuarios)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

// Read
async function buscarUsuario(req, res) {
    const usuario = req.body

    try {
        const usuarios = await negocio.selecionarUsuarios(usuario)
        res.status(200).json(usuarios)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

async function buscarUsuarioPorNome(req, res) {
    const nome = req.params.nome

    try {
        const nomeUsuario = await negocio.buscarUsuarioPorNome(nome)
        res.status(200).json(nomeUsuario)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

async function buscarUsuarioPorEmail(req, res) {
    const email = req.params.email

    try {
        const emailUsuario = await negocio.buscarUsuarioPorEmail(email)
        res.status(200).json(emailUsuario)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

async function buscarUsuarioPorId(req, res) {
    const id = req.params.id

    try {
        const idUsuario = await negocio.buscarUsuarioPorId(id)
        res.status(200).json(idUsuario)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

// Update
async function atualizarUsuario(req, res) {
    const id = req.params.id
    const usuario = req.body

    try {
        const usuarioAtualizado = await negocio.atualizarUsuario(id, usuario)
        res.status(200).json(usuarioAtualizado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

// Delete
async function deletarUsuario(req, res) {
    const id = req.params.id

    try {
        const usuarioDeletado = await negocio.deletarUsuario(id)
        res.status(200).json(usuarioDeletado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

module.exports = {
    addUsuario,
    buscarUsuario,
    buscarUsuarioPorNome,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario
}