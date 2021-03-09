const loginAuth = () => {
  var email = document.getElementById("inputEmail").value;
  var password = document.getElementById("inputPassword").value;

  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        console.log("success");
      } else if (request.status === 403) {
        console.log("invalid");
      }
    }
  };
  request.open("POST", `http://localhost:5000/login/auth`, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({ username: email, password: password }));
};
