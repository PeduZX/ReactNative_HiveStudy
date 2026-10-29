const express = require('express');
const cors = require('cors');
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const conexao = require('../src/dbconfig');
const bcrypt = require('bcrypt');
const { WebSocketServer, WebSocket } = require("ws");
 
const app = express();
const server = http.createServer(app);
 
app.use(cors());
app.use(express.json({ limit: '8mb' }));
const uploadsDir = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsDir));
 
 
app.post('/cadastrarUsers', async (req, res) => {
    const { nome, email, senha, data_nasc } = req.body;
    if (!nome?.trim() || !email?.trim() || !senha || !data_nasc) {
        return res.status(400).json({ mensagem: 'Preencha nome, email, senha e data de nascimento' });
    }
    let hash;
    try {
        hash = await bcrypt.hash(String(senha), 10);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ mensagem: 'Erro ao proteger a senha' });
    }
 
    const sql = `INSERT INTO users (nome, email, data_nasc, senha) VALUES (?, ?, ?, ?)`;
 
    conexao.query(sql, [nome.trim(), email.trim().toLowerCase(), data_nasc, hash], (erro, resultado) => {
        if (erro) {
            console.error(erro);
            if (erro.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ mensagem: 'Este email já está cadastrado' });
            }
            return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
        }
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', id: resultado.insertId });
    });
});
 
app.post('/cadastrarAreas', (req, res) =>{
    const { nomeAreaMentorar, nomeAreaMentorado, users_id } = req.body;
    if (!nomeAreaMentorar || !nomeAreaMentorado || !Number.isInteger(Number(users_id)) || Number(users_id) <= 0) {
        return res.status(400).json({ mensagem: 'Áreas e usuário são obrigatórios' });
    }
    const sql = `INSERT INTO funcoesUser (nomeAreaMentorar, nomeAreaMentorado, users_id) VALUES (?, ?, ?)`;
 
    conexao.query(sql, [nomeAreaMentorar, nomeAreaMentorado, Number(users_id)], (erro) => {
        if (erro) {
            console.error(erro);
            return res.status(500).json({ mensagem: 'Erro ao cadastrar área' });
        }
        res.json({ mensagem: 'Área cadastrada com sucesso' });
    });
})
 
 
app.post('/loginUsers', (req, res) => {
    const { email, senha } = req.body;
    if (!email?.trim() || !senha) {
        return res.status(400).json({ mensagem: 'Informe email e senha' });
    }
    const sql = `SELECT * FROM users WHERE email = ?`;
 
    conexao.query(sql, [email.trim().toLowerCase()], async (erro, resultado) => {
        try {
            if (erro) return res.status(500).json({ mensagem: 'Erro no servidor' });
            if (resultado.length === 0) return res.status(400).json({ mensagem: 'Email ou senha incorretos' });
 
            const usuario = resultado[0];
            let senhaCorreta;
            try {
                senhaCorreta = await bcrypt.compare(String(senha), String(usuario.senha));
            } catch (erroSenha) {
                console.error('Hash de senha inválido para o usuário:', usuario.id, erroSenha);
                return res.status(400).json({ mensagem: 'A senha salva para esta conta é inválida. Cadastre uma conta nova ou redefina a senha.' });
            }
 
            if (!senhaCorreta) {
                return res.status(400).json({ mensagem: 'Email ou senha incorretos' });
            }
            res.json({
                mensagem: 'Login realizado com sucesso',
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                pontos: usuario.pontos || 0,
                fotoPerfil: usuario.fotoPerfil || null,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao processar login' });
        }
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


app.get('/exibirPontos', (req, res) => {
    const { userId } = req.query;
    const sql = userId
        ? `SELECT id, nome, pontos FROM users WHERE id = ?`
        : `SELECT id, nome, pontos FROM users ORDER BY pontos DESC`;
    const parametros = userId ? [userId] : [];

    conexao.query(sql, parametros, (erro, resultado) => {
        if (erro) {
            console.error(erro);
            return res.status(500).json({ mensagem: 'Erro ao buscar pontos' });
        }
        res.json({ pontos: resultado });
    });
});

app.put('/editarUsers/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { nome, senha, fotoPerfil } = req.body;
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ mensagem: 'ID de usuário inválido' });
    }

    const campos = [];
    const valores = [];
    let arquivoNovo = null;
    let fotoAntiga = null;
    let removerFoto = false;

    try {
        if (typeof nome === 'string' && nome.trim()) {
            campos.push('nome = ?');
            valores.push(nome.trim());
        }
        if (typeof senha === 'string' && senha.length) {
            campos.push('senha = ?');
            valores.push(await bcrypt.hash(senha, 10));
        }
        if (fotoPerfil !== undefined) {
            if (fotoPerfil === null) {
                campos.push('fotoPerfil = NULL');
                removerFoto = true;
            } else {
            if (typeof fotoPerfil !== 'string') {
                return res.status(400).json({ mensagem: 'Foto inválida' });
            }
            const match = fotoPerfil.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
            if (!match) {
                return res.status(400).json({ mensagem: 'Envie uma imagem JPEG, PNG ou WebP válida' });
            }
            const bytes = Buffer.from(match[2], 'base64');
            if (!bytes.length || bytes.length > 4 * 1024 * 1024) {
                return res.status(413).json({ mensagem: 'A foto deve ter no máximo 4 MB' });
            }
            const extensao = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[match[1]];
            const nomeArquivo = `${crypto.randomUUID()}.${extensao}`;
            await fs.promises.mkdir(uploadsDir, { recursive: true });
            await fs.promises.writeFile(path.join(uploadsDir, nomeArquivo), bytes, { flag: 'wx' });
            arquivoNovo = nomeArquivo;
            campos.push('fotoPerfil = ?');
            valores.push(`/uploads/${nomeArquivo}`);
            }
        }
        if (!campos.length) {
            return res.status(400).json({ mensagem: 'Informe nome, senha ou foto para atualizar' });
        }

        conexao.query('SELECT fotoPerfil FROM users WHERE id = ?', [id], (erroBusca, usuarios) => {
            if (erroBusca) {
                if (arquivoNovo) fs.promises.unlink(path.join(uploadsDir, arquivoNovo)).catch(() => {});
                console.error(erroBusca);
                return res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
            }
            if (!usuarios.length) {
                if (arquivoNovo) fs.promises.unlink(path.join(uploadsDir, arquivoNovo)).catch(() => {});
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }
            fotoAntiga = usuarios[0].fotoPerfil;
            conexao.query(`UPDATE users SET ${campos.join(', ')} WHERE id = ?`, [...valores, id], (erroUpdate) => {
                if (erroUpdate) {
                    if (arquivoNovo) fs.promises.unlink(path.join(uploadsDir, arquivoNovo)).catch(() => {});
                    console.error(erroUpdate);
                    return res.status(500).json({ mensagem: 'Erro ao atualizar usuário' });
                }
                if ((arquivoNovo || removerFoto) && typeof fotoAntiga === 'string' && fotoAntiga.startsWith('/uploads/')) {
                    const caminhoAntigo = path.join(uploadsDir, path.basename(fotoAntiga));
                    fs.promises.unlink(caminhoAntigo).catch(() => {});
                }
                res.json({ mensagem: 'Usuário atualizado com sucesso', fotoPerfil: arquivoNovo ? `/uploads/${arquivoNovo}` : removerFoto ? null : fotoAntiga });
            });
        });
    } catch (erro) {
        if (arquivoNovo) fs.promises.unlink(path.join(uploadsDir, arquivoNovo)).catch(() => {});
        console.error(erro);
        res.status(500).json({ mensagem: 'Erro ao atualizar usuário' });
    }
});


app.get('/mensagens/:sala', (req, res) => {
    const sql = `
        SELECT m.id_mensagem, m.texto, m.data_envio, u.nome
        FROM mensagensForum m
        JOIN users u ON u.id = m.users_id
        WHERE m.sala = ?
        ORDER BY m.data_envio ASC
        LIMIT 100
    `;
 
    conexao.query(sql, [req.params.sala], (erro, resultado) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({ mensagem: 'Erro ao buscar mensagens' });
        }
        res.json({ mensagens: resultado });
    });
});
 
 
const wss = new WebSocketServer({ server });
 
wss.on("connection", (socket) => {
  console.log("Cliente conectado");
 
  socket.on("message", (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      return;
    }
    if (typeof msg.text !== "string" || !msg.text.trim()) return;
    if (!msg.users_id) return;
 
    const texto = msg.text.trim().slice(0, 500);
    const sala = String(msg.sala || "geral").slice(0, 100);
 
    conexao.query(`SELECT nome FROM users WHERE id = ?`, [msg.users_id], (erro, rows) => {
      if (erro || rows.length === 0) return;
      const nome = rows[0].nome;
 
      const sql = `INSERT INTO mensagensForum (texto, users_id, sala) VALUES (?, ?, ?)`;
      conexao.query(sql, [texto, msg.users_id, sala], (erro2) => {
        if (erro2) {
          console.log(erro2);
          return;
        }
 
        const saida = JSON.stringify({
          sender: nome,
          text: texto,
          sala,
          time: Date.now(),
        });
 
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) client.send(saida);
        });
      });
    });
  });
});
 
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
