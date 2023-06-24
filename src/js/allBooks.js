import { fetchBooks } from './booksApi';
import { handleClickOnFilter } from './categories';
import { createLoader, removeMask } from './loader';
import { createMarkup } from './createMarkup';
import { fetchList, listElem } from './categoriesList';
export const sectionBooksEl = document.querySelector('.books');

export async function createMurkUpAllBooks() {
  createLoader();
  const urlAllBooks = 'top-books';
  try {
    const res = await fetchBooks(urlAllBooks);
    sectionBooksEl.innerHTML =
      '<h1 class="title-hero">Best Sellers <span>Books</span></h1><ul class="categories"></ul>';
    const categoriesList = document.querySelector('.categories');
    categoriesList.innerHTML = createCategoryBooks(res);
    const cardList = document.querySelectorAll('.book-card');

    cardList.forEach(li => {
      li.classList.add('book-item');
    });
  } catch {
    console.log('Error');
  }
  // removeMask();
}

function createCategoryBooks(data) {
  return data
    .map(category => {
      return `  <li class='category-items'>
      <h2 class='category-title'>${category.list_name}</h2>
      <ul class="category-books">
      ${createBooks(category.books)}
      </ul>
    <button class="button-see-more" type="button">SEE MORE</button>
    </li>`;
    })
    .join('');
}

function createBooks(books) {
  return books.map(book => createMarkup(book)).join('');
}

export async function onHandleCategoriesForButton(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  const res = e.target.parentNode;
  const categoryName = res.querySelector('h2').textContent;
  handleClickOnFilter(categoryName);

  const btnCateg = listElem.querySelectorAll('.btn-category');
  btnCateg.forEach(btn => {
    if (btn.textContent === categoryName) {
      const activeClass = listElem.querySelectorAll('.active-text');
      activeClass.forEach(activeEl => activeEl.classList.remove('active-text'));
      btn.classList.add('active-text');
    }
  });
}
