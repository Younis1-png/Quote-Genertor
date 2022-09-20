const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Loading Spinner show
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Spinner or loader
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Generate New quote
function newQuote() {
  loading();

  // Random quote generate
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // console.log(quote.author);

  // Check if the author field is blank and replace it with unknown
  if (!quote.author) {
    authorText.innerHTML = "Unknown";
  } else {
    authorText.innerHTML = quote.author;
  }
  console.log(quote.author);

  // check quote to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// get quote from API
async function getQuote() {
  loading();

  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes[0].text);
    newQuote();
  } catch {
    // catch  Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);

getQuote();
