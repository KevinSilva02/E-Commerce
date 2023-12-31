function login() {
    const formLogin = document.getElementById('form-logIn')
    
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault()
    
        const emailTag = document.getElementById("email")
        const passwordTag = document.getElementById("password")
    
        const email = emailTag.value
        const password = passwordTag.value
        
        const user = {email, password}
    
        fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then(response => response.json())
        .then(json => {
            const user = json

            sessionStorage.setItem(['usuario']['id'],[user.clienteId])
            sessionStorage.setItem(['usuario']['nome'],[user.clienteNome])

            console.log(user.clienteEmail)

            if(user.clienteEmail === 'kevinks1973@gmail.com'){
                window.location.href ='/admin/index.html'
            } else {
                window.location.href = 'index.html'
            }
            
        })
    
        
        
    })

    
    
}

function cadastrar() {
    const formSingUp = document.getElementById('form-signUp')

    formSingUp.addEventListener("submit", (e) => {
        e.preventDefault()
    
        const nomeTag = document.getElementById('nome')
        const emailTag = document.getElementById('email')
        const passwordTag = document.getElementById('password')
    
        const nome = nomeTag.value
        const email = emailTag.value
        const password = passwordTag.value
    
        const user = {nome, email, password}
    
        fetch("http://localhost:5000/singUp",{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {"content-type": "application/json; charset=utf-8"}
        })
        .then(response => response.json())
        .then(json => console.log(json))
    })
}




    
    
    