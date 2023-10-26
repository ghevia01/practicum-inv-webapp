function scanQRCode(video, canvas, onQRCodeDetected) {
  // Get the canvas context (used to draw and manipulate the canvas)
  const canvasContext = canvas.getContext("2d", { willReadFrequently: true });

  // Variables to store the last video dimensions
  let lastVideoWidth = 0;
  let lastVideoHeight = 0;

  // Set the canvas dimensions
  function setupCanvas() {
    if (lastVideoWidth === video.videoWidth && lastVideoHeight === video.videoHeight) {
      console.log("Video dimensions: ", video.videoWidth, video.videoHeight);
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }
  }

  // Function to continuously scan the video stream for QR codes
  function scan() {
    // Check if video dimensions are ready
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      setupCanvas();

      // Draw the video frame to the canvas
      canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);

      try {
        // Get the image data from the canvas
        const imageData = canvasContext.getImageData(0 ,0, canvas.width, canvas.height);

        // Get the decoded QR code from the image data
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        // If a QR code was detected, call the callback function
        if (code) {
          onQRCodeDetected(code.data);
          return;
        }
      } catch (err) {
        console.error("An error occurred during QR code scanning: ", err);
      }
    }
    // Request the next frame
    requestAnimationFrame(scan);
  }
  // Start scanning
  scan();
}

export { scanQRCode };
