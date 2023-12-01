'use strict';

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

  _inLibrary(book) {
    return this.books.some(
      b => b.title === book.title && b.author === book.author
    );
  }

  addBook(book) {
    if (!this._inLibrary(book)) {
      this.books.push(book);
    } else {
      alert(`${book.title} is already in your library`);
      resetForm();
    }
    return this;
  }

  removeBook(title, author) {
    this.books = this.books.filter(
      b => b.title !== title && b.author !== author
    );
  }

  getBooks() {
    return library.books;
  }
}

const library = new Library();

// User Interface

const titleCaseify = function(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

const createBook = function(e) {
  e.preventDefault();

  const newBook = new Book(titleCaseify(title.value), titleCaseify(author.value), Number(pages.value), isRead.checked);

  return newBook;
}

const setDefaultBooks = function() {
  const nineteen84 = new Book('Nineteen Eighty-Four', 'George Orwell', 356, true);
  const girl = new Book('Girl, Woman, Other', 'Bernadine Evaristo', 464, true);
  const overstory = new Book('The Overstory', 'Richard Powers', 625, false);

  library.addBook(nineteen84).addBook(girl).addBook(overstory);
}

const clearBooks = function() {
  while (cardGroup.firstElementChild) {
    cardGroup.removeChild(cardGroup.firstElementChild);
  }
};

const toggleRead = function(e, book) {
  if (e.target.ariaPressed === 'true') {
    book.updateRead(false);
    e.target.ariaPressed = 'false';
  } else {
    book.updateRead(true);
    e.target.ariaPressed = 'true';
  }
};

const displayBooks = function(library) {
  library.books.forEach(book => {
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

    removeBtn.addEventListener('click', function() {
      library.removeBook(book.title, book.author);
      clearBooks();
      displayBooks(library);
    });

    toggleBtn.addEventListener('click', function(e) {
      toggleRead(e, book);
    });
    }
  )};

const resetForm = function() {
  title.value = '';
  author.value = '';
  pages.value = '';
  isRead.checked = false;
}

const init = function() {
  setDefaultBooks();
  displayBooks(library);
}

// Event listeners

openModal.addEventListener('click', () => {
  modal.showModal();
});
closeModal.addEventListener('click', () => {
  modal.close();
});

document.querySelector('.book-form').addEventListener('submit', function(e) {
  library.addBook(createBook(e));
  clearBooks();
  displayBooks(library);
  resetForm();
  modal.close();
});

document.addEventListener('DOMContentLoaded', init);


