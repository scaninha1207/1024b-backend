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


/*
## Exercício 2

**Na exercício anterior, criamos juntos a rota PUT /produto/:id que atualiza um produto no banco. Porém, o código que fizemos possui um problema: 
se o cliente não enviar todos os campos no body, os campos não enviados são sobrescritos com null, apagando os dados que já estavam salvos no banco.***/

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

/*## Exercício 3

Atualizar preço com data_modificacao automática
Enunciado: Crie a rota PUT /produto_preco/:id. Recebe o id pela URL e o novo preço pelo body. 
Além do preço, o servidor deve atualizar data_modificacao automaticamente com new Date(). 
Retornar 404 se não encontrar, 200 se atualizar./*/

app.put('/produto_preco/:id', async (req, res) => {
  try {

    const { id } = req.params;

    const { preco } = req.body;

    const data_modificacao = new Date();


    const [resultado] = await connection.execute<ResultSetHeader>(
      `
      UPDATE produto
      SET preco = ?, data_modificacao = ?
      WHERE id = ?
      `,
      [preco, data_modificacao, id]
    );


    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Produto não encontrado!"
      });
    }


    return res.status(200).json({
      mensagem: "Preço atualizado com sucesso!"
    });


  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    mysqlErrorHandle.validar();
  }
});


/*## Exercício 4

Crie a rota PUT /produto_completo/:id. Recebe o id pela URL e qualquer combinação de nome, preco e categoria pelo body.
O servidor deve buscar o produto no banco antes de atualizar.
Se não existir, retornar 404.
Para cada campo não enviado, manter o valor original do banco usando o operador ??.
Atualizar também data_modificacao com new Date().
Retornar 200 com mensagem de sucesso.*/

app.put('/produto_completo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produto : any = await connection.execute(
      `
      SELECT * FROM produto
      WHERE id = ?
      `,
      [id]
    );
    if (produto.length === 0) {
      return res.status(404).json({
        mensagem: "Produto não encontrado!"
      });
    }
    const produtoAtual = produto[0];
    let { nome, preco, categoria } = req.body;
    nome = nome ?? produtoAtual.nome;
    preco = preco ?? produtoAtual.preco;
    categoria = categoria ?? produtoAtual.categoria;
    const data_modificacao = new Date();
    await connection.execute(
      `
      UPDATE produto
      SET nome = ?, preco = ?, categoria = ?, data_modificacao = ?
      WHERE id = ?
      `,
      [nome, preco, categoria, data_modificacao, id]
    );
    return res.status(200).json({
      mensagem: "Produto atualizado com sucesso!"
    });

  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    mysqlErrorHandle.validar();
  }
});

//PACHT
/*## Exercicio 1
**Crie a rota PATCH /pessoa/:id. O cliente envia apenas o novo nome pelo body. O servidor deve verificar se a pessoa existe — se não existir, retornar 404. 
Se o campo nome não for enviado, retornar 400. Se atualizar com sucesso, retornar 200.***/ 
app.patch('/pessoa/:id', async (req, res) => {
  try {

    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({
        mensagem: "Nome obrigatório"
      });
    }
    const pessoa : any = await connection.execute(
      `
      SELECT * FROM pessoa
      WHERE id = ?
      `,
      [id]
    );
    if (pessoa.length === 0) {
      return res.status(404).json({
        mensagem: "Pessoa não encontrada!"
      });
    }
    await connection.execute(
      `
      UPDATE pessoa
      SET nome = ?
      WHERE id = ?
      `,
      [nome, id]
    );
    return res.status(200).json({
      mensagem: "Pessoa atualizada com sucesso!"
    });
  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    mysqlErrorHandle.validar();
  }
});

/*## Exercício 2

Crie a rota PATCH /produto/:id. O cliente pode enviar qualquer combinação de nome, preco e categoria.
Os campos não enviados devem manter o valor atual do banco usando ??.
Atualizar data_modificacao automaticamente.
Retornar 404 se não encontrar, 200 se atualizar. */
app.patch('/produto/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produto : any = await connection.execute(
      `
      SELECT * FROM produto
      WHERE id = ?
      `,
      [id]
    );
    if (produto.length === 0) {
      return res.status(404).json({
        mensagem: "Produto não encontrado!"
      });
    }
    const produtoAtual = produto[0];
    let { nome, preco, categoria } = req.body;
    nome = nome ?? produtoAtual.nome;
    preco = preco ?? produtoAtual.preco;
    categoria = categoria ?? produtoAtual.categoria;
    const data_modificacao = new Date();
    await connection.execute(
      `
      UPDATE produto
      SET nome = ?, preco = ?, categoria = ?, data_modificacao = ?
      WHERE id = ?
      `,
      [nome, preco, categoria, data_modificacao, id]
    );
 return res.status(200).json({
      mensagem: "Produto atualizado com sucesso!"
    });


  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    mysqlErrorHandle.validar();
  }
});


    /*
    ## Exercicio 3

**Crie a rota PATCH /produto_categoria. O cliente envia categoria_atual e nova_categoria pelo body. 
Atualizar a categoria de todos os produtos que tiverem categoria_atual. 
Se não existir nenhum, retornar 404. Retornar 200 com "X produtos atualizados com sucesso!".** 
    */
app.patch('/produto_categoria', async (req, res) => {
  try {
    const { categoria_atual, nova_categoria } = req.body;
    const [resultado] = await connection.execute<ResultSetHeader>(
      `
      UPDATE produto
      SET categoria = ?
      WHERE categoria = ?
      `,
      [nova_categoria, categoria_atual]
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Nenhum produto encontrado!"
      });
    }
    const quantidade = resultado.affectedRows;
    return res.status(200).json({
      mensagem: quantidade + " produtos atualizados com sucesso!"
    });
  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    mysqlErrorHandle.validar();
  }
});
   
/*
## Exercicio 4

**Crie a rota PATCH /produto_desconto/:id. O cliente envia percentual_desconto (0 a 100) pelo body. Calcular o novo preço: preco - (preco * percentual / 100). 
Atualizar data_modificacao.Retornar 404 se não encontrar, 200 com "Desconto aplicado! Novo preço: R$ X".**
*/
app.patch('/produto_desconto/:id', async (req, res) => {
  try {

    const { id } = req.params;
    const { percentual_desconto } = req.body;
    const produto : any = await connection.execute(
      `
      SELECT * FROM produto
      WHERE id = ?
      `,
      [id]
    );
    if (produto.length === 0) {
      return res.status(404).json({
        mensagem: "Produto não encontrado!"
      });
    }
    const produtoAtual = produto[0];
    const novoPreco = produtoAtual.preco - 
    (produtoAtual.preco * percentual_desconto / 100);
    const data_modificacao = new Date();
    await connection.execute(
      `
      UPDATE produto
      SET preco = ?, data_modificacao = ?
      WHERE id = ?
      `,
      [novoPreco, data_modificacao, id]
    );
    return res.status(200).json({
      mensagem: "Desconto aplicado! Novo preço: R$ " + novoPreco
    });
  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res);
    mysqlErrorHandle.validar();
  }
});





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