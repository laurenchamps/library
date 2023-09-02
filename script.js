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


console.log(myLibrary);

function addBookToLibrary() {
    myLibrary.forEach(function(item) {
        // Create card
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('p');
        title.className = 'title';
        title.appendChild(document.createTextNode(item.title));

        const author = document.createElement('p');
        author.className = 'author';
        author.appendChild(document.createTextNode(item.author));

        const pages = document.createElement('p');
        pages.className = 'pages';
        pages.appendChild(document.createTextNode(item.pages + ' pages'));

        const toggleDiv = document.createElement('div');
        toggleDiv.className = 'toggle-checkbox';

        const toggleLabel = document.createElement('label');
        toggleLabel.setAttribute('for', 'toggle');
        toggleLabel.appendChild(document.createTextNode('read?'));
        
        const toggleInput = document.createElement('input')
        toggleInput.setAttribute('type', 'checkbox');
        toggleInput.setAttribute('name', 'isRead');
        toggleInput.setAttribute('id', 'toggle');
        toggleInput.className = 'toggle';

        toggleDiv.appendChild(toggleLabel);
        toggleDiv.appendChild(toggleInput);

        if (item.isRead === true) {
            toggleInput.checked = true;
        } 

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(toggleDiv);

        
        cardGroup.appendChild(card);
    })
}

function getBookInfo(e) {
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

    myLibrary.push(newBook);

    console.log(myLibrary);

    addBookToLibrary();
}

// addBookToLibrary();

// Event listeners

openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})

submit.addEventListener('click', getBookInfo);
