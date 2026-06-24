import mysql, { type RowDataPacket } from 'mysql2/promise';

import express from 'express'
import MysqlErrorHandle from './mysql_error_handle.js';
import type { ResultSetHeader } from "mysql2";

import connection from './mysql_connection.js'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())

//Criar servidor
 app.listen(8000, () => {
   console.log("Servidor iniciado na porta 8000")})

interface IQuantidadePedido extends RowDataPacket{
  quantidade_pedidos:number
}



interface IPessoa extends RowDataPacket {
  id: number;
  nome: string;
}



interface IProduto extends RowDataPacket {
  ID_PRODUTO: number;
  NOME: string;
  MARCA: string;
  TAMANHO: string;
  COR: string;
  CATEGORIA: string;
  VALOR_UNITARIO: number;
  QUANTIDADE_ESTOQUE: number;
}
interface IPedido extends RowDataPacket {
  ID_PEDIDO: number;
  ID_CLIENTE: number;
  ID_PRODUTO: number;
  QUANTIDADE: number;
  VALOR_TOTAL: number;
}

// ==================== ROTAS PESSOA ====================

// GET /pessoas
app.get('/pessoas', async (req, res) => {
  try {
    const [dados] = await connection.execute<IPessoa[]>('SELECT * FROM pessoa');
    return res.status(200).json(dados);
  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    return mysqlErrorHandle.validar();
  }
});

// POST /pessoas
app.post('/pessoas', async (req, res) => {
  const { id, nome } = req.body;

  if (!id || !nome) {
    return res.status(400).json({
      mensagem: 'Campos id e nome são obrigatórios!',
    });
  }

  try {
    const [result] = await connection.execute<ResultSetHeader>(
      'INSERT INTO pessoa (id, nome) VALUES (?, ?)',
      [id, nome]
    );

    if (result.affectedRows === 0) {
      return res.status(500).json({
        mensagem: 'Erro ao cadastrar pessoa!',
      });
    }

    return res.status(201).json({
      mensagem: 'Pessoa cadastrada com sucesso!',
    });
  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    return mysqlErrorHandle.validar();
  }
});

// PATCH /pessoa/:id
app.patch('/pessoa/:id', async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({
      mensagem: 'O campo nome é obrigatório!',
    });
  }

  try {
    const [rows] = await connection.execute<IPessoa[]>(
      'SELECT * FROM pessoa WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        mensagem: 'Pessoa não encontrada!',
      });
    }

    const [result] = await connection.execute<ResultSetHeader>(
      'UPDATE pessoa SET nome = ? WHERE id = ?',
      [nome, id]
    );

    if (result.affectedRows === 0) {
      return res.status(500).json({
        mensagem: 'Erro ao atualizar pessoa!',
      });
    }

    return res.status(200).json({
      mensagem: 'Pessoa atualizada com sucesso!',
    });
  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    return mysqlErrorHandle.validar();
  }
});

// DELETE /pessoa/:id
app.delete('/pessoa/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await connection.execute<ResultSetHeader>(
      'DELETE FROM pessoa WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Pessoa não encontrada!',
      });
    }

    return res.status(200).json({
      mensagem: 'Pessoa deletada com sucesso!',
    });
  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    return mysqlErrorHandle.validar();
  }
});

// ==================== ROTAS PRODUTO ====================

// GET /produtos
app.get('/produtos', async (req, res) => {
  try {
    const [dados] = await connection.execute<IProduto[]>(
      'SELECT * FROM produtos'
    );

    return res.status(200).json(dados);

  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    return mysqlErrorHandle.validar();
  }
});

// POST /produtos
app.post('/produtos', async (req, res) => {

  const {
    nome,
    marca,
    tamanho,
    cor,
    categoria,
    valor,
    estoque
  } = req.body;

  if (
    !nome ||
    !marca ||
    !tamanho ||
    !cor ||
    !categoria ||
    valor === undefined ||
    estoque === undefined
  ) {
    return res.status(400).json({
      mensagem: 'Todos os campos são obrigatórios.'
    });
  }

  try {

    const [result] = await connection.execute<ResultSetHeader>(
      `
      INSERT INTO produtos
      (
        NOME,
        MARCA,
        TAMANHO,
        COR,
        CATEGORIA,
        VALOR_UNITARIO,
        QUANTIDADE_ESTOQUE
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        nome,
        marca,
        tamanho,
        cor,
        categoria,
        valor,
        estoque
      ]
    );

    return res.status(201).json({
      mensagem: 'Produto cadastrado.'
    });

  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    return mysqlErrorHandle.validar();
  }
});




// PATCH /produto/:id
app.patch('/produto/:id', async (req, res) => {

  const { id } = req.params;

  const {
    nome,
    marca,
    tamanho,
    cor,
    categoria,
    valor,
    estoque
  } = req.body;

  try {

    const [rows] = await connection.execute<IProduto[]>(
      'SELECT * FROM produtos WHERE ID_PRODUTO = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado.'
      });
    }

    const produto = rows[0] as IProduto;

    await connection.execute(
      `
      UPDATE produtos
      SET
        NOME = ?,
        MARCA = ?,
        TAMANHO = ?,
        COR = ?,
        CATEGORIA = ?,
        VALOR_UNITARIO = ?,
        QUANTIDADE_ESTOQUE = ?
      WHERE ID_PRODUTO = ?
      `,
      [
        nome ?? produto.NOME,
        marca ?? produto.MARCA,
        tamanho ?? produto.TAMANHO,
        cor ?? produto.COR,
        categoria ?? produto.CATEGORIA,
        valor ?? produto.VALOR_UNITARIO,
        estoque ?? produto.QUANTIDADE_ESTOQUE,
        id
      ]
    );

    return res.status(200).json({
      mensagem: 'Produto atualizado.'
    });

  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    return mysqlErrorHandle.validar();
  }
});

// DELETE /produto/:id
app.delete('/produto/:id', async (req, res) => {

  const { id } = req.params;

  try {

    const [result] = await connection.execute<ResultSetHeader>(
      'DELETE FROM produtos WHERE ID_PRODUTO = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado.'
      });
    }

    return res.status(204).send();

  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    return mysqlErrorHandle.validar();
  }
});

//==============PEDIDOS=========================================
app.get('/pedidos', async (req, res) => {

  const [dados] = await connection.execute(
    `
    SELECT
      p.ID_PEDIDO,
      c.NOME AS CLIENTE,
      pr.NOME AS PRODUTO,
      p.QUANTIDADE,
      p.VALOR_TOTAL
    FROM pedidos p
    INNER JOIN clientes c
      ON p.ID_CLIENTE = c.ID_CLIENTE
    INNER JOIN produtos pr
      ON p.ID_PRODUTO = pr.ID_PRODUTO
    `
  );

  return res.status(200).json(dados);
});

app.post('/pedidos', async (req, res) => {

  const {
    idCliente,
    idProduto,
    quantidade,
    valorTotal
  } = req.body;

  await connection.execute(
    `
    INSERT INTO pedidos
    (
      ID_CLIENTE,
      ID_PRODUTO,
      DATA_PEDIDO,
      QUANTIDADE,
      VALOR_TOTAL
    )
    VALUES (?, ?, NOW(), ?, ?)
    `,
    [
      idCliente,
      idProduto,
      quantidade,
      valorTotal
    ]
  );

  return res.status(201).json({
    mensagem: 'Pedido cadastrado.'
  });
});