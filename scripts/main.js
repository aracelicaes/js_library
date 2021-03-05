let myLibrary = [];

window.myLibrary = myLibrary;

let idCounter = 0;

function fetchFromLocal() {
  // if there's anyting in local storage parse back into myLibrary
  if (localStorage.getItem('localLibrary')){
    // pasando lo q esta en localLibrary
    myLibrary = JSON.parse(localStorage.getItem('localLibrary'));
    let last = myLibrary.length - 1;
    // myLibrary= [{},{}]
    idCounter = myLibrary[last].id + 1;
  }
}

fetchFromLocal();

function Book(title, author, pages) {
  // if (status === 'read') {
  //   status = true;
  // } else {
  //   status = false;
  // }

  this.id = idCounter++;
  this.title = title;
  this.author = author;
  this.pages = pages;
  //this.status = status;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function saveToLocal() {
  // making myLIbrary into a string
  let libraryString = JSON.stringify(myLibrary);
  //pass 2 parameters name to id localstorage object and the stringified library
  // set item doesnt append it just refreshes the object and adds the element again
  localStorage.setItem('localLibrary', libraryString);
  // al cargar pg ver si hay datos en local storage si hay entonces guardarlos en la colleccion
}

function displayBook() {
  myLibrary.forEach((book) => {
    // if previous elements are already displayed
    // then you get the id of the parent container and call remove (element.remove())
    const container = document.getElementById('library');
    const bookDiv = document.createElement('div');
    bookDiv.setAttribute("id",book.id);
    const newTitle = document.createElement('h3');
    const newAuthor = document.createElement('h4');
    const newPages = document.createElement('p');
    
    newTitle.innerText = book.title;
    newAuthor.innerText = book.author;
    newPages.innerText = book.pages;
    
    bookDiv.appendChild(newTitle);
    bookDiv.appendChild(newAuthor);
    bookDiv.appendChild(newPages);
    container.appendChild(bookDiv);
  })
}

function createABook() {
  let titleInput = document.getElementById('title').value;
  let authorInput = document.getElementById('author').value;
  let pagesInput = document.getElementById('pages').value;

  let newBook = new Book(titleInput, authorInput, pagesInput);
  addBookToLibrary(newBook);
  saveToLocal();
}

function findBook(id) {
  myLibrary.forEach((book, index) =>{
    if(book.id === id) {
      console.log(book);
      return index;
    }else{
      console.log('That book isnt on the list anymore')
    }
  })
}

function removeBook(id) {
  let bookIndex = findBook(id);
  myLibrary.splice(bookIndex, 1);
  saveToLocal();
  return myLibrary;
}

// does it exist?
// console.log(findBook(3));
// console.log(removeBook(3));
/* ********************************** EVENT LISTENERS ***************************************** */

let submitAction = document.getElementById('submit');

submitAction.addEventListener('click', (e) =>{
  e.preventDefault();
  createABook();
  displayBook();
  document.forms[0].reset();
})



