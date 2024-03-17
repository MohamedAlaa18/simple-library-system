document.getElementById("numberOfBooksForm").addEventListener("submit", function (event) {
  let numberOfBooks = document.getElementById("numberOfBooks").value;
  if (!numberOfBooks) {
    event.preventDefault();
  }
  localStorage.setItem("numberOfBooks", numberOfBooks);
});

(function () {
  'use strict';

  var forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });
})();
