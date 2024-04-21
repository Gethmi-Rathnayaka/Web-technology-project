async function fetchData() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function searchProducts() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const products = await fetchData();

    const searchResults = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );

    displaySearchResults(searchResults);
}

function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById("search-results");
    searchResultsContainer.innerHTML = "";

    if (results.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No results found";
        searchResultsContainer.appendChild(li);
    } else {
        results.forEach(result => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.textContent = `${result.name} - ${result.category} - $${result.price}`;
            link.href = `product.html?name=${encodeURIComponent(result.name)}`;
            li.appendChild(link);
            searchResultsContainer.appendChild(li);
        });
    }
}

document.getElementById("search-input").addEventListener("input", searchProducts);
