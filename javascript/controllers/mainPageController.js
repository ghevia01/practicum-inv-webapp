(function () {
    // Get the buttons in the main page
    const qrScannerPageBtn = document.getElementById('qrScannerPageButton');
    const manageUsersPageButton = document.getElementById('manageUsersPageButton');

    // Send the user to the QR scanner page
    qrScannerPageBtn.addEventListener('click', function () {
        window.location.href = 'qr-scanner.html';
    });

    // Send the user to the accounts management page
    manageUsersPageButton.addEventListener('click', function () {
        window.location.href = 'account-manage.html';
    });
})();