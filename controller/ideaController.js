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

var lastNode;
const getIdeaData = (key, data, noteId) => {
  console.log(noteId, key, data);

  const getFirstNode = document.getElementById(noteId + "idea");
  const getCurrentNode = document.getElementById(key + "idea");
  const getLastNode = document.getElementById(lastNode + "idea");

  getFirstNode.classList.add("list__notFocus");
  getCurrentNode.classList.remove("list__notFocus");
  if (lastNode != undefined && lastNode != key) {
    getLastNode.classList.add("list__notFocus");
  }
  lastNode = key;
};

const showContent = () => {
  console.log(CKEDITOR.instances.textAreaContent.getData());
};

const runFetchCkEditor = () => {
  $(function () {
    CKEDITOR.instances["textAreaContent"].on("change", function () {
      console.log(CKEDITOR.instances.textAreaContent.getData());
    });
  });
};
