const showAddIdea = (trigger) => {
  const showIdea = document.getElementById("showAddIdea");
  if (trigger === "show") {
    showIdea.style.visibility = "visible";
  } else {
    showIdea.style.visibility = "hidden";
  }
};

const addIdea = (ideaKey) => {
  const ideaTitle = document.getElementById("ideaTitle");

  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        window.location.href = `http://localhost:5000/idea/${ideaKey}`;
      }
    }
  };

  request.open(
    "GET",
    `http://localhost:5000/createIdea/idea?ideaname=${ideaTitle.value}&ideaKey=${ideaKey}`,
    true
  );
  request.send(null);
};
