import mysql, { type RowDataPacket } from 'mysql2/promise';

import express from 'express'
import MysqlErrorHandle from './mysql_error_handle.js';

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


// }) //listar
 app.post("/pessoa", async (req, res) => {
  try {
//     // "execute" irá chamar internamente a preparação e a consulta (query)
//     // const preparacao = await connection.prepare("select * from pessoa");
   const { id, nome } = req.body
//     //Valide se o id e o nome foram passados corretamente. (Algum valor)
//     //Se não foram, retone o código 400 com a mensagem "id ou nome inválidos"
//     //Não deixe o código executar a parte de baixo quando for inválido.

 if (id != null && nome != "") {
      res.status(400).json({ mensagem: "Id ou nome diferente de 0" })
   }

    const [resultado, campos]
      = await connection.execute(`insert into pessoa value (?,?)`, [id, nome])
   res.status(201).json({ mesagem: "Sucesso" })
   console.log(resultado)
   } catch (err) {
    
 const mysqlErrorHandle = new MysqlErrorHandle(err,res)
 mysqlErrorHandle.validar()

   }
 }) 
// inserir









