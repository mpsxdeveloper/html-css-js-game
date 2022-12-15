const janelaAltura = window.innerHeight;
const janelaLargura = document.documentElement.clientWidth;
let erros = 0;
let acertos = 0;
let cliques = 0;
let score = 0;
let nivel = 1;
const cores = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow'];
let cor;
let loop = false;
let intervalo;
let atualizado = false;

function criarItem() {
    
    if(!atualizado) {
        atualizado = true;
        const index = Math.floor(Math.random() * cores.length);
        cor = cores[index];
        const div = document.getElementById('cor_img');
        div.style.backgroundColor = cor;  
    }

}

function mainLoop() {

    if(loop === true) {            
        criarItens();
        moverItens();            
    }
    
}

function atualizarPlacar() {

    const scorespan = document.getElementById('score_span');
    scorespan.innerHTML = 'Pontuação: ' + score;
    const nivelspan = document.getElementById('nivel_span');
    nivelspan.innerHTML = 'Nível: ' + nivel;
    const acertosspan = document.getElementById('acertos_span');
    acertosspan.innerHTML = 'Acertou: ' + acertos;
    const errosSpan = document.getElementById('erros_span');
    errosSpan.innerHTML = 'Errou: ' + erros;

}

function criarItens() {

    var jogo = document.getElementById('jogo');
    var x = Math.floor(Math.random() * (janelaLargura - 50));
    if(x <= 0) {
        x = 1;
    }
    var y = Math.floor(Math.random() * 100) + 50;
    var index = Math.floor(Math.random() * cores.length);
    var circulo = document.createElement('div');
    circulo.style.backgroundColor = cores[index]; 
    circulo.style.left = x + 'px';        
    circulo.style.top = y + 'px';        
    circulo.classList.add('circulo', 'item-class');
    jogo.appendChild(circulo);

}

function moverItens() {

    var jogo = document.getElementById('jogo');
    var circulos = document.getElementsByClassName('item-class');
    for(var i = 0; i < circulos.length; i++) {
        var velocidade = Math.floor(Math.random() * 20) + nivel;
        var topo = parseInt((circulos[i].style.top).replace('px', ''));
        circulos[i].style.top = (topo + velocidade) + 'px';
        if(circulos[i].offsetTop > janelaAltura) {
            let c = circulos[i].style.backgroundColor;
            jogo.removeChild(circulos[i]);
            if(c == cor) {
                erros++;
                atualizarPlacar();
                if(erros == 3) {
                    gameOver();
                }                    
            }
        }
        circulos[i].onclick = function() {
            if(loop == true) {
                if(this.style.backgroundColor == cor) {
                    jogo.removeChild(this);
                    acertos++;
                    cliques++;
                    score += 100;                        
                    if(cliques == 5) {
                        document.querySelectorAll(".item-class").forEach(el => el.remove());
                        cliques = 0;
                        nivel++;
                        atualizado = false;
                        criarItem();                                                        
                    }
                    atualizarPlacar();                        
                }
                else {
                    jogo.removeChild(this);
                    erros++;
                    atualizarPlacar();
                    if(erros == 3) {
                        gameOver();
                    }
                }                    
            }
        }
            
    }

}

function gameOver() {

    atualizarPlacar();
    loop = false;
    atualizado = false;
    clearInterval(intervalo);
    erros = 0;
    acertos = 0;
    cliques = 0;
    score = 0;
    nivel = 1;
    document.getElementById('inicio').innerHTML = 'Jogar';
    document.querySelectorAll(".item-class").forEach(el => el.remove());
    alert('Game Over');

}

window.onload = function () {
        
    document.getElementById('inicio').onclick = function() {
        if(!atualizado) {
            criarItem();
        }
        if(this.innerHTML == 'Jogar') {                
            atualizarPlacar();
            this.innerHTML = 'Pausar';
            loop = true;
            intervalo = setInterval(mainLoop, 500);
        }
        else {
            this.innerHTML = "Jogar";
            loop = false;
            clearInterval(intervalo);
        }
    }            
        
}
