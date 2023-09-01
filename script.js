const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

function addBookToLibrary(){
    
}

const earthsea = new Book(
    'Earthsea',
    'Ursula K. Le Guin',
    704,
    false,
)

const nineteenEightyFour = new Book(
    'Nineteen Eighty-Four',
    'George Orwell',
    400,
    true,
)

myLibrary.push(earthsea, nineteenEightyFour);

console.log(myLibrary);