export function createMarkup(book) {
  const { book_image, title, author, list_name, _id } = book;
  return `<li class="book-card" data-id="${_id}">
        <img class="book-image" src="${book_image}" loading="lazy" alt="${list_name}" />
        <h3 class="book-title">${
          title.length > 16 ? title.slice(0, 16) + '...' : title
        }</h3>
        <p class="book-author">${author}</p>
        </li>`;
}
