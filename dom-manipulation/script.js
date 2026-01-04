const dsiplayDiv = document.getElementById('quoteDisplay');
const showQuoteBtn = document.getElementById('newQuote');
const inputQuoteText = document.getElementById('newQuoteText');
const inputQuoteCategory = document.getElementById('newQuoteCategory');

let quotes = [
            { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
            { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
            { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
        ];

function showRandomQuote() {
    dsiplayDiv.innerHTML = '';
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    const qoutElementText = document.createElement('p');
    qoutElementText.textContent = `"${quote.text}"`;

    const qoutElemtnCategory = document.createElement('p');
    qoutElemtnCategory.textContent = `- ${quote.category}`;

    dsiplayDiv.appendChild(qoutElementText);
    dsiplayDiv.appendChild(qoutElemtnCategory);
}

function addQuote() {
    const newQuote = inputQuoteText.value;
    const newCategory = inputQuoteCategory.value;
    
    if(newQuote && newCategory){
        quoteObj = { text: newQuote, category: newCategory };
        quotes.push(quoteObj);

        inputQuoteText.value = '';
        inputQuoteCategory.value = '';

        dsiplayDiv.innerHTML = '';
         const qoutElementText = document.createElement('p');
         qoutElementText.textContent = `"${quoteObj.text}"`;

         const qoutElemtnCategory = document.createElement('p');
         qoutElemtnCategory.textContent = `- ${quoteObj.category}`;

        dsiplayDiv.appendChild(qoutElementText);
        dsiplayDiv.appendChild(qoutElemtnCategory);
    }
    else{
        alert("Please enter both quote text and category.");
    }
}

showQuoteBtn.addEventListener('click', showRandomQuote);
showRandomQuote();