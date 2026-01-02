const container = document.getElementById('container');
const quoteInput = document.getElementById('quoteInput');
const authorInput = document.getElementById('authorInput');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const quotesContainer = document.getElementById('quotesContainer');

function displayQuotes() {
    quotesContainer.innerHTML = '';
    for(let i =0 ; i<localStorage.length; i++){
        const key = localStorage.key(i);
        const qouteSTR = localStorage.getItem(key);
        const qouteOBJ = JSON.parse(qouteSTR);
        
        const quoteItemDiv = document.createElement('div');
        quoteItemDiv.className = 'quoteItemDiv';
        const quoteText = document.createElement('p');
        quoteText.innerHTML = `<strong>"${qouteOBJ.text}"</strong> - ${qouteOBJ.author}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeQuote(key));
        
        quoteItemDiv.appendChild(quoteText);
        quoteItemDiv.appendChild(removeBtn);
        quotesContainer.appendChild(quoteItemDiv);
    }
}
function removeQuote(key) {
    localStorage.removeItem(key);
    displayQuotes();
}
let cnt = 1;
addQuoteBtn.addEventListener('click', () => {
    if(quoteInput.value && authorInput.value) { 
        const qouteOBJ = {
            "text": quoteInput.value,
            "author": authorInput.value
        }
        const qouteSTR = JSON.stringify(qouteOBJ);
        localStorage.setItem(`quote_${cnt}`, qouteSTR);
        cnt++;
        quoteInput.value = '';
        authorInput.value = '';
        displayQuotes();
    }
});
displayQuotes();