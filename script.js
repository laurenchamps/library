const myLibrary = [];

const modal = document.querySelector('dialog');
const openModal = document.querySelector('.open-modal');
const closeModal = document.querySelector('.close-modal');
const submit = document.querySelector('#submit');

const title = document.getElementById('book-title');
const author = document.getElementById('book-author');
const pages = document.getElementById('book-pages');
const isRead = document.getElementById('read-checkbox');

const cardGroup = document.querySelector('.card-group');

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

const theHobbit = new Book('The Hobbit', 'JRR Tolkien', 700, true);
const nineteenEightyFour = new Book('1984', 'George Orwell', 400, true);

myLibrary.push(theHobbit);
myLibrary.push(nineteenEightyFour);

console.log(myLibrary);


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
        const toggleDiv = document.createElement('div');
        const toggleLabel = document.createElement('label');
        const toggleInput = document.createElement('input');
        const removeBtn = document.createElement('button');
        const btnGrp = document.createElement('div');

        // Set attributes on elements
        card.className = 'card';
        card.setAttribute('id', index);
        title.className = 'title';
        author.className = 'author';
        pages.className = 'pages';
        toggleDiv.className = 'toggle-checkbox';
        toggleLabel.setAttribute('for', 'toggle');
        toggleInput.setAttribute('type', 'checkbox');
        toggleInput.setAttribute('name', 'isRead');
        toggleInput.setAttribute('id', 'toggle');
        toggleInput.className = 'toggle';
        removeBtn.className = 'remove';
        btnGrp.className = 'wrapper';

        if (item.isRead === true) {
            toggleInput.checked = true;
        } 

        // Add text 
        title.appendChild(document.createTextNode(item.title));
        author.appendChild(document.createTextNode(item.author));
        pages.appendChild(document.createTextNode(item.pages + ' pages'));
        toggleLabel.appendChild(document.createTextNode('read?'));
        removeBtn.appendChild(document.createTextNode('Remove'));

        // Add elements to DOM
        toggleDiv.appendChild(toggleLabel);
        toggleDiv.appendChild(toggleInput);

        btnGrp.appendChild(toggleDiv);
        btnGrp.appendChild(removeBtn);

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(btnGrp);

        cardGroup.appendChild(card);
    })
}

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

    // Reset form values

    title.value = '';
    author.value = '';
    pages.value = '';
    isRead.checked = false;
}


// Event listeners

openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})

submit.addEventListener('click', addBookToLibrary);

window.addEventListener('load', displayLibrary);
