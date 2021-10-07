function principal(){
    DesenharCampo();
    jogar();
}

function iniciar(){

    folhaDesenho = document.getElementById("folha")
    areaDesenho = folhaDesenho.getContext("2d")

    larguraCampo = 600
    alturaCampo = 500
    espessuraRede = 5

    diametroBola = 10

    espessuraRaquete = 5
    alturaRaquete = 100
    efeitoRaquete = 0.3    
    velocidadeJogador2 = 5

    posicaoJogador1 = posicaoJogador2 = 100

    posicaoBolaX = 300
    posicaoBolaY = 250
    velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 5
    pontuacaoJogador1 = pontuacaoJogador2 = 0
}

function DesenharCampo(){
    // campo
    areaDesenho.fillStyle = "#286047" // Cor Verde
    areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo)
    // rede
    areaDesenho.fillStyle = "#ffffff" // Cor Branca
    areaDesenho.fillRect(larguraCampo/2 - espessuraRede/2, 0, espessuraRede, alturaCampo)
    // Bola 
    areaDesenho.fillRect(posicaoBolaX - diametroBola/2, posicaoBolaY - diametroBola/2, diametroBola, diametroBola)
    // Raquetes
    areaDesenho.fillRect(0, posicaoJogador1, espessuraRaquete,alturaRaquete)
    areaDesenho.fillRect(larguraCampo - espessuraRaquete, posicaoJogador2, espessuraRaquete,alturaRaquete)

    //Pontuaçoes
    areaDesenho.fillText("Humano - " + pontuacaoJogador1 + " Pontos", 100, 100)
    areaDesenho.fillText("Humano - " + pontuacaoJogador2 + " Pontos", larguraCampo - 200, 100)

}

function jogar() {

    posicaoBolaX = posicaoBolaX + velocidadeBolaPosicaoX
    posicaoBolaY = posicaoBolaY + velocidadeBolaPosicaoY

    //Lateral Superior
    if(posicaoBolaY < 0 && velocidadeBolaPosicaoY < 0){
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY
    }

    //Lateral Inferior
    if(posicaoBolaY > alturaCampo && velocidadeBolaPosicaoY > 0){
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY
    }

    //Verifica se o Jogador 2 Fez ponto
    if(posicaoBolaX < 0 && velocidadeBolaPosicaoX < 0){
        //Rebater a Bola
        if(posicaoBolaY > posicaoJogador1 && velocidadeBolaPosicaoY < posicaoJogador1 + alturaRaquete){
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX

            let diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2)
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete
        //Jogador 2 Pontua
        }else{
            pontuacaoJogador2 ++
            //Bola retorna para o meio do campo
            ballCenter()
        }   
    }

    //Verifica se o Jogador 1 Fez ponto
    if(posicaoBolaX > larguraCampo){
        //Rebater a Bola
        if(posicaoBolaY > posicaoJogador2 && posicaoBolaY < posicaoJogador2 + alturaRaquete){
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX

            let diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2)
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete
        //Jogador 1 Pontua
        }else{
            pontuacaoJogador1 ++
            //Bola retorna para o meio do campo
            ballCenter()
        }   
    }

    if(posicaoJogador2 + alturaRaquete/2 < posicaoBolaY){
        posicaoJogador2 = posicaoJogador2 + velocidadeJogador2
    }else{
        posicaoJogador2 = posicaoJogador2 - velocidadeJogador2
    }

}

//Bola retorna para o meio do campo
function ballCenter(){
    posicaoBolaX = larguraCampo / 2
    posicaoBolaY = alturaCampo / 2
    velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX
    velocidadeBolaPosicaoY = 3
}