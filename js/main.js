// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
// (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// Seleziono il contenitore dei blocchi
function GeneraGriglia() {

    const container = document.getElementById("grid");
    // previene che non resti la griglia precedente switchando le varie difficoltà
    container.innerHTML = '';
    // Imput dell'utente che definisce la difficoltà
    let difficolta = document.getElementById('difficolta').value;

    console.log(difficolta);
    // definisco le variabili che userò per le dimensioni della griglia
    let DimensioniGriglia = 0;
    let rows = 0;

    // - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
    // - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
    // - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
    if (difficolta === '1'){
        DimensioniGriglia = 100;
        rows = 10;
    } else if (difficolta === '2'){
        DimensioniGriglia = 81;
        rows = 9;
    } else if (difficolta === '3'){
        DimensioniGriglia = 49;
        rows = 7;
    }
    // diamo all'id container la proprietà css grid-template-columns, creando tante colonne quante ne vale rows, tutte delle stesse dimensioni.
    container.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;

    let numeri = Array.from({ length: DimensioniGriglia + 1}, (v, k) => k + 1);
    numeri.sort(() => Math.random() - 0.5);

    let punteggio = 0;
    let clickedTrovati = 0;

    function FineDelGioco() {
        // Mostra il punteggio Finale
        alert(`Hai Trovato una BOMBA, hai perso. Punteggio finale: ${punteggio}`);

        // reset delle variabili
        punteggio = 0;
        clickedTrovati = 0;

        // Rimuovi tutte le caselle cliccate per ripristinare il gioco
        container.querySelectorAll('.box').forEach(box => {
            box.removeEventListener('click', handleClick);
        });

        // Nuova Partita
        GeneraGriglia();
        
    }

    function handleClick() {
        // Ottieni l'indice dell'attributo dataset
        const index = parseInt(this.dataset.index);
        const element = this;

        if (numeri[index] % 2 === 0 || numeri[index] % 3 === 0 || numeri[index] % 5 === 0 || numeri[index] % 7 === 0) {
            element.classList.add('clicked');
            punteggio++;
            clickedTrovati++;
        } else {
            element.classList.add('clicked-red');
            FineDelGioco();
            return;
        }

        console.log(`Hai cliccato sulla cella numero: ${numeri[index]}, Punteggio attuale: ${punteggio}`);

        // vittoria
        if (clickedTrovati === DimensioniGriglia) {
            alert(`Hai Vinto!!! Hai scoperto tutte le caslelle! Punteggio Finale: ${punteggio}`);
        }

    }

















    // for (let i = numeri.length - 1; i > 0; i--){
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [numeri[i], numeri[j]] = [numeri[j], numeri[i]];
    // }


    // Ciclo per la creazione della griglia
    for (let index = 1; index <= DimensioniGriglia; index++) {
        // creo l'elemento div
        const element = document.createElement('div');
        // aggiungo la classe box al div di element
        element.classList.add('box')
        // Salva l'indice nell'attributo dataset
        element.dataset.index = index - 1;
        // definisco cosa dovra mettere nell'html
        element.innerHTML = `<div class="box-interno">${numeri[index]}</div>`
        // Appendo l'elemento creato al container (id"grid")
        container.appendChild(element);
        // aggiungo il click e de-click ai box
        element.addEventListener('click', handleClick);
            
            // // Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
            // if(numeri[index] % 2 === 0 || numeri[index] % 3 === 0 || numeri[index] % 5 === 0 || numeri[index] % 7 === 0){
            //     element.classList.add('clicked');
            // } else {
            //     element.classList.add('clicked-red');
            // }


            // console.log(`Hai cliccato sulla cella numero: ${numeri[index]}`);


    };
    
    
   
        
}