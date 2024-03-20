document.addEventListener("DOMContentLoaded", function () {
    renderBooksCards();
});

function renderBooksCards() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const booksArea = document.getElementById('books-area');
    booksArea.innerHTML = "";

    if (books.length === 0) {
        const booksSection = document.getElementById('books-section')
        booksSection.innerHTML = '';
        ;
    } else {
        books.forEach((book) => {
            const card = `
                <div class="">
                    <div class="card text-dark card-has-bg click-col h-100">
                        <img class="card-img h-100 w-100" src="${book.bookCover}" alt="${book.name}">
                        <div class="card-img-overlay d-flex flex-column justify-content-evenly">
                            <h4 class="card-title mt-0 text-capitalize fw-bold" style="text-decoration: underline; text-decoration-color: #44b89d;">${book.name}</h4>
                            <div class="card-footer" style="color:#DDDDDDD1;">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</p>
                            </div>
                            <div class="">
                                <div class="media-body d-flex align-items-center gap-2">
                                    <img class="mr-3 rounded-circle" src="images/profile-pic.png" alt="Generic placeholder image" style="max-width:50px">
                                    <h6 class="my-0 text-capitalize fw-bolder">${book.author.name}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            booksArea.innerHTML += card;
        });
    }
}

