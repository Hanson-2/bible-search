const API_KEY = "a79632800f0fea27f5db5c99774d289b";  // Your API Key
const BIBLE_ID = "EXB";  // Replace with your actual Bible ID

function searchBible() {
    let query = document.getElementById("searchQuery").value;
    if (!query) {
        alert("Please enter a Bible reference.");
        return;
    }

    let apiUrl = `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/search?query=${encodeURIComponent(query)}`;

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "api-key": API_KEY
        }
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data);
    })
    .catch(error => console.error("Error fetching data:", error));
}

function displayResults(data) {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";  // Clear previous results

    if (!data.data || data.data.length === 0) {
        resultsDiv.innerHTML = "<p>No results found. Try a different search.</p>";
        return;
    }

    let versesHtml = "<h3>Search Results:</h3>";
    data.data.forEach(verse => {
        versesHtml += `<p><strong>${verse.reference}</strong>: ${verse.text}</p>`;
    });

    resultsDiv.innerHTML = versesHtml;
}
