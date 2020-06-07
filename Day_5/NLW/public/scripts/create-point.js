// popular estados
    //pegar o campo state

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    //promise
                //res=> res.json() //- função anonima, função flecha, com valor e retorno simples
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( (res)=>{ return res.json() })
        .then( states => { 
            states = states.sort((a, b) => {
                let nomeA = a.nome 
                let nomeB =  b.nome
                if(nomeA < nomeB) return -1
                else if (nomeB < nomeA) return 1
                else return 0
            })
            
            for (let state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }            
         })

}
function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    // //tratamento
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`
    console.log(event.target.value)
    
    //limpar o select antes de add novos valores
    citySelect.innerHTML ="<option value>Selecione a Cidade</option>"
    citySelect.disabled = true     

    fetch(url)
        .then( (res)=>{ return res.json() })
        .then( cities => { 

            // ordenar por nome   
            cities = cities.sort((a, b) => {
                let nomeA = a.nome 
                let nomeB =  b.nome
                if(nomeA < nomeB) return -1
                else if (nomeB < nomeA) return 1
                else return 0
            })
            
            //limpar o select antes de add novos valores
            citySelect.innerHTML =""
            
            //popular as cidades
            for (let city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            //agora habilito
            citySelect.disabled = false            
         })

}


populateUFs()
 document
     .querySelector("select[name=uf]")
     .addEventListener("change",getCities )



//itens de coleta
    //itens selecionado
    let selectedItems = []


function handleSelectedItem (event){
    const itemLi = event.target
    //add ou remover uma classe com js
    itemLi.classList.toggle("selected") // como se marcasse ou desmarcasse (add ou remove)

    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados
        //sim pegar os itens selecionados
        const alreadySelected = selectedItems.findIndex(   item => item == itemId )//function (item) {
            //função anonima para procurar o item
            // const itemFound = item == itemId //existe 3 iguais
            // return itemFound
            // })

        //se tiver selecionado tirar a seleção 
        if ( alreadySelected >= 0 ){ // ou != -1 - se está nos selecionados
            //logo ja existe no array -- removo
            const filteredItems = selectedItems.filter( item =>  item !=itemId) //if true add, false remove            
                // altero a minha lista
                selectedItems = filteredItems
        }else {//se não tiver selecionado add a seleção
            selectedItems.push(" "+itemId)
        }
        console.log(selectedItems)
        

        //atualizar o campo escondido
        collectedItems.value = selectedItems

}

    //pegar todos os li's

const itemsToCollection = document.querySelectorAll(" .items-grid li ")

for (const item of itemsToCollection){
    item.addEventListener("click",  handleSelectedItem)

}

const collectedItems = document.querySelector("input[name=items]")