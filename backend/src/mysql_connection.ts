import mysql from 'mysql2/promise';
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'loja_produtos_falsificados',
});

export default connection