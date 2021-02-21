var globalDataVariable = [];

const showAddNote = (trigger) => {
  const showNote = document.getElementById("showAddNote");
  if (trigger === "show") {
    showNote.style.visibility = "visible";
  } else {
    showNote.style.visibility = "hidden";
  }
};

var lastNode;
const getNoteData = (key, data) => {
  globalDataVariable = [];
  var request = new XMLHttpRequest();
  const sendfile = document.getElementById("sendfile");

  const getFirstNode = document.getElementById(0);
  const getCurrentNode = document.getElementById(key);
  const getLastNode = document.getElementById(lastNode);

  getFirstNode.classList.add("list__notFocus");
  getCurrentNode.classList.remove("list__notFocus");
  if (lastNode != undefined && lastNode != key) {
    getLastNode.classList.add("list__notFocus");
  }

  lastNode = key;
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        const response = JSON.parse(request.response);
        response.map((data, idkey) => {
          const listString = data.command[data.noteId].note_list;
          const splitData = listString.split(",");
          const listKeysString = data.command[data.noteId].note_keys;
          const splitDataKey = listKeysString.split(",");

          console.log(data.command[key]);
          // console.log(splitData[0]);

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

                    </div>
                    <div class="note__savebtn">
                        <button type="submit" onClick="passtoUrl('',${data.command[key].id},'${data.command[key].note_title}')">Save</button>
                    </div>
                </div>
            </div>
          `;

          var template = "";
          var distinct = false;
          const noteJson = data.command[key].checked_list;
          if (noteJson != "") {
            JSON.parse(noteJson).some((e) => {
              if (globalDataVariable.some((e2) => e2.id == e.id)) {
                distinct = true;
              }

              if (distinct != true) {
                globalDataVariable.push(e);
                console.log(globalDataVariable);
              }
            });
          }

          for (let i = 0; i < splitData.length; i++) {
            if (splitData[0] != "") {
              if (
                noteJson != "" &&
                JSON.parse(noteJson).some(
                  (e) => e.id.replace("checkBox", "") == i + 1
                )
              ) {
                template += `
                  <label for="">
                  <input type="checkbox" value="${splitDataKey[i]},${splitData[i]}" id="${splitDataKey[i]}checkBox" onclick="checkboxClick('${splitDataKey[i]}checkBox')" checked>
                  <span>${splitData[i]}</span>
                  </label>
                  `;
              } else {
                template += `
                <label for="">
                <input type="checkbox" value="${splitDataKey[i]},${splitData[i]}" id="${splitDataKey[i]}checkBox" onclick="checkboxClick('${splitDataKey[i]}checkBox')" >
                <span>${splitData[i]}</span>
                </label>
                `;
              }
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
        }" id="${newId}checkBox" onclick="checkboxClick('${newId}checkBox')" >
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

const passtoUrl = (originalData, key, title) => {
  console.log(originalData);
  console.log(key);
  console.log(title);

  if (originalData != "") {
    for (let i = 0; i < JSON.parse(originalData).length; i++) {
      if (globalDataVariable.includes(JSON.parse(originalData)[i])) {
        globalDataVariable.push(JSON.parse(originalData)[i]);
      }
    }
  }

  console.log(globalDataVariable);

  if (globalDataVariable == "" && originalData != "") {
    globalDataVariable = JSON.parse(originalData);
    console.log(globalDataVariable);
  }

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
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
      }
    }
  };
  request.open(
    "POST",
    `http://localhost:5000/savenote/note/?objectChecked=${JSON.stringify(
      globalDataVariable
    )}&arrayId=${idArray}&arrayValue=${valueArray}&title=${title}&key=${key}`,
    true
  );

  request.send(null);
};

const addNote = () => {
  const noteTitle = document.getElementById("noteTitle");
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        window.location.reload();
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
