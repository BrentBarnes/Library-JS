const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

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

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal);
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) {
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

function validateForm() {
  if (
    bookTitle.value == null || bookTitle.value == '',
    bookAuthor.value == null || bookAuthor.value == '',
    bookPages.value == null || bookPages.value == ''
  ) {
    alert("Please fill all required fields");
    return false
  }
}

if (sessionStorage.getItem("myLibrary") == null) {
  this.libraryBooks = []
} else {
  this.libraryBooks = JSON.parse(sessionStorage.myLibrary);
  createBookDiv(this.libraryBooks);
  this.readButtons = document.querySelectorAll(".read-toggle")
  this.removeButtons = document.querySelectorAll(".remove-book-btn")
}

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
    const newDiv = document.createElement("div");
    newDiv.classList.add("book-card");
    newDiv.setAttribute('id',`book-index-${book.index}`);

    const pTitle = document.createElement("p");
    pTitle.classList.add("book-title");
    pTitle.textContent = book.title;

    const pAuthor = document.createElement("p");
    pAuthor.classList.add("author-name");
    pAuthor.textContent = `by ${book.author}`;

    const pPage = document.createElement("p");
    pPage.classList.add("page-number");
    pPage.textContent = `Number of Pages ${book.pages}`;

    const buttons = document.createElement("div");
    
    const read = document.createElement("button");
    read.classList.add("read-toggle");
    if (book.read == true) {
      read.textContent = 'Read: Yes';
      read.classList.add('read-true');
    } else {
      read.textContent = 'Read: No';
      read.classList.add('read-false');
    }

    const remove = document.createElement("button");
    remove.classList.add("remove-book-btn");
    remove.textContent = "Remove"

    newDiv.appendChild(pTitle);
    newDiv.appendChild(pAuthor);
    newDiv.appendChild(pPage);
    newDiv.appendChild(buttons);

    buttons.appendChild(read);
    buttons.appendChild(remove);

    bookCardsContainer.appendChild(newDiv);
  });
}

bookSubmit.addEventListener('click', (event) => {
  let book = new Book (
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.checked,
  )

  addBookToLibrary(this.libraryBooks, book);
  sessionStorage.setItem("myLibrary", JSON.stringify(this.libraryBooks));
});

for (const readButton of this.readButtons) {
  readButton.addEventListener('click', (event) => {
    if (readButton.classList.contains("read-true")) {
      readButton.classList.replace('read-true', 'read-false');
      readButton.textContent = 'Read: No';
    } else {
      readButton.classList.replace('read-false', 'read-true');
      readButton.textContent = 'Read: Yes';
    }
  });
}

for (const removeButton of this.removeButtons) {
  removeButton.addEventListener('click', (event) => {
    // const selectedBook = (book) => book.title == removeButton.parentNode.previousSibling.previousSibling.previousSibling.textContent;
    debugger;
    const selectedBook = (book) => book.title == removeButton.closest('.book-card').firstChild.textContent;
    let bookIndex = this.libraryBooks.findIndex(selectedBook);
    // let removedBook = document.getElementById(`book-index-${bookIndex}`);
    let removedBook = removeButton.closest('.book-card')
    removedBook.remove();
    this.libraryBooks.splice(bookIndex, 1)
    sessionStorage.setItem("myLibrary", JSON.stringify(this.libraryBooks));
  });
}
