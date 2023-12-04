'use strict';

class Book {
  
  constructor(
    id = Date.now().toString().slice(-10),
    title = 'Unknown',
    author = 'Unknown',
    pages = 0,
    isRead = false
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  setRead(bool) {
    this.isRead = bool;
    return this;
  }
}

const addBook = document.querySelector('.add-book');
const closeModal = document.querySelector('.close-modal');
const form = document.querySelector('.form');
const cardGroup = document.querySelector('.card-group');

const inputTitle = document.getElementById('book-title');
const inputAuthor = document.getElementById('book-author');
const inputPages = document.getElementById('book-pages');
const inputRead = document.getElementById('read-checkbox');

class Library {
  #books = [];

  constructor() {
    // Get books from local storage
    this._getLocalStorage();

    // Attach event listeners
    addBook.addEventListener('click', this._showForm);
    closeModal.addEventListener('click', () => modal.close());
    form.addEventListener('submit', this._newBook.bind(this));
    cardGroup.addEventListener('click', this._removeBook.bind(this));
    cardGroup.addEventListener('click', this._toggleReadField.bind(this));
  }

  _showForm() {
    modal.showModal();
    inputTitle.focus();
  }

  _inLibrary(book) {
    return this.#books.some(
      b => b.title === book.title && b.author === book.author
    );
  }

  _titleCaseify(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
  }

  _newBook(e) {
    e.preventDefault();

    // Get form data
    const title = inputTitle.value;
    const author = inputAuthor.value;
    const pages = +inputPages.value;
    const isRead = inputRead.checked;
    
    if(!title || !author) return alert('Please enter title and author');

    // Create new book
    const book = new Book(undefined, this._titleCaseify(title), this._titleCaseify(author), pages, isRead);
    
    // Check for existing book of same name and author
    if(this._inLibrary(book)) return alert(`${book.title} is already in your library`);
    
    // Add book to books array
    this.#books.push(book);

    // Display book on page
    this._renderBook(book);

    // Add to local storage
    this._setLocalStorage();

    // Close modal
    modal.close();

    // Clear form fields
    inputTitle.value = inputAuthor.value = inputPages.value = '';
    inputRead.checked = false;    
  }

  _renderBook(book) {
    let html = `
      <div class="card" data-id="${book.id}">
        <p class="title">${book.title}</p>
        <p class="author">${book.author}</p>
        <p class="pages">${book.pages} pages</p>
        <div class="button-group">
          <button class="toggle" aria-pressed="${book.isRead === true ? true : false}"></button>
          <button class="remove">Remove</button>
        </div>
      </div>
    `
    cardGroup.insertAdjacentHTML('afterbegin', html)
  }

  _removeBook(e) {
    const removeBtn = e.target.closest('.remove')
    
    if(!removeBtn) return;

    const card = removeBtn.closest('.card');

    // Remove card from books array
    this.#books = this.#books.filter(book => book.id !== card.dataset.id);

    // Update local storage
    localStorage.setItem('books', JSON.stringify(this.#books));

    // Remove card from UI
    card.remove();
  }

  _toggleReadField(e) {
    const toggleBtn = e.target.closest('.toggle');

    if(!toggleBtn) return;

    const cardId = toggleBtn.closest('.card').dataset.id;

    if(toggleBtn.ariaPressed === 'true') {
      // Toggle aria-pressed value
      toggleBtn.ariaPressed = 'false';
      // Update isRead field in books array
      this.#books.forEach(book => {
        if(book.id === cardId) book.setRead(false)
      });
    } else if (toggleBtn.ariaPressed === 'false') {
      // Toggle aria-pressed value
      toggleBtn.ariaPressed = 'true';
      // Update isRead field in books array
      this.#books.forEach(book => {
        if(book.id === cardId) book.setRead(true)
      });
    }
  }

  _setLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.#books));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('books'));

    if(!data) {
      this._loadDefaultBooks();
    } else {
        // Convert book objects back into book class
    data.forEach((book) => {
      const newBook = new Book(book.id, book.title, book.author, book.pages, book.isRead);
      this.#books.push(newBook);
    })
    }

    this.#books.forEach(book => this._renderBook(book));    
  }

  _loadDefaultBooks() {
    const nineteen84 = new Book('0000000001', 'Nineteen Eighty-Four', 'George Orwell', 356, true);
    const girl = new Book('0000000002', 'Girl, Woman, Other', 'Bernadine Evaristo', 464, true);
    const overstory = new Book('0000000003', 'The Overstory', 'Richard Powers', 625, false);
    
    this.#books.push(nineteen84);
    this.#books.push(girl);
    this.#books.push(overstory);
  }
}

const library = new Library();

