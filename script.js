const jokeDisplay = document.getElementById('jokeDisplay');
const newJokeBtn = document.getElementById('newJokeBtn');
const categorySelect = document.getElementById('category');

// Function to fetch and display a random joke
async function fetchJoke(category = 'Any') {
  try {
    // API URL with the selected category
    const response = await fetch(`https://v2.jokeapi.dev/joke/${category}?type=twopart`);
    const joke = await response.json();

    // Check if the joke is a "two-part" joke (setup and delivery)
    if (joke.setup && joke.delivery) {
      jokeDisplay.textContent = `${joke.setup} - ${joke.delivery}`;
    } 
    // Check if the joke is a "single" joke
    else if (joke.joke) {
      jokeDisplay.textContent = joke.joke;
    } 
    // Display a fallback message if no joke is found
    else {
      jokeDisplay.textContent = "No joke found!";
    }
  } catch (error) {
    // Display an error message if the API request fails
    jokeDisplay.textContent = "Oops! Something went wrong.";
  }
}

// Event listener for the "New Joke" button
newJokeBtn.addEventListener('click', () => {
  // Fetch the selected category from the dropdown
  const selectedCategory = categorySelect.value;
  // Fetch a new joke with the chosen category
  fetchJoke(selectedCategory);
});

// Initial joke load (fetches a random joke on page load)
fetchJoke();
