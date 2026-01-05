const dsiplayDiv = document.getElementById('quoteDisplay');
const showQuoteBtn = document.getElementById('newQuote');
const inputQuoteText = document.getElementById('newQuoteText');
const inputQuoteCategory = document.getElementById('newQuoteCategory');

let quotes = JSON.parse(localStorage.getItem('quotes')) ||
        [
            { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
            { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
            { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
        ];
function saveQuotes(){
    localStorage.setItem('quotes', JSON.stringify(quotes));
}
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const categoryFilter = document.getElementById('categoryFilter');
    
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';

    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);

    if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = "No quotes available for this category.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];

    quoteDisplay.innerHTML = '';
    const textElement = document.createElement('p');
    textElement.textContent = `"${quote.text}"`;
    const categoryElement = document.createElement('p');
    categoryElement.textContent = `- Category: ${quote.category}`;
    
    quoteDisplay.appendChild(textElement);
    quoteDisplay.appendChild(categoryElement);
}

function addQuote() {
    const newQuote = inputQuoteText.value;
    const newCategory = inputQuoteCategory.value;
    
    if(newQuote && newCategory){
        quoteObj = { text: newQuote, category: newCategory };
        quotes.push(quoteObj);

        saveQuotes();
        populateCategories();
        postQuoteToServer(newQuote);
        
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
  populateCategories();
}
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes);

    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json'; // The file name
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}
function importFromJsonFile(event) {
    const fileReader = new FileReader();

    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);

        quotes.push(...importedQuotes); 
        saveQuotes();

        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    
    const categories = ['all', ...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = '';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category === 'all' ? 'All Categories' : category;
        
        categoryFilter.appendChild(option);
    });
    const lastSelected = localStorage.getItem('lastSelectedCategory');
    if (lastSelected) {
        categoryFilter.value = lastSelected; 
    }
}
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastSelectedCategory', selectedCategory);

    showRandomQuote();
}

// Configuration
const API_URL = "https://jsonplaceholder.typicode.com/posts"; // The mock server

// Function to Simulate Fetching Data from Server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        return data.slice(0, 5).map(item => ({
            text: item.title,
            category: "Server"
        }));
    } catch (error) {
        console.error("Error fetching from server:", error);
        return []; 
    }
}
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote)
        });
        const result = await response.json();
        console.log("Quote posted to server:", result);
    } catch (error) {
        console.error("Error posting to server:", error);
    }
}

async function syncQuotes() {
    const statusDiv = document.getElementById('syncStatus');

    const serverQuotes = await fetchQuotesFromServer();
    let conflictsResolved = false;
    let newQuotesAdded = false;

    serverQuotes.forEach(serverQuote => {
        const localQuoteIndex = quotes.findIndex(q => q.text === serverQuote.text);

        if (localQuoteIndex !== -1) {
            if (quotes[localQuoteIndex].category !== serverQuote.category) {

                quotes[localQuoteIndex].category = serverQuote.category;
                conflictsResolved = true;
            }
        } else {
            quotes.push(serverQuote);
            newQuotesAdded = true;
        }
    });
    if (conflictsResolved || newQuotesAdded) {
        saveQuotes();
        populateCategories(); 
        
        statusDiv.style.color = "#155724";
        
        if (conflictsResolved) {
            statusDiv.textContent = "Sync complete. Conflicts resolved (Server data prioritized).";
        } else {
            statusDiv.textContent = "Sync complete. New quotes added from server.";
        }
        
        showRandomQuote();
    } else {
        statusDiv.textContent = "Quotes synced. No changes.";
        setTimeout(() => { statusDiv.style.display = 'none'; }, 3000);
    }
}
setInterval(syncQuotes, 5000);
showQuoteBtn.addEventListener('click', showRandomQuote);
showRandomQuote();