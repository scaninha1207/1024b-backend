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











1// Crie uam rota chamada '/cliente_data_pedido' que retorne os clientes e data que os mesmos fizeram o pedido
//Para realizar isso, utilize o banco de dados chamado dbteremercado


app.get("/cliente_data_pedido", async (req, res) => {
  try {
    const [resultado] = await connection.execute(`SELECT clientes.nome, pedidos.datapedido
FROM dbteremercado.clientes 
INNER JOIN dbteremercado.pedidos
ON clientes.idclientes = pedidos.clientes_idclientes;`);
    res.status(200).json(resultado);
  } catch (err) {
    
 const mysqlErrorHandle = new MysqlErrorHandle(err,res)
mysqlErrorHandle.validar()

}
});

//2
//Crie uma rota chamada '\pedidos_2026' que retorne idclientes, nome, idade, idpedidos, datapedido dos pedidos feitos no ano de 2026.
app.get("\pedidos_2026", async (req, res) => {
  try {
    const [resultado] = await connection.execute(`SELECT clientes.nome, pedidos.datapedido
FROM dbteremercado.clientes 
INNER JOIN dbteremercado.pedidos
ON clientes.idclientes = pedidos.clientes_idclientes WHERE datapedido >= '2026-01-01' AND datapedido <='2026-12-31;`);
    res.status(200).json(resultado);
  } catch (err) {
    
 const mysqlErrorHandle = new MysqlErrorHandle(err,res)
mysqlErrorHandle.validar()

}
});







//3 
//crie uma rota chamada '/quantidade_pedidos' que retorne um json no formato '{quantidade_pedidos:100}' com a quantidade de pedidos cadastrados na tabela pedidos.
//USE O COMANDO COUNT(*) para contar as quantidades.
app.get("/quantidade_pedidos", async (req, res) => {
  try {
    const [resultado] = await connection.execute<IQuantidadePedido[]>(`SELECT COUNT(*) AS quantidade_pedidos FROM pedidos;`);
    const [quantidadePedidos] = [...resultado]
    res.status(200).json(quantidadePedidos);
  } catch (err) {
    
 const mysqlErrorHandle = new MysqlErrorHandle(err,res)
mysqlErrorHandle.validar()

}
});




//4
//Crie uma rota chamada '/quantidade_pedidos_clientes' que retorne um json no formato '[{nome:"tere,quantidade_pedidos:1000"}]' que retorne todos os clientes e a quantidade 
//de pedidos que cada cliente fez.
app.get("/quantidade_pedidos_clientes", async (req, res) => {
  try {
    const [resultado] = await connection.execute(`SELECT clientes.nome as nome, SUM(quantidade) AS quantidade_pedidos FROM clientes 
      INNER JOIN pedidos ON clientes.idclientes = pedidos.clientes_idclientes`);
    res.status(200).json(resultado);
  } catch (err) {
    
 const mysqlErrorHandle = new MysqlErrorHandle(err,res)
mysqlErrorHandle.validar()

}
});


// //5) quantidade_produtos_por_cliente .Crie um código que retorne o nome do cliente e a quantidade de produtos que cada pedido tem formato [{nome:"Nome Cliente",idpedido:1,quantidade_produtos:1000}]
// app.get("/quantidade_produtos_por_cliente", async (req, res) => {
//   try {
//     const [resultado] = await connection.execute(` 
//         SELECT clientes.nome AS nome, SUM(quantidade) AS quantidade_produto 
//         FROM clientes  
//         INNER JOIN pedidos 
//          ON clientes.idclientes = pedidos.clientes_idclientes 
//         INNER JOIN itenspedidos  
//          ON pedidos.idpedidos = itenspedidos.pedidos_idpedidos 
//          GROUP BY clientes.nome
        
//     `);
    
//     res.status(200).json(resultado);
//   } catch (err) {
    
//  const mysqlErrorHandle = new MysqlErrorHandle(err,res)
// mysqlErrorHandle.validar()

// }
// });


//correção
app.get("/quantidade_produtos_por_cliente", async (req, res) => {
  try {
    const [resultado] = await connection.execute(` 
        SELECT clientes.nome AS nome,idpedidos, SUM(quantidade) AS quantidade_produto 
        FROM clientes  
        INNER JOIN pedidos 
         ON pedidos.clientes_idclientes  = clientes.idclientes
        INNER JOIN itenspedidos  
         ON itenspedidos.pedidos_idpedidos = pedidos.idpedidos
         GROUP BY idpedidos
        
    `);
    
    res.status(200).json(resultado);
  } catch (err) {
    
 const mysqlErrorHandle = new MysqlErrorHandle(err,res)
mysqlErrorHandle.validar()

}
});      






//6) valor_pedido_total .Crie um código que retorne o nome do clientee o valor total de cada pedido [{nome:"Nome Cliente", valor_total:1000}]
// app.get("/valor_pedido_total", async (req, res) => {
//   try {
//     const [resultado] = await connection.execute(`SELECT clientes.nome AS nome, SUM(itenspedidos.quantidade * produtos.preco) AS valor
//         FROM clientes  
//         INNER JOIN pedidos
//          ON clientes.idclientes = pedidos.clientes_idclientes
//         INNER JOIN itenspedidos  
//          ON pedidos.idpedidos = itenspedidos.pedidos_idpedidos
//         INNER JOIN produtos
//         ON idprodutos = produtos_idprodutos
//          GROUP BY clientes.nome
// ` );
//     res.status(200).json(resultado);
//   } catch (err) {
    
//  const mysqlErrorHandle = new MysqlErrorHandle(err,res)
// mysqlErrorHandle.validar()

// }
// });

//correção
app.get("/valor_pedido_total", async (req, res) => {
  try {
    const [resultado] = await connection.execute(`SELECT clientes.nome AS nome, SUM(itenspedidos.quantidade * produtos.preco) AS valor
        FROM clientes  
        INNER JOIN pedidos
         ON clientes.idclientes = pedidos.clientes_idclientes
        INNER JOIN itenspedidos  
         ON pedidos.idpedidos = itenspedidos.pedidos_idpedidos
        INNER JOIN produtos
        ON idprodutos = produtos_idprodutos
         GROUP BY idpedidos
` );
    res.status(200).json(resultado);
  } catch (err) {
    
 const mysqlErrorHandle = new MysqlErrorHandle(err,res)
mysqlErrorHandle.validar()

}
});




//1
app.post('/pessoa', async (req, res) => {

    

    try {

        const { id, nome } = req.body;

        // validação
        if (!id || !nome) {
            res.status(400).json({
                mensagem: 'id e nome sao obrigatorios'
            });

            return;
        }

        await connection.execute(
            `INSERT INTO aula1.pessoa VALUES (?, ?)`,
            [id, nome]
        );

        res.status(201).json({
            mensagem: 'Pessoa inserida com sucesso'
        });

    } catch (err) {
        const mySQLErrorHandle = new MysqlErrorHandle(err, res);
        mySQLErrorHandle.validar();
    }
})//inserir pessoa

//2
//aprimorando o post
///cadastro_produto_v2
//apenas id, nome, categoria e preco
//o servidor deve gerar data criacao e data modificacao automaticamente com new Date() e inserir data_modificacao como null. Retornar 201 com mensagem de sucesso.

app.post('/cadastro_produto_v2', async (req, res) => {
try {
        const { id, nome, categoria, preco } = req.body

        if (!id || !nome || !categoria || !preco) {
            res.status(400).json({ mensagem: 'dados invalidos' });
            return;
        }

        const data_criacao = new Date();
        const data_modificacao = null;

        const [resultado, campos] =
            await connection.execute(
                `insert into produto values (?, ?, ?, ?, ?, ?)`,
                [id, nome, categoria, preco, data_criacao, data_modificacao]
            );

        console.log(resultado);
        res.status(201).json({ mensagem: 'Produto inserido com sucesso' });
    } catch (err) {
        const mySQLErrorHandle = new MysqlErrorHandle(err, res);
        mySQLErrorHandle.validar();
    }
})

//3
app.post('/cadastro_multiplos_produtos', async (req, res) => {


    try {
        const produtos = req.body;

        if (!Array.isArray(produtos)) {
            res.status(400).json({ mensagem: 'Não é um array de produtos' });
            return;
        }

        const data_criacao = new Date();
        const data_modificacao = null;

        for (const produto of produtos) {
            const { id, nome, categoria, preco } = produto;

            if (!id || !nome || !categoria || !preco) {
                res.status(400).json({ mensagem: 'dados invalidos' });
                return;
            }

            const [resultado, campos] =
                await connection.execute(
                    `insert into produto values (?, ?, ?, ?, ?, ?)`,
                    [id, nome, categoria, preco, data_criacao, data_modificacao]
                );
        }

        res.status(201).json({ mensagem: `${produtos.length} produtos cadastrados com sucesso!` });
    } catch (err) {
        const mySQLErrorHandle = new MysqlErrorHandle(err, res);
        mySQLErrorHandle.validar();
    }
})



app.put('/produto/:id', async (req, res) => {
 
  const{id} = req.params;

  let{nome, preco, categoria} = req.body;

  preco = preco ?? null;
  categoria = categoria?? null;
  
  await connection.execute(
    `
    UPDATE produto 
    SET nome = ?, preco = ? , categoria = ? 
    WHERE id = ?
    `,
    [nome, preco, categoria, id]
  )
 
return res.json({
  mensagem:"Produto substituido"
})


})


//1.Crie a rota DELETE /produto/:id. O id vem pela URL. Se não existir, retornar 404. Se deletado, retornar 200.
// Deleta pessoa
// Deleta produto
app.delete("/produto/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await connection.execute<ResultSetHeader>(
      "DELETE FROM produto WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado!" });
    }

    return res
      .status(200)
      .json({ mensagem: "Produto deletado com sucesso!" });
  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    mysqlErrorHandle.validar();
  }
});


//2.Crie a rota DELETE /pessoa/:id. O id vem pela URL. Fazer um SELECT antes de deletar para verificar existência. Se não existir, retornar 404. Se deletado, retornar 200.
app.delete("/pessoa/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await connection.execute<ResultSetHeader>(
      "SELECT * FROM pessoa WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado!" });
    }
    await connection.execute<ResultSetHeader>(
      "DELETE FROM pessoa WHERE id = ?",
      [id]
    );

    return res
      .status(200)
      .json({ mensagem: "Produto deletado com sucesso!" });
  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    mysqlErrorHandle.validar();
  }
});

//3.Crie a rota DELETE /produto_categoria/:categoria. A categoria vem pela URL. Se não existir nenhum produto nessa categoria, retornar 404.
//  Se deletar, retornar 200 com "X produtos deletados com sucesso!".
app.delete("/produto_categoria/:categoria", async (req, res) => {
  const { categoria } = req.params;

  try {
    const [result] = await connection.execute<ResultSetHeader>(
      "DELETE FROM produto WHERE categoria = ?",
      [categoria]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Produto não encontrado!" });
    }
const quantidade = result.affectedRows
    return res
      .status(200)
      .json({ mensagem: quantidade +" Produtos deletado com sucesso!" });
  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    mysqlErrorHandle.validar();
  }
});