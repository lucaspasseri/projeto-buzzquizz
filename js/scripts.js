const novoQuizz = {};

carregarSeusQuizzes();

function carregarSeusQuizzes(){
  const listaID = JSON.parse(localStorage.getItem("listaID"));

  if(listaID !== null){
    const promessa = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes');
    promessa.then(sucessoCarregarSeusQuizzes);
  }
  
}

function sucessoCarregarSeusQuizzes(resposta){
  const seletorListaSeusQuizzes = document.querySelector(".seus-quizzes");
  seletorListaSeusQuizzes.innerHTML = "";
  const listaID = JSON.parse(localStorage.getItem("listaID"));

  for(let i = 0; i< resposta.data.length; i++){
    for(let n = 0; n < listaID.length; n++){
      if(resposta.data[i].id === listaID[n]){
        seletorListaSeusQuizzes.innerHTML += `
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
        </li>`;
        let seletorUltimaLI = seletorListaSeusQuizzes.querySelector("li:last-of-type");
        seletorUltimaLI.style.backgroundImage = `
        linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)), url('${resposta.data[i].image}')
        `;
      }
    }
  }

  seletorListaSeusQuizzes.classList.remove("escondido");
  seletorNenhumQuizzCriado = document.querySelector(".nenhum-quizz-criado");
  seletorNenhumQuizzCriado.classList.add("escondido");
  seletorTituloSeusQuizzes = document.querySelector(".titulo-seus-quizzes");
  seletorTituloSeusQuizzes.classList.remove("escondido");
}

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
                                              <div class="aba-pergunta" onclick="selecionarPergunta(this)">
                                                <span>Pergunta ${i+1}</span>
                                                <ion-icon name="create-outline" class="icone-pergunta escondido"></ion-icon>
                                              </div>
                                              <ul class="pergunta">
                                                  <li><input type="text" placeholder="Texto da pergunta"></li>
                                                  <div class="escondido">Texto da pergunta: no mínimo 20 caracteres</div>
                                                  <li><input type="text" placeholder="Cor de fundo da pergunta"></li>
                                                  <div class="escondido">Cor em hexadecimal (começar em "#", seguida de 6 caracteres, números ou letras de A a F)</div>
                                                  <span>Resposta correta</span>
                                                  <ul>
                                                    <li><input type="text" placeholder="Resposta correta"></li>
                                                    <div class="escondido">Texto da resposta correta não pode estar vazio</div>
                                                    <li><input type="text" placeholder="URL da imagem"></li>
                                                    <div class="escondido">Insira uma URL válida</div>
                                                  </ul>
                                                  <span>Respostas incorretas</span>
                                                  <ul>
                                                      <li><input type="text" placeholder="Resposta incorreta 1"></li>
                                                      <li><input type="text" placeholder="URL da imagem 1"></li>
                                                      <li><input type="text" placeholder="Resposta incorreta 2"></li>
                                                      <li><input type="text" placeholder="URL da imagem 2"></li>
                                                      <li><input type="text" placeholder="Resposta incorreta 3"></li>
                                                      <li><input type="text" placeholder="URL da imagem 3"></li>
                                                      <div class="escondido">Preencha pelo menos uma resposta incorreta</div>
                                                  </ul>               
                                              </ul>
                                            </div>`;
          } else {
            seletorPerguntas.innerHTML +=  
                                            `<div>
                                              <div class="aba-pergunta" onclick="selecionarPergunta(this)">
                                                <span>Pergunta ${i+1}</span>
                                                <ion-icon name="create-outline" class="icone-pergunta"></ion-icon>
                                              </div>
                                              <ul class="pergunta escondido">
                                                  <li><input type="text" placeholder="Texto da pergunta"></li>
                                                  <div class="escondido">Texto da pergunta: no mínimo 20 caracteres</div>
                                                  <li><input type="text" placeholder="Cor de fundo da pergunta"></li>
                                                  <div class="escondido">Cor em hexadecimal (começar em "#", seguida de 6 caracteres, números ou letras de A a F)</div>
                                                  <span>Resposta correta</span>
                                                  <ul>
                                                    <li><input type="text" placeholder="Resposta correta"></li>
                                                    <div class="escondido">Texto da resposta correta não pode estar vazio</div>
                                                    <li><input type="text" placeholder="URL da imagem"></li>
                                                    <div class="escondido">Insira uma URL válida</div>
                                                  </ul>
                                                  <span>Respostas incorretas</span>
                                                  <ul>
                                                      <li><input type="text" placeholder="Resposta incorreta 1"></li>
                                                      <li><input type="text" placeholder="URL da imagem 1"></li>
                                                      <li><input type="text" placeholder="Resposta incorreta 2"></li>
                                                      <li><input type="text" placeholder="URL da imagem 2"></li>
                                                      <li><input type="text" placeholder="Resposta incorreta 3"></li>
                                                      <li><input type="text" placeholder="URL da imagem 3"></li>
                                                      <div class="escondido">Preencha pelo menos uma resposta incorreta</div>
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
    } else {
      const seletorAlertas = document.querySelectorAll(".primeira-parte ul div");
      if(!caracteresDoTitulo){
        seletorInputs[0].classList.add("invalido");
        seletorAlertas[0].classList.remove("escondido");
      } else {
        seletorInputs[0].classList.remove("invalido");
        seletorAlertas[0].classList.add("escondido");
      }
      if(!formatoURL){
        seletorInputs[1].classList.add("invalido");
        seletorAlertas[1].classList.remove("escondido");
      } else {
        seletorInputs[1].classList.remove("invalido");
        seletorAlertas[1].classList.add("escondido");
      }
      if(!quantidadeValidaPerguntas){
        seletorInputs[2].classList.add("invalido");
        seletorAlertas[2].classList.remove("escondido");
      } else {
        seletorInputs[2].classList.remove("invalido");
        seletorAlertas[2].classList.add("escondido");
      }
      if(!quantidadeValidaNiveis){
        seletorInputs[3].classList.add("invalido");
        seletorAlertas[3].classList.remove("escondido");
      } else {
        seletorInputs[3].classList.remove("invalido");
        seletorAlertas[3].classList.add("escondido");
      }
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

  if(perguntasValidadas){
    const seletorSegundaParte = document.querySelector(".segunda-parte");
    seletorSegundaParte.classList.add("escondido");
    const seletorTerceiraParte = document.querySelector(".terceira-parte");
    seletorTerceiraParte.classList.remove("escondido");

    const seletorNiveis = document.querySelector(".niveis");
    seletorNiveis.innerHTML="";
    for(let i = 0; i < novoQuizz.levels.length; i++){ 
      if(i === 0){  
        seletorNiveis.innerHTML += `<div>
                                      <div class="aba-nivel" onclick="selecionarNivel(this)">
                                        <span>Nível ${i+1}</span>
                                        <ion-icon name="create-outline" class="icone-nivel escondido"></ion-icon>
                                      </div>
                                      <ul class="nivel">
                                        <li><input type="text" placeholder="Título do nível"></li>
                                        <div class="escondido">Título do nível: mínimo de 10 caracteres</div>
                                        <li><input type="number" placeholder="% de acerto mínima"></li>
                                        <div class="escondido">% de acerto mínima: um número entre 0 e 100</div>
                                        <li><input type="text" placeholder="URL da imagem do nível"></li>
                                        <div class="escondido">URL da imagem do nível: deve ter formato de URL</div>
                                        <li><textarea rows="4" cols="30" placeholder="Descrição do nível"></textarea></li>
                                        <div class="escondido">Descrição do nível: mínimo de 30 caracteres</div>
                                      </ul>
                                    </div>`;
      } else {
        seletorNiveis.innerHTML += `<div>
                                      <div class="aba-nivel" onclick="selecionarNivel(this)">
                                        <span>Nível ${i+1}</span>
                                        <ion-icon name="create-outline" class="icone-nivel"></ion-icon>
                                      </div>
                                      <ul class="nivel escondido">
                                        <li><input type="text" placeholder="Título do nível"></li>
                                        <div class="escondido">Título do nível: mínimo de 10 caracteres</div>
                                        <li><input type="number" placeholder="% de acerto mínima"></li>
                                        <div class="escondido">% de acerto mínima: um número entre 0 e 100</div>
                                        <li><input type="text" placeholder="URL da imagem do nível"></li>
                                        <div class="escondido">URL da imagem do nível: deve ter formato de URL</div>
                                        <li><textarea rows="4" cols="30" placeholder="Descrição do nível"></textarea></li>
                                        <div class="escondido">Descrição do nível: mínimo de 30 caracteres</div>
                                      </ul>
                                    </div>`;
      }
    }
    
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
    }
  } else {
      const seletorPerguntas = document.querySelectorAll(".pergunta");

      for(let i = 0; i < seletorPerguntas.length; i++){
        const seletorInputs = seletorPerguntas[i].querySelectorAll("input");
        const seletorAlertas = seletorPerguntas[i].querySelectorAll("div");

        console.log("Inputs", seletorInputs); 
        console.log("Alertas", seletorAlertas);
        let caracteresDaPergunta = seletorInputs[0].value.length > 19;
        let hexCorDeFundo = isValidHex(seletorInputs[1].value);
        let respostaCorretaPreenchida = seletorInputs[2].value.trim().length !== 0;
        let respostaCorretaURLPreenchida = validURL(seletorInputs[3].value);

        let peloMenosUmaIncorreta = seletorInputs[4].value.trim().length !== 0 && validURL(seletorInputs[5].value) ||
                                seletorInputs[6].value.trim().length !== 0 && validURL(seletorInputs[6].value) ||
                                seletorInputs[7].value.trim().length !== 0 && validURL(seletorInputs[8].value);

        if(!caracteresDaPergunta){
          seletorInputs[0].classList.add("invalido");
          seletorAlertas[0].classList.remove("escondido");
        } else {
          seletorInputs[0].classList.remove("invalido");
          seletorAlertas[0].classList.add("escondido");
        }
        if(!hexCorDeFundo){
          seletorInputs[1].classList.add("invalido");
          seletorAlertas[1].classList.remove("escondido");
        } else {
          seletorInputs[1].classList.remove("invalido");
          seletorAlertas[1].classList.add("escondido");
        }
        if(!respostaCorretaPreenchida){
          seletorInputs[2].classList.add("invalido");
          seletorAlertas[2].classList.remove("escondido");
        } else {
          seletorInputs[2].classList.remove("invalido");
          seletorAlertas[2].classList.add("escondido");
        }
      if(!respostaCorretaURLPreenchida){
        seletorInputs[3].classList.add("invalido");
        seletorAlertas[3].classList.remove("escondido");
      } else {
        seletorInputs[3].classList.remove("invalido");
        seletorAlertas[3].classList.add("escondido");
      }
      if(!peloMenosUmaIncorreta){
        seletorInputs[4].classList.add("invalido");
        seletorInputs[5].classList.add("invalido");
        seletorInputs[6].classList.add("invalido");
        seletorInputs[7].classList.add("invalido");
        seletorInputs[8].classList.add("invalido");
        seletorInputs[9].classList.add("invalido");
        seletorAlertas[4].classList.remove("escondido");
      }else {
        seletorInputs[4].classList.remove("invalido");
        seletorInputs[5].classList.remove("invalido");
        seletorInputs[6].classList.remove("invalido");
        seletorInputs[7].classList.remove("invalido");
        seletorInputs[8].classList.remove("invalido");
        seletorInputs[9].classList.remove("invalido");
        seletorAlertas[4].classList.add("escondido");
      }

    } 
  }   
}
function isValidHex(color) {
    if(!color || typeof color !== 'string') return false;

    if(color.substring(0, 1) === '#') color = color.substring(1);

    switch(color.length) {
      case 6: return /^[0-9A-F]{6}$/i.test(color);
      default: return false;
    }
  }
function finalizarQuizz(){
  const seletorTodosNiveis = document.querySelectorAll(".nivel");
  let numeroAcertosMinimo = [];
  let validacaoNiveis = [];
  for(let i = 0; i < seletorTodosNiveis.length; i++){
    const seletorInputs = seletorTodosNiveis[i].querySelectorAll("li > *");
    
    const caracteresDoTitulo = seletorInputs[0].value.length > 9;
    const numeroDeAcertos = seletorInputs[1].value.trim().length > 0 && seletorInputs[1].value >= 0 &&
    seletorInputs[1].value < 101;
    const formatoURL = validURL(seletorInputs[2].value);
    const descricaoValida = seletorInputs[3].value.length > 29;

    const validacaoNivel = caracteresDoTitulo && numeroDeAcertos && formatoURL && descricaoValida;
    validacaoNiveis.push(validacaoNivel);

    numeroAcertosMinimo.push(seletorInputs[1].value);
  }

  let validacao = validacaoNiveis[0];

  for(let i = 1; i < validacaoNiveis.length; i++){
    validacao = validacao && validacaoNiveis[i];
  }

  let valorMinimo = Number(numeroAcertosMinimo[0]);

   for(let i = 1; i < numeroAcertosMinimo.length; i++){
     if(valorMinimo > Number(numeroAcertosMinimo[i])){
      valorMinimo = Number(numeroAcertosMinimo[i]);
     }
  }

  if(validacao && valorMinimo === 0){
    const seletorTerceiraParte = document.querySelector(".terceira-parte");
    seletorTerceiraParte.classList.add("escondido");
    const seletorQuartaParte = document.querySelector(".quarta-parte");
    seletorQuartaParte.classList.remove("escondido");

    for(let i = 0; i < seletorTodosNiveis.length; i++){
      const seletorInputs = seletorTodosNiveis[i].querySelectorAll("li > *");
      novoQuizz.levels[i]["title"] = seletorInputs[0].value;
      novoQuizz.levels[i]["image"] = seletorInputs[2].value;
      novoQuizz.levels[i]["text"] = seletorInputs[3].value;
      novoQuizz.levels[i]["minValue"] = Number(seletorInputs[1].value);
    }
    const promessa = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes', novoQuizz);
    promessa.then(processarResposta);
    promessa.catch(processarFalhaResposta);
    elementoCarregando.classList.remove("escondido");
  } else {
    
    for(let i = 0; i < seletorTodosNiveis.length; i++){
      const seletorInputs = seletorTodosNiveis[i].querySelectorAll("li > *");
      const seletorAlertas = seletorTodosNiveis[i].querySelectorAll("div");
      const caracteresDoTitulo = seletorInputs[0].value.length > 9;
      const numeroDeAcertos = seletorInputs[1].value.trim().length > 0 && seletorInputs[1].value >= 0 &&
      seletorInputs[1].value < 101;
      const formatoURL = validURL(seletorInputs[2].value);
      const descricaoValida = seletorInputs[3].value.length > 29;

      if(!caracteresDoTitulo){
        seletorInputs[0].classList.add("invalido");
        seletorAlertas[0].classList.remove("escondido");
      } else {
        seletorInputs[0].classList.remove("invalido");
        seletorAlertas[0].classList.add("escondido");
      }
      if(!numeroDeAcertos){
        seletorInputs[1].classList.add("invalido");
        seletorAlertas[1].classList.remove("escondido");
      } else {
        seletorInputs[1].classList.remove("invalido");
        seletorAlertas[1].classList.add("escondido");
      }
      if(!formatoURL){
        seletorInputs[2].classList.add("invalido");
        seletorAlertas[2].classList.remove("escondido");
      } else {
        seletorInputs[2].classList.remove("invalido");
        seletorAlertas[2].classList.add("escondido");
      }
      if(!descricaoValida){
        seletorInputs[3].classList.add("invalido");
        seletorAlertas[3].classList.remove("escondido");
      } else {
        seletorInputs[3].classList.remove("invalido");
        seletorAlertas[3].classList.add("escondido");
      }
    }
  }   
}
function processarResposta(resposta){
  elementoCarregando.classList.add("escondido");
  console.log("VOLTOU DO SERVIDOR!", resposta);

  let listaID = JSON.parse(localStorage.getItem("listaID"));
  if(localStorage.getItem("listaID")===null){
    listaID = [];
  }

  listaID.push(resposta.data.id);
  localStorage.setItem("listaID", JSON.stringify(listaID));

  let listaKey = JSON.parse(localStorage.getItem("listaKey"));
  if(localStorage.getItem("listaKey")===null){
    listaKey = [];
  }

  listaKey.push(resposta.data.key);
  localStorage.setItem("listaKey", JSON.stringify(listaKey));

  const seletorCartaoQuizz = document.querySelector(".quarta-parte .cartao-quizz");
  seletorCartaoQuizz.innerHTML = `<span>${novoQuizz.title}</span>`;
  seletorCartaoQuizz.style.backgroundImage = `
  linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)), url('${novoQuizz.image}')
`;
  
}
function processarFalhaResposta(erro){
  console.log("FALHOU!", erro.response.status);
} 

function voltarPaginaInicial(){
    window.location.reload();
}
function selecionarPergunta(elemento){
  const seletorTodasPerguntas = document.querySelectorAll(".pergunta");
  const seletorTodosIconesPergunta = document.querySelectorAll(".icone-pergunta");
  for(let i = 0; i < seletorTodasPerguntas.length; i++){
    seletorTodasPerguntas[i].classList.add("escondido");
    seletorTodosIconesPergunta[i].classList.remove("escondido");
  }
  const seletorUL = elemento.parentNode.querySelector("ul");
  seletorUL.classList.remove("escondido");
  const seletorIconePergunta = elemento.parentNode.querySelector(".icone-pergunta");
  seletorIconePergunta.classList.add("escondido");
}
function selecionarNivel(elemento){ 
  const seletorTodosNiveis = document.querySelectorAll(".nivel");
  const seletorTodosIconesNivel = document.querySelectorAll(".icone-nivel");
  for(let i = 0; i < seletorTodosNiveis.length; i++){
    seletorTodosNiveis[i].classList.add("escondido");
    seletorTodosIconesNivel[i].classList.remove("escondido");
  }
  const seletorUL = elemento.parentNode.querySelector("ul");
  seletorUL.classList.remove("escondido");
  const seletorIconeNivel = elemento.parentNode.querySelector(".icone-nivel");
  seletorIconeNivel.classList.add("escondido");
}

function unicoQuizz(){
    const listaID = JSON.parse(localStorage.getItem("listaID"));
    const id = listaID[listaID.length-1];
    const promessaQuizzUnico = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${id}`);
    promessaQuizzUnico.then(sucessoReceberQuizzUnico);
    
    const elementoPaginaQuizz = document.querySelector(".pagina-de-um-quizz");
    elementoPaginaQuizz.classList.remove("escondido");
    const elementoQuartaParte = document.querySelector(".quarta-parte");
    elementoQuartaParte.classList.add("escondido");
}