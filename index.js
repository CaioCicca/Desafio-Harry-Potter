const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());

const poll = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hogwarts',
    password: 'azul0404',
    port: 7007
});

app.delete('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await poll.query('DELETE FROM bruxos WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'Sucesso ao deletar' });
    } catch (error) {
        console.error('Erro ao deletar bruxo', error);
        res.status(500).send({ mensagem: 'Erro ao deletar bruxo' });
    }
});

app.put('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let { nome, idade, casa, habilidade, status_sangue, patrono } = req.body;
        status_sangue = status_sangue.toLowerCase();
        casa = casa.toLowerCase();
        
        if (status_sangue === 'puro' || status_sangue === 'mestiço' || status_sangue === 'trouxa') {

            if (casa === 'grifinoria' || casa === 'sonserina' || casa === 'lufa-lufa' || casa === 'corvinal') {
                await poll.query('UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, status_sangue = $5, patrono = $6 WHERE id = $7', [nome, idade, casa, habilidade, status_sangue, patrono, id]);
                res.status(200).send({ mensagem: 'Sucesso ao atualizar' });
            } else {
                res.status(400).send({ mensagem: 'Casa inválida' });
            }

        } else {
            res.status(400).send({ mensagem: 'Status sanguíneo inválido' });
        }
    } catch (error) {
        console.error('Erro ao atualizar', error);
        res.status(500).send({ mensagem: 'Erro ao atualizar' });
    }
});

app.post('/bruxos', async (req, res) => {
    try {
        let { nome, idade, casa, habilidade, status_sangue, patrono } = req.body;
        status_sangue = status_sangue.toLowerCase();
        casa = casa.toLowerCase();
        
        if (status_sangue === 'puro' || status_sangue === 'mestiço' || status_sangue === 'trouxa') {

            if (casa === 'grifinoria' || casa === 'sonserina' || casa === 'lufa lufa' || casa === 'corvinal') {
                await poll.query('INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa, habilidade, status_sangue, patrono]);
                res.status(201).send({ mensagem: 'Sucesso ao cadastrar o bruxo' });
            } else {
                res.status(400).send({ mensagem: 'Casa inválida' });
            }
        } else {
            res.status(400).send({ mensagem: 'Status sanguíneo inválido' });
        }
        
    } catch (error) {
        console.error('Erro ao cadastrar o bruxo', error);
        res.status(500).send({ mensagem: 'Erro ao cadastrar o bruxo' });
    }
});


app.get('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params.id;
        const resultado = await poll.query('SELECT * FROM bruxos WHERE id = $1', [id]);
        res.json({
            cadastros: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter o bruxo');
        res.status(500).send('Erro ao obter o bruxo');
    }
});

app.get('/bruxos', async (req, res) => {
    try {
        const { nome } = req.query;
        let query;
        let params;

        if (nome) {
            query = 'SELECT * FROM bruxos WHERE nome ILIKE $1';
            params = [`%${nome}%`];
        } else {
            query = 'SELECT * FROM bruxos';
            params = [];
        }

        const resultado = await poll.query(query, params);

        res.json({
            total: resultado.rowCount,
            bruxos: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter bruxos', error);
        res.status(500).send('Erro ao obter bruxos');
    }
});

app.delete('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await poll.query('DELETE FROM varinhas WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'Sucesso ao deletar' });
    } catch (error) {
        console.error('Erro ao deletar varinha', error);
        res.status(500).send({ mensagem: 'Erro ao deletar varinha' });
    }
});

app.put('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { material, comprimento, nucleo, data_fabricacao } = req.body;
        await poll.query('UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, data_fabricacao = $4 WHERE id = $5', [material, comprimento, nucleo, data_fabricacao, id]);
        res.status(200).send({ mensagem: 'Sucesso ao atualizar' });
    } catch (error) {
        console.error('Erro ao atualizar', error);
        res.status(500).send({ mensagem: 'Erro ao atualizar' });
    }
});

app.post('/varinhas', async (req, res) => {
    try {
        const { material, comprimento, nucleo, data_fabricacao } = req.body;
        await poll.query('INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, data_fabricacao]);
        res.status(201).send({ mensagem: 'Sucesso ao cadastrar a varinha' })
    } catch (error) {
        console.error('Erro ao cadastrar a varinha', error);
        res.status(500).send('Erro ao cadastrar a varinha');
    }
});

app.get('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params.id;
        const resultado = await poll.query('SELECT * FROM varinhas WHERE id = $1', [id]);
        res.json({
            cadastros: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter a varinha');
        res.status(500).send('Erro ao obter a varinha');
    }
});

app.get('/varinhas', async (req, res) => {
    try {
        const resultado = await poll.query('SELECT * FROM varinhas');
        res.json({
            total: resultado.rowCount,
            cadastros: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter todos os varinhas');
        res.status(500).send('Erro ao obter todos os varinhas');
    }
});

app.get('/', (req, res) => {
    res.send('Server OK');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});