const ul = document.querySelector("ul");

const form = document.querySelector("form");
const input = document.querySelector("form>input");

console.log(form, input);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const todos = [
  {
    text: "Example Tâche 1",
    done: false,
    editMode: false,
  },
  {
    text: "Example Tâche 2",
    done: false,
    editMode: false,
  },
];

const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return createTodoEditElement(todo, index);
    }
    return createTodoElement(todo, index);
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const btndelete = document.createElement("button");
  btndelete.innerHTML = "Supprimer";
  const btnEdit = document.createElement("button");
  btnEdit.innerHTML = "Editer";

  btndelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  btnEdit.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"><span/>
    <p>${todo.text}</p>
  `;

  li.addEventListener("click", (event) => {
    toggleTodo(index);
  });

  li.append(btndelete, btnEdit);

  // Si la tâche est terminée, on ajoute un signe de validation (✓)
  if (todo.done) {
    const checkMark = document.createElement("span");
    checkMark.textContent = "✓"; // Le signe de validation
    checkMark.style.color = "green"; // Change la couleur de la coche
    checkMark.style.fontSize = "100px"; // Augmente la taille de la coche
    checkMark.style.marginLeft = "10px"; // Ajoute un petit espace entre le texte et la coche
    li.append(checkMark);
  }

  return li;
};

const createTodoEditElement = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  const buttonSave = document.createElement("button");
  buttonSave.innerHTML = "Save";
  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "Cancel";
  buttonCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  buttonSave.addEventListener("click", (event) => {
    event.stopPropagation();
    editTodo(index, input);
  });
  li.append(input, buttonCancel, buttonSave);
  return li;
};

const addTodo = (text) => {
  todos.push({
    text,
    done: false,
  });
  displayTodo();
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;

  displayTodo();
};

const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
};

displayTodo();
