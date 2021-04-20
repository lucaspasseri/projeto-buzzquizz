
function adicionarQuizz(){
    const seletorListaDeQuizzes = document.querySelector(".lista-de-quizzes");
    seletorListaDeQuizzes.classList.add("escondido");
    const seletorCriacaoDeQuizz = document.querySelector(".criacao-de-quizz");
    seletorCriacaoDeQuizz.classList.remove("escondido");
}
function criarPerguntas(){
    const seletorInputs = document.querySelectorAll(".primeira-parte input");
    
    const caracteresDoTitulo = seletorInputs[0].value.length > 19 && seletorInputs[0].value.length < 66;
    const formatoURL = validURL(seletorInputs[1].value);
    const quantidadeValidaPerguntas = seletorInputs[2].value > 2;
    const quantidadeValidaNiveis = seletorInputs[3].value > 1;

    const validacao = caracteresDoTitulo && formatoURL && quantidadeValidaPerguntas && quantidadeValidaNiveis;
    
    if(validacao){
        const seletorPrimeiraParte = document.querySelector(".primeira-parte");
        seletorPrimeiraParte.classList.add("escondido");
        const seletorSegundaParte = document.querySelector(".segunda-parte");
        seletorSegundaParte.classList.remove("escondido");
    }    
}
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  
function criarNiveis(){

    let validacao = false;
    if(validacao){
        const seletorSegundaParte = document.querySelector(".segunda-parte");
        seletorSegundaParte.classList.add("escondido");
        const seletorTerceiraParte = document.querySelector(".terceira-parte");
        seletorTerceiraParte.classList.remove("escondido");
    }
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