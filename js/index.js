document.addEventListener("DOMContentLoaded", function () {
    renderBooks();
});

document.addEventListener("DOMContentLoaded", function () {
    renderBooks();
});

document.addEventListener("DOMContentLoaded", function () {
    renderBooks();
});

function renderBooks() {
    const books =
        JSON.parse(localStorage.getItem("books")) ||
        [];
    const booksSection = document.getElementById('books-area');
    booksSection.innerHTML = "";

    if (books.length === 0) {
        booksSection.innerHTML = '<img class="my-4" src="images/Empty.svg" alt="Generic placeholder image" style="max-width:600px; margin-inline:auto;">';
    } else {
        books.forEach((book) => {
            const card = `
            <div class="col-12 col-md-6 col-lg-3 my-4">
                <div class="card text-dark card-has-bg click-col h-100">
                    <div class="card-img-overlay d-flex flex-column justify-content-evenly">
                        <h4 class="card-title mt-0 text-capitalize fw-bold">${book.name}</h4>
                        <div class="card-footer">
                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<p/>
                        </div>
                        <div class="card-footer">
                            <div class="media-body d-flex align-items-center gap-2">
                                <img class="mr-3 rounded-circle" src="images/me.JPG" alt="Generic placeholder image" style="max-width:50px">
                                <h6 class="my-0 text-capitalize fw-bolder">${book.author.name}</h6>
                            </div>
                        </div>
                    </div>
                    <img class="card-img h-100 w-100" src="${book.bookCover}" alt="${book.name}">
                </div>
            </div>
            `;
            booksSection.innerHTML += card;
        });
    }
}

