var formMensagem = document.getElementById('form-mensagem')

formMensagem.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomeTag = document.getElementById('name')
    const emailTag = document.getElementById('email')
    const subjectTag = document.getElementById('subject')
    const mensagemTag = document.getElementById("menssagem")

    var nomeClienteMensagem = nomeTag.value
    var emailClienteMensagem = emailTag.value
    var assuntoMensagem = subjectTag.value
    var mensagem = mensagemTag.value

    const corpoMensagem = {nomeClienteMensagem, emailClienteMensagem, assuntoMensagem, mensagem}

    fetch('http://localhost:5000/createMensagem',{
        method: 'POST',
        body: JSON.stringify(corpoMensagem),
        headers: {"Content-type": "application/json; charset=UTF-8"},
    }).then(response => response.json())
    .then(json => {
        
        var mensagem = json.mensagem
        if(mensagem === 'criado com sucesso'){
            alert('Enviado com sucesso')
        } else {
            alert( 'falha ao enviar')
        }

    })
})