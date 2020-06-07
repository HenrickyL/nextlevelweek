//depois do express instalado
        // npm install express
const express = require("express")
const server = express() //executar o express
// importar o sbanco de dados
const db = require("./database/db")


//configurar a pasta public
server.use(express.static("public"))
//habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended : true }))

// utilizar template engine
const nunjucks = require("nunjucks") // require pesquisa no node_modules
nunjucks.configure("src/views",{
        express: server, // ligar ao express
        noCache: true //sem cache

})


//configurar caminhos da aplicação
        //page home
// req : requisiçao (pergunta)
//res: resposta
server.get("/", (req, res)=> {
        //funcção que recebe req e res - fazendo o pedido
        //res.send("Hello World!")
        // res.sendFile(__dirname+"/views/index.html") // com o nanjucks (linha abaixo)
        return res.render("index.html")//passar pelo motor do nunjucks

}) 
server.get("/create-point", (req, res)=> {

        
        return res.render("create-point.html") // pode passar como segundo argumento um objeto com key e value com os dados e joga no html usando {{key}}
}) 
//ir para a página de login
server.get("/admin", (req, res)=> {

        
        return res.render("login.html") // pode passar como segundo argumento um objeto com key e value com os dados e joga no html usando {{key}}
}) 


//usar o verbo POST -  esconder os dados do link
server.post("/savepoint", (req, res)=> {

        //console.log(req.body) // serve para pegar o corpo do formulário
        //inseriri dados no banco
        const query = `
        INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
        ) VALUES (
                ?,?,?,?,?,?,?
        );`       
        const values = [
                req.body.image,
                req.body.name,
                req.body.address,
                req.body.address2,
                req.body.state,
                req.body.city,
                req.body.items
        ]
        console.log(req.query)

        function afterInsertData(err){
                if(err){        
                        return console.log(err)
                        return res.send("Erro no cadastro!")
                } 
                console.log("Cadastrado com sucesso!") 
                console.log(this) 
                //so vai aparecer quando for realmente cadastrado
                return res.render("create-point.html",{saved:true})
        }
        
        db.run(query, values, afterInsertData)



        
})


server.get("/search", (req, res)=> {

        //sistema de pesquisa
        const search = req.query.search

        
        var total = 0

        db.all(`SELECT * FROM places`, function(err,rows){
                if(err){
                        return console.log(err)
                }
               total =  rows.length
        
        })


        //pegar os dados do banco // where (condicional) like(para nao precisar ser exatamente)
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' `, function(err,rows){
                if(err){
                        return console.log(err) 
                        return res.render("create-point.html",{error: true})
                } 
                
                const searchTotal = rows.length
                //sistema de pesquisa
                if(search == ""){
                        return res.render("search-results.html",{places: rows, total, searchTotal}) 
                }                
                //caso não tenha erro
                return res.render("search-results.html",{ places: rows, searchTotal, total}) 
        })


        
}) 






//posso ligar o servidor
server.listen(3000)