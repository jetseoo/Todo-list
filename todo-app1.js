(function(){

    myTasks = [
        {
            name: 'Дело 1',
            done: false,
        },
        {
            name: 'Дело 2',
            done: true,
        },
        {
            name: 'Дело 3',
            done: false,
        },
    ]

    dadsTasks = [
        {
            name: 'Ознакомиться со списком',
            done: true,
        },
        {
            name: 'Выполнить первый пункт',
            done: true,
        },
    ]

    momsTasks = [
        {
            name: 'Пофлексить',
            done: false,
        },
        {
            name: 'Почиллить',
            done: true,
        },
    ]

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

        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.setAttribute('id', 'btn');
        button.setAttribute('disabled', 'true');


        button.textContent = 'Добавить дело';

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

    function isEmpty(obj) {
        for (let key in obj) {
          return false;
        }
        return true;
    }

    function createTodoItem(name) {
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        }
    }

    function addTodoToLocalStorage(taskName, isDone, title) {
        let stored = JSON.parse(localStorage.getItem(title));
        let newTodo = {'name' : taskName, 'done' : isDone};

        stored.push(newTodo);

        localStorage.removeItem(title);
        localStorage.setItem(title, JSON.stringify(stored));
    }

    function changeTaskStatusInLocalStorage(taskName, isDone, array, title) {
        let stored = JSON.parse(localStorage.getItem(title));
        console.log(stored);

        for (incomeArrItem of array) {
            let incomeItemIndex = array.indexOf(incomeArrItem);

            let storedItem = stored[incomeItemIndex];
            let storedItemIndex = stored.indexOf(storedItem)


            if (taskName.textContent == storedItem.name && incomeItemIndex == storedItemIndex) {
                storedItem.done = isDone;
                localStorage.removeItem(title);
                localStorage.setItem(title, JSON.stringify(stored));
            }
        }
    }

    function removeTodoFromLocalStorage(todoName, title) {
        let stored = localStorage.getItem(title);
        console.log(stored);
        let parsed = JSON.parse(stored);

        let counter = 0;
        for (item of parsed) {

            if (todoName.textContent == item.name) {
                parsed.splice(counter, 1);

                localStorage.setItem(title, JSON.stringify(parsed));
                break;
            }
            counter++;
        }
    }


    function createTodoApp(container, title = 'Список дел', todosArray) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        if (localStorage[title] == null) {
            localStorage.setItem(title, JSON.stringify(todosArray))
        } else {
            todosArray = JSON.parse(localStorage[title])
        }



        if (!isEmpty(todosArray)) {
            for (elem of todosArray) {
                let todoItem = createTodoItem(elem.name)

                if (elem.done == true) {
                    todoItem.item.classList.add('list-group-item-success')

                    todoItem.doneButton.addEventListener('click', function() {
                        changeTaskStatusInLocalStorage(todoItem.item.childNodes[0], false, todosArray, title)
                        todoItem.item.classList.toggle('list-group-item-success')
                    });

                } else {
                    todoItem.item.classList.remove('list-group-item-success')

                    todoItem.doneButton.addEventListener('click', function() {
                        changeTaskStatusInLocalStorage(todoItem.item.childNodes[0], true, todosArray, title)
                        todoItem.item.classList.toggle('list-group-item-success')
                    });
                }

                todoItem.deleteButton.addEventListener('click', function() {
                    if (confirm('Вы уверены, что хотите удалить элемент списка?')) {
                        todoItem.item.remove()
                        removeTodoFromLocalStorage(todoItem.item.childNodes[0], title)
                    };
                });

                todoList.append(todoItem.item)
            }
        } else {
            console.log('no current tasks')
        }


        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();

            if(!todoItemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);
            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success');
            });
            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены, что хотите удалить элемент списка?')) {
                    todoItem.item.remove();
                };
            });


            addTodoToLocalStorage(todoItemForm.input.value, false, title);

            todoList.append(todoItem.item);
            todoItemForm.input.value = '';
            document.getElementById('btn').disabled = true;
        });
    };


    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('form-control').addEventListener('input', buttonActivating);

        function buttonActivating() {
            if ( document.getElementById('form-control').value == "" ) {
                document.getElementById('btn').disabled = true;
            } else {
                document.getElementById('btn').disabled = false;
            }
        }
    })


    window.createTodoApp = createTodoApp;
})();
