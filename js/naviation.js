document.addEventListener("DOMContentLoaded", function () {
    const books = JSON.parse(localStorage.getItem("books"));

    if (books === null) {
        const booksTableLinks = document.querySelectorAll(".books-nav-disabled");
        booksTableLinks.forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
            });
            link.classList.add("disabled");
            link.setAttribute("aria-disabled", "true");
        });
    }
});
