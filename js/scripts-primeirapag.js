
carregarQuizzes();

function carregarQuizzes(){
    const promessa = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes');
    promessa.then(processarResposta);
}

function processarResposta(resposta) {
    const seletorTodosOsQuizzes = document.querySelector(".todos-os-quizzes");
    seletorTodosOsQuizzes.innerHTML ="";

    for(let i = 0; i< resposta.data.length; i++){
        seletorTodosOsQuizzes.innerHTML += `
            <li onclick='abrirQuizzUnico(${resposta.data[i].id})' class="cartao-quizz">
                <span>${resposta.data[i].title}</span>
            </li>`;
        let seletorUltimaLI = seletorTodosOsQuizzes.querySelector("li:last-of-type");
        seletorUltimaLI.style.backgroundImage = `url('${resposta.data[i].image}')`;
    }
}

function abrirQuizzUnico(id){
    alert(id);
}