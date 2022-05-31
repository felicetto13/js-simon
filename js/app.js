/* 
Visualizzare in pagina (html) 5 numeri casuali.
Avviare un timer di 30 secondi
Dopo 30 secondi, nascondere i numeri.
L’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite un prompt().
Dopo che sono stati inseriti i 5 numeri, 
il software dice quanti e quali dei numeri da indovinare sono stati individuati.
*/

//creo una funzione per i numeri casuali
function casualNumberGenerator() {
    const number = Math.floor(Math.random() * 999);

    return number;
}

//funzione che mi permette di chiedere all'utente i numeri che si ricorda
function userNumber() {
    for (let i = 0; i < 5; i++) {
        numeriUtente[i] = verificaValoreInserito()
    }
    return numeriUtente;
}
//funzione che controlla l'inserimento da parte dell'utente il numero inserito e lo valida
function verificaValoreInserito() {
    let numInserito;
    let verifica = true;
    do {
        numInserito = parseInt(prompt("Inserisci un numero tra quelli che hai visualizzato in precedenza"));
        if (isNaN(numInserito) || numInserito < 0 || numInserito > 999) {
            alert("Hai inserito un valore non valido. Devi inserire un valore numerico compreso tra 0 e 999")
        } else {
            verifica = false;
        }
    } while (verifica);
    return numInserito;
}

//funzione che confronta i numeri inseriti dall'utente e quelli visualizzati in precedenza
function numbersCheck() {
    document.body.innerHTML = "";
        userNumber();
    

    for (let i = 0; i < numeriGenerati.length; i++) {
        for (let j = 0; j < numeriUtente.length; j++) {
            if (numeriGenerati[j] === numeriUtente[i]) {
                numeriIndovinati.push(numeriUtente[i]);
            }
        }
    }
    showResults();
}

//creo la funzione che mostrerà a video il risultato del confronto dei numeri 
function showResults() {
    const overlay = document.createElement("div")
    const popup = document.createElement("div")
    popup.classList.add("popup")
    overlay.classList.add("overlay")
    if (numeriIndovinati.length < 5) {
        popup.innerHTML = `<h1>Non hai indovinato!</h1>
        <p>Ci dispiace ma i numeri da indovinare erano: ${numeriGenerati}</p>
        <p>I tuoi numeri sono stati: ${numeriUtente}</p>
        <p>Quindi i numeri indovinati sono: ${numeriIndovinati}</p>`
    } else {
        popup.innerHTML = `<h1>Hai indovinato!</h1>
        <p>I numeri da indovinare erano: ${numeriGenerati}</p>
        <p>I tuoi numeri sono stati: ${numeriUtente}</p>
        <p>Quindi i numeri indovinati sono tutti!( ${numeriIndovinati} )</p>`
    }
    overlay.append(popup);
    document.body.prepend(overlay);

}


//creo una funzione che mi avvii un timer di 30 secondi

function timerShow() {

    let restSecond = 10;
    let controlloIntervallo;
    controlloIntervallo = setInterval(function () {
        if (!controlloIntervallo) {
            return;
        }

        if (restSecond > 0) {
            restSecond--;
            timerContainer.innerHTML = `<h1>Tempo residuo</h1>
        <span>${restSecond.toString().padStart(2, "0")}</span>`;
        } else {
            document.body.innerHTML = "";
            controlloIntervallo = clearInterval(restSecond);
            setTimeout(function(){
                numbersCheck();
            }, 250)
            
        }

    }, 1000)

}

const cardContainer = document.getElementById("card-container");
const timerContainer = document.getElementById("timer-container");
let numeriUtente = [];
let numeriIndovinati = [];
let numeriGenerati = [];

for (let i = 0; i < 5; i++) {
    numeriGenerati.push(casualNumberGenerator());
    const divNumeri = document.createElement("div");
    divNumeri.classList.add("text-center", "fs-1", "my-card", "rounded-3");
    divNumeri.append(numeriGenerati[i].toString());
    cardContainer.append(divNumeri);
}


/* setInterval(function(){

}, 1000) */

setTimeout(function () {
    timerShow();
}, 250)
