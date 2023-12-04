'use strict';

class Book {
  id = Date.now().toString().slice(-10);

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

class App {
  #books = [];

  constructor() {
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
    const book = new Book(this._titleCaseify(title), this._titleCaseify(author), pages, isRead);
    
    // Check for existing book of same name and author
    if(this._inLibrary(book)) return alert(`${book.title} is already in your library`);
    
    // Add book to books array
    this.#books.push(book);

    // Display book on page
    this._renderBook(book);

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
        if(book.id === cardId) book.updateRead(false)
      });
    } else if (toggleBtn.ariaPressed === 'false') {
      // Toggle aria-pressed value
      toggleBtn.ariaPressed = 'true';
      // Update isRead field in books array
      this.#books.forEach(book => {
        if(book.id === cardId) book.updateRead(true)
      });
    }
  }


}

const app = new App();

// class Library {
//   constructor() {
//     this.books = [];
//   }

//   _inLibrary(book) {
//     return this.books.some(
//       b => b.title === book.title && b.author === book.author
//     );
//   }

//   addBook(book) {
//     if (!this._inLibrary(book)) {
//       this.books.push(book);
//     } else {
//       alert(`${book.title} is already in your library`);
//       resetForm();
//     }
//     return this;
//   }

//   removeBook(title, author) {
//     this.books = this.books.filter(
//       b => b.title !== title && b.author !== author
//     );
//   }

//   getBooks() {
//     return library.books;
//   }
// }

// const library = new Library();

// // User Interface

// const titleCaseify = function(str) {
//   return str
//     .toLowerCase()
//     .split(' ')
//     .map((word) => word[0].toUpperCase() + word.slice(1))
//     .join(' ');
// }

// const createBook = function(e) {
//   e.preventDefault();

//   const newBook = new Book(titleCaseify(title.value), titleCaseify(author.value), Number(pages.value), isRead.checked);

//   return newBook;
// }

// const setDefaultBooks = function() {
//   const nineteen84 = new Book('Nineteen Eighty-Four', 'George Orwell', 356, true);
//   nineteen84.id = '0000000001';
//   const girl = new Book('Girl, Woman, Other', 'Bernadine Evaristo', 464, true);
//   girl.id = '0000000002';
//   const overstory = new Book('The Overstory', 'Richard Powers', 625, false);
//   overstory.id = '0000000003';

//   library.addBook(nineteen84).addBook(girl).addBook(overstory);
// }

// const clearBooks = function() {
//   while (cardGroup.firstElementChild) {
//     cardGroup.removeChild(cardGroup.firstElementChild);
//   }
// };

// const toggleRead = function(e, book) {
//   if (e.target.ariaPressed === 'true') {
//     book.updateRead(false);
//     e.target.ariaPressed = 'false';
//   } else {
//     book.updateRead(true);
//     e.target.ariaPressed = 'true';
//   }
// };

// const displayBooks = function(library) {
//   library.books.forEach(book => {
//     // Create card and child elements
//     const card = document.createElement('div');
//     const title = document.createElement('p');
//     const author = document.createElement('p');
//     const pages = document.createElement('p');
//     const toggleBtn = document.createElement('button');
//     const removeBtn = document.createElement('button');
//     const btnGrp = document.createElement('div');
//     // Set attributes on elements
//     card.className = 'card';
//     title.className = 'title';
//     author.className = 'author';
//     pages.className = 'pages';
//     toggleBtn.className = 'toggle';
//     removeBtn.className = 'remove';
//     btnGrp.className = 'button-group';

//     if (book.isRead === true) {
//       toggleBtn.setAttribute('aria-pressed', true);
//     } else {
//       toggleBtn.setAttribute('aria-pressed', false);
//     }

//     // Add text
//     title.appendChild(document.createTextNode(book.title));
//     author.appendChild(document.createTextNode(book.author));
//     pages.appendChild(document.createTextNode(book.pages + ' pages'));
//     removeBtn.appendChild(document.createTextNode('Remove'));

//     // Add elements to DOM
//     btnGrp.appendChild(toggleBtn);
//     btnGrp.appendChild(removeBtn);

//     card.appendChild(title);
//     card.appendChild(author);
//     card.appendChild(pages);
//     card.appendChild(btnGrp);

//     cardGroup.appendChild(card);

//     removeBtn.addEventListener('click', function() {
//       library.removeBook(book.title, book.author);
//       clearBooks();
//       displayBooks(library);
//     });

//     toggleBtn.addEventListener('click', function(e) {
//       toggleRead(e, book);
//     });
//     }
//   )};

// const resetForm = function() {
//   title.value = '';
//   author.value = '';
//   pages.value = '';
//   isRead.checked = false;
// }

// const init = function() {
//   setDefaultBooks();
//   displayBooks(library);
//   console.log(library.books);
// }

// // Event listeners

// form.addEventListener('click', () => {
//   modal.showModal();
// });
// closeModal.addEventListener('click', () => {
//   modal.close();
// });

// document.querySelector('.book-form').addEventListener('submit', function(e) {
//   library.addBook(createBook(e));
//   clearBooks();
//   displayBooks(library);
//   resetForm();
//   modal.close();
// });

// document.addEventListener('DOMContentLoaded', init);


