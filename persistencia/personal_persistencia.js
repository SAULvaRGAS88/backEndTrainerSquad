const connect = require("../db");
<<<<<<< HEAD

// async function selecionarUsuarios(){

//     const client = await connect() // inicia a conexão com base na função inicial "async function connect()"
//     const res = await client.query("SELECT * FROM usuario") // linha responsável por executar comandos sql no banco
//     return res.rows // res= resposta  rows = linhas retornadas 
// }
 

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
=======
>>>>>>> devPaola

// Create
async function addUsuario(usuario) {
    const client = await connect()
   
    try {
        const sql = `INSERT INTO usuario(nome, email, senha) VALUES($1, $2, $3) RETURNING *`
        const values = [usuario.nome, usuario.email, usuario.senha]
        const usuarios = await client.query(sql, values)

        // console.log("teste", usuarios.rows[0])  
        client.release()
        return usuarios.rows[0]

    } catch (error) { throw error }
}

// Read
async function buscarUsuario() {
    const client = await connect()

    try {
        const sql = `SELECT * FROM usuario`
        const usuario = await client.query(sql)

        client.end()
        return usuario.rows
    } catch (error) { throw error }
}

async function buscarUsuarioPorNome(nome) {
    const client = await connect()

    try {
        const sql = `SELECT * FROM usuario WHERE nome = $1`
        const values = [nome]
        const nomeUsuario = await client.query(sql, values)

        client.end()
        return nomeUsuario.rows[0]
    } catch (error) { throw error }
}

async function buscarUsuarioPorEmail(email) {
    const client = await connect()
    try {
        const sql = `SELECT * FROM usuario WHERE email = $1`
        const values = [email]
        const emailUsuario = await client.query(sql, values)

        client.end()
        return emailUsuario.rows[0]
    } catch (error) { throw error }
}

async function buscarUsuarioPorId(id) {
    const client = await connect()

    try {
        const sql = `SELECT * FROM usuario WHERE id = $1`
        const values = [id]
        const idUsuario = await client.query(sql, values)

        client.end()
        return idUsuario.rows[0]
    } catch (error) { throw error }
}

// Update
async function atualizarUsuario(id, usuarios) {
    const client = await connect()

    try {
        const sql = `UPDATE usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *`
        const values = [usuarios.nome, usuarios.email, usuarios.senha, id]
        const usuarioAtualizado = await client.query(sql, values)

        client.end()
        return usuarioAtualizado.rows[0]
    } catch (error) { throw error }
}

// Delete
async function deletarUsuario(id) {
    const client = await connect()
    try {
        const sql = `DELETE FROM usuario WHERE id = $1 RETURNING *`
        const values = [id]
        const clienteDeletado = await client.query(sql, values)

        client.end()
        return clienteDeletado.rows[0]
    } catch (error) { throw error }
}

module.exports = {
    addUsuario,
    buscarUsuario,
    buscarUsuarioPorNome,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario,
    
}