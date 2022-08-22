export function fixEmptyStorage(storage) {
  if (!storage === null) return storage

  storage = JSON.parse(localStorage.getItem('current'))
  if (storage === null ||
    storage === undefined || !storage) {
      storage = {
      name: 'localStorage',
      path: './todo-app/localStorage.js',
      buttonText: 'Switch to server API',
    };
    localStorage.setItem('current', JSON.stringify(storage))
  }
  return storage
}

export function switchStorage() {
  let storageData = {}

  let currentStorage = JSON.parse(localStorage.getItem('current'))
  currentStorage = fixEmptyStorage(currentStorage)

  if (currentStorage.name ===  'localStorage') {
    storageData = {
      name: 'serverAPI',
      path: './todo-app/api.js',
      buttonText: 'Switch to local storage',
    }
  } else {
    storageData = {
      name: 'localStorage',
      path: './todo-app/localStorage.js',
      buttonText: 'Switch to server API',
    }
  }
  localStorage.setItem('current', JSON.stringify(storageData))

  location.reload()
}
