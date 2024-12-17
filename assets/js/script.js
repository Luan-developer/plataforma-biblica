// Selecionar elementos do DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const scriptsContainer = document.getElementById('scriptsContainer');
const msgCopy = document.getElementById('msgCopy');

document.addEventListener('DOMContentLoaded', function () {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            // Rolando para baixo
            header.classList.add('hide');
        } else {
            // Rolando para cima
            header.classList.remove('hide');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para dispositivos móveis ou saltos negativos
    }, false);
});





// Função para realizar a pesquisa
function searchScripts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const scripts = scriptsContainer.getElementsByClassName('scripts');

    Array.from(scripts).forEach(script => {
        const title = script.querySelector('h2').textContent.toLowerCase();

        // Expressão regular para encontrar números no formato #000 até #01000
        const matchNumber = title.match(/#\d{1,4}/);
        const startsWithLetter = title.startsWith(searchTerm); // Verifica se começa com uma letra específica

        // Verifica se o termo de busca é um número, uma letra ou está em branco
        if (searchTerm === '' ||
            (matchNumber && matchNumber[0].includes(searchTerm)) ||
            startsWithLetter ||
            title.includes(searchTerm)) {
            script.style.display = 'block';  // Mostra o script
        } else {
            script.style.display = 'none';  // Esconde o script
        }
    });
}

// Adicionar event listeners
searchButton.addEventListener('click', searchScripts);
searchInput.addEventListener('input', searchScripts);
searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        searchScripts();
    }
});

// Seleciona todos os elementos span ou botões com a classe 'copy'
const spanCopy = document.querySelectorAll('.copy');

// Adiciona o evento de clique para cada botão de cópia
spanCopy.forEach((copy) => {
    copy.addEventListener('click', () => {
        // Seleciona o elemento <section> pai do botão clicado
        const section = copy.closest('section');

        // Dentro dessa seção, seleciona o primeiro parágrafo
        const paragrafo = section.querySelector('p');

        // Verifica se o parágrafo existe e copia o conteúdo
        if (paragrafo && paragrafo.innerText) {
            navigator.clipboard.writeText(paragrafo.innerText)
                .then(() => {
                    // Atualizado em 09/10
                    const timeOn = setTimeout(()=>{
                        msgCopy.style.opacity = 1;
                    },100);
                    const timeOff = setTimeout(() => {
                        msgCopy.style.opacity = 0;
                    }, 3000);
                    timeOn();
                    timeOff();
                })
                .catch(err => {
                    console.error('Erro ao copiar texto: ', err);
                });
        } else {
            console.error('Não foi possível encontrar o parágrafo para copiar.');
        }
    });
});

//Atalho no input
document.addEventListener('keydown', function (event) {
    // Verifica se a tecla pressionada foi Ctrl + P
    if (event.ctrlKey && event.key === 'q') {
        event.preventDefault(); // Evita que o comportamento padrão ocorra
        document.getElementById('searchInput').focus(); // Foca no campo de pesquisa
    }
});