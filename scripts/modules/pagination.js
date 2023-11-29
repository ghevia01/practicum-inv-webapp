let totalPages;

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

function fetchUserData(page) {
    fetch(`../api/fetch-user-data.php?page=${page}`)
        .then(response => response.text())
        .then(data => {
            const match = data.match(/totalPages=(\d+)/);
            if (match) {
                totalPages = parseInt(match[1], 10);
                createPaginationUI(page);
                document.getElementById('table-body').innerHTML = data.replace(/totalPages=\d+/, '');
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchUserData(1);
});