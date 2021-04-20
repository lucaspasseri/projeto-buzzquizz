receberQuizzUnico();
obterQuizzes();

let arrayQuizzes;
let arrayQuizzUnico;

function obterQuizzes() {
    const promessaQuizzes = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes");
    promessaQuizzes.then(sucessoObterQuizzes);
}

function sucessoObterQuizzes(promessaQuizzes) {
    arrayQuizzes = promessaQuizzes.data;
}

function receberQuizzUnico() {
    const promessaQuizzUnico = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/1");
    promessaQuizzUnico.then(sucessoReceberQuizzUnico);
}

function sucessoReceberQuizzUnico(promessaQuizzUnico) {
    arrayQuizzUnico = promessaQuizzUnico.data;
    console.log(arrayQuizzUnico);
    renderizarQuizzUnico();
}

function renderizarQuizzUnico() {
    const elementoBanner = document.querySelector(".banner-titulo-quizz");
    elementoBanner.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${arrayQuizzUnico.image}')`;
    elementoBanner.innerHTML = arrayQuizzUnico.title;

    const elementoUl = document.querySelector(".lista-perguntas-quizz");
    const elementoTituloQuizz = document.querySelector(".titulo-quizz");
    const elementoContainerOpcoesQuizz = document.querySelector(".container-opcoes-quizz");
    elementoUl.innerHTML = "";
    elementoContainerOpcoesQuizz.innerHTML = "";

    for (let i = 0; i < arrayQuizzUnico.questions.length; i++) {
        elementoContainerOpcoesQuizz.innerHTML = "";
        for (let y = 0; y < arrayQuizzUnico.questions[i].answers.length; y++) {
            elementoContainerOpcoesQuizz.innerHTML += `
                <div class="pergunta-quizz-opcao correta" onclick="escolherResposta(this)">
                    <img src="${arrayQuizzUnico.questions[i].answers[y].image}">
                    ${arrayQuizzUnico.questions[i].answers[y].text}
                </div>
            `;
        }
        elementoUl.innerHTML += `
            <li class="pergunta-quizz">
                <div class="titulo-quizz">
                    ${arrayQuizzUnico.questions[i].title}
                </div>
                <div class="container-opcoes-quizz">
                    ${elementoContainerOpcoesQuizz.innerHTML}
                </div>
            </li>
        `;
    }
}