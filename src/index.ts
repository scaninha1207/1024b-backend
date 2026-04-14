import mysql from 'mysql2/promise';

import express from 'express'
import MysqlErrorHandle from './mysql_error_handle.js';

import connection from './mysql_connection.js'
const app = express()
app.use(express.json())




/////// PROVA 



//(1,0 ponto) Explique o que é o typescripte para que ele serve. 
// É uma extensão da linguagem JavaScript e adiciona recursos de tipagem estática, classes, 
// interfaces e outros recursos avançados para ajudar a tornar o desenvolvimento de software 
// mais fácil, mais escalável e mais seguro.


//(1,0 ponto) Para que serve o express.json() no código feito em sala de aula e o que acontece se eu não colocar ele no código?
// ele processa dados  retorna uma resposta, o modulo não funciona, no nosso codigo ele está exportando o modúlo express, sem ele a aplicação não funcionaria.





//(2,0 pontos) Considerando o código de banco de dados passado para resolução de prova, crie uma rota para cadastro de pizzas
//  id_pizza INT PRIMARY KEY,
//     nome_pizza VARCHAR(200),
//     tamanho_pizza VARCHAR(50),
//     preco_pizza DECIMAL(10,2),
//     data_criacao_pizza DATE
// INSERT INTO `pizzaria`.`pizza` (`id_pizza`, `nome_pizza`, `tamanho_pizza`, `preco_pizza`, `data_criacao_pizza`) VALUES ('1', 'sdasd', 'g', '4545', '2024/03/21');
// INSERT INTO `pizzaria`.`pizza` (`id_pizza`, `nome_pizza`, `tamanho_pizza`, `preco_pizza`, `data_criacao_pizza`) VALUES ('2', 'dasdasd', 'g', '528', '2025/01/02');
// INSERT INTO `pizzaria`.`pizza` (`id_pizza`, `nome_pizza`, `tamanho_pizza`, `preco_pizza`, `data_criacao_pizza`) VALUES ('5', 'zsxdasd', 'g', '2658', '2026/05/04');
// INSERT INTO `pizzaria`.`pizza` (`id_pizza`, `nome_pizza`, `tamanho_pizza`, `preco_pizza`, `data_criacao_pizza`) VALUES ('3', 'asdasd', 'm', '147', '2024/10/5');


app.post("/cadastro_pizza", async (req, res) => {
  try {
    const preparacao = await connection.prepare("select * from pizza");
    const { id_pizza, nome_pizza, tamanho_pizza, preco_pizza, data_criacao_pizza} = req.body

    if (id_pizza ==  null || nome_pizza == "" || tamanho_pizza== ""|| preco_pizza == null || data_criacao_pizza == null ) {
      return res.status(400).json({ mensagem: "Id, nome, tamanho,data de criação são obrigatórios" })
    }

    const [resultado, campos]
      = await connection.execute(`insert into produto value (?,?,?,?,?)`, [id_pizza, nome_pizza,tamanho_pizza, preco_pizza, data_criacao_pizza])
    res.status(201).json({ mesagem: "Sucesso" })
    console.log(resultado)
  } catch (err) {
    
const mysqlErrorHandle = new MysqlErrorHandle(err,res)
mysqlErrorHandle.validar()

  }
}) 



// (2,0 pontos) Crie uma rota /listar_pizzas que faça a listagem do nome , tamanho e preco da tabela pizza no banco de dados pizzaria .
 app.get("/listar_pizza", async (req, res) => {
   try {
     const [resultado] = await connection.execute(`SELECT nome_pizza, tamanho_pizza, preco_pizza  FROM pizza`)
    res.status(200).json(resultado);
  } catch (err) {
    
 const mysqlErrorHandle = new MysqlErrorHandle(err,res)
 mysqlErrorHandle.validar()

  }
});


// (2,0 pontos) Crie uma rota /listar_pizzas_grandes que faça a listagem das colunas id, nome , tamanho, preco, data_criacao  da tabela pizza no banco de dados pizzaria .

app.get("/listar_pizzas_grandes", async (req, res) => {
  try {
    const [resultado] = await connection.execute(`SELECT * FROM pizza WHERE tamanho = "g"`);
    res.status(200).json(resultado);
  } catch (err) {
    
const mysqlErrorHandle = new MysqlErrorHandle(err,res)
mysqlErrorHandle.validar()

  }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








 app.get("/pessoa", async (req, res) => {  try {

    const [resultado, campos]
      = await connection.execute(`SELECT * FROM pessoa`)
    console.log(resultado)
     res.status(200).json(resultado)
   } catch (err) {
  
const mysqlErrorHandle = new MysqlErrorHandle(err,res)
 mysqlErrorHandle.validar()

}
 })

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
 }) //inserir
//Criar servidor
 app.listen(8000, () => {
   console.log("Servidor iniciado na porta 8000")})



// /*
// // Cria a conexão com o Banco de Dados
// const connection = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'aula1',
// });
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


