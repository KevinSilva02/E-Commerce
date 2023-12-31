var items = []
var Produto
var cart = []


function convertVirgula(valor) {
    valor = valor.toFixed(2)
    valor = valor.toString()
            
    valor = valor.replace('.',',')
    return valor
}

async function listaProduto() {
    
    fetch('http://localhost:5000/readProduto')
    .then(response => response.json())
    .then(response => {
        Produto = response.result    
        
        if(Produto.length >= 8){

        for(var cont = 0; cont < 8; cont++){

            
            var divPro = document.createElement('div')
            divPro.setAttribute('class','pro')
            divPro.setAttribute('onClick', `sproduct(${Produto[cont].id})`)
            
            
            const divProContainer = document.getElementById('pro-container')
    
            divProContainer.appendChild(divPro)
    
            var img = document.createElement('img')
            img.setAttribute('src', `${Produto[cont].imagemProduto}`)
    
            divPro.appendChild(img)
    
            var divDes = document.createElement('div')
            divDes.setAttribute('class', 'des')
    
            divPro.appendChild(divDes)
    
            var span = document.createElement('span')
            var conteudoSpan = document.createTextNode(`${Produto[cont].marcaProduto}`)
            span.appendChild(conteudoSpan)
    
            divDes.appendChild(span)
    
            var h5 = document.createElement('h5')
            var conteudoH5 = document.createTextNode(`${Produto[cont].nomeProduto}`)
            h5.appendChild(conteudoH5)
    
            divDes.appendChild(h5)
            
            var h4 = document.createElement('h4')
            var precoVirgula = Produto[cont].precoProduto
            precoVirgula = convertVirgula(precoVirgula)
            var conteudoH4 = document.createTextNode(`R$ ${precoVirgula}`)
            h4.appendChild(conteudoH4)
    
            divDes.appendChild(h4)
    
            var a = document.createElement('button')
            a.setAttribute('class','cart')
            divPro.appendChild(a)
            
    
            var i = document.createElement('i')
            i.setAttribute('class', 'ph-bold ph-shopping-cart ')
    
            a.appendChild(i)
        }

        

    }else {
        alert('Listar de Produtos diferente de 4, 8 ou 16')
    }
    })
}

function addCart(id) {
    
    if(!item) {
        item = Produto.filter(a => a.id === id)
        item.map(a => a.quant = 1)
    } else {
        foradd = Produto.filter(a => a.id === id)
        item.filter(a => a.id === id).length > 0 ? item.map(a => a.id === id ? a.quant = a.quant + 1 : false) : 
            (item.push(foradd[0]),
            item.map(a => a.id === id ? a.quant = 1 : false) )
    }    
    console.log(item)
    sessionStorage.setItem(['items'],JSON.stringify(item))

    var x = document.getElementById('snack-bar')

    x.className = 'show'

    setTimeout(function(){x.className = x.className.replace('show','');}, 3000)
}

function sproduct(id) {
    
    const sId = id
    const sProduct = Produto.filter(prod => prod.id === sId)
    
    sessionStorage.setItem(['details'],JSON.stringify(sProduct))
    
    window.location.href='sproduct.html';
    

}


listaProduto()









 


    
    



































 function adcElemento() {
    for(var i = 0; i < nome.length; i++){

        //var divJavascript = document.createElement("div")
        
        //var conteudo = document.createTextNode(nome[i])
        
        //divJavascript.appendChild(conteudo)
    
        // var divHtml = document.getElementById('div1')
        // //document.body.insertBefore(divJavascript, divHtml)

        // var img = document.createElement('img')
        // img.setAttribute('src', 'img/hero4.png')

        // document.body.appendChild(img)

        // document.body.insertBefore(divHtml, img)
    }
    
}   
// async function fazGet() {
//     const response = await fetch("http:ocalhost:5000/readProduto");
//     const movies = await response.json();
//     console.log(movies);
// }

// async function crairProduto() {
    
// }
  