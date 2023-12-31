var sProduct = JSON.parse(sessionStorage.getItem(['details']))
var item = JSON.parse(sessionStorage.getItem(['items']))

var divImg = document.getElementById('single-pro-image')
var img = document.createElement('img')
img.setAttribute('src',`${sProduct[0].imagemProduto}`)
img.setAttribute('id','MainImg')
img.setAttribute('width','100%')
img.setAttribute('alt','Img')

divImg.appendChild(img)

var divDetails = document.getElementById('single-pro-details')

var title = document.createElement('h4')
var contTitle = document.createTextNode(`${sProduct[0].nomeProduto}`)

title.appendChild(contTitle)

divDetails.appendChild(title)

var precoProduto = document.createElement('h2')
var precoVirgula = sProduct[0].precoProduto
precoVirgula = convertVirgula(precoVirgula)
var preco = document.createTextNode(`R$ ${precoVirgula}`)

precoProduto.appendChild(preco)

divDetails.appendChild(precoProduto)

var selectSize = document.createElement('select')
selectSize.setAttribute('id','size')

var selectOption = document.createElement('option')
var selectOption11 = document.createElement('option')
var selectOption21 = document.createElement('option')

var selectOption1 = document.createTextNode('P')
var selectOption2 = document.createTextNode('M')
var selectOption3 = document.createTextNode('G')

selectOption.appendChild(selectOption1)
selectOption11.appendChild(selectOption2)
selectOption21.appendChild(selectOption3)

selectOption11.setAttribute('value','M')
selectOption21.setAttribute('value','P')

selectSize.appendChild(selectOption)
selectSize.appendChild(selectOption11)
selectSize.appendChild(selectOption21)

divDetails.appendChild(selectSize)

var quant = document.createElement('input')
quant.setAttribute('id','quant')
quant.setAttribute('type','number')
quant.setAttribute('value','1')
quant.setAttribute('min','1')


divDetails.appendChild(quant)

var addCart = document.createElement('button')
addCart.setAttribute('class','normal')
addCart.setAttribute('onclick',`addcart(${sProduct[0].id})`)
var button = document.createTextNode('adicionar ao carrinho')
addCart.appendChild(button)

divDetails.appendChild(addCart)

var titleDetails = document.createElement('h4')
var contTitleDetails = document.createTextNode('Detalhes produto')
titleDetails.appendChild(contTitleDetails)

divDetails.appendChild(titleDetails)

var details = document.createElement('span')
var contDetails = document.createTextNode(`${sProduct[0].detalheProduto}`)

details.appendChild(contDetails)

divDetails.appendChild(details)


var sizeSelected = document.getElementById('size')
var valueSize = sizeSelected.value
sizeSelected.addEventListener('change', function(){
    valueSize = this.value
})

var vQuant = document.getElementById('quant')
var valueQuant = vQuant.value
vQuant.addEventListener('change', function(){
    valueQuant = this.value
    valueQuant = parseInt(valueQuant)
})
valueQuant = parseInt(valueQuant)



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
        
        if(Produto.length >= 4){

        for(var cont = 0; cont < 4; cont++){

            
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
            a.setAttribute('onclick',`addCart(${Produto[cont].id})`)
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

function addcart(id) {
    var obj = {id: sProduct[0].id,imagemProduto: sProduct[0].imagemProduto, nomeProduto: sProduct[0].nomeProduto, precoProduto: sProduct[0].precoProduto, quant: valueQuant, Size: valueSize, cod:  valueSize + sProduct[0].id }
    var sId = id

    if(valueQuant < 1){
        return
    }
    
    if(!item) {
        item = [obj]
    } else {
        var forAdd = obj

        var ar = item.filter(a => a.id === sId && a.Size === valueSize)

        if(ar.length > 0) {
            item.map(a => a.id === sId && a.Size === valueSize ? a.quant = a.quant + valueQuant : false)
        } else {
            item.push(forAdd)
        }
           
    }

    sessionStorage.setItem(['items'],JSON.stringify(item))
    var x = document.getElementById('snack-bar')

    x.className = 'show'

    setTimeout(function(){x.className = x.className.replace('show','');}, 3000)
    
}

listaProduto()