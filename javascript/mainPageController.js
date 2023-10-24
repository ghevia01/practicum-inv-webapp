(function () {
    // Get the button that opens the modal
    const qrScannerPageBtn = document.getElementById('qrScannerPageButton');
    
    // Send the user to the QR scanner page
    qrScannerPageBtn.addEventListener('click', function () {
        window.location.href = 'qr-scanner.html';
    });
})();