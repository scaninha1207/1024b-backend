import mysql from 'mysql2/promise';

import express from 'express'
import MysqlErrorHandle from './mysql_error_handle.js';

import connection from './mysql_connection.js'
const app = express()
app.use(express.json())



// app.get("/pessoa", async (req, res) => {  try {

//     const [resultado, campos]
//       = await connection.execute(`SELECT * FROM pessoa`)
//     console.log(resultado)
//      res.status(200).json(resultado)
//    } catch (err) {
  
// const mysqlErrorHandle = new MysqlErrorHandle(err,res)
//  mysqlErrorHandle.validar()

// }
//  })

// // }) //listar
//  app.post("/pessoa", async (req, res) => {
//   try {
// //     // "execute" irá chamar internamente a preparação e a consulta (query)
// //     // const preparacao = await connection.prepare("select * from pessoa");
//    const { id, nome } = req.body
// //     //Valide se o id e o nome foram passados corretamente. (Algum valor)
// //     //Se não foram, retone o código 400 com a mensagem "id ou nome inválidos"
// //     //Não deixe o código executar a parte de baixo quando for inválido.

//  if (id != null && nome != "") {
//       res.status(400).json({ mensagem: "Id ou nome diferente de 0" })
//    }

//     const [resultado, campos]
//       = await connection.execute(`insert into pessoa value (?,?)`, [id, nome])
//    res.status(201).json({ mesagem: "Sucesso" })
//    console.log(resultado)
//    } catch (err) {
    
//  const mysqlErrorHandle = new MysqlErrorHandle(err,res)
//  mysqlErrorHandle.validar()

//    }
//  }) 
 //inserir
//Criar servidor
 app.listen(8000, () => {
   console.log("Servidor iniciado na porta 8000")})


// Crie uam rota chamada '/cliente_data_pedido' que retorne os clientes e data que os mesmos fizeram o pedido
//Para realizar isso, utilize o banco de dados chamado dbteremercado

// /*
// // Cria a conexão com o Banco de Dados
//  const connection = mysql.createPool({  
//    host: 'localhost',
//   user: 'root',
//   database: 'dbteremercado',
// });

// 1
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
ON clientes.idclientes = pedidos.clientes_idclientes;`);
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
    const [resultado] = await connection.execute(`SELECT COUNT(quantidade) AS quantidade_pedidos
FROM itenspedidos;`);
    res.status(200).json(resultado);
  } catch (err) {
    
 const mysqlErrorHandle = new MysqlErrorHandle(err,res)
mysqlErrorHandle.validar()

}
});




//4
//Crie uma rota chamada '/quantidade_pedidos_clientes' que retorne um json no formato '[{nome:"tere,quantidade_pedidos:1000"}]' que retorne todos os clientes e a quantidade 
//de pedidos que cada cliente fez.






// try { 
//   // "execute" irá chamar internamente a preparação e a consulta (query)
//   // const preparacao = await connection.prepare("select * from pessoa");
//   const id = 7
//   const nome = "Algum nome"
//   const [resultado, campos] 
//       = await connection.execute(`insert into pessoa value (?,?)`,[id,nome])
//   console.log(resultado)
//   await connection.end();
// } catch (err) {
//   console.log(err);
// }
// */

// /**
//  * No banco de dados 'aula1' crie uma nova tabela chamada produto
//  * Na tabela produto, crie os seguintes atributos:
//  * id INT
//  * nome VARCHAR(300)
//  * categoria VARCHAR(300)
//  * preco DECIMAL(10,2)
//  * data_criacao DATATIME
//  * data_modificacao DATATIME
//  * 
//  * Crie uma rota chamada `cadastro_produto` que eu possa enviar
//  * um JSON para cadastrar um novo produto no banco de dados
//  * 
//  * Crie uma rota chamada `listar_produtos` que retorne todos
//  * os produtos cadastrados no banco de dados
//  * 
//  * Crie uma rota chamada `listar_produtos_informatica` que retorne
//  * todos os produtos da categoria informatica
//  * 
//  * Crie uma rota chamada `listar_produtos_caros` que retorne os produtos
//  * que custem mais de R$: 100,00
//  * 
//  */


// app.post("/cadastro_produto", async (req, res) => {
//   try {
//     // "execute" irá chamar internamente a preparação e a consulta (query)
//     // const preparacao = await connection.prepare("select * from pessoa");
//     const { id, nome, categoria, preco, data_criacao, data_modificacao } = req.body
//     //Valide se o id e o nome foram passados corretamente. (Algum valor)
//     //Se não foram, retone o código 400 com a mensagem "id ou nome inválidos"
//     //Não deixe o código executar a parte de baixo quando for inválido.

//     if (id == null || nome == "" || categoria == null || preco == null || data_criacao == null || data_modificacao == null) {
//       return res.status(400).json({ mensagem: "Id, nome, categoria,preço,data de criação e data de modificação são obrigatórios" })
//     }

//     const [resultado, campos]
//       = await connection.execute(`insert into produto value (?,?,?,?,?,?)`, [id, nome, categoria, preco, data_criacao, data_modificacao])
//     res.status(201).json({ mesagem: "Sucesso" })
//     console.log(resultado)
//   } catch (err) {
    
// const mysqlErrorHandle = new MysqlErrorHandle(err,res)
// mysqlErrorHandle.validar()

//   }
// }) //inserir



// app.get("/listar_produto", async (req, res) => {
//   try {
//     const [resultado] = await connection.execute(`SELECT * FROM produto`)
//     res.status(200).json(resultado);
//   } catch (err) {
    
// const mysqlErrorHandle = new MysqlErrorHandle(err,res)
// mysqlErrorHandle.validar()

//   }
// });



// app.get("/listar_produtos_informatica", async (req, res) => {
//   try {
//     const [resultado] = await connection.execute(`SELECT * FROM produto WHERE categoria = 'informatica'`);
//     res.status(200).json(resultado);
//   } catch (err) {
   
// const mysqlErrorHandle = new MysqlErrorHandle(err,res)
// mysqlErrorHandle.validar()

//   }
// });


// app.get("/listar_produtos_caros", async (req, res) => {
//   try {
//     const [resultado] = await connection.execute(`SELECT * FROM produto WHERE preco > 100.00 `);
//     res.status(200).json(resultado);
//   } catch (err) {
    
// const mysqlErrorHandle = new MysqlErrorHandle(err,res)
// mysqlErrorHandle.validar()

//   }
// });




