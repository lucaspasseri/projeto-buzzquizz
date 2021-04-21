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
    renderizarQuizzUnico();
}

function renderizarQuizzUnico() {
    totalPerguntas = arrayQuizzUnico.questions.length;
    const elementoBanner = document.querySelector(".banner-titulo-quizz");
    elementoBanner.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${arrayQuizzUnico.image}')`;
    elementoBanner.innerHTML = arrayQuizzUnico.title;

    const elementoUl = document.querySelector(".lista-perguntas-quizz");
    const elementoContainerOpcoesQuizz = document.querySelector(".container-opcoes-quizz");
    elementoUl.innerHTML = "";
    elementoContainerOpcoesQuizz.innerHTML = "";

    for (let i = 0; i < arrayQuizzUnico.questions.length; i++) {
        elementoContainerOpcoesQuizz.innerHTML = "";
        for (let y = 0; y < arrayQuizzUnico.questions[i].answers.length; y++) {
            if (arrayQuizzUnico.questions[i].answers[y].isCorrectAnswer) {
                elementoContainerOpcoesQuizz.innerHTML += `
                    <div class="pergunta-quizz-opcao correta p${i} r${y}" onclick="escolherResposta(${i}, this)">
                        <img src="${arrayQuizzUnico.questions[i].answers[y].image}">
                        ${arrayQuizzUnico.questions[i].answers[y].text}
                    </div>
                `;
            } else {
                elementoContainerOpcoesQuizz.innerHTML += `
                    <div class="pergunta-quizz-opcao errada p${i} r${y}" onclick="escolherResposta(${i}, this)">
                        <img src="${arrayQuizzUnico.questions[i].answers[y].image}">
                        ${arrayQuizzUnico.questions[i].answers[y].text}
                    </div>
                `;
            }
        }
        elementoUl.innerHTML += `
            <li class="pergunta-quizz">
                <div class="titulo-quizz t${i}">
                    ${arrayQuizzUnico.questions[i].title}
                </div>
                <div class="container-opcoes-quizz">
                    ${elementoContainerOpcoesQuizz.innerHTML}
                </div>
            </li>
        `;
        const elementoTituloQuizz = document.querySelector(`.t${i}`);
        elementoTituloQuizz.style.backgroundColor = arrayQuizzUnico.questions[i].color;
    }
}

let totalAcertos = 0;
let totalRespondido = 0;
let totalPerguntas = 0;

function escolherResposta(pergunta, elemento) {
    const perguntaEscolhida = pergunta;
    const elementoClicadoPai = elemento.parentNode;
    const elementoClicado = elemento;
    
    for (let i = 0; i < arrayQuizzUnico.questions[perguntaEscolhida].answers.length; i++) {
        const elementoOpcaoResposta = elementoClicadoPai.querySelector(`.r${i}`);
        if (!elementoOpcaoResposta.classList.contains("correta")) {
            elementoOpcaoResposta.style.color = "#FF0B0B";
        } else {
            elementoOpcaoResposta.style.color = "#009C22";
        }

        if (elementoOpcaoResposta !== elementoClicado) {
            elementoOpcaoResposta.classList.add("opaco");
        }
        elementoOpcaoResposta.setAttribute("onclick", "");
    }
    if (elementoClicado.classList.contains("correta")) {
        totalAcertos++;
    }

    totalRespondido++;

    if(totalRespondido === totalPerguntas) {
        verificarPontuacao();
    }
}

function verificarPontuacao() {
    const resultado = Math.round(totalAcertos / totalPerguntas * 100);

    for (let i = 0; i < arrayQuizzUnico.levels.length; i++) {
        if (resultado >= arrayQuizzUnico.levels[i].minValue) {
            const elementoTituloResultadoQuizz = document.querySelector(".titulo-resultado-quizz");
            elementoTituloResultadoQuizz.innerHTML = `${arrayQuizzUnico.levels[i].title}`;
            const elementoImagemResultadoQuizz = document.querySelector(".resultado-quizz img");
            elementoImagemResultadoQuizz.setAttribute("src", `${arrayQuizzUnico.levels[i].image}`);
            const elementoDescricaoResultadoQuizz = document.querySelector(".resultado-quizz span");
            elementoDescricaoResultadoQuizz.innerHTML = `${arrayQuizzUnico.levels[i].text}`;
        }
    }
    const elementoResultadoQuizz = document.querySelector(".resultado-quizz");
    elementoResultadoQuizz.classList.remove("escondido");
    //const elementoBotaoReiniciar = document.querySelector(".resultado-quizz button");
    //elementoBotaoReiniciar.classList.remove("escondido");
    //const elementoVoltarHome = document.querySelector("resultado-quizz .voltar-home");
    //elementoVoltarHome.classList.remove("escondido");
}

function reiniciarQuizz() {

}