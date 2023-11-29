document.addEventListener("DOMContentLoaded", function () {
  var errorMessageElement = document.getElementById('errorMessage');

  function getErrorMessage() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var errorMessage = xhr.responseText;
        if (errorMessage.trim() !== '') {
          errorMessageElement.textContent = errorMessage;
        }
      }
    };

    xhr.open('GET', '../api/login.php?get_error_message=true', true);
    xhr.send();
  }

  getErrorMessage();
});
