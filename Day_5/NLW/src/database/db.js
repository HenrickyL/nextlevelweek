//configuração do banco de dados

//importar a deendencia do sqlite
const sqlite = require("sqlite3").verbose() // verbose - mostrar mensagens no terminal
//criar o objeto de banco de dados
        //pode ser um objeto  {} ou usar o new com uma função que tem contrutor
const db = new sqlite.Database("./src/database/database.db")
//vamos utilizar o objeto BD para nossa operações
module.exports = db



//serialize sequncia de codigo
 db.serialize(()=> {
//         //com comandos SQL:
        //1.criar uma tabela 
        db.run(`
                CREATE TABLE IF NOT EXISTS places(
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        image TEXT,
                        name TEXT,
                        address TEXT,
                        address2 TEXT,
                        state TEXT,
                        city TEXT,
                        items TEXT
                );
        `)
//         //2.inserir dados na tabela
//         const query = `
//         INSERT INTO places (
//                 image,
//                 name,
//                 address,
//                 address2,
//                 state,
//                 city,
//                 items
//         ) VALUES (
//                 ?,?,?,?,?,?,?
//         );`       
//         const values = [
//                 "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//                 "Papersider",
//                 "guillermo gemballa, jardim América",
//                 "Número 260",
//                 "Santa catarina",
//                 "Rio do Sul",
//                 "Papéis, Papelão"
//         ]

//         function afterInsertData(err){
//                 if(err){
//                         return console.log(err)
//                 } 
//                 console.log("Cadastrado com sucesso!")
//                 console.log(this)       
//         }
        
//         db.run(query, values, afterInsertData)

//         //3.consultar os dados da tabela
//         db.all(`SELECT * FROM places `, function(err,rows){
//                 if(err){
//                         return console.log(err)
//                 } 
//                 //coso não tenha erro
//                 console.log("Aqui estão os Registros:")
//                 console.log(rows)
//         })

//         //4.deleta um dado da tabela
//         // db.run(`DELETE FROM places  WHERE id = ?`,[1], function(err){
//         //         if(err){
//         //                 return console.log(err)
//         //         } 
//         //         console.log("registro deletado com sucesso")
//         // })
//         //exportar a BD para uso da aplicação
        

 })