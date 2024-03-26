
const books = JSON.parse(localStorage.getItem("books"));

document.addEventListener("DOMContentLoaded", function () {
    renderBooks(books);
});
//render the books;
function renderBooks(books) {
    const booksTableBody = document.getElementById("booksTableBody");

    books.forEach((book, index) => {
        const row = document.createElement("tr");
        row.id = `row-${index}`; // Set the ID for the row

        const nameCell = document.createElement("td");
        nameCell.textContent = book.name;
        row.appendChild(nameCell);

        const publishDateCell = document.createElement("td");
        publishDateCell.textContent = book.publishDate;
        row.appendChild(publishDateCell);

        const bookCoverCell = document.createElement("td");
        const bookCoverImage = document.createElement("img");
        bookCoverImage.src = book.bookCover; // Set the src attribute to the data URLh
        bookCoverCell.appendChild(bookCoverImage);
        row.appendChild(bookCoverCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = book.price;
        row.appendChild(priceCell);

        const authorNameCell = document.createElement("td");
        authorNameCell.textContent = book.author.name;
        row.appendChild(authorNameCell);

        const authorEmailCell = document.createElement("td");
        authorEmailCell.textContent = book.author.email;
        row.appendChild(authorEmailCell);

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editBook(index));
        actionCell.appendChild(editButton);

        // space between buttons
        actionCell.appendChild(document.createTextNode('\u00A0'));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteBook(index));
        deleteButton.classList.add("cancel");
        actionCell.appendChild(deleteButton);


        row.appendChild(actionCell);

        booksTableBody.appendChild(row);
    });
}
//edit function
function editBook(index) {
    const books = JSON.parse(localStorage.getItem("books"));
    const book = books[index];
    const row = document.getElementById(`row-${index}`);

    if (row) {
        row.innerHTML =
            `
            <td><input type="text" id="editName" value="${book.name}"></td>
            <td><input type="date" id="editPublishDate" value="${book.publishDate}"></td>
            <td><input type="file" id="editBookCover" accept="image/png, image/jpeg"></td>
            <td><input type="number" id="editPrice" value="${book.price}"></td>
            <td><input type="text" id="editAuthorName" value="${book.author.name}"></td>
            <td><input type="email" id="editAuthorEmail" value="${book.author.email}"></td>
            <td>
                <button onclick="saveEdit(${index})">Save</button>
                <button onclick="cancelEdit(${index})"class="cancel">Cancel</button>
            </td>
        `;
    }
}

//save the edit and validation function
function saveEdit(index) {
    const books = JSON.parse(localStorage.getItem("books"));
    const book = books[index];
    book.name = document.getElementById("editName").value;
    book.publishDate = document.getElementById("editPublishDate").value;
    book.price = document.getElementById("editPrice").value;
    book.author.name = document.getElementById("editAuthorName").value;
    book.author.email = document.getElementById("editAuthorEmail").value;

    const fileInput = document.getElementById("editBookCover");
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            book.bookCover = e.target.result;
            updateBook(index, book, books);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        updateBook(index, book, books);
    }
}
//update Book function
function updateBook(index, book, books) {

    const nameReg = /^[A-Za-z]{1,32}$/;
    const emailReg = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const dateReg = /^\d{4}-\d{2}-\d{2}$/;

    let isValid = true;

    if (!book.name.trim()) {
        alert("Please enter a valid name.");
        isValid = false;
    } else if (!nameReg.test(book.name)) {
        alert("Please enter a valid name (up to 32 characters).");
        isValid = false;
    }

    if (!book.publishDate.trim()) {
        alert("Please enter a valid publish date.");
        isValid = false;
    } else if (!dateReg.test(book.publishDate)) {
        alert("Please enter a valid publish date in the format yyyy-mm-dd.");
        isValid = false;
    }

    if (!book.price.trim()) {
        alert("Please enter a valid price.");
        isValid = false;
    } else if (!isFinite(book.price) || book.price < 1 || book.price > 500) {
        alert("Please enter a valid price (between 1 and 500).");
        isValid = false;
    }

    if (!book.author.name.trim()) {
        alert("Please enter a valid author name.");
        isValid = false;
    } else if (!nameReg.test(book.author.name)) {
        alert("Please enter a valid author name (up to 32 characters).");
        isValid = false;
    }

    if (!book.author.email.trim()) {
        alert("Please enter a valid email address for the author.");
        isValid = false;
    } else if (!emailReg.test(book.author.email)) {
        alert("Please enter a valid email address for the author.");
        isValid = false;
    }


    if (isValid) {
        books[index] = book;
        localStorage.setItem("books", JSON.stringify(books));
        renderBookAfterAction(index, books[index]);
    }
}

//Cancel function
function cancelEdit(index) {
    const books = JSON.parse(localStorage.getItem("books"));

    renderBookAfterAction(index, books[index]);
}

//render the books after cancelling or saving changes
function renderBookAfterAction(index, book) {
    const row = document.getElementById(`row-${index}`);
    row.innerHTML = `
        <td>${book.name}</td>
        <td>${book.publishDate}</td>
        <td><img src="${book.bookCover}"/></td>
        <td>${book.price}</td>
        <td>${book.author.name}</td>
        <td>${book.author.email}</td>
        <td>
            <button onclick="editBook(${index})">Edit</button>
            <button onclick="deleteBook(${index})"class="cancel">Delete</button>
        </td>
    `;
}

//delete function
function deleteBook(index) {
    const books = JSON.parse(localStorage.getItem("books"));
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    location.reload();
}

//search section
document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const books = JSON.parse(localStorage.getItem('books'));
        const filteredBooks = books.filter(book => book.name.toLowerCase().includes(searchTerm));


        const booksTableBody = document.getElementById('booksTableBody');
        booksTableBody.innerHTML = '';
        renderBooks(filteredBooks);
    });
});