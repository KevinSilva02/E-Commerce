const bar = document.getElementById('bar');
const shut = document.getElementById('close')
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    } )
}

if (shut) {
    shut.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}