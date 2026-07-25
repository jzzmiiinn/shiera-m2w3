const input = document.getElementById("input");
const add = document.getElementById("addTodo");
const themeChanger = document.getElementById("theme-changer");
const remaining = document.getElementById("itemLeft");
const todoList = document.getElementById("todo-list");
const all = document.getElementById("all");
const active = document.getElementById("active");
const completed = document.getElementById("completed");
const clear = document.getElementById("clear");
const text = input.value;

const todos = [
  { id: 1, name: "Learn JS", completed: false },
  { id: 2, name: "Learn Tailwind", completed: true },
  { id: 3, name: "Build Todo App", completed: false },
];

for (let todo of todos) {
  const task = document.createElement("div");

  task.innerHTML = `
    <div class="flex items-center justify-between p-4 border-b">
      <div class="flex items-center gap-4">
        <input
          type="checkbox"
          ${todo.completed ? "checked" : ""}
        >
        <p>${todo.name}</p>
      </div>

      <img
        src="images/icon-cross.svg"
        alt="Delete"
        class="cursor-pointer"
      >
    </div>
  `;

  todoList.appendChild(task);
}

add.addEventListener("click", () => {
  input.value.append(todos);
});

clear.addEventListener("click", () => {
  for (let todo of todos) {
    if (todo.completed === true) {
      todo.clear();
    }
  }
});

completed.addEventListener("click", () => {
  todos.filter((todos) => todos.completed === true);
});

remaining.textContent = `${todos.completed.length} items left`;
