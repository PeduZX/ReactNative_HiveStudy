<<<<<<< HEAD
const mysql = require('mysql2');
 
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'backendReact'
});
 
conexao.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar ao banco de dados:', erro);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados.');
});
 
=======
const mysql = require('mysql2');
 
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'backendReact'
});
 
conexao.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar ao banco de dados:', erro);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados.');
});
 
>>>>>>> 57323edffca0c2908cc22f85df1f391269f6a3c3
module.exports = conexao;