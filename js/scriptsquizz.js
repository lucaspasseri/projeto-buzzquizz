let arrayQuizzes;
let arrayQuizzUnico;
let totalAcertos = 0;
let totalRespondido = 0;
let totalPerguntas = 0;
const elementoCarregando = document.querySelector(".carregando");

carregarQuizzes();

function carregarQuizzes(){
    const promessa = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes');
    promessa.then(sucessoCarregarQuizzes);
    elementoCarregando.classList.remove("escondido");
}

function sucessoCarregarQuizzes(resposta) {
    const seletorTodosOsQuizzes = document.querySelector(".todos-os-quizzes");
    seletorTodosOsQuizzes.innerHTML ="";

    for(let i = 0; i< resposta.data.length; i++){
        seletorTodosOsQuizzes.innerHTML += `
            <li onclick='abrirQuizzUnico(${resposta.data[i].id})' class="cartao-quizz">
                <span>${resposta.data[i].title}</span>
                <div class="editar-excluir">
                    <div>
                        <ion-icon name="create-outline"></ion-icon>
                    </div>
                    <div onclick="deletarQuizz(${resposta.data[i].id})">
                        <ion-icon name="trash-outline"></ion-icon>
                    </div>
                </div>
            </li>
        `;
        let seletorUltimaLI = seletorTodosOsQuizzes.querySelector("li:last-of-type");
        seletorUltimaLI.style.backgroundImage = `
            linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)), url('${resposta.data[i].image}')
        `;
    }
    elementoCarregando.classList.add("escondido");
}

function abrirQuizzUnico(id) {
    const promessaQuizzUnico = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${id}`);
    promessaQuizzUnico.then(sucessoReceberQuizzUnico);
    const elementoPaginaInicial = document.querySelector(".lista-de-quizzes");
    elementoPaginaInicial.classList.add("escondido");
    const elementoPaginaQuizz = document.querySelector(".pagina-de-um-quizz");
    elementoPaginaQuizz.classList.remove("escondido");
    elementoCarregando.classList.remove("escondido");
}

function sucessoReceberQuizzUnico(promessaQuizzUnico) {
    elementoCarregando.classList.add("escondido");
    arrayQuizzUnico = promessaQuizzUnico.data;
    totalAcertos = 0;
    totalRespondido = 0;
    const elementoResultadoQuizz = document.querySelector(".resultado-quizz");
    elementoResultadoQuizz.classList.add("escondido");
    const elementoBotaoReiniciar = document.querySelector(".pagina-de-um-quizz button");
    elementoBotaoReiniciar.classList.add("escondido");
    const elementoVoltarHome = document.querySelector(".voltar-home");
    elementoVoltarHome.classList.add("escondido");
    renderizarQuizzUnico();
    rolarPaginaCima();
}

function renderizarQuizzUnico() {
    totalPerguntas = arrayQuizzUnico.questions.length;
    const elementoBanner = document.querySelector(".banner-titulo-quizz");
    elementoBanner.style.backgroundImage = `
        linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${arrayQuizzUnico.image}')
    `;
    elementoBanner.innerHTML = arrayQuizzUnico.title;

    const elementoUl = document.querySelector(".lista-perguntas-quizz");
    const elementoContainerOpcoesQuizz = document.querySelector(".container-opcoes-quizz");
    elementoUl.innerHTML = "";
    elementoContainerOpcoesQuizz.innerHTML = "";

    randomizarRespostas();

    for (let i = 0; i < arrayQuizzUnico.questions.length; i++) {
        elementoContainerOpcoesQuizz.innerHTML = "";
        for (let y = 0; y < arrayQuizzUnico.questions[i].answers.length; y++) {
            if (arrayQuizzUnico.questions[i].answers[y].isCorrectAnswer) {
                elementoContainerOpcoesQuizz.innerHTML += `
                    <div class="pergunta-quizz-opcao correta r${y}" onclick="escolherResposta(${i}, this)">
                        <img src="${arrayQuizzUnico.questions[i].answers[y].image}">
                        ${arrayQuizzUnico.questions[i].answers[y].text}
                    </div>
                `;
            } else {
                elementoContainerOpcoesQuizz.innerHTML += `
                    <div class="pergunta-quizz-opcao errada r${y}" onclick="escolherResposta(${i}, this)">
                        <img src="${arrayQuizzUnico.questions[i].answers[y].image}">
                        ${arrayQuizzUnico.questions[i].answers[y].text}
                    </div>
                `;
            }
        }
        elementoUl.innerHTML += `
            <li class="pergunta-quizz p${i}">
                <div class="titulo-pergunta-quizz t${i}">
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

    setTimeout(`rolarPaginaBaixo(${perguntaEscolhida + 1})`, 2000);
}

function verificarPontuacao() {
    const resultado = Math.round(totalAcertos / totalPerguntas * 100);

    for (let i = 0; i < arrayQuizzUnico.levels.length; i++) {
        if (resultado >= arrayQuizzUnico.levels[i].minValue) {
            const elementoTituloResultadoQuizz = document.querySelector(".titulo-resultado-quizz");
            elementoTituloResultadoQuizz.innerHTML = `${resultado}% de acerto: ${arrayQuizzUnico.levels[i].title}`;
            const elementoImagemResultadoQuizz = document.querySelector(".resultado-quizz img");
            elementoImagemResultadoQuizz.setAttribute("src", `${arrayQuizzUnico.levels[i].image}`);
            const elementoDescricaoResultadoQuizz = document.querySelector(".resultado-quizz span");
            elementoDescricaoResultadoQuizz.innerHTML = `${arrayQuizzUnico.levels[i].text}`;
        }
    }
    const elementoResultadoQuizz = document.querySelector(".resultado-quizz");
    elementoResultadoQuizz.classList.remove("escondido");
    const elementoBotaoReiniciar = document.querySelector(".pagina-de-um-quizz button");
    elementoBotaoReiniciar.classList.remove("escondido");
    const elementoVoltarHome = document.querySelector(".voltar-home");
    elementoVoltarHome.classList.remove("escondido");
}

function reiniciarQuizz() {
    totalAcertos = 0;
    totalRespondido = 0;
    const elementoResultadoQuizz = document.querySelector(".resultado-quizz");
    elementoResultadoQuizz.classList.add("escondido");
    const elementoBotaoReiniciar = document.querySelector(".pagina-de-um-quizz button");
    elementoBotaoReiniciar.classList.add("escondido");
    const elementoVoltarHome = document.querySelector(".voltar-home");
    elementoVoltarHome.classList.add("escondido");
    renderizarQuizzUnico();
    rolarPaginaCima();
}

function rolarPaginaBaixo(proximaPergunta) {
    if (totalRespondido < totalPerguntas) {
        const elementoRolagem = document.querySelector(`.p${proximaPergunta}`);
        elementoRolagem.scrollIntoView({block: "end", behavior: "smooth"});
    } else {
        const elementoRolagem = document.querySelector(`.resultado-quizz`);
        elementoRolagem.scrollIntoView({behavior: "smooth"});
    }
}

function rolarPaginaCima() {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
}

function randomizarRespostas() {
    for (let i = 0; i < arrayQuizzUnico.questions.length; i++) {
        arrayQuizzUnico.questions[i].answers.sort(comparador);
    }
}

function comparador() {
    return Math.random() - 0.5;
}

function voltarHome() {
    const elementoPaginaInicial = document.querySelector(".lista-de-quizzes");
    elementoPaginaInicial.classList.remove("escondido");
    const elementoPaginaQuizz = document.querySelector(".pagina-de-um-quizz");
    elementoPaginaQuizz.classList.add("escondido");
    rolarPaginaCima();
    carregarQuizzes();
}

function deletarQuizz(id) {
    event.stopPropagation();
    
    if(confirm("Tem certeza que deseja excluir?")){
        const promessa = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${id},`);
        promessa.then(carregarQuizzes, carregarSeusQuizzes);
    }
    
}