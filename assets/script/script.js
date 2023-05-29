const addBookBtn = document.querySelector('.add-book-btn');
const removeBookBtn = document.querySelectorAll('.remove-book-btn');

/*
    Form
*/
const bookTitle = document.querySelector('.book-title');
const bookAuthor = document.querySelector('.book-author');
const errorMessage = document.querySelector('#error-message');

const bookList = document.querySelector('#books-list');

const booksStorage = 'storage';

const setFormChange = (books) => {
  localStorage.setItem(booksStorage, JSON.stringify(books));
};

const onloadContent = () => {
  const booksData = localStorage.getItem(booksStorage);
  if (booksData) {
    const booksJson = JSON.parse(booksData);
    bookList.innerHTML = '';
    for (let i = 0; i < booksJson.length; i += 1) {
      let html = '<ul>';
      html += `<li>${booksJson[i].title}</li>`;
      html += `<li>${booksJson[i].author}</li>`;
      html += `<li><button type="button" class="remove-book-btn" data-id="${i}">Remove</button></li>`;
      html += '</ul>';
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
    const booksData = localStorage.getItem(booksStorage);
    if (booksData) {
      const booksJson = JSON.parse(booksData);
      booksJson.push({
        author: bookAuthor.value,
        title: bookTitle.value,
      });
      setFormChange(booksJson);
      onloadContent();
    }
  }
});

removeBookBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const index = e.currentTarget.dataset.id;
    const booksData = localStorage.getItem(booksStorage);
    if (booksData) {
      const booksJson = JSON.parse(booksData);
      booksJson.splice(index, 1);
      setFormChange(booksJson);
      onloadContent();
    }
  });
});
