
function adicionarQuizz(){
    const seletorListaDeQuizzes = document.querySelector(".lista-de-quizzes");
    seletorListaDeQuizzes.classList.add("escondido");
    const seletorCriacaoDeQuizz = document.querySelector(".criacao-de-quizz");
    seletorCriacaoDeQuizz.classList.remove("escondido");
}
function criarPerguntas(){
    const seletorPrimeiraParte = document.querySelector(".primeira-parte");
    seletorPrimeiraParte.classList.add("escondido");
    const seletorSegundaParte = document.querySelector(".segunda-parte");
    seletorSegundaParte.classList.remove("escondido");
}
function criarNiveis(){
    const seletorSegundaParte = document.querySelector(".segunda-parte");
    seletorSegundaParte.classList.add("escondido");
    const seletorTerceiraParte = document.querySelector(".terceira-parte");
    seletorTerceiraParte.classList.remove("escondido");
}
function finalizarQuizz(){
    const seletorTerceiraParte = document.querySelector(".terceira-parte");
    seletorTerceiraParte.classList.add("escondido");
    const seletorQuartaParte = document.querySelector(".quarta-parte");
    seletorQuartaParte.classList.remove("escondido");
}
function voltarPaginaInicial(){
    window.location.reload();
}