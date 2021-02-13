var globalDataVariable = [];

const showAddNote = (trigger) => {
  const showNote = document.getElementById("showAddNote");
  if (trigger === "show") {
    showNote.style.visibility = "visible";
  } else {
    showNote.style.visibility = "hidden";
  }
};

// const sampleData = [
//   { title: "assignment", list: "new,assignment,newnew,test" },
// ];

const addList = (listData) => {
  //   sampleData.map((data) => {
  //     const listString = data.list;
  //     const splitData = listString.split(",");
  //     console.log(splitData);
  //   });

  const list = document.getElementById("addListText").value;
  const divList = document.getElementById("wrapLabel");

  if (list.replace(/\s/g, "").length) {
    const splitData = listData.split(",");
    const keys = listData.split(",");

    var newId = keys.length;
    for (let i = 0; i < splitData.length; i++) {
      if (newId == splitData[i]) newId++;
    }

    var stringTemp = `
    <label for="">
        <input type="checkbox" value="${
          list + " " + newId
        }" id="${newId}" onclick="checkboxClick('${newId}')">
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
  }

  console.log(globalDataVariable);
};
