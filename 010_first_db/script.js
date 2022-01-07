const loadDatabaseButton = document.querySelector('.load-database');
const addPlebButton = document.querySelector('.add-pleb');

const nameInput = document.querySelector('.name');
const languageInput = document.querySelector('.language');
const experienceInput = document.querySelector('.experience');
const statusInput = document.querySelector('.status');
const plebForm = document.querySelector('.pleb');
const plebTable = document.querySelector('.pleb-table');

const deleteButtons = document.getElementsByClassName('delete-button');

const initialData = [
  {
    name: 'Mihai Gheorghe',
    favourite_programming_language: 'Javascript',
    coding_experience: 3,
    status: 'pleb',
    id: 12455,
  },
  {
    name: 'Razvan Dicu',
    favourite_programming_language: 'Javascript',
    coding_experience: 7,
    status: 'burgher',
    id: 21599,
  },
];

const tableHeader = `<tr>
  <th>Name</th>
  <th>Favourite Programming Language</th>
  <th>Coding Experience</th>
  <th>Status</th>
  <th>Action</th>
</tr>`;

let db;

const submitForm = (event) => {
  event.preventDefault();

  // create data object according to database model
  let pleb = {
    name: nameInput.value,
    favourite_programming_language: languageInput.value,
    coding_experience: experienceInput.value,
    status: statusInput.value,
    id: Math.floor(Math.random() * 100000),
  };

  addPleb(pleb);
};

const loadDatabase = () => {
  const request = indexedDB.open('the-plebeians');

  request.onupgradeneeded = () => {
    db = request.result;
    let store = db.createObjectStore('plebs', { keyPath: 'id' });
    store.createIndex('by_name', 'name', { unique: true });
    store.createIndex(
      'by_favourite_programming_language',
      'favourite_programming_language'
    );
    store.createIndex('by_coding_experience', 'coding_experience');
    store.createIndex('by_status', 'status');

    store.put(initialData[0]);
    store.put(initialData[1]);
  };

  request.onsuccess = () => {
    db = request.result;
    addPlebButton.disabled = false;
    loadDatabaseButton.disabled = true;
    getAllPlebs();
  };

  request.onerror = () => {
    console.error('Database initialization failed');
  };
};

const addPleb = (pleb) => {
  let transaction = db.transaction('plebs', 'readwrite');

  transaction.onerror = (error) => {
    console.error(error);
  };

  transaction.oncomplete = (event) => {
    console.log(event);
  };

  let store = transaction.objectStore('plebs');
  let addRequest = store.add(pleb);

  addRequest.onsuccess = (event) => {
    getAllPlebs();
    console.log('successfully added a pleb');
  };
  addRequest.onerror = (error) => {
    console.log('error in adding the pleb');
  };
};

const getAllPlebs = () => {
  plebTable.innerHTML = tableHeader;

  let transaction = db.transaction('plebs', 'readwrite');
  let store = transaction.objectStore('plebs');

  let keyRange = IDBKeyRange.lowerBound(0);
  let cursorRequest = store.openCursor(keyRange);

  cursorRequest.onsuccess = (event) => {
    let result = event.target.result;
    if (!!result == false) return;

    renderPlebs(result.value);
    result.continue();
  };
};

const renderPlebs = (pleb) => {
  var tr = document.createElement('tr');

  for (property in pleb) {
    if (property == 'id') {
      var td = document.createElement('td');
      var button = document.createElement('button');
      button.classList.add(`${pleb[property]}`, 'delete-button');
      td.appendChild(button);
      tr.appendChild(td);
    } else {
      var td = document.createElement('td');
      var text = document.createTextNode(`${pleb[property]}`);
      td.appendChild(text);
      tr.appendChild(td);
    }
  }

  plebTable.appendChild(tr);
};

loadDatabaseButton.addEventListener('click', loadDatabase);
plebForm.addEventListener('submit', submitForm);

// const deletePleb = (id) => {
//   var db = html5rocks.indexedDB.db;
//   var trans = db.transaction(['todo'], 'readwrite');
//   var store = trans.objectStore('todo');

//   var request = store.delete(id);

//   request.onsuccess = function (e) {
//     html5rocks.indexedDB.getAllTodoItems();
//   };

//   request.onerror = function (e) {
//     console.log('Error Adding: ', e);
//   };
// };
