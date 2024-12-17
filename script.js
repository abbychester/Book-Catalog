
	let myForm = document.querySelector("#myform");
    let bookList = document.querySelector("#book-list");

    if (myForm) {
        myform.addEventListener("submit", (myEvent) => {
            myEvent.preventDefault();

            let book = {
                name: document.getElementById("book-name").value,
                author: document.getElementById("author").value,
                pages: document.getElementById("pages").value,
                startDate: document.getElementById("start-date").value,
                endDate: document.getElementById("end-date").value,
            };
            
            saveBook(book);

        });
    }

    if (bookList) {
        renderBooks();
    }




//locally save books
function saveBook(book) {
    let books = getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
}
//get book
function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
}

function renderBooks() {
    let bookList = document.querySelector("#book-list");
    let books = getBooks();

    if (books.length === 0) {
        bookList.innerHTML = "<p>You have no books logged</p>";
        return;
    }
    let tableHTML = `
        <table class="book-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Pages</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
    `;

    books.forEach((book, index) => {
        tableHTML += `
            <tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
                <td>${book.startDate}</td>
                <td>${book.endDate}</td>
                <td>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            </tr>
        `;
    }); tableHTML += `
            </tbody>
        </table>
    `;
			bookList.innerHTML = tableHTML;
//deleting
	let deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (myEvent) => {
            let index = myEvent.target.getAttribute("data-index");
            deleteBook(index);
        });
    });
}


// Deleting books from catalog
function deleteBook(index) {
    let books = getBooks();
    books.splice(index, 1); 
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
} 
