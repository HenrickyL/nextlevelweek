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
    // const stateInput = document.querySelector("input[name=state]")

    // const ufValue = event.target.value

    // const indexOfSelectedState = event.target.selectedIndex
    // stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`
    console.log(event.target.value)
    
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
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }
            //agora habilito
            citySelect.disabled = false            
         })

}


populateUFs()
 document
     .querySelector("select[name=uf]")
     .addEventListener("change",getCities )