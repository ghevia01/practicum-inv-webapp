// Author: Gean Hevia

export function downloadLocationReport(location) {
  // Encode the location parameter
  const queryParam = encodeURIComponent(location);

  // Construct the download path
  const downloadPath = `../api/export-report.php?location=${queryParam}`;

  // Redirect the user to the download path
  window.location.href = downloadPath;
}
