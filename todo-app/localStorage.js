const exampleData = [
  {
    owner: 'Me',
    name: 'Example todo 1',
    done: true,
  },
  {
    owner: 'Me',
    name: 'Example todo 2',
    done: false,
  },
  {
    owner: 'Mom',
    name: 'Example todo for mom',
    done: false,
  },
  {
    owner: 'Dad',
    name: 'Example todo for dad',
    done: false,
  },
]

function getData() {
  return JSON.parse(localStorage.getItem('todoList'))
}

function refreshStorage(todoList) {
  localStorage.removeItem('todoList')
  localStorage.setItem('todoList', JSON.stringify(todoList))
}

export function getTodoList(owner) {
  let todoList = getData()
  if (!todoList) {
    localStorage.setItem('todoList', JSON.stringify(exampleData))
    return exampleData.filter(item => item.owner === owner);
  }
  return todoList.filter(item => item.owner === owner)
}

export function createTodoItem({ owner, name }) {
  let todoList = getData()

  const newTodo = {
    'owner': owner,
    'name': name,
    'done': false,
  }
  todoList.push(newTodo);
  refreshStorage(todoList)
  return newTodo;
}

export function switchTodoItemDone({ todoItem }) {
  let todoList = getData()

  for (let listItem of todoList) {
    if (todoItem.name === listItem.name) {
      listItem.done = !listItem.done
      todoItem.done  = !todoItem.done
      refreshStorage(todoList)
    }
  }
}

export function deleteTodoItem({todoItem, element}) {
  if (!confirm('Are you sure?')) return
  element.remove()

  let todoList = getData()
  todoList.map((item) => {
    if (item.name === todoItem.name) {
      todoList.splice(todoList.indexOf(item), 1)
    }
  })
  refreshStorage(todoList)
}
