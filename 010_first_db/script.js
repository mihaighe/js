const request = indexedDB.open('library');
let db;

request.onupgradeneeded = function () {
  // The database did not previously exist, so create object stores and indexes.
  const db = request.result;
  const store = db.createObjectStore('books', { keyPath: 'isbn' });
  const titleIndex = store.createIndex('by_title', 'title', { unique: true });
  const authorIndex = store.createIndex('by_author', 'author');

  console.log('Upgrade');
  // Populate with initial data.
  store.put({ title: 'Quarry Memories', author: 'Fred', isbn: 123456 });
  store.put({ title: 'Water Buffaloes', author: 'Fred', isbn: 234567 });
  store.put({ title: 'Bedrock Nights', author: 'Barney', isbn: 345678 });
};

request.onsuccess = function () {
  db = request.result;
};

const button = document.querySelector('.test');

button.addEventListener('click', () => {
  let tx = db.transaction('books', 'readwrite');

  tx.onerror = (err) => {
    console.warn(err);
  };

  tx.oncomplete = (ev) => {
    console.log(ev);
  };

  let book = { title: 'sss Memories', author: 'Frd', isbn: 123455 };
  let store = tx.objectStore('books');
  let req = store.add(book);

  req.onsuccess = (ev) => {
    console.log('successfully added an object');
  };
  req.onerror = (err) => {
    console.log('error in request to add');
  };
});
