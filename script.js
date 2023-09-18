class Book {
    constructor(title, author, pages, isRead) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
        this.id = ''
    }

    updateRead(bool) {
        this.isRead = bool;
    }
}

class Library {
    constructor() {
        this.books = []
    }

    removeBook(id) {
        this.books = this.books.filter(book => book.id !== id);
    }

    addBook(newBook, newTitle, newAuthor) {
        if (this.books.some(item => item.title === newTitle && item.author === newAuthor)) {
            alert('Book already exists in your library');
            resetForm();
        } else {
        this.books.push(newBook);
        }
    }

    setIds() {
        this.books.forEach(function(book, index) { return book.id = index + 1; });
    }
}

const myLibrary = new Library();

const mountain = new Book(
    'The Living Mountain',
    'Nan Shepherd',
    114,
    true
)

const wolves = new Book(
    'Women Who Run With The Wolves',
    'Clarissa Pinkola Estes',
    513,
    true
)

const trial = new Book(
    'The Trial',
    'Franz Kafka',
    178,
    false
)

// Create UI

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
            .split(" ")
            .map(word => word[0].toUpperCase() + word.slice(1))
            .join(" ");
}

function getBookInfo(e) {
    e.preventDefault();
    
    const bookTitle = titleCaseify(title.value);
    const bookAuthor = titleCaseify(author.value);
    const bookPages = Number(pages.value);
    let bookIsRead = isRead.checked;
    
    const newBook = new Book(
        bookTitle,
        bookAuthor,
        bookPages,
        bookIsRead
    )

        myLibrary.addBook(newBook, bookTitle, bookAuthor);
        displayLibrary(myLibrary);
        modal.close();
    }


function displayLibrary(library) {
    // Clear existing content
    clearBooks(library);
    // Add card for each book in library
    myLibrary.setIds();

    library.books.forEach(function(book) {
        
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
        card.setAttribute('data-index', book.id);
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
    });
}

function deleteBook(e) {
    myLibrary.removeBook(Number(e.target.parentElement.parentElement.getAttribute('data-index')));
    clearBooks();
    displayLibrary(myLibrary);
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
    let index = e.target.parentElement.parentElement.getAttribute('data-index') - 1;

    if (e.target.ariaPressed === 'true') {
        e.target.ariaPressed = 'false';
        myLibrary.books[index].updateRead(false);
    } else if (e.target.ariaPressed === 'false') {
        e.target.ariaPressed = 'true';
        myLibrary.books[index].updateRead(true);
    }
}

// Add default items

myLibrary.addBook(mountain);
myLibrary.addBook(wolves);
myLibrary.addBook(trial);

displayLibrary(myLibrary);
    
// Event listeners
    
openModal.addEventListener('click', () => {
    modal.showModal();
})
    
closeModal.addEventListener('click', () => {
    modal.close();
})

document.querySelector('.book-form').addEventListener('submit', getBookInfo);