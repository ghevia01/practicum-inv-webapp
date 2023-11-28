// Define totalPages globally
let totalPages;

// Function to handle pagination UI
function createPaginationUI(currentPage) {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => fetchUserData(i));
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        paginationContainer.appendChild(pageButton);
    }
}

// Function to fetch user data based on the page number
function fetchUserData(page) {
    fetch(`../api/fetch-user-data.php?page=${page}`)
        .then(response => response.text())
        .then(data => {
            // Extract totalPages from the response
            const match = data.match(/totalPages=(\d+)/);
            if (match) {
                totalPages = parseInt(match[1], 10);
                createPaginationUI(page);
                document.getElementById('table-body').innerHTML = data.replace(/totalPages=\d+/, ''); // Remove totalPages from the HTML
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
}

// Fetch initial user data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Fetch user data for the initial page
    fetchUserData(1);
});