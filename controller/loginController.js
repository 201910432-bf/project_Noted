const loginAuth = () => {
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        console.log("success");
        window.location.href = `http://localhost:5000/note`;
      } else if (request.status === 403) {
        console.log("invalid");
        alert("invalid");
      }
    }
  };
  request.open("POST", `http://localhost:5000/login/auth`, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({ username: email, password: password }));
};
