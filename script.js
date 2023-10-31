class Book {
  constructor(
    title = 'Unknown',
    author = 'Unknown',
    pages = 0,
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  updateRead(bool) {
    this.isRead = bool;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.inLibrary(newBook)) {
      this.books.push(newBook);
      addBookToDOM(newBook);
    } else {
      alert('Book is already in library');
      resetForm();
    }
  }

  inLibrary(newBook) {
    return this.books.some(
      (book) => book.title === newBook.title && book.author === newBook.author
    );
  }

  removeBook(title, author) {
    this.books = this.books.filter(
      (book) => book.title !== title && book.author !== author
    );
    localStorage.setItem('library', JSON.stringify(library));
    console.log(library.books);
  }
}

const library = new Library();

const modal = document.querySelector('dialog');
const openModal = document.querySelector('.open-modal');
const closeModal = document.querySelector('.close-modal');
const submit = document.querySelector('#submit');

const title = document.getElementById('book-title');
const author = document.getElementById('book-author');
const pages = document.getElementById('book-pages');
const isRead = document.getElementById('read-checkbox');

const cardGroup = document.querySelector('.card-group');

const toggle = document.querySelectorAll('.toggle');
const removeBtns = document.querySelectorAll('.remove');

function titleCaseify(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

function onBookSubmit(e) {
  e.preventDefault();

  const bookTitle = titleCaseify(title.value);
  const bookAuthor = titleCaseify(author.value);
  const bookPages = Number(pages.value);
  let bookIsRead = isRead.checked;

  const newBook = new Book(bookTitle, bookAuthor, bookPages, bookIsRead);

  library.addBook(newBook);

  addLibraryToStorage();
  resetForm();
  modal.close();
}

function getLibraryFromStorage() {
  if (localStorage.getItem('library') !== null) {
    library.books = JSON.parse(localStorage.getItem('library')).books;
  }
  return library;
}

function addLibraryToStorage() {
  localStorage.setItem('library', JSON.stringify(library));
}

function addBookToDOM(book) {
  // Create card and child elements
  const card = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const toggleBtn = document.createElement('button');
  const removeBtn = document.createElement('button');
  const btnGrp = document.createElement('div');
  // Set attributes on elements
  card.className = 'card';
  title.className = 'title';
  author.className = 'author';
  pages.className = 'pages';
  toggleBtn.className = 'toggle';
  removeBtn.className = 'remove';
  btnGrp.className = 'button-group';

  if (book.isRead === true) {
    toggleBtn.setAttribute('aria-pressed', true);
  } else {
    toggleBtn.setAttribute('aria-pressed', false);
  }

  // Add text
  title.appendChild(document.createTextNode(book.title));
  author.appendChild(document.createTextNode(book.author));
  pages.appendChild(document.createTextNode(book.pages + ' pages'));
  removeBtn.appendChild(document.createTextNode('Remove'));

  // Add elements to DOM
  btnGrp.appendChild(toggleBtn);
  btnGrp.appendChild(removeBtn);

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(btnGrp);

  cardGroup.appendChild(card);

  removeBtn.addEventListener('click', deleteBook);
  toggleBtn.addEventListener('click', toggleRead);
}

function deleteBook(e) {
  const title =
    e.target.parentElement.parentElement.querySelector('.title').textContent;
  const author =
    e.target.parentElement.parentElement.querySelector('.author').textContent;

  library.removeBook(title, author);

  clearBooks();
  library.books.forEach((book) => addBookToDOM(book));
}

function clearBooks() {
  while (cardGroup.firstElementChild) {
    cardGroup.removeChild(cardGroup.firstElementChild);
  }
}

function resetForm() {
  title.value = '';
  author.value = '';
  pages.value = '';
  isRead.checked = false;
}

function toggleRead(e) {
  const title =
    e.target.parentElement.parentElement.querySelector('.title').textContent;
  const author =
    e.target.parentElement.parentElement.querySelector('.author').textContent;

  library.books.forEach((book) => {
    if (book.title === title && book.author === author) {
      if (e.target.ariaPressed === 'true') {
        book.isRead = false;
        e.target.ariaPressed = 'false';
      } else {
        book.isRead = true;
        e.target.ariaPressed = 'true';
      }
    }
  });

  addLibraryToStorage();
}

// function addDefaultBooks() {
//   const mountain = new Book('The Living Mountain', 'Nan Shepherd', 114, true);

//   const wolves = new Book(
//     'Women Who Run With The Wolves',
//     'Clarissa Pinkola Estes',
//     513,
//     true
//   );

//   const trial = new Book('The Trial', 'Franz Kafka', 178, false);

//   const libraryFromStorage = getLibraryFromStorage();

//   console.log(libraryFromStorage);

//   library.addBook(mountain);
//   library.addBook(wolves);
//   library.addBook(trial);
// }

function init() {
  getLibraryFromStorage();

  //   Display existing books on page
  library.books.forEach((book) => addBookToDOM(book));
}

// Event listeners

openModal.addEventListener('click', () => {
  modal.showModal();
});
closeModal.addEventListener('click', () => {
  modal.close();
});
document.querySelector('.book-form').addEventListener('submit', onBookSubmit);
document.addEventListener('DOMContentLoaded', init);
