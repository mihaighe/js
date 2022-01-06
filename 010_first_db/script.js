const loadDatabaseButton = document.querySelector('.load-database');
const addPlebButton = document.querySelector('.add-pleb');
const getPlebsButton = document.querySelector('.get-plebs');

const nameInput = document.querySelector('.name');
const languageInput = document.querySelector('.language');
const experienceInput = document.querySelector('.experience');
const statusInput = document.querySelector('.status');
const plebForm = document.querySelector('.pleb');

let db;

let friends = [
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

    store.put(friends[0]);
    store.put(friends[1]);
};

  request.onsuccess = () => {
  db = request.result;
    addPlebButton.disabled = false;
    getPlebsButton.disabled = false;
    loadDatabaseButton.disabled = true;
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
    console.log('successfully added a pleb');
  };
  addRequest.onerror = (error) => {
    console.log('error in adding the pleb');
  };
  };

const getAllPlebs = () => {
  let transaction = db.transaction('plebs', 'readwrite');
  let store = transaction.objectStore('plebs');

  // Get everything in the store;
  let keyRange = IDBKeyRange.lowerBound(0);
  let cursorRequest = store.openCursor(keyRange);

  cursorRequest.onsuccess = function (e) {
    let result = e.target.result;
    if (!!result == false) return;

    console.log(result.value);
    result.continue();
  };

  alert('Check your console!');
  };

loadDatabaseButton.addEventListener('click', loadDatabase);
getPlebsButton.addEventListener('click', getAllPlebs);

plebForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let pleb = {
    name: nameInput.value,
    favourite_programming_language: languageInput.value,
    coding_experience: experienceInput.value,
    status: statusInput.value,
    id: Math.floor(Math.random() * 100000),
  };

  addPleb(pleb);
});
