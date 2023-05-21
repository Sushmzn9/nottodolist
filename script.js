let taskList = [];
let totalHours=0;
const entryElm = document.getElementById("entry");
const badElm = document.getElementById("bad");

// capture the data from the form on form submit
const handlOnSubmit = (e) => {
  const formDt = new FormData(e);
  const task = formDt.get("task");
  const hr = formDt.get("hr");

  const taskObj = {
    task,
    hr,
    id: randomGenerator(),
    type: "entry",
  };

  // store that data in array as obj

 
  if (totalHours + hr <= 168) {
    taskList.push(taskObj);
    displayTask();
  } else {
    alert("Total hours cannot exceed 168.");
  }
};

  



// displying data in the browser
const displayTask = () => {
  const entryList = taskList.filter((item) => item.type === "entry");

  let str = "";
  let entryTotalHours=0;
  entryList.map((item, i) => {
    str += `
<tr>
<td>${item.task}</td>
<td>${item.hr} hrs</td>
<td>
  <button class="btn btn-danger btn-sm" onclick="deleteTask('${item.id}')">
    <i class="fa-solid fa-trash"></i>
  </button>
  <button class="btn btn-success btn-sm"
  onclick="swithcTask('${item.id}', 'bad' )"
  >
    <i class="fa-solid fa-arrow-right"></i>
  </button>
</td>
</tr>`;
entryTotalHours += parseInt(item.hr);
  });
  entryElm.innerHTML = str;
  displayBadTask();
  updateEntryTotalHours(entryTotalHours);
};
// displying data in the browser
const displayBadTask = () => {
  const badList = taskList.filter((item) => item.type === "bad");
  let badTotalHours = 0;
  let str = "";
  badList.map((item, i) => {
    str += `
<tr>
<td>${item.task}</td>
<td>${item.hr} hrs</td>
<td>

<button class="btn btn-warning btn-sm"
  onclick="swithcTask('${item.id}', 'entry' )"
  >
    <i class="fa-solid fa-arrow-left"></i>
  </button>
  <button class="btn btn-danger btn-sm" onclick="deleteTask('${item.id}')">
    <i class="fa-solid fa-trash"></i>
  </button>
  
</td>
</tr>`;
badTotalHours += parseInt(item.hr);
  });
  badElm.innerHTML = str;
  updateBadTotalHours(badTotalHours);

};

// create unique id

const randomGenerator = (lenght = 6) => {
  const collection = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDAZXCVBNM";

  let str = "";
  for (let i = 0; i < lenght; i++) {
    const ranNum = Math.round(Math.random() * collection.length - 1);
    str += collection[ranNum];
  }

  return str;
};

// delete item from array absed on given id

const deleteTask = (id) => {
  if (window.confirm("Are you sure you want to delte this?")) {
    taskList = taskList.filter((item) => item.id !== id);

    displayTask();
  }
};

// switch task from entry to bad type or vv
const swithcTask = (id, type) => {
  const updatedTaskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });
 taskList= updatedTaskList;
  displayTask();
};


const updateEntryTotalHours = (total) => {
  const badTotalHours = calculateBadTotalHours();
  document.getElementById("total").textContent = total + badTotalHours;
};


const updateBadTotalHours = (total) => {
  const entryTotalHours = calculateEntryTotalHours();
  document.getElementById("total").textContent = entryTotalHours + total;
};

const calculateEntryTotalHours = () => {
  const entryList = taskList.filter((item) => item.type === "entry");
  let totalHours = 0;
  entryList.forEach((item) => {
    totalHours += parseInt(item.hr);
  });
  return totalHours;
};

const calculateBadTotalHours = () => {
  const badList = taskList.filter((item) => item.type === "bad");
  let totalHours = 0;
  badList.forEach((item) => {
    totalHours += parseInt(item.hr);
  });
  return totalHours;
};
const updateTotalHours = (total) => {
  const addTaskBtn = document.getElementById("addTaskBtn");
  const totalWarning = document.getElementById("totalWarning");

  if (total >= 168) {
    addTaskBtn.disabled = true;
    totalWarning.style.display = "block";
  } else {
    addTaskBtn.disabled = false;
    totalWarning.style.display = "none";
  }

  document.getElementById("total").textContent = total;
};