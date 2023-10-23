const video = document.getElementById('qrVideo');
const canvas = document.getElementById('qrCanvas');
const qrScannerIcon = document.getElementById('qrScannerIcon');
const scanButton = document.getElementById('scanButton');
const stopButton = document.getElementById('stopButton');
const FACING_MODE = 'environment';

import { scanQRCode } from '../modules/qrScannerModule.js';

// Toggle the UI between the scanning and the stopped states
function toggleQRScannerUI(isScanning) {
    scanButton.classList.toggle('hidden', isScanning);
    qrScannerIcon.classList.toggle('hidden', isScanning);
    stopButton.classList.toggle('hidden', !isScanning);
    video.classList.toggle('hidden', !isScanning);
}

// Get the video stream from the camera
async function getCameraStream() {
    return await navigator.mediaDevices.getUserMedia({ video: { facingMode: FACING_MODE } });
}

// Start the video stream and the QR code scanning
async function startScanning() {
    try {
        console.log('Start scanning...');

        const stream = await getCameraStream();

        // Sets the video elements src to the stream from the camera
        video.srcObject = stream;

        // Await the video stream to play
        await video.play();

        // Hide the start button and show the video stream
        toggleQRScannerUI(true);

        // Check if the video metadata is already loaded
        if (video.readyState >= video.HAVE_ENOUGH_DATA) {
            // Start scanning the video stream for QR codes
            scanQRCode(video, canvas, onQRCodeDetected);
        } else {
            // Add event listener to the video element, wait for the metadata to load, then start scanning
            video.addEventListener('loadedmetadata', () => {
                scanQRCode(video, canvas, onQRCodeDetected);
            });
        }
    } catch (err) {
        console.error("Error accessing the camera: ", err);
        toggleQRScannerUI(false);
    }
}

// Function to handle the detected QR code
const onQRCodeDetected = (data) => {
    // Log the detected QR code data to console
    console.log(`QR Code: ${data}`);
    
    // Stop the video stream
    stopScanning(video);
};

// Function to stop the video stream
function stopScanning(videoElement) {
    // Get the video stream
    const stream = videoElement.srcObject;

    // Stop all media tracks in the stream
    const tracks = stream.getTracks();
    tracks.forEach(track => {
        track.stop();
    });

    // Remove the stream from the video element
    videoElement.srcObject = null;

    // Hide the video stream and show the start button
    toggleQRScannerUI(false);
}

// Attach the startScanning function to the button's click event
scanButton.addEventListener('click', startScanning);

// Attach the stopScanning function to the button's click event
stopButton.addEventListener('click', () => stopScanning(video));
