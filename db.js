async function connect() {

    if (global.connection)
        return global.connection.connect()

    const { Pool } = require("pg")
        const pool = new Pool({
            connectionString: process.env.CONNECTION_STRING
        })

        const client = await pool.connect()
        console.log('criou o PUM....................... de conexão >>>>>> aqui o GUI chora e a mamãe não faz papa')

        const res = await client.query("select now()")
        console.log(res.rows[0])
        client.release()

        global.connection = pool
        return pool.connect()
}

connect()

// buscando todos usuarios
async function selecionarUsuarios(){

    const client = await connect() // inicia a conexão com base na função inicial "async function connect()"
    const res = await client.query("SELECT * FROM usuario") // linha responsável por executar comandos sql no banco
    return res.rows // res= resposta  rows = linhas retornadas
}

//buscando usuario por ID
async function selecionarUsuario(id){

    const client = await connect() // inicia a conexão com base na função inicial "async function connect()"
    const res = await client.query("SELECT * FROM usuario WHERE ID=$1", [id]) // linha responsável por executar comandos sql no banco
    return res.rows // res= resposta  rows = linhas retornadas
}

//inserindo Usuario
async function inserirUsuario(usuario){

    const client = await connect() // inicia a conexão com base na função inicial "async function connect()"
    const sql ="INSERT INTO usuario(senha, email, nome) VALUES ($1, $2, $3)"
    await client.query(sql , [usuario.senha, usuario.email, usuario.nome])  
} 

//Atualizando Usuario
async function atualizarUsuario(id, usuario){

    const client = await connect() // inicia a conexão com base na função inicial "async function connect()"
    const sql ="UPDATE usuario SET senha=$1, email=$2, nome=$3 WHERE id=$4"
    await client.query(sql , [usuario.senha, usuario.email, usuario.nome, id])  
} 

//Deletando Usuario
async function deletarUsuario(id){

    const client = await connect() // inicia a conexão com base na função inicial "async function connect()"
    const sql ="DELETE FROM usuario WHERE id=$1"
    await client.query(sql , [id])  
} 

module.exports ={
    selecionarUsuarios, 
    selecionarUsuario,
    inserirUsuario,
    atualizarUsuario,
    deletarUsuario 
} 