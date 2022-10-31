const bookTitle = document.querySelector("#title")
const bookAuthor = document.querySelector("#author")
const bookPages = document.querySelector("#pages")
const bookRead = document.querySelector("#read")
const bookSubmit = document.querySelector(".submit-book")

const title = document.querySelector(".book-title")
const author = document.querySelector(".book-author")
const pages = document.querySelector(".book-pages")
const read = document.querySelector(".book-read")

const bookCardsContainer = document.querySelector(".library")

function validateForm() {
  if (
    bookTitle == null || bookTitle == '',
    bookAuthor == null || bookAuthor == '',
    bookPages == null || bookPages == ''
  ) {
    alert("Please fill all required fields");
    return false
  }
}

function load() {
  emptyLibrary = (localStorage.myLIbrary == undefined);

  if (emptyLibrary) {
    this.libraryBooks = [];
    return
  }

  return JSON.parse(localStorage.myLibrary);
}

let libraryBooks = load()


function Book(title, author, pages, read) {
  this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(array, book) {
  if (array) {
    array.push(book);
  }
}

function createBookDiv(booksArray) {
  booksArray.forEach(book => {
    console.log(book);
  });
}

bookSubmit.addEventListener('click', (event) => {
  let book = new Book (
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.value
  )

  // debugger;
  addBookToLibrary(this.libraryBooks, book);
  localStorage.setItem("myLibrary", JSON.stringify(this.libraryBooks));
  createBookDiv(this.libraryBooks);
});
