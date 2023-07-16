/* eslint-disable no-use-before-define */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookManager {
  constructor() {
    this.books = this.loadBooks();
    this.bookData = document.getElementById('bookData');
    this.bookForm = document.getElementById('bookForm');
    this.bookForm.addEventListener('submit', this.addBook.bind(this));
    this.displayBooks();
  }

  loadBooks() {
    const storedBooks = localStorage.getItem('books');
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  displayBooks() {
    this.bookData.innerHTML = '';

    this.books.forEach((book, index) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book-lists') 
      bookDiv.textContent = `${book.title} by ${book.author}`;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Delete';
      removeBtn.addEventListener('click', () => this.removeBook(index));

      bookDiv.appendChild(removeBtn);
      this.bookData.appendChild(bookDiv);

      const hr = document.createElement('hr');
      this.bookData.appendChild(hr);
    });
  }

  addBook(event) {
    event.preventDefault();

    const bookTitle = document.getElementById('bookTitle');
    const bookAuthor = document.getElementById('bookAuthor');

    const title = bookTitle.value;
    const author = bookAuthor.value;

    const book = new Book(title, author);
    this.books.push(book);

    this.saveBooks();
    this.displayBooks();
    // to clear the form once again after adding a book
    bookTitle.value = '';
    bookAuthor.value = '';
  }

  removeBook(index) {
    this.books.splice(index, 1);

    this.saveBooks();
    this.displayBooks();
  }
}

const bookManager = new BookManager();
