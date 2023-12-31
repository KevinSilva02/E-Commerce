itemsnSession = JSON.parse(sessionStorage.getItem(['items']))
sectionCart = document.getElementById('cart')


function cart() {
    console.log(itemsnSession)        
    var subTotal = 0
    for(var i = 0; i < itemsnSession.length; i++) {
        var tbody = document.getElementById('list-Products')
        var tr = document.createElement('tr')
        var tdRemove = document.createElement('td')
        tdRemove.setAttribute('class', 'remove')
        var linkRemove = document.createElement('a')
        var cod = itemsnSession[i].cod
        
        linkRemove.setAttribute('href',`javascript:remove("` + cod + `")`)
        var icon = document.createElement('i')
        icon.setAttribute('class','ph-bold ph-x-circle')
        linkRemove.appendChild(icon)
        tdRemove.appendChild(linkRemove)
        tr.appendChild(tdRemove)
        tbody.appendChild(tr)
        
        var tdImagem = document.createElement('td')
        var imagem = document.createElement('img')
        imagem.setAttribute('src', `${itemsnSession[i].imagemProduto}`)

        tdImagem.appendChild(imagem)
        tr.appendChild(tdImagem)

        var tdNome = document.createElement('td')
        var conteudoTdNome = document.createTextNode(`${itemsnSession[i].nomeProduto}`)

        tdNome.appendChild(conteudoTdNome)
        tr.appendChild(tdNome)

        var precoVirgula = itemsnSession[i].precoProduto
        precoVirgula = convertVirgula(precoVirgula)
        var tdPreco = document.createElement('td')
        var conteudoTdPreco = document.createTextNode(`R$ ${precoVirgula}`)

        tdPreco.appendChild(conteudoTdPreco)
        tr.appendChild(tdPreco)

        var tdQuant = document.createElement('td')
        var inputQuant = document.createElement('input')
        inputQuant.setAttribute('type', 'number')
        inputQuant.setAttribute('value', `${itemsnSession[i].quant}`)
        inputQuant.setAttribute('min','1')

        tdQuant.appendChild(inputQuant)
        tr.appendChild(tdQuant)

        var tdTotal = document.createElement('td')
        var total = itemsnSession[i].precoProduto * itemsnSession[i].quant 
        var totalvirgula = convertVirgula(total)
        var conteudoTdTotal = document.createTextNode(`${totalvirgula}`)

        tdTotal.appendChild(conteudoTdTotal)
        tr.appendChild(tdTotal)

        subTotal = subTotal + total    
    }
    var trSubTotal = document.getElementById('tr-subTotal')
    var tdSub = document.createElement('td')
    var subTotalVirgula = convertVirgula(subTotal)
    var tdSubConteudo = document.createTextNode(`R$ ${subTotalVirgula}`)
    tdSub.appendChild(tdSubConteudo)
    trSubTotal.appendChild(tdSub)

    var trTotal = document.getElementById('tr-total')
    var tdTotal = document.createElement('td')
    var tdTotalConteudo = document.createTextNode(`R$ ${subTotalVirgula}`)
    var strong = document.createElement('strong')
    strong.appendChild(tdTotalConteudo)
    tdTotal.appendChild(strong)
    trTotal.appendChild(tdTotal)

}    

function convertVirgula(valor) {
    valor = valor.toFixed(2)
    valor = valor.toString()
            
    valor = valor.replace('.',',')
    return valor
}

if(!itemsnSession || itemsnSession.length == 0){
    var h4 = document.createElement('h4')
    var textH4 = document.createTextNode('Não ha Produtos no carrinho')
    h4.appendChild(textH4)
    h4.setAttribute('class', 'noProduct')
    sectionCart.appendChild(h4)
} else {
    cart()
}
function remove(cod){
    
    
    itemsnSession = itemsnSession.filter(a => a.cod !== cod)
    sessionStorage.setItem(['items'],JSON.stringify(itemsnSession))
    location.reload()
}

function checkout(){
    var user = sessionStorage.getItem(['usuario']['id'])
        
    
    if(!user){
        alert('Faça login')
    } else {
        alert('Finalize sua compra')
    }
}






