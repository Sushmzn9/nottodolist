let taskList = [];

const entryElm = document.getElementById("entry");
const badElm = document.getElementById("bad");
const hrsperWeek= 24*7;



// capture the data from the form on form submit
const handlOnSubmit = (e) => {
  const formDt = new FormData(e);
  const task = formDt.get("task");
  const hr = +formDt.get("hr");

  const taskObj = {
    task,
    hr,
    id: randomGenerator(),
    type: "entry",
  };


  const ttl =totalHours();
  //check if the new task can fitt in the available hrs
if(totalHours() + hr >hrsperWeek){
    return alert("Sorry, don't have enough time to fit this task")
}


  // store that data in array as obj
  taskList.push(taskObj);
  displayTask();
  totalHours();
};

// displying data in the browser
const displayTask = () => {
  const entryList = taskList.filter((item) => item.type === "entry");

  let str = "";
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
  });
  entryElm.innerHTML = str;
  displayBadTask();
  totalHours();
};
// displying data in the browser
const displayBadTask = () => {
  const badList = taskList.filter((item) => item.type === "bad");

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
  });
  badElm.innerHTML = str;
  const badHrs= badList.reduce((acc,item)=> acc + +item.hr, 0);
  document.getElementById("badHrs").innerHTML=badHrs;
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
    totalHours();
  }
};

// switch task from entry to bad type or vv
const swithcTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });

  displayTask();
  totalHours();
};

const totalHours=() =>{
    const ttHrs = taskList.reduce((acc, {hr})=> acc + hr, 0)
    document.getElementById("total").innerText=ttHrs;
    return ttHrs;
};