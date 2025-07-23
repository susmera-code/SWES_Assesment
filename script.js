const simulatedDataStore = [
    { empid: "111", empname: "Anna", item: "Mouse", fromDate: "19-07-2025", toDate: "26-07-2025", status: "Overdue", icon: `<i class="bi bi-exclamation-circle-fill text-danger"></i>` },
    { empid: "222", empname: "Tereza", item: "Mouse", fromDate: "19-07-2025", toDate: "26-07-2025", status: "Overdue", icon: `<i class="bi bi-exclamation-circle-fill text-danger"></i>` },
    { empid: "333", empname: "Filip", item: "Mouse", fromDate: "19-07-2025", toDate: "26-07-2025", status: "Pending", icon: `<i class="bi bi-hourglass-split text-warning"></i>` },
    { empid: "555", empname: "Thomas", item: "Gloves", fromDate: "19-07-2023", toDate: "29-07-2023", status: "Pending", icon: `<i class="bi bi-hourglass-split text-warning"></i>` },
    { empid: "666", empname: "Daniel", item: "Helmet", fromDate: "18-02-2025", toDate: "20-02-2025", status: "Pending", icon: `<i class="bi bi-hourglass-split text-warning"></i>` },
    { empid: "777", empname: "Jacob", item: "Gloves", fromDate: "18-07-2025", toDate: "25-07-2025", status: "Returned", icon: `<i class="bi bi-check-circle-fill text-success"></i>` },
    { empid: "888", empname: "James", item: "Monitor", fromDate: "22-07-2023", toDate: "27-07-2023", status: "Pending", icon: `<i class="bi bi-hourglass-split text-warning"></i>` },
    { empid: "999", empname: "Erika", item: "Mouse", fromDate: "19-07-2025", toDate: "26-07-2025", status: "Overdue", icon: `<i class="bi bi-exclamation-circle-fill text-danger"></i>` },
    { empid: "124", empname: "Irah", item: "Gloves", fromDate: "19-07-2023", toDate: "29-07-2023", status: "Pending", icon: `<i class="bi bi-hourglass-split text-warning"></i>` },
    { empid: "345", empname: "Anaika", item: "Monitor", fromDate: "29-07-2023", toDate: "29-07-2023", status: "Pending", icon: `<i class="bi bi-hourglass-split text-warning"></i>` },
    { empid: "678", empname: "Joseph", item: "Boots", fromDate: "19-07-2023", toDate: "29-07-2023", status: "Pending", icon: `<i class="bi bi-hourglass-split text-warning"></i>` },
    { empid: "444", empname: "Julie", item: "Mouse", fromDate: "19-07-2023", toDate: "26-07-2023", status: "Overdue", icon: `<i class="bi bi-exclamation-circle-fill text-danger"></i>` }

];
const defaultStatus = {
    label: "Pending",
    icon: `<i class="bi bi-hourglass-split text-warning"></i>`
};
let currentPage = 1;
let rowsPerPage = 10;
const form = document.getElementById("reservationForm");
const spinner = document.getElementById("spinner");
const tableBody = document.querySelector("#staffTable tbody");
const pagination = document.getElementById("pagination");
const pageSizeSelect = document.getElementById("pageSize");
let currentData = simulatedDataStore;
function showTableSpinner() {
    tableBody.innerHTML = `
    <tr>
      <td colspan="2" style="text-align: center; padding: 20px;">
        <div class="spinner"></div>
      </td>
    </tr>
  `;
}
function renderTable(dataToRender = simulatedDataStore) {
    spinner.style.display = "block";
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = dataToRender.slice(start, end);
    // Clear existing rows
    tableBody.innerHTML = "";
    if (dataToRender.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="4" class="text-center text-muted">No data found</td>`;
        tableBody.appendChild(tr);
        spinner.style.display = "none";
        setupPagination();
        return;
    }

    setTimeout(() => {
        pageData.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${item.fromDate}</td>
            <td>${item.item}</td>
            <td>${item.icon ? item.icon : ''} ${item.status}</td>
            <td>${item.toDate}</td>
        `;
            tableBody.appendChild(row);
        });
        spinner.style.display = "none";
        setupPagination()
    }, 2000);
}
window.onload = renderTable;

function setupPagination() {
    const totalPages = Math.ceil(currentData.length / rowsPerPage); // Use currentData instead of simulatedDataStore
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === currentPage ? "active" : ""}`;
        li.innerHTML = `<a class="page-link">${i}</a>`;
        li.addEventListener("click", () => {
            currentPage = i;
            renderTable(currentData); // Pass currentData to maintain filtering
        });
        pagination.appendChild(li);
    }
}

// Event listener for page size change
pageSizeSelect.addEventListener("change", () => {
    rowsPerPage = parseInt(pageSizeSelect.value, 10);
    currentPage = 1;
    renderTable(currentData); // Use currentData to maintain filtering
});

// Initial load
setupPagination();
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const fromDate = document.getElementById("fromDate").value;
    const item = document.getElementById("item").value.trim();
    const status = `${defaultStatus.icon} ${defaultStatus.label}`;
    const toDate = document.getElementById("toDate").value;
    // Simulate POST request by pushing to array
      if (fromDate == "" || item == ""  || status== "" || toDate == "") {
    return; // skip this item, don't add row
  }
    const simulatedResponse = {
        fromDate,
        item,
        status,
        toDate
    };
    simulatedDataStore.push(simulatedResponse);
    currentPage = 1;
    // Update UI
    renderTable();
});
// Initial render
renderTable();
//Item select options
const itemList = [{ id: "101", itemname: "Helmet" },
{ id: "102", itemname: "Gloves" },
{ id: "103", itemname: "Boots" },
{ id: "104", itemname: "Jacket" },
{ id: "105", itemname: "Goggles" }];

const selectElement = document.getElementById("item");
const selectItem = document.getElementById("item2");

// Loop through the list to create <option> elements
itemList.forEach(item => {
    const option = document.createElement("option");
    option.textContent = item.itemname;          // Displayed in the dropdown
    selectElement.appendChild(option);
});
itemList.forEach(item => {
    const option = document.createElement("option");
    option.textContent = item.itemname;          // Displayed in the dropdown
    selectItem.appendChild(option);
});
document.getElementById("reservationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Employee ID
    const empInput = document.getElementById("empid");
    const errorMessage1 = document.getElementById("message1");

    if (empInput.value === "") {
        empInput.classList.add("is-invalid");
        isValid = false;
        errorMessage1.textContent = "Enter employee ID";
        errorMessage1.style.color = "#DC3545";
    }
    empInput.addEventListener("input", function () {
        if (empInput.classList.contains("is-invalid")) {
            errorMessage1.textContent = "";
            empInput.classList.remove("is-invalid");
        }
    });

    //Item field
    const select = document.getElementById("item");
    const errorMessage = document.getElementById("message2");

    if (select.value === "") {
        select.classList.remove("valid");
        select.classList.add("is-invalid");
        isValid = false;
        errorMessage.textContent = "Please select an item.";
        errorMessage.style.color = "#DC3545";
    }
    select.addEventListener("input", function () {
        if (select.classList.contains("is-invalid")) {
            errorMessage.textContent = "";
            select.classList.remove("is-invalid");
            select.classList.add("valid");

        }
    })

    //Alert box
    const alertBox = document.getElementById("formAlert");
    if (isValid) {
        alertBox.className = "alert alert-success mt-3";
        alertBox.innerText = "Form submitted successfully!";
        alertBox.classList.remove("d-none");
        this.reset();
    }

});

//Date validation
function validateDates() {
    const fromInput = document.getElementById("fromDate").value;
    const toInput = document.getElementById("toDate").value;
    const message = document.getElementById("message");

    if (!fromInput || !toInput) {
        isValid = false;
        message.textContent = "Please select both dates.";
        return;
    }
    const fromDate = new Date(fromInput);
    const toDate = new Date(toInput);
    const today = new Date();
    if (fromDate < today) {
        message.textContent = "Please select a future date !!";
    } else if (toDate < today) {

        message.textContent = "Please select a future date !!";
    } else if (toDate < fromDate) {
        message.textContent = "To Date cannot be earlier than From Date.";
    } else {
        message.textContent = "";
    }
}

// Toggle filter div
function toggleDiv() {
    const box = document.getElementById("infoBox");

    box.classList.toggle("d-none");
}

//Sorting header
let sortDirections = {};
function sortTable(colIndex, headerEl) {
    const table = document.getElementById("staffTable");
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);
    // Toggle direction
    sortDirections[colIndex] = !sortDirections[colIndex];
    const ascending = sortDirections[colIndex];
    // Clear all arrows
    document.querySelectorAll(".sort-arrow").forEach(span => span.textContent = "");

    // Set arrow on clicked header
    const arrowSpan = headerEl.querySelector(".sort-arrow");
    arrowSpan.textContent = ascending ? "▲" : "▼";
    rows.sort((a, b) => {
        const valA = a.cells[colIndex].innerText.trim();
        const valB = b.cells[colIndex].innerText.trim();

        const isDate = !isNaN(Date.parse(valA)) && !isNaN(Date.parse(valB));
        const isNumber = !isNaN(valA) && !isNaN(valB);

        if (isDate) {
            return ascending ? new Date(valA) - new Date(valB) : new Date(valB) - new Date(valA);
        } else if (isNumber) {
            return ascending ? valA - valB : valB - valA;
        } else {
            return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
    });

    rows.forEach(row => tbody.appendChild(row));
}

//Input item filter
function myFunction(item) {
    const keyword = myInput.value.toLowerCase().trim();
    const filtered = keyword
        ? simulatedDataStore.filter(item => item.empname && item.empname.toLowerCase().includes(keyword))
        : simulatedDataStore;
    currentPage = 1; // Reset to first page when filtering
    renderTable(filtered);
}

const checkboxes = document.querySelectorAll('#statusFilters input[type="checkbox"]');
const fromDateInput = document.getElementById("fromDate1");
const toDateInput = document.getElementById("toDate1");
const selectInput = document.getElementById("item2");

// Render table based on filtered data
function parseDate(dateString) {
    const parts = dateString.split('-');
    return new Date(parts[2], parts[1] - 1, parts[0]); // year, month (0-indexed), day
}
function filterData() {
    const selectedStatuses = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    const dropdownItem = selectInput.value ? selectInput.value : null;
    const fromDate = fromDateInput.value ? new Date(fromDateInput.value) : null;
    const toDate = toDateInput.value ? new Date(toDateInput.value) : null;
    let filtered = simulatedDataStore;

    const keyword = myInput.value.toLowerCase().trim();
    if (keyword) {
        filtered = filtered.filter(item => item.empname && item.empname.toLowerCase().includes(keyword));
    }

    // Apply status filter only if checkboxes are selected
    if (selectedStatuses.length > 0) {
        filtered = filtered.filter(item => selectedStatuses.includes(item.status));
    }
    if (dropdownItem) {
        filtered = filtered.filter(item => dropdownItem.includes(item.item));
    }
    // Apply date filter
    if (fromDate || toDate) {
        filtered = filtered.filter(item => {
            const itemDate = parseDate(item.fromDate);
            const dateMatch =
                (!fromDate || itemDate >= fromDate) &&
                (!toDate || itemDate <= toDate);
            return dateMatch;
        });
    }
    currentPage = 1;
    renderTable(filtered);
}
function resetFilters() {
    const filterBox = document.getElementById("infoBox");
    const fields = filterBox.querySelectorAll("input");
    filterBox.querySelectorAll("input[type='checkbox']").forEach(el => el.checked = false);
    fields.forEach(el => el.value = "");

    currentPage = 1; // Reset to first page when resetting
    renderTable(); // show all data again
}

// Display form
const formDisply = document.getElementById("formBox");
const tableDisplay = document.getElementById("tableBox");
const calendarDisplay = document.getElementById("calenderBox");
const coverPage = document.getElementById("coverPage");

function goToHome() {
    formDisply.style.display = "none"; // hide form
    coverPage.style.display = "block";  // show coverpage
    calendarDisplay.style.display = "none";  // hide calendar
    tableDisplay.style.display = "none";  // hide table
}
function showForm() {
    formDisply.style.display = "block";  // Show form
    calendarDisplay.style.display = "none";  // hide calendar
    tableDisplay.style.display = "none";  // hide table
    coverPage.style.display = "none";  // hide coverpage
}
function showTable() {
    tableDisplay.style.display = "block";  // Show form
    calendarDisplay.style.display = "none";  // hide calendar
    coverPage.style.display = "none";  // hide coverpage
    formDisply.style.display = "none";  // hide form
}
function showCalendar() {
    tableDisplay.style.display = "none";  // hide form
    coverPage.style.display = "none";  // hide coverpage
    formDisply.style.display = "none";  // hide form
    calendarDisplay.style.display = "block";  // show calendar
}
// Calendar
let currentDate = new Date();

// Simulated availability map (e.g., for July 2025)
const availabilityMap = {
    "2025-07-03": "unavailable",
    "2025-07-05": "unavailable",
    "2025-07-12": "unavailable",
    "2025-07-15": "available",
    "2025-07-16": "available",
    "2025-07-20": "available"
};

function formatDate(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const tbody = document.getElementById("calendarBody");
    const monthYear = document.getElementById("monthYear");
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    monthYear.textContent = `${monthNames[month]} ${year}`;
    tbody.innerHTML = "";
    let row = document.createElement("tr");

    // Empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement("td"));
    }
    // Fill calendar cells
    for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement("td");
        const fullDate = formatDate(year, month, day);
        const availability = availabilityMap[fullDate];
        cell.textContent = day;
        if (availability === "available") {
            cell.classList.add("available");
            cell.addEventListener("click", () => {
                const form = document.getElementById("formBox");
                form.style.display = "block";  // Show the form
                tableDisplay.style.display = "none";  // hide table
                //   document.getElementById("employeeName").focus();
            });
        } else if (availability === "unavailable") {
            cell.classList.add("unavailable");
        }
        row.appendChild(cell);

        if ((firstDay + day) % 7 === 0 || day === totalDays) {
            tbody.appendChild(row);
            row = document.createElement("tr");
        }
    }
}
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
}
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
}
// Initialize
renderCalendar(currentDate);
