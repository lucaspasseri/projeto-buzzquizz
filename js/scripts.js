
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
    const seletorInputs = document.querySelectorAll(".pergunta-1 input");
    
    const caracteresDaPergunta = seletorInputs[0].value.length > 19;
    const hexCorDeFundo = isValidHex(seletorInputs[1].value);
    const respostaCorreta = seletorInputs[2].value.trim().length !== 0;

    let respostasIncorretas = false;
    let indicesRespostaIncorretas = [];
    for(let i = 4; i < 9; i+=2){ // intera entre as respostas incorretas {input(4,6,8)}
      if(seletorInputs[i].value.trim().length !== 0){
        indicesRespostaIncorretas.push(i);
        respostasIncorretas = true;
      }
    }

    let URLsValidas  = true;
    let numeroURLsIncorretas = 0;
    for(const i of indicesRespostaIncorretas){
      URLsValidas = URLsValidas && validURL(seletorInputs[i+1].value);
      numeroURLsIncorretas++;
    }
    URLsValidas = numeroURLsIncorretas && URLsValidas && validURL(seletorInputs[3].value);

    console.log("respostasIncorretas:",respostasIncorretas);
    console.log("indicesRespostaIncorretas:",indicesRespostaIncorretas);
    console.log("URLsValidas:",URLsValidas);
    const validacao = caracteresDaPergunta && hexCorDeFundo && respostaCorreta && respostasIncorretas 
    && URLsValidas;
    if(validacao){
        const seletorSegundaParte = document.querySelector(".segunda-parte");
        seletorSegundaParte.classList.add("escondido");
        const seletorTerceiraParte = document.querySelector(".terceira-parte");
        seletorTerceiraParte.classList.remove("escondido");
    }
}
function isValidHex(color) {
    if(!color || typeof color !== 'string') return false;

    // Validate hex values
    if(color.substring(0, 1) === '#') color = color.substring(1);

    switch(color.length) {
      case 3: return /^[0-9A-F]{3}$/i.test(color);
      case 6: return /^[0-9A-F]{6}$/i.test(color);
      case 8: return /^[0-9A-F]{8}$/i.test(color);
      default: return false;
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