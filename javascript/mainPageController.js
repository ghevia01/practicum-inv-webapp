(function () {
    const qrScannerBtn = document.getElementById('qrScannerButton');
    
    qrScannerBtn.addEventListener('click', function () {
        window.location.href = 'qr-scanner.html';
    });
})();