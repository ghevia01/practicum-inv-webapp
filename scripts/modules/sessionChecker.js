function checkLogin() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status !== 200) {
              window.location.replace('../html/login.html');
          }
      }
  };
  xhr.open('GET', '../api/check-session.php', false);
  xhr.send();
}

checkLogin();