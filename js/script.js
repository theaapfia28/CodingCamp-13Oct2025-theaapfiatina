document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const addBtn = document.getElementById("addBtn");
  const clearAll = document.getElementById("clearAll");
  const filterBtn = document.getElementById("filter");
  const tableBody = document.getElementById("taskTableBody");
  const taskList = document.getElementById("tasklist");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let showPendingOnly = false; // toggle filter

  function renderTasks(taskArray = tasks) {
    tableBody.innerHTML = "";

    if (taskArray.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
      return;
    }

    taskArray.forEach((task, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.date || "-"}</td>
        <td>${task.completed ? "✅ Done" : "⏳ Pending"}</td>
        <td>
          <button class="completeBtn">${task.completed ? "Undo" : "Done"}</button>
          <button class="deleteBtn">Delete</button>
        </td>
      `;

      row.querySelector(".completeBtn").addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
      });

      row.querySelector(".deleteBtn").addEventListener("click", () => {
    const taskIndex = tasks.indexOf(taskArray[index]);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        saveTasks();
    }
});

      tableBody.appendChild(row);
    });
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (showPendingOnly) {
      renderTasks(tasks.filter(t => !t.completed));
    } else {
      renderTasks();
    }
  }

  addBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  const date = taskDate.value;

  // Jika dua-duanya kosong
  if (!taskName && !date) {
    alert("Tolong isi nama tugas dan tanggalnya dulu ya 🌼");
    return;
  }

  // Jika cuma tugas yang kosong
  if (!taskName) {
    alert("Kamu belum isi nama tugasnya nih 🐱");
    return;
  }

  // Jika cuma tanggal yang kosong
  if (!date) {
    alert("Tanggal tugasnya belum diisi nih 📅");
    return;
  }

  // Kalau semua sudah diisi, simpan datanya
  tasks.push({ name: taskName, date: date, completed: false });
  taskInput.value = "";
  taskDate.value = "";
  saveTasks();
});


  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addBtn.click();
  });

  clearAll.addEventListener("click", () => {
    if (tasks.length === 0) return;
    if (confirm("Hapus semua tugas?")) {
        tasks = [];
        saveTasks(); 
    }
});

  filterBtn.addEventListener("click", () => {
    showPendingOnly = !showPendingOnly; 
    if (showPendingOnly) {
      filterBtn.textContent = "Show Pending"; 
      renderTasks(tasks.filter(t => !t.completed)); 
    } else {
      filterBtn.textContent = "Show All"; 
      renderTasks(); 
    }
  });

  renderTasks();
});

const bgMusic = document.getElementById("bgMusic");
const playBtn = document.getElementById("playMusic");
const pauseBtn = document.getElementById("pauseMusic");

playBtn.addEventListener("click", () => bgMusic.play());
pauseBtn.addEventListener("click", () => bgMusic.pause());

