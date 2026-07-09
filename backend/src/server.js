const express = require('express');
const cors = require('cors');
const conexao = require('../src/dbconfig');
const bcrypt = require('bcrypt');
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
 
app.post('/cadastrarUsers', async (req, res) => {
    const { nome, email, senha } = req.body;
    const hash = await bcrypt.hash(senha, 10);

    const sql = `INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)`;

    conexao.query(sql, [nome, email, hash], (erro, resultado) => {
        if (erro) return res.status(500).json({ mensagem: 'Erro ao cadastrar' });
        res.json({ mensagem: 'Usuário cadastrado com sucesso' });
    });
});;


app.post('/loginUsers', (req, res) => {
    const { email, senha } = req.body;
    const sql = `SELECT * FROM users WHERE email = ?`;

    conexao.query(sql, [email], async (erro, resultado) => {
        if (erro) return res.status(500).json({ mensagem: 'Erro no servidor' });
        if (resultado.length === 0) return res.status(400).json({ mensagem: 'Email ou senha incorretos' });
        

        const usuario = resultado[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Email ou senha incorretos' });
        }
        res.json({
            mensagem: 'Login realizado com sucesso',
            email: usuario.email,
        });
    });
});

 
app.get(`/listarUsers`, (req, res) =>{
    const sql = `SELECT * FROM users`;
 
    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({mensagem: 'Erro ao buscar usuários',});
        }
        res.json({
            usuarios: resultado,
        });
    })
})
 
 
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});