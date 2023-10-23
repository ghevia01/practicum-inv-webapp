function scanQRCode(video, canvas, onQRCodeDetected) {

    // Get the canvas context (used to draw and manipulate the canvas)
    const canvasContext = canvas.getContext("2d");

    // Set the canvas dimensions
    function setupCanvas() {
        console.log("Video dimensions: ", video.videoWidth, video.videoHeight);
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    }

    // Function to continuously scan the video stream for QR codes
    function scan() {
        // Check if video dimensions are ready
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            setupCanvas();

            // Draw the video frame to the canvas
            canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Get the image data from the canvas
            const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);

            // Get the decoded QR code from the image data
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                // Call the callback function if a QR code is detected
                onQRCodeDetected(code.data);
                return;
            }
        }
        // Request the next frame
        requestAnimationFrame(scan);
    }
    // Start scanning
    scan();
}

export { scanQRCode };