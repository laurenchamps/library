const myLibrary = [];

const cardGroup = document.querySelector('.card-group');

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

const newBook = new Book(
    'Violeta', 
    'Isabel Allende', 
    259, 
    true
);

const newBook2 = new Book(
    "Wednesday's Child",
    'Yiyun Li',
    250,
    false

)

myLibrary.push(newBook);
myLibrary.push(newBook2);

console.log(myLibrary);

function addBookToLibrary(e) {
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

        const readBtn = document.createElement('button');
        if (item.isRead === true) {
            readBtn.className = 'is-read read';
            readBtn.appendChild(document.createTextNode('Read'));
        } else {
            readBtn.className = 'is-read unread';
            readBtn.appendChild(document.createTextNode('Mark as read'));
        }

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readBtn);

        
        cardGroup.appendChild(card);
        console.log(card);
    })
}

addBookToLibrary();