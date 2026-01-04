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

        dsiplayDiv.innerHTML = ''; // to make the added quote visible immediately
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

function createAddQuoteForm() {
  const form = document.createElement('form')

  const textInput = document.createElement('input');
  textInput.id = 'newQuoteText';
  textInput.placeholder = 'Enter a new quote';

  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';

  addButton.addEventListener("click", addQuote);

  form.appendChild(textInput);
  form.appendChild(categoryInput);
  form.appendChild(addButton);

  document.body.appendChild(form);
}

showQuoteBtn.addEventListener('click', showRandomQuote);
showRandomQuote();