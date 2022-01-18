const idInput = document.querySelector('.id');
const nameInput = document.querySelector('.name');
const languageInput = document.querySelector('.language');
const experienceInput = document.querySelector('.experience');
const statusInput = document.querySelector('.status');
const plebForm = document.querySelector('.pleb');
const plebTable = document.querySelector('.pleb-table');

const loadDatabaseButton = document.querySelector('.load-database');
const addPlebButton = document.querySelector('.add-pleb');

const addPutPlebButton = document.querySelector('.add-put-pleb');

const deleteModal = document.querySelector('.delete-modal');
const deleteButton = document.querySelector('.delete-button');
const hideDeleteModalButton = document.querySelector('.hide-delete-modal');

const addModal = document.querySelector('.add-modal');
const hideAddModalButton = document.querySelector('.hide-add-modal');

const initialData = [
  {
    name: 'Mihai Gheorghe',
    favourite_programming_language: 'Javascript',
    coding_experience: 3,
    status: 'pleb',
    id: 12455,
  },
  {
    name: 'Patru Robert',
    favourite_programming_language: 'Javascript',
    coding_experience: 0.5,
    status: 'pleb',
    id: 51479,
  },
  {
    name: 'Iancu Marius Robert',
    favourite_programming_language: 'Javascript',
    coding_experience: 0.5,
    status: 'pleb',
    id: 15479,
  },
  {
    name: 'Razvan Dicu',
    favourite_programming_language: 'Javascript',
    coding_experience: 7,
    status: 'burgess',
    id: 21599,
  },
  {
    name: 'Ilie Vlad',
    favourite_programming_language: 'Javascript',
    coding_experience: 0.5,
    status: 'pleb',
    id: 154789,
  },
];

const tableHeader = `<tr class='header'>
  <th>Name</th>
  <th>Programming Language</th>
  <th>Coding Experience</th>
  <th>Status</th>
  <th>Action</th>
</tr>`;

let db;

const addPleb = (pleb) => {
  let store = makeStore('plebs', 'readwrite');
  let addRequest = store.put(pleb);

  addRequest.onsuccess = (event) => {
    hideAddModal();
    getAllPlebs();
    console.log('successfully added a pleb');
  };
  addRequest.onerror = (error) => {
    console.log(error);
    console.log(error.message);
    console.log('error in adding the pleb');
  };
};

const getPleb = (id) => {
  let store = makeStore('plebs', 'readonly');

  let getRequest = store.get(parseInt(id));

  getRequest.onsuccess = (event) => {
    let {
      name,
      status,
      coding_experience,
      favourite_programming_language,
      id,
    } = event.target.result;

    nameInput.value = name;
    statusInput.value = status;
    experienceInput.value = coding_experience;
    languageInput.value = favourite_programming_language;
    idInput.value = id;
  };
  getRequest.onerror = (error) => {
    console.log('error in adding the pleb');
  };
};

const getAllPlebs = () => {
  plebTable.innerHTML = tableHeader;

  let store = makeStore('plebs', 'readonly');

  let keyRange = IDBKeyRange.lowerBound(0);
  let cursorRequest = store.openCursor(keyRange);

  cursorRequest.onsuccess = (event) => {
    let result = event.target.result;
    if (!!result == false) return;

    // crate a table row for every result
    renderPlebs(result.value);
    result.continue();
  };
};

const updatePleb = (event) => {
  addPutPlebButton.innerText = 'Update';
  getPleb(event.target.parentElement.classList[0]);
  addModal.classList.remove('faded-out');
};

const deletePleb = (event) => {
  let id = parseInt(event.target.classList[1]);

  let store = makeStore('plebs', 'readwrite');
  let deleteRequest = store.delete(parseInt(id));

  deleteRequest.onsuccess = (event) => {
    console.log('successfully delete a pleb');
    getAllPlebs();
    hideDeleteModal();
  };
  deleteRequest.onerror = (error) => {
    console.log('error in deleting the pleb');
  };
};

const showAddModal = () => {
  nameInput.value = '';
  statusInput.value = '';
  experienceInput.value = '';
  languageInput.value = '';
  idInput.value = Math.floor(Math.random() * 100000);
  addPutPlebButton.innerText = 'Add';
  addModal.classList.remove('faded-out');
};

const hideAddModal = () => {
  addModal.classList.add('faded-out');
};

const showDeleteModal = (event) => {
  let id = event.target.parentElement.classList[0];
  deleteModal.classList.remove('faded-out');
  deleteButton.classList.add(id);
};

const hideDeleteModal = () => {
  deleteModal.classList.add('faded-out');
  let id = deleteButton.classList[1];
  deleteButton.classList.remove(id);
};

const renderPlebs = (pleb) => {
  var tr = document.createElement('tr');

  // map each value to a table cell, unless the object value is the id
  for (property in pleb) {
    if (property == 'id') {
      var td = document.createElement('td');

      // map object id to updateButton and deleteButton
      var button = document.createElement('button');
      button.classList.add(`${pleb[property]}`, 'update-button');
      button.addEventListener('click', updatePleb);
      button.innerHTML = `<i class="fas fa-pen"></i>`;
      td.appendChild(button);

      var button = document.createElement('button');
      button.classList.add(`${pleb[property]}`, 'show-delete--button');
      button.addEventListener('click', showDeleteModal);
      button.innerHTML = `<i class="fas fa-minus-circle"></i>`;
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

const submitForm = (event) => {
  event.preventDefault();

  // create data object according to database model
  let pleb = {
    name: nameInput.value,
    favourite_programming_language: languageInput.value,
    coding_experience: experienceInput.value,
    status: statusInput.value,
    id: parseInt(idInput.value),
  };

  addPleb(pleb);
};

const loadDatabase = () => {
  const request = indexedDB.open('the-plebeians');

  request.onupgradeneeded = () => {
    db = request.result;
    let store = db.createObjectStore('plebs', { keyPath: 'id' });
    store.createIndex('by_name', 'name');
    store.createIndex(
      'by_favourite_programming_language',
      'favourite_programming_language'
    );
    store.createIndex('by_coding_experience', 'coding_experience');
    store.createIndex('by_status', 'status');

    initialData.forEach((data) => {
      store.put(data);
    });
  };

  request.onsuccess = () => {
    db = request.result;
    addPlebButton.disabled = false;
    loadDatabaseButton.disabled = true;
    getAllPlebs();

    plebTable.classList.remove('faded-out');
  };

  request.onerror = () => {
    console.error('Database initialization failed');
  };
};

const makeStore = (storeName, mode) => {
  let transaction = db.transaction(storeName, mode);
  transaction.onerror = (error) => {
    console.error(error);
  };

  transaction.oncomplete = (event) => {
    // console.log(event);
  };

  let store = transaction.objectStore('plebs');
  return store;
};

loadDatabaseButton.addEventListener('click', loadDatabase);
addPlebButton.addEventListener('click', showAddModal);
deleteButton.addEventListener('click', deletePleb);
hideDeleteModalButton.addEventListener('click', hideDeleteModal);
hideAddModalButton.addEventListener('click', hideAddModal);
plebForm.addEventListener('submit', submitForm);
