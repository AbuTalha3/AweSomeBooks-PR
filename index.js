/* eslint-disable no-use-before-define */
const storedBooks = localStorage.getItem('books');
const books = storedBooks ? JSON.parse(storedBooks) : [];

function displayBooks() {
  const bookData = document.getElementById('bookData');
  bookData.innerHTML = '';

  books.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.textContent = `${book.title} by ${book.author}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeBook(index));

    bookDiv.appendChild(removeBtn);
    bookData.appendChild(bookDiv);

    const hr = document.createElement('hr');
    bookData.appendChild(hr);
  });
}

function addBook(event) {
  event.preventDefault();

  const bookTitle = document.getElementById('bookTitle');
  const bookAuthor = document.getElementById('bookAuthor');

  const title = bookTitle.value;
  const author = bookAuthor.value;

  const book = { title, author };
  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));

  displayBooks();

  bookTitle.value = '';
  bookAuthor.value = '';
}

function removeBook(index) {
  books.splice(index, 1);

  localStorage.setItem('books', JSON.stringify(books));

  displayBooks();
}

const bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit', addBook);

displayBooks();