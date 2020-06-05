//pegar o click no botão de pesquisa
const buttonSearch = document.querySelector("#page-home main a")
//pega add ou remover no modal
const modal = document.querySelector("#modal")
//pegar o X 
const close = document.querySelector('#modal .header a')

buttonSearch.addEventListener("click",()=>{
    modal.classList.remove("hide")
})

close.addEventListener("click", ()=>{
    modal.classList.add("hide")
})