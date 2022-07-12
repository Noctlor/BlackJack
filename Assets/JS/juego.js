/**
 * 2C = Dos de Treboles
 * 2D = Dos de Diamantes
 * 2H = Dos de Corazones
 * 2S = Dos de Espadas
 */


(() =>{
    'use strict'
    let deck         = [];
    const tipos      = ['C','D','H','S'], especiales = ['A','J','Q','K']; 
    let puntosJugadores = [];
    let puntosJ=0, puntosT=0;   


    //referencias

    const btnPedir = document.querySelector('#btnPedir'), btnDetener = document.querySelector('#btnDetener'), btnNuevo = document.querySelector('#btnNuevo');
    const divCartasJugadores = document.querySelectorAll('.divCartas'), pt = document.querySelectorAll('small');
    
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);

        }
        pt.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = "");

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    const crearDeck = () => {
        deck = [];
        for(let i =2 ;i<= 10;i++){
            for(let tipo of tipos){
                deck.push(i + tipo);

            }
        }
        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }

        return _.shuffle(deck);
    }

    const pedirCarta = () => {

        if( deck.length === 0){
            throw ' no hay cartas en el deck';
        }
        

        return deck.pop();;

    }



    const valorCarta = (carta) =>{
        const valor = carta.substring(0,carta.length - 1);
        return ( isNaN(valor)) ? (valor === 'A') ? 11:10:valor * 1;

        }
        //logica PC
    const acumularpuntos = (carta,turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        pt[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }
    const crearCarta = (carta, turno) =>{
        const imgCarta = document.createElement('img');
        imgCarta.src=`Assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta);


    }
    const determinarGanador = () =>{
        const [ puntosMinimos, puntosT] = puntosJugadores;
        setTimeout(()=>{
            if (puntosMinimos === puntosT){
                alert('Tablas!!');
            }else if ((puntosMinimos > puntosT) && (puntosMinimos <= 21)  || (puntosT > 21)){
                alert('Ganaste!!!');
            }else if ((puntosMinimos < puntosT) && (puntosT <= 21) || (puntosMinimos > 21)){
                alert('Perdiste!!!');   
            }
        }, 1);
    }

    const turnoT = (puntosMinimos) => {
        let turnoT = 0;
        do{
            const carta = pedirCarta();
            puntosT = acumularpuntos(carta,puntosJugadores.length-1);
            crearCarta(carta,puntosJugadores.length-1);   

        }while((puntosT<=puntosMinimos)&&(puntosMinimos<=21));
        determinarGanador();

        
    }

    //eventos

    btnPedir.addEventListener('click', ()=>{
        const carta = pedirCarta();
        const puntosJ = acumularpuntos( carta , 0);
        crearCarta(carta,0);

        if (puntosJ > 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoT(puntosJ)
        }else if (puntosJ ===21){
            btnDetener.disabled = true;
            turnoT(puntosJ);

        }





    });
    btnDetener.addEventListener('click', () =>{
        btnPedir.disabled= true;
        btnDetener.disabled = true;
        turnoT(puntosJugadores[0]);
    })
    btnNuevo.addEventListener('click', ()=>{
        inicializarJuego();        




    })
})();

