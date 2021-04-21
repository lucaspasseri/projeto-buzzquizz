const novoQuizz = {};

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

        const seletorPerguntas = document.querySelector(".perguntas");
        seletorPerguntas.innerHTML = "";
        for(let i = 0; i < seletorInputs[2].value; i++){
          if( i === 0 ){
            seletorPerguntas.innerHTML += `<div>
                                            <span onclick="selecionarPergunta(this)">Pergunta ${i+1}</span>
                                            <ul class="pergunta id-${i+1}">
                                              <li><input type="text" placeholder="Texto da pergunta"></li>
                                              <li><input type="text" placeholder="Cor de fundo da pergunta"></li>
                                              <span>Resposta correta</span>
                                              <ul>
                                                <li><input type="text" placeholder="Resposta correta"></li>
                                                <li><input type="text" placeholder="URL da imagem"></li>
                                              </ul>
                                              <span>Respostas incorretas</span>
                                              <ul>
                                                <li><input type="text" placeholder="Resposta incorreta 1"></li>
                                                <li><input type="text" placeholder="URL da imagem 1"></li>
                                                <li><input type="text" placeholder="Resposta incorreta 2"></li>
                                                <li><input type="text" placeholder="URL da imagem 2"></li>
                                                <li><input type="text" placeholder="Resposta incorreta 3"></li>
                                                <li><input type="text" placeholder="URL da imagem 3"></li>
                                              </ul>   
                                            </ul>
                                          </div>`;
          } else {
            seletorPerguntas.innerHTML +=  `<div>
                                              <span onclick="selecionarPergunta(this)">Pergunta ${i+1}</span>
                                              <ul class="pergunta id-${i+1} escondido">
                                                <li><input type="text" placeholder="Texto da pergunta"></li>
                                                <li><input type="text" placeholder="Cor de fundo da pergunta"></li>
                                                <span>Resposta correta</span>
                                                <ul>
                                                  <li><input type="text" placeholder="Resposta correta"></li>
                                                  <li><input type="text" placeholder="URL da imagem"></li>
                                                </ul>
                                                <span>Respostas incorretas</span>
                                                <ul>
                                                  <li><input type="text" placeholder="Resposta incorreta 1"></li>
                                                  <li><input type="text" placeholder="URL da imagem 1"></li>
                                                  <li><input type="text" placeholder="Resposta incorreta 2"></li>
                                                  <li><input type="text" placeholder="URL da imagem 2"></li>
                                                  <li><input type="text" placeholder="Resposta incorreta 3"></li>
                                                  <li><input type="text" placeholder="URL da imagem 3"></li>
                                                </ul>   
                                              </ul>
                                            </div>`;
          }  
        }
        novoQuizz["title"] = seletorInputs[0].value;
        novoQuizz["image"] = seletorInputs[1].value;
        novoQuizz["questions"] = [];
        for(let i = 0; i < seletorInputs[2].value; i++){
          novoQuizz.questions.push({});
        }
        novoQuizz["levels"] = [];
        for(let i = 0; i < seletorInputs[3].value; i++)
          novoQuizz.levels.push({});
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
    
  const seletorPergunta = document.querySelectorAll(".pergunta");

  console.log(seletorPergunta[0])
  const validacaoPerguntas = [];

  for(let i = 0; i < seletorPergunta.length; i++){
    let seletorInputs = seletorPergunta[i].querySelectorAll("input");
    let caracteresDaPergunta = seletorInputs[0].value.length > 19;
    let hexCorDeFundo = isValidHex(seletorInputs[1].value);
    let respostaCorretaPreenchida = seletorInputs[2].value.trim().length !== 0;
    let respostaCorretaURLPreenchida = validURL(seletorInputs[3].value);

    let indicesRespostasIncorretas = [];
    for(let i = 0; i < 3; i++){
      if(seletorInputs[2*i+4].value.trim().length !== 0 && validURL(seletorInputs[2*i+5].value)){
        indicesRespostasIncorretas.push(i);
      } 
    }

    let validacaoAtual = caracteresDaPergunta  && hexCorDeFundo && respostaCorretaPreenchida && 
    respostaCorretaURLPreenchida && (indicesRespostasIncorretas.length > 0);
    validacaoPerguntas.push(validacaoAtual);
  }

  let perguntasValidadas = true;
  for(let i = 0; i < validacaoPerguntas.length; i++){
    if(validacaoPerguntas[i]!==true){
      perguntasValidadas = perguntasValidadas && validacaoPerguntas[i];
    }
  }
  //console.log(validacaoPerguntas, perguntasValidadas);

  if(perguntasValidadas){
    const seletorSegundaParte = document.querySelector(".segunda-parte");
    seletorSegundaParte.classList.add("escondido");
    const seletorTerceiraParte = document.querySelector(".terceira-parte");
    seletorTerceiraParte.classList.remove("escondido");
    
    for(let i = 0; i < seletorPergunta.length; i++){
      let seletorInputs = seletorPergunta[i].querySelectorAll("input");
      novoQuizz.questions[i]["title"]= seletorInputs[0].value;
      novoQuizz.questions[i]["color"]= seletorInputs[1].value;
      novoQuizz.questions[i]["answers"]= [];
      novoQuizz.questions[i].answers.push({ "text": seletorInputs[2].value,"image": seletorInputs[3].value,
                                    "isCorrectAnswer": true});
      let indicesRespostasIncorretas = [];
      for(let i = 0; i < 3; i++){
        if(seletorInputs[2*i+4].value.trim().length !== 0 && validURL(seletorInputs[2*i+5].value)){
          indicesRespostasIncorretas.push(i);
        } 
      }

      for (const r of indicesRespostasIncorretas){
        novoQuizz.questions[i].answers.push({"text": seletorInputs[2*r+4].value, "image": seletorInputs[2*r+5].value,
                                    "isCorrectAnswer": false});
      }
      console.log(novoQuizz);
    }
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
    /* const seletorTerceiraParte = document.querySelector(".terceira-parte");
    seletorTerceiraParte.classList.add("escondido");
    const seletorQuartaParte = document.querySelector(".quarta-parte");
    seletorQuartaParte.classList.remove("escondido"); */
  console.log(novoQuizz);
}
function voltarPaginaInicial(){
    window.location.reload();
}
function selecionarPergunta(elemento){
  const seletorUL = elemento.parentNode.querySelector("ul");
  seletorUL.classList.toggle("escondido");
}