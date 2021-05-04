var lastNode;
const getNoteDataArchive = (key, data, noteId, current, userId) => {
  console.log(noteId, key, lastNode, current, userId);

  console.log(key);
  globalDataVariable = [];
  var request = new XMLHttpRequest();
  const sendfile = document.getElementById("sendfile");

  request.onreadystatechange = function () {
    if (request.readyState == XMLHttpRequest.DONE) {
      if (request.status == 200) {
        var response = JSON.parse(request.response);
        var currentUserData = [];
        var currentUserDataHigh = [];
        var currentUserDataLow = [];

        response.map((data, idkey) => {
          for (var i = 0; i < data.command.length; i++) {
            console;
            if (
              data.command[i].userId == userId &&
              data.command[i].priority_level == "HIGH"
            ) {
              currentUserDataHigh.push(data.command[i]);
            } else if (
              data.command[i].userId == userId &&
              data.command[i].priority_level == "LOW"
            ) {
              currentUserDataLow.push(data.command[i]);
            }
          }
        });

        function compare(a, b) {
          if (new Date(a.note_deadline) < new Date(b.note_deadline)) {
            return -1;
          }
          if (new Date(a.note_deadline) > new Date(b.note_deadline)) {
            return 1;
          }
          return 0;
        }

        currentUserDataHigh.sort(compare);
        currentUserDataLow.sort(compare);

        currentUserData = currentUserDataHigh.concat(currentUserDataLow);
        console.log(currentUserData);
        response = [{ command: currentUserData, noteId: key }];
        console.log(response);

        response.map((data, idkey) => {
          const listString = data.command[data.noteId].note_list;
          const splitData = listString.split(",");
          const listKeysString = data.command[data.noteId].note_keys;
          const splitDataKey = listKeysString.split(",");

          console.log("data");
          console.log(data);
          console.log(splitData);

          sendfile.innerHTML = `
            <div class="list__main__content__wrap">
                <div class="main__content__header">
                    <p>${data.command[key].note_title}</p>
                </div>
                <div class="main__content__remaining__edit">
                  <span><span id="taskRemaining">0</span> task/s undone</span>
                </div>
                <div class="main__content__add">
                </div>
                <div class="main__content__checkbox">
                    <div class="main__content__checkbox__wrap" id="wrapLabel">

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

          let counterValue = document.getElementById("taskRemaining").innerHTML;
          var counter = 0;

          for (let i = 0; i < splitData.length; i++) {
            if (splitData[0] != "") {
              if (
                noteJson != "" &&
                JSON.parse(noteJson).some(
                  (e) => e.id.replace("checkBox", "") == i + 1
                )
              ) {
                template += `
                <div class="checkBoxLabel checkBoxLabel${i}">
                  <label for="">
                  <input disabled type="checkbox" class="ClasscheckBox" value="${splitDataKey[i]},${splitData[i]}" id="${splitDataKey[i]}checkBox" onclick="checkboxClick('${splitDataKey[i]}checkBox','','${data.command[key].id}')" checked>
                  <span id="${splitDataKey[i]}checkBoxSpan" class="checkedList spanListText" >${splitData[i]}</span>
                  </label>
                </div>
                  `;
              } else {
                template += `
                <div class="checkBoxLabel checkBoxLabel${i}">
                <label for="">
                <input disabled type="checkbox" class="ClasscheckBox" value="${splitDataKey[i]},${splitData[i]}" id="${splitDataKey[i]}checkBox" onclick="checkboxClick('${splitDataKey[i]}checkBox','','${data.command[key].id}')" >
                <span id="${splitDataKey[i]}checkBoxSpan" class="spanListText">${splitData[i]}</span>
                </label>
                </div>
                `;
                counter++;
              }
            }
          }
          document.getElementById("taskRemaining").innerHTML = counter;
          document.getElementById("wrapLabel").innerHTML = template;
        });
        window.history.replaceState(null, null, `/notearchive/${key}`);
      }
    }
  };

  request.open("GET", "http://localhost:5000/notearchive/id?id=" + key, true);
  request.send(null);
};

var idKeyarch;
var lastNodearch;
const getIdeaDataArchive = (key, data, noteId, idNode, current) => {
  console.log(noteId, key, data, idNode);
  const sendfile = document.getElementById("sendfile");

  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        const response = JSON.parse(request.response);
        response.map((data, mapkey) => {
          const dataIdea = data.command[data.noteId].idea_data;

          sendfile.innerHTML = `
          <div class="list__main__content__wrap">
              <div class="main__content__header">
                  <p>${data.command[data.noteId].idea_title}</p>
              </div>
              <div class="main__content__remaining__edit">
              </div>
              <div class="main__content__add">
              </div>
              <div class="main__content__checkbox">
                  <div class="main__content__checkbox__wrap" id="wrapLabel">
                    ${dataIdea}
                  </div>
              </div>
          </div>
        `;

          window.history.replaceState(null, null, `/ideaarchive/${key}`);
        });
      }
    }
  };

  request.open("GET", "http://localhost:5000/ideaarchive/id?id=" + key, true);
  request.send(null);
};
