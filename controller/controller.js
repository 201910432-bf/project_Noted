var globalDataVariable = [];

const showAddNote = (trigger) => {
  const showNote = document.getElementById("showAddNote");
  if (trigger === "show") {
    showNote.style.visibility = "visible";
  } else {
    showNote.style.visibility = "hidden";
  }
};

const changeTab = (tabName) => {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
      }
    }
  };

  request.open("GET", "http://localhost:8080/submit-name?name=" + name, true);
  request.send(null);
};

const getNoteData = (key) => {
  var request = new XMLHttpRequest();
  const sendfile = document.getElementById("sendfile");

  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        const response = JSON.parse(request.response);
        response.map((data, idkey) => {
          const listString = data.command[data.noteId].note_list;
          const splitData = listString.split(",");
          const listKeysString = data.command[data.noteId].note_keys;
          const splitDataKey = listKeysString.split(",");

          console.log(splitData[0]);
          sendfile.innerHTML = `
            <div class="list__main__content__wrap">
                <div class="main__content__header">
                    <p>${data.command[key].note_title}</p>
                </div>
                <div class="main__content__remaining__edit">
                    <span>3 tasks remaining</span>
                    <a href="">Edit</a>
                </div>
                <div class="main__content__add">
                    <input type="text" id="addListText" value="">
                    <button type="button" onclick="addList('${data.noteId}')">+</button>
                </div>
                <div class="main__content__checkbox">
                    <div class="main__content__checkbox__wrap" id="wrapLabel">
                      //template
                    </div>
                    <div class="note__savebtn">
                        <button type="submit" onClick="passtoUrl()">Save</button>
                    </div>
                </div>
            </div>
          `;

          var template = "";
          for (let i = 0; i < splitData.length; i++) {
            if (splitData[0] != "") {
              template += `<label for="">
              <input type="checkbox" value="${splitDataKey[i]},${splitData[i]}" id="${splitDataKey[i]}" onclick="checkboxClick('${splitDataKey[i]}')">
              <span>${splitData[i]}</span>
              </label>`;
            }
          }
          document.getElementById("wrapLabel").innerHTML = template;
        });
      }
    }
  };

  request.open("GET", "http://localhost:5000/note/id?id=" + key, true);
  request.send(null);
};

const addList = (listData) => {
  console.log(listData);

  const list = document.getElementById("addListText").value;
  const divList = document.getElementById("wrapLabel");

  if (list.replace(/\s/g, "").length) {
    const splitData = listData.split(",");
    const keys = listData.split(",");

    var newId =
      document.getElementById("wrapLabel").getElementsByTagName("input")
        .length + 1;

    for (let i = 0; i < splitData.length; i++) {
      if (newId == splitData[i]) newId++;
    }

    var stringTemp = `
    <label for="">
        <input type="checkbox" value="${
          newId + "," + list
        }" id="${newId}" onclick="checkboxClick('${newId}')" >
        <span>${list}</span>
    </label>`;

    divList.innerHTML += stringTemp;
    document.getElementById("addListText").value = "";
  }
};

const checkboxClick = (idKey) => {
  const checkboxId = document.getElementById(idKey).value;
  console.log(checkboxId);

  var dataElement = {};
  if (document.getElementById(idKey).checked) {
    dataElement.id = idKey;
    dataElement.checked = true;
    globalDataVariable.push(dataElement);
  } else {
    const index = globalDataVariable.filter((item) => item.id != idKey);
    globalDataVariable = index;
  }

  console.log(globalDataVariable);
};

const passtoUrl = () => {
  const fetchList = document
    .getElementById("wrapLabel")
    .getElementsByTagName("input");

  var idArray = [];
  var valueArray = [];
  for (let i = 0; i < fetchList.length; i++) {
    const splitData = fetchList[i].value.split(",");
    idArray.push(splitData[0]);
    valueArray.push(splitData[1]);
  }

  console.log(idArray);

  window.location.href = `http://localhost:5000/auth/savenote/${JSON.stringify(
    globalDataVariable
  )}/${idArray}/${valueArray}`;
};

const addNote = () => {
  const noteTitle = document.getElementById("noteTitle");
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
      }
    }
  };
  request.open(
    "GET",
    `http://localhost:5000/createNote/note?notename=${noteTitle.value}`,
    true
  );
  request.send(null);
};
