// Funzione per verificare se la parola è palindroma
function Palindromo(parola) {
    // Confronta la parola con la sua versione invertita
    return parola === parola.split('').reverse().join('');
   
}

// Funzione per determinare se il numero è pari

function Pari(num) {
    return num % 2 === 0;
}