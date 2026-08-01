const input = document.getElementById("input");
const form = document.getElementById("todo-form");
const ubg = document.getElementById("ubg");
const lbg = document.getElementById("lbg");
const container = document.getElementById("container");
const themeChanger = document.getElementById("theme-changer");
const remaining = document.getElementById("itemLeft");
const todoList = document.getElementById("todo-list");
const all = document.getElementById("all");
const active = document.getElementById("active");
const completed = document.getElementById("completed");
const clear = document.getElementById("clear");
const delete_icon = `<img 
 src="images/icon-cross.svg"
 class="w-4 h-4"
/>`;
const body = document.getElementsByTagName("body")[0];
const footer = document.getElementsByTagName("footer")[0];

let darkMode = false;
let todos = JSON.parse(localStorage.getItem("todos")) || [
  { id: 1, text: "Learn JS", completed: false },
  { id: 2, text: "Learn Tailwind", completed: true },
  { id: 3, text: "Build Todo App", completed: false },
];
let currentFilter = "all";

function filterCompleted(todos) {
  todos.filter((todo) => todo.completed === true);
  renderTodos();
}

function deleteCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

const createTaskElement = (todo) => {
  const item = document.createElement("div");

  const todoBg = darkMode ? "bg-[hsl(235,24%,19%)]" : "bg-[hsl(0,0%,98%)]";

  const textColor = darkMode
    ? "text-[hsl(234,39%,85%)]"
    : "text-[hsl(236,9%,61%)]";

  item.innerHTML = `
    <div class="flex flex-col py-5">
      <div class="w-full list-none py-3 items-center flex flex-row justify-between">
        <div class="${todoBg} ${textColor} flex items-center gap-4 w-full">           
        <input 
            type="checkbox"
            class="appearance-none w-5 h-5 rounded-full border border-gray-400 cursor-pointer checked:bg-gradient-to-r checked:from-purple-400 checked:to-blue-400"
            ${todo.completed ? "checked" : ""}
          >

          <p class="${todo.completed ? "line-through" : ""}">
          ${todo.text}
          </p>
        </div>

        <button class="delete-btn">
          ${delete_icon}
        </button>

      </div>
      <hr>
    </div>
  `;
  const deleteButton = item.querySelector(".delete-btn");
  const checkbox = item.querySelector("input");
  const text = item.querySelector("p");

  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;

    if (todo.completed) {
      text.classList.add("line-through");
    } else {
      text.classList.remove("line-through");
    }
    saveTodos();
    updateItemsLeft();
  });

  deleteButton.addEventListener("click", () => {
    deleteTodo(todo.id);
  });

  return item;
};

const deleteTodo = (id) => {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
};

function renderTodos() {
  todoList.innerHTML = "";

  let filteredTodos = todos;

  if (currentFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  for (const todo of filteredTodos) {
    todoList.append(createTaskElement(todo));
  }

  updateItemsLeft();
}

function addTodo(text) {
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
  };
  todos.push(newTodo);
  saveTodos();
  renderTodos();
}

function updateItemsLeft() {
  const remainingTodos = todos.filter((todo) => !todo.completed);

  remaining.textContent = remainingTodos.length;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") return;
  addTodo(text);
  input.value = "";
});

completed.addEventListener("click", () => {
  currentFilter = "completed";
  renderTodos();
});

active.addEventListener("click", () => {
  currentFilter = "active";
  renderTodos();
});

all.addEventListener("click", () => {
  currentFilter = "all";
  renderTodos();
});

clear.addEventListener("click", deleteCompleted);

themeChanger.addEventListener("click", () => {
  darkMode = !darkMode;

  if (darkMode) {
    themeChanger.innerHTML = `<img src="images/icon-sun.svg">`;
    ubg.classList.remove("bg-[url(images/bg-desktop-light.jpg)]");
    ubg.classList.add("bg-[url(images/bg-desktop-dark.jpg)]");
    lbg.classList.remove("bg-[hsl(0,0%,98%)]");
    lbg.classList.add("bg-[hsl(235,21%,11%)]");
    container.classList.add("bg-[hsl(235,24%,19%)]");
    container.classList.add("text-[hsl(234,39%,85%)]");
    form.classList.add("bg-[#25273D]");
    input.classList.add("bg-[#25273D]");
    todoList.classList.add("bg-[#25273D]");
    body.classList.add("bg-[hsl(235,21%,11%)]");
    footer.classList.add("bg-[#25273D]");
    footer.classList.add("text-[hsl(234,39%,85%)]");
    footer.classList.remove("bg-[hsl(0,0%,98%)]");
  } else {
    themeChanger.innerHTML = `<img src="images/icon-moon.svg">`;
    ubg.classList.remove("bg-[url(images/bg-desktop-dark.jpg)]");
    ubg.classList.add("bg-[url(images/bg-desktop-light.jpg)]");
    lbg.classList.remove("bg-[hsl(235,21%,11%)]");
    lbg.classList.add("bg-[hsl(0,0%,98%)]");
    container.classList.remove("bg-[hsl(235,24%,19%)]");
    container.classList.remove("text-[hsl(234,39%,85%)]");
    container.classList.add("text-[hsl(236,9%,61%)]");
    form.classList.remove("bg-[#25273D]");
    input.classList.remove("bg-[#25273D]");
    todoList.classList.remove("bg-[#25273D]");
    body.classList.remove("bg-[hsl(235,21%,11%)]");
    body.classList.add("bg-[hsl(0,0%,98%)]");
    footer.classList.remove("bg-[#25273D]");
    footer.classList.remove("text-[hsl(234,39%,85%)]");
    footer.classList.add("bg-[hsl(0,0%,98%)]");
  }
  renderTodos();
});

renderTodos();
