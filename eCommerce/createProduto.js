var formProduto = document.getElementById("createProduct-form")

function convertPonto(valor) {
    valor = valor.replace(',','.')
    return valor
}

formProduto.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomeProdutoTag = document.getElementById('nomeProduto')
    const marcaProdutoTag = document.getElementById('marcaProduto')
    const precoProdutoTag = document.getElementById('valorProduto')
    var imagemProdutoTag = document.getElementById('imagem')
    const detalhesProdutoTag = document.getElementById('detalheProduto')
    const tipoProdutoTag = document.getElementById('tipoProduto')

            
    const diretorio = `img/products/${imagemProdutoTag.files[0].name}`
    const precoPonto = convertPonto(precoProdutoTag.value)
        
    const precoCon = parseFloat(precoPonto)

    const nomeProduto = nomeProdutoTag.value
    const marcaProduto = marcaProdutoTag.value
    const precoProduto = precoCon
    const imagemProduto = diretorio
    const detalheProduto = detalhesProdutoTag.value
    const tipoProduto = tipoProdutoTag.value

    const produto = {nomeProduto, marcaProduto, precoProduto, detalheProduto, imagemProduto, tipoProduto}

    console.log(produto)
    fetch('http://localhost:5000/createProduto',{
      method: 'POST',
      body: JSON.stringify(produto),
      headers: {"Content-type": "application/json; charset=UTF-8"}
     }).then(response => response.json())
     .then(json => console.log(json))
    
})