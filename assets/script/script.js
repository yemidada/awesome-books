const addBookBtn = document.querySelector('.add-book-btn');
const removeBookBtn = document.querySelector('.remove-book-btn');

const bookTitle = document.querySelector('.book-title');
const bookAuthor = document.querySelector('.book-author');
const errorMessage = document.querySelector('#error-message');

const bookList = document.querySelector('#books-list');

const booksStorage = 'storage';

const books = [

];

const setFormChange = () => {
  localStorage.setItem(booksStorage, JSON.stringify(books));
};

const onloadContent = () => {
  const booksData = localStorage.getItem(booksStorage);
  if (booksData) {
    const booksJson = JSON.parse(booksData);
    bookList.innerHTML = '';
    for (let i = 0; i < booksJson.length; i += 1) {
      const html = '';
      bookList.innerHTML += html;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  onloadContent();
});

addBookBtn.addEventListener('click', () => {
  if (!bookTitle.value) {
    errorMessage.innerHTML = 'Book title is required';
  } else if (!bookAuthor.value) {
    errorMessage.innerHTML = 'Book author is required';
  } else {
    books.push({
      author: bookAuthor.value,
      title: bookTitle.value,
    });
    setFormChange();
  }
});

removeBookBtn.addEventListener('click', (e) => {
  const index = e.currentTarget.dataset.id;
  books.splice(index, 1);
  setFormChange();
});
