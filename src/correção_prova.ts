import mysql from 'mysql2/promise'
import express from 'express'
import MysqlErrorHandle from './mysql_error_handle.js';
import  connection from './mysql_connection.js';
import { type RowDataPacket } from "mysql2";
import { time } from 'node:console';
interface Ipizza extends RowDataPacket{
  id:number
  nome:string
  preco:number
  tamanho:string
  data_criacao:Date
}

const app = express()
app.use(express.json())



app.listen(8000, () => {
    console.log("Servidor iniciado na porta 8000")})




app.post("/cadastro_pizza", async (req, res) => {
  try {
  
    const { id_pizza, nome_pizza, tamanho_pizza, preco_pizza, data_criacao_pizza} = req.body
 

    if (id_pizza != null || id_pizza < 0 || nome_pizza == "" ||  preco_pizza <= 0 ) {
  return res.status(500).json({ mensagem: "Id ou nome inválidos" })
}

    const [resultado, campos]
      = await connection.execute(`insert into pizza value (?,?,?,?,?)`, [ id_pizza, nome_pizza, tamanho_pizza, preco_pizza, data_criacao_pizza ])
    res.status(201).json({ mesagem: "Sucesso" })
    console.log(resultado)
  } catch (err) {0
    const mysqlErrorHandle = new MysqlErrorHandle(err, res)
mysqlErrorHandle.validar()

  }
}) 



app.get("/listar_pizzas", async (req, res) => {
  try {

    
    const [resultado, campos]
      = await connection.execute(`SELECT nome, tamanho, preco FROM pizza`)
    console.log(resultado)
    res.status(200).json(resultado)
  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res)
mysqlErrorHandle.validar()
  }

})


app.get("/listar_pizzas_grandes", async (req, res) => {
  try {

    
    const [resultado, campos]
      = await connection.execute<Ipizza[]>(`SELECT id, nome, preco, data_criacao  FROM pizza WHERE tamanho = "grandes"`)
    const resultado_transformado = resultado.map(pizza=>{
        const obj={
            "id_pizza":pizza.id,
            "nome_pizza":pizza.nome,
            "tamanho_pizza":pizza.tamanho,
            "preco_pizza":pizza.preco,
            "data_criacao_pizza":pizza.data_criacao

        }
      return obj
    })
    res.status(200).json(resultado)
  } catch (err) {
    const mysqlErrorHandle = new MysqlErrorHandle(err, res)
mysqlErrorHandle.validar()
  }

})





