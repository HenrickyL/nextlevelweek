//depois do express instalado
        // npm install express
const express = require("express")
const server = express() //executar o express
//configurar a pasta public
server.use(express.static("public"))

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
server.get("/search", (req, res)=> {
        return res.render("search-results.html") 
}) 






//posso ligar o servidor
server.listen(3000)