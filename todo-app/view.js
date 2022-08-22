function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
}

function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.setAttribute('id', 'form-control');

    input.placeholder = 'Write down new task, e.g: "Watch Shrek 3"';
    buttonWrapper.classList.add('input-group-append');

    button.classList.add('btn', 'btn-primary');
    button.setAttribute('id', 'btn');
    button.setAttribute('disabled', 'true');
    button.textContent = 'Add task';

    input.addEventListener('input', () => {
      if ( input.value == "" ) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    });

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
        form,
        input,
        button,
    };
};

function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}

function createTodoItemElement(todoItem, onDone, onDelete ) {
  const doneClass = 'list-group-item-success'

    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    if (todoItem.done) {
      item.classList.add(doneClass)
    }
    item.textContent = todoItem.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Done';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Delete';

    doneButton.addEventListener('click', () => {
      onDone({ todoItem, element: item });
      item.classList.toggle(doneClass, todoItem.done);
    });
    deleteButton.addEventListener('click', () => {
      onDelete({ todoItem, element: item });
    });

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return item
}

async function createTodoApp(container, {
  title,
  owner,
  todoItemList = [],
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick,
}) {
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);


  todoItemList.forEach(todoItem => {
    const todoItemElement = createTodoItemElement(todoItem, onDoneClick, onDeleteClick)
    todoList.append(todoItemElement)
  })


  todoItemForm.form.addEventListener('submit', async e => {
    e.preventDefault();
    if(!todoItemForm.input.value) {
        return;
    }
    const todoItem = await onCreateFormSubmit({
      owner,
      name: todoItemForm.input.value.trim()
    })
    let todoItemElement = createTodoItemElement(todoItem, onDoneClick, onDeleteClick);

    todoList.append(todoItemElement);
    todoItemForm.input.value = '';
    document.getElementById('btn').disabled = true;
  });
};

export { createTodoApp }
