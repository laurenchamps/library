const myLibrary = [];

const modal = document.querySelector('dialog');
const openModal = document.querySelector('.open-modal');
const closeModal = document.querySelector('.close-modal');
const submit = document.querySelector('#submit');
const form = document.querySelector('.book-form');

const title = document.getElementById('book-title');
const author = document.getElementById('book-author');
const pages = document.getElementById('book-pages');
const isRead = document.getElementById('read-checkbox');

const cardGroup = document.querySelector('.card-group');

const toggle = document.querySelectorAll('.toggle');
const removeBtns = document.querySelectorAll('.remove');


function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

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

myLibrary.push(mountain, wolves, trial);

function displayLibrary() {
    // Remove all existing book cards
    while (cardGroup.firstChild) {
        cardGroup.removeChild(cardGroup.firstChild);
    }
    
    // Add card for each book in library
    myLibrary.forEach(function(item, index) {
        
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
        card.setAttribute('data-index', index);
        title.className = 'title';
        author.className = 'author';
        pages.className = 'pages';
        toggleBtn.className = 'toggle';
        removeBtn.className = 'remove';
        btnGrp.className = 'button-group';
        
        if (item.isRead === true) {
            toggleBtn.setAttribute('aria-pressed', true);
        } else {
            toggleBtn.setAttribute('aria-pressed', false);
        }
        
        // Add text 
        title.appendChild(document.createTextNode(item.title));
        author.appendChild(document.createTextNode(item.author));
        pages.appendChild(document.createTextNode(item.pages + ' pages'));
        removeBtn.appendChild(document.createTextNode('Remove'));
        
        // Add elements to DOM    
        btnGrp.appendChild(toggleBtn);
        btnGrp.appendChild(removeBtn);
        
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(btnGrp);
        
        cardGroup.appendChild(card);

        // Create event listeners
        removeBtn.addEventListener('click', removeBookFromLibrary);
        toggleBtn.addEventListener('click', toggleRead);
    })
}

displayLibrary();

function addBookToLibrary(e) {
    e.preventDefault();
    
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = Number(pages.value);
    let bookIsRead = isRead.checked;
    
    const newBook = new Book(
        bookTitle,
        bookAuthor,
        bookPages,
        bookIsRead
        )
        
        if (myLibrary.some(item => item.title === bookTitle && item.author === bookAuthor)) {
            alert('Book already exists in your library') 
        } else {
            myLibrary.push(newBook);
        }
        
        displayLibrary();
        modal.close();
        
        // Reset form values
        
        title.value = '';
        author.value = '';
        pages.value = '';
        isRead.checked = false;
}
    
function removeBookFromLibrary(e) {
    myLibrary.splice(e.target.parentElement.parentElement.getAttribute('data-index'), 1);

    displayLibrary();
}

function toggleRead(e) {
    if (e.target.ariaPressed === 'true') {
        e.target.ariaPressed = 'false';
        myLibrary[e.target.parentElement.parentElement.getAttribute('data-index')].isRead = false;
    } else if (e.target.ariaPressed === 'false') {
        e.target.ariaPressed = 'true';
        myLibrary[e.target.parentElement.parentElement.getAttribute('data-index')].isRead = true;
    }
}
    
// Event listeners
    
openModal.addEventListener('click', () => {
    modal.showModal();
})
    
closeModal.addEventListener('click', () => {
    modal.close();
})

form.addEventListener('submit', addBookToLibrary);



