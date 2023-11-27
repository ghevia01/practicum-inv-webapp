let pop = document.getElementById("pop");
let popedit = document.getElementById("popedit");

function openpop() {
  pop.classList.add("open-pop");
}
function closepop() {
  pop.classList.remove("open-pop");
}

fetch("../api/fetch-user-data.php")
  .then((response) => response.text())
  .then((data) => {
    const tableBody = document.querySelector("#table-users tbody");
    tableBody.innerHTML = data;
  })
  .catch((error) => console.error("Error fetching data: ", error));

function openpopedit(id, name, username, email, phone, role) {
  popedit.classList.add("open-pop");

  document.getElementById("id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("username").value = username;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
  document.getElementById("editRole").value = role;
}
function closepopedit() {
  popedit.classList.remove("open-pop");
}
