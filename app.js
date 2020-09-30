// Imports
import { employees } from "./employee.js";
import { records } from "./records.js";

//Node Selector
const empTable = document.querySelector("#empDataTable tbody");
const empForm = document.forms.namedItem("employeeForm");
const recTable = document.querySelector("#recordTable tbody");

//Node Action Selector
const addBtn = document.querySelector("#add-button");
const updateBtn = document.querySelector("#update-button");
const clearBtn = document.querySelector("#clear-button");
const okBtn = document.querySelector("#ok-button");
const cancelBtn = document.querySelector("#cancel-button");
const enterBtn = document.querySelector("#enter-button");

// flag to know which action to do, add or edit
let formAction = "add";

if (employees.length < 1) {
  // create a template form a table row
  const row = `<tr>
    <td style="text-align: center;" colspan="5">No Data</td>
  </tr>`;

  // concatenate new row to the table
  empTable.innerHTML += row;
}

// inputs
let empIDInput = "";
let nameInput = "";
let ageInput = "";
let startDateInput = "";
let salaryInput = "";

// whenever for input changes, reinitialize globals
// remove white spacing
empForm.addEventListener("change", function () {
  empIDInput = document.querySelector('input[name="employeeID"]').value.trim();
  nameInput = document.querySelector('input[name="name"]').value.trim();
  ageInput = document.querySelector('input[name="age"]').value.trim();
  startDateInput = document
    .querySelector('input[name="startDate"]')
    .value.trim();
  salaryInput = document.querySelector('input[name="salary"]').value.trim();
});

// Add Employee Function
const addEmp = (employee) => {
  //add row in HTML
  const row = `<tr data-empID="${employee.empID}">
                  <td><input type="radio" name="radio"></td>
                  <td>${employee.empID}</td>
                  <td>${employee.name}</td>
                  <td>${employee.age}</td>
                  <td>${employee.startDate}</td>
                  <td>${employee.salary}</td>
                </tr>`;

  //add Employee Database
  employees.push(employee);

  // concatenate new row to the table
  empTable.innerHTML += row;

  // clear form inputs
  empForm.reset();
};

// prevent form submission
empForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Add button eventlistener
addBtn.addEventListener("click", function () {
  // check if form action set to add mode
  if (formAction == "add") {
    // check if all inputs were not empty
    if (empIDInput && nameInput && ageInput && startDateInput && salaryInput) {
      // prepare the Employee object

      let employee = {
        empID: empIDInput,
        name: nameInput,
        age: ageInput,
        startDate: startDateInput,
        salary: salaryInput,
      };

      // find if Employee already exist
      let empExist = employees.find((employee) => {
        return empIDInput == employee.empID;
      });

      // check if Employee exist
      if (empExist) {
        // show error alert
        alert("employee already exist!");
        return 0;
      }

      // add new Employee object to array
      addEmp(employee);

      // show add alert
      alert("employee has been added!");
    } else {
      // show error alert
      alert("All input should not be empty!");
    }
  }
});

// Search Bar
const searchBox = document.querySelector("#search ");
searchBox.addEventListener("keyup", function (e) {
  Array.from(empTable.children).forEach((i) => {
    if (
      e.target.value.match(
        i.firstChild.nextSibling.nextSibling.nextSibling.textContent
      )
    ) {
      i.style.display = "table-row";
    } else if (e.target.value == "") i.style.display = "table-row";
    else i.style.display = "none";
  });
});

// Nav bars
const clockNav = document.querySelector("#clockNav");
const empNav = document.querySelector("#empNav");
const schedNav = document.querySelector("#schedNav");
const recNav = document.querySelector("#recNav");

//sections
const clockInSec = document.querySelector(".clockInSec div");
const empSec = document.querySelector(".empSec div");
const recordSec = document.querySelector(".recordSec div");
const scheduleSec = document.querySelector(".scheduleSec div");

clockNav.addEventListener("click", function (e) {
  empSec.classList.add("d-none");
  recordSec.classList.add("d-none");
  scheduleSec.classList.add("d-none");

  clockInSec.classList.remove("d-none");
});

empNav.addEventListener("click", function (e) {
  clockInSec.classList.add("d-none");
  recordSec.classList.add("d-none");
  scheduleSec.classList.add("d-none");

  empSec.classList.remove("d-none");
});

schedNav.addEventListener("click", function (e) {
  clockInSec.classList.add("d-none");
  recordSec.classList.add("d-none");
  empSec.classList.add("d-none");

  scheduleSec.classList.remove("d-none");
});

recNav.addEventListener("click", function (e) {
  clockInSec.classList.add("d-none");
  empSec.classList.add("d-none");
  scheduleSec.classList.add("d-none");

  recordSec.classList.remove("d-none");
});

// TIME
function t() {
  const d = new Date();
  const hh = `${d.getHours()}`.padStart(2, "0");
  const mm = `${d.getMinutes()}`.padStart(2, "0");
  const ss = `${d.getSeconds()}`.padStart(2, "0");

  document.getElementById("time").innerHTML = `${hh}:${mm}:${ss}`;
  return `${hh}:${mm}:${ss}`;
}
t();
window.setInterval(t, 1000);

// DATE
function cdate() {
  const d = new Date();
  const date = d.getDate();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = d.getFullYear();

  document.getElementById("date").innerHTML = `${
    month[d.getMonth()]
  } ${date},  ${year}`;
}

cdate();

// cancel Employee update
clearBtn.addEventListener("click", function (e) {
  // clear form inputs
  empForm.reset();
});

// update the existing Employee info
updateBtn.addEventListener("click", function () {
  // set form flag to edit mode
  formAction = "edit";

  // select table row that has active radio
  const tds = document.querySelectorAll('#empDataTable input[name="radio"]');
  const td = Array.from(tds).find((ele) => {
    return ele.checked == true;
  });

  // put existing Employee info to be edited in the form
  if (td == undefined) alert("No data selected");
  else {
    document.querySelector('input[name="employeeID"]').value = Array.from(
      td.parentElement.parentElement.children
    )[1].innerText;
    document.querySelector('input[name="name"]').value = Array.from(
      td.parentElement.parentElement.children
    )[2].innerText;
    document.querySelector('input[name="age"]').value = Array.from(
      td.parentElement.parentElement.children
    )[3].innerText;
    document.querySelector('input[name="startDate"]').value = Array.from(
      td.parentElement.parentElement.children
    )[4].innerText;
    document.querySelector('input[name="salary"]').value = Array.from(
      td.parentElement.parentElement.children
    )[5].innerText;

    // hide and show button groups
    document.querySelector("#adding").classList.add("d-none");
    updateBtn.classList.add("d-none");
    document.querySelector("#approving").classList.remove("d-none");

    // disable isbn input field
    document.querySelector('input[name="employeeID"]').readOnly = true;
  }
});

cancelBtn.addEventListener("click", function (e) {
  // set form flag to edit mode
  formAction = "add";

  // disable isbn input field
  document.querySelector('input[name="employeeID"]').readOnly = false;

  // clear form
  empForm.reset();

  // hide and show button groups
  document.querySelector("#adding").classList.remove("d-none");
  updateBtn.classList.remove("d-none");
  document.querySelector("#approving").classList.add("d-none");
});

okBtn.addEventListener("click", function (e) {
  empIDInput = document.querySelector('input[name="employeeID"]').value.trim();
  nameInput = document.querySelector('input[name="name"]').value.trim();
  ageInput = document.querySelector('input[name="age"]').value.trim();
  startDateInput = document
    .querySelector('input[name="startDate"]')
    .value.trim();
  salaryInput = document.querySelector('input[name="salary"]').value.trim();

  // check if form action set to edit mode
  if (formAction == "edit") {
    // select table row to be edited
    const table = document.querySelector(
      `#empDataTable  tbody > tr[data-empID="${empIDInput}"`
    );

    // overwrite table row data values
    table.children[2].innerText = nameInput;
    table.children[3].innerText = ageInput;
    table.children[4].innerText = startDateInput;
    table.children[5].innerText = salaryInput;

    // clear form inputs
    empForm.reset();

    // disable isbn input field
    document.querySelector('input[name="employeeID"]').readOnly = false;

    // hide and show button groups
    document.querySelector("#adding").classList.remove("d-none");
    updateBtn.classList.remove("d-none");
    document.querySelector("#approving").classList.add("d-none");

    // show update alert
    alert("Record has been updated!");
    formAction = "add";
  }
});

// Enter Timestamp
const clockDate = () => {
  const d = new Date();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  const yy = d.getFullYear();

  return `${mm}/${dd}/${yy}`;
};

let clockInput = document.querySelector('input[name="clockID"]');
clockInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    enterBtn.click();
  }
});

// concatenate new row to the table
function showRecords() {
  recTable.innerHTML = "";
  records.forEach((ele) => {
    recTable.innerHTML += `<tr data-empID="${ele.employeeID}">
                 <td>${ele.date}</td>
                 <td>${ele.employeeID}</td>
                 <td>${ele.timeIn}</td>
               <td>${ele.timeOut}</td>
              </tr>`;
  });
}
const addRecord = (xrecord) => {
  //add row in HTML
  // const row = `<tr data-empID="${xrecord.employeeID}">
  //                 <td>${xrecord.date}</td>
  //                 <td>${xrecord.employeeID}</td>
  //                 <td>${xrecord.timeIn}</td>
  //                 <td>${xrecord.timeOut}</td>
  //               </tr>`;

  //add Employee Database
  records.push(xrecord);
  showRecords();
};

enterBtn.addEventListener("click", function (e) {
  // find if employee is in the record
  const isEmpExist = employees.find((recordEmp) => {
    return clockInput.value == recordEmp.empID;
  });

  if (clockInput.value != "" && isEmpExist != undefined) {
    let record = {
      date: clockDate(),
      employeeID: clockInput.value.trim(),
      timeIn: t(),
      timeOut: "-",
    };

    // find if Employee already exist and timeout is ---
    let recordExist = records.find((recordArr) => {
      return (
        recordArr.timeOut === "-" &&
        record.date === recordArr.date &&
        record.employeeID === recordArr.employeeID
      );
    });

    // check if Employee exist

    if (recordExist) {
      function changeValue(id, timeout) {
        for (var i in records) {
          if (records[i].employeeID == id) {
            records[i].timeOut = timeout;
            record.timeOut = timeout;
            console.log(record);
            break; //Stop this loop, we found it!
          }
        }
      }

      changeValue(record.employeeID, t());
      showRecords();
      alert(`Successfully Clock Out!`);
      // add data to the sched HTML
    } else {
      //push record to records.js
      addRecord(record);
      alert(`Successfully Clock in!`);
    }

    //closing modal
    enterBtn.setAttribute("data-dismiss", "modal");

    // Clear the inputs
    clockInput.value = "";
  } else {
    //Not closing modal
    enterBtn.removeAttribute("data-dismiss", "modal");

    alert("Please enter a valid employee ID");
    clockInput.value = "";
  }
});

if (records.length == 0) {
  // show no data row
  const row = `<tr>
    <td style="text-align: center;" colspan="5">No Data</td>
  </tr>`;

  // concatenate new row to the table
  recTable.innerHTML += row;
}

