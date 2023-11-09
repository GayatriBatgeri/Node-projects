document.addEventListener("DOMContentLoaded", function () {
  const listbtn = document.getElementById("listbtn");
  const readbtn = document.getElementById("readbtn");
  const addbtn = document.getElementById("addbtn");
  const updatebtn = document.getElementById("updatebtn");
  const deletebtn = document.getElementById("deletebtn");
  const contentDiv = document.getElementById("content");
  let isVisible = false;
  contentDiv.style.opacity = 0;
  contentDiv.style.transition = "opacity 0.5s ease";
  function toggleContent() {
    if (isVisible) {
      contentDiv.style.opacity = 0;
    } else {
      contentDiv.style.opacity = 1;
    }
    isVisible = !isVisible;
  }
  function toggleTableVisibility() {
    if (isVisible) {
      contentDiv.innerHTML = "";
      listbtn.textContent = "List of Books";
      isVisible = false;
    } else {
      showBooks();
      listbtn.textContent = "Hide List";
      isVisible = true;
    }
    // toggleContent();
  }
  function toggleTableVisibilityAdd() {
    if (isVisible) {
      contentDiv.innerHTML = "";
      addbtn.textContent = "Add a book";
      isVisible = false;
    } else {
      add();
      addbtn.textContent = "Close";
      isVisible = true;
    }
    toggleContent();
  }
  function toggleTableVisibilityUp() {
    if (isVisible) {
      contentDiv.innerHTML = "";
      updatebtn.textContent = "Update";
      isVisible = false;
    } else {
      update();
      updatebtn.textContent = "Close";
      isVisible = true;
    }
    toggleContent();
  }
  function toggleTableVisibilityDel() {
    if (isVisible) {
      contentDiv.innerHTML = "";
      deletebtn.textContent = "Delete";
      isVisible = false;
    } else {
      deletion();
      deletebtn.textContent = "Close";
      isVisible = true;
    }
    toggleContent();
  }
  function toggleTableVisibilityRead() {
    if (isVisible) {
      contentDiv.innerHTML = "";
      readbtn.textContent = "Read";
      isVisible = false;
    } else {
      read();
      readbtn.textContent = "Hide";
      isVisible = true;
    }
    toggleContent();
  }

  listbtn.addEventListener("click", toggleTableVisibility);
  readbtn.addEventListener("click", toggleTableVisibilityRead);
  addbtn.addEventListener("click", toggleTableVisibilityAdd);
  updatebtn.addEventListener("click", toggleTableVisibilityUp);
  deletebtn.addEventListener("click", toggleTableVisibilityDel);
  function add() {
    contentDiv.innerHTML = "";
    // content.style.opacity = "0";
    const form = document.createElement("form");
    form.id = "addBookForm";

    const labelTitle = document.createElement("label");
    labelTitle.textContent = "Title :";
    labelTitle.style.marginLeft = "30px";
    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.id = "title";
    inputTitle.name = "title";
    inputTitle.style.marginBottom = "10px";
    inputTitle.style.marginLeft = "88px";
    inputTitle.required = true;

    const labelAuthor = document.createElement("label");
    labelAuthor.textContent = "Author:";
    labelAuthor.style.marginLeft = "30px";
    const inputAuthor = document.createElement("input");
    inputAuthor.type = "text";
    inputAuthor.id = "author";
    inputAuthor.style.marginBottom = "10px";
    inputAuthor.style.marginLeft = "78px";
    inputAuthor.name = "author";
    inputAuthor.required = true;

    const labelGenre = document.createElement("label");
    labelGenre.textContent = "Genre :";
    labelGenre.style.marginLeft = "30px";
    const inputGenre = document.createElement("input");
    inputGenre.type = "text";
    inputGenre.id = "genre";
    inputGenre.name = "genre";
    inputGenre.style.marginBottom = "10px";
    inputGenre.style.marginLeft = "83px";
    inputGenre.required = true;

    const labelPublicationYear = document.createElement("label");
    labelPublicationYear.textContent = "Publication Year :";
    labelPublicationYear.style.marginLeft = "30px";
    labelPublicationYear.style.marginBottom = "30px";
    const inputPublicationYear = document.createElement("input");
    inputPublicationYear.type = "number";
    inputPublicationYear.id = "publication_year";
    inputPublicationYear.name = "publication_year";
    inputPublicationYear.required = true;
    inputPublicationYear.style.marginBottom = "30px";
    inputPublicationYear.style.marginLeft = "10px";

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.style.marginLeft = "50px";
    addButton.textContent = "Add Book";
    addButton.addEventListener("click", function () {
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const genre = document.getElementById("genre").value;
      const publication_year = parseInt(
        document.getElementById("publication_year").value
      );

      const newBook = {
        Title: title,
        Author: author,
        Genre: genre,
        Publication_year: publication_year,
      };

      fetch("/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data.message);
          contentDiv.innerHTML = "";
        })
        .catch((error) => {
          console.error(error);
        });
    });

    form.appendChild(labelTitle);
    form.appendChild(inputTitle);
    form.appendChild(document.createElement("br"));
    form.appendChild(labelAuthor);
    form.appendChild(inputAuthor);
    form.appendChild(document.createElement("br"));
    form.appendChild(labelGenre);
    form.appendChild(inputGenre);
    form.appendChild(document.createElement("br"));
    form.appendChild(labelPublicationYear);
    form.appendChild(inputPublicationYear);
    form.appendChild(document.createElement("br"));
    form.appendChild(addButton);
    contentDiv.appendChild(form);
  }
  function showBooks() {
    contentDiv.innerHTML = "";
    fetch("/books")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const table = document.createElement("table");
          const tableHeaders = document.createElement("tr");
          const headers = [
            "ID",
            "Title",
            "Author",
            "Genre",
            "Publication Year",
          ];

          headers.forEach((headerText) => {
            const th = document.createElement("th");
            th.textContent = headerText;
            tableHeaders.appendChild(th);
          });
          table.appendChild(tableHeaders);

          data.forEach((book) => {
            const row = document.createElement("tr");
            //id
            const idCell = document.createElement("td");
            idCell.textContent = book.Id;

            //title
            const titleCell = document.createElement("td");
            titleCell.textContent = book.Title;

            //author
            const authorCell = document.createElement("td");
            authorCell.textContent = book.Author;

            //genre
            const genreCell = document.createElement("td");
            genreCell.textContent = book.Genre;

            //Pub_year
            const pubYearCell = document.createElement("td");
            pubYearCell.textContent = book.Publication_year;

            row.appendChild(idCell);
            row.appendChild(titleCell);
            row.appendChild(authorCell);
            row.appendChild(genreCell);
            row.appendChild(pubYearCell);

            table.appendChild(row);
          });

          contentDiv.appendChild(table);
        } else {
          contentDiv.textContent = "No books available.";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function update() {
    contentDiv.innerHTML = "";
    const updateForm = document.createElement("form");
    updateForm.id = "updateBookForm";

    const idInput = document.createElement("input");
    idInput.type = "number";
    idInput.placeholder = "Enter Book ID";

    idInput.style.marginLeft = "20px";
    updateForm.appendChild(idInput);

    const updateButton = document.createElement("button");
    updateButton.textContent = "Update Book";
    updateButton.type = "button";
    updateButton.style.marginLeft = "30px";
    updateForm.appendChild(updateButton);

    contentDiv.appendChild(updateForm);

    updateButton.addEventListener("click", function () {
      const bookId = Number(idInput.value);
      fetch(`/books/${bookId}`)
        .then((response) => response.json())
        .then((bookData) => {
          if (bookData.error) {
            contentDiv.innerHTML = "";
            contentDiv.textContent = bookData.error;
            console.log(bookData.error);
          } else {
            const editForm = document.createElement("form");
            editForm.id = "editBookForm";

            // Title input field
            const titleInput = document.createElement("input");
            titleInput.type = "text";
            titleInput.placeholder = "Title";
            titleInput.value = bookData.Title;
            editForm.appendChild(titleInput);

            // Author input field
            const authorInput = document.createElement("input");
            authorInput.type = "text";
            authorInput.placeholder = "Author";
            authorInput.value = bookData.Author;
            editForm.appendChild(authorInput);

            // Genre input field
            const genreInput = document.createElement("input");
            genreInput.type = "text";
            genreInput.placeholder = "Genre";
            genreInput.value = bookData.Genre;
            editForm.appendChild(genreInput);

            // Publication Year input field
            const pubYearInput = document.createElement("input");
            pubYearInput.type = "number";
            pubYearInput.placeholder = "Publication Year";
            pubYearInput.value = bookData.Publication_year;
            editForm.appendChild(pubYearInput);

            const saveButton = document.createElement("button");
            saveButton.textContent = "Save Changes";
            saveButton.type = "button";
            editForm.appendChild(saveButton);

            contentDiv.innerHTML = "";
            contentDiv.appendChild(editForm);

            saveButton.addEventListener("click", function () {
              const updatedBook = {
                Title: titleInput.value,
                Author: authorInput.value,
                Genre: genreInput.value,
                Publication_year: parseInt(pubYearInput.value),
              };

              fetch(`/books/${bookId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBook),
              })
                .then((response) => response.json())
                .then((data) => {
                  alert(data.message);
                  contentDiv.innerHTML = "";
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
  function deletion() {
    contentDiv.innerHTML = "";
    const deleteForm = document.createElement("form");
    deleteForm.id = "deleteBookForm";

    const idInput = document.createElement("input");
    idInput.type = "number";
    idInput.placeholder = "Enter Book ID";
    idInput.style.marginLeft = "20px";
    deleteForm.appendChild(idInput);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Book";
    deleteButton.type = "button";
    deleteButton.style.marginLeft = "30px";
    deleteForm.appendChild(deleteButton);

    contentDiv.appendChild(deleteForm);

    deleteButton.addEventListener("click", function () {
      const bookId = Number(idInput.value);

      fetch(`/books/${bookId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data.message);
          contentDiv.innerHTML = "";
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
  function read() {
    contentDiv.innerHTML = "";
    const readForm = document.createElement("form");
    readForm.id = "readBookForm";

    const idInput = document.createElement("input");
    idInput.type = "number";
    idInput.placeholder = "Enter Book ID";
    idInput.style.marginLeft = "20px";
    readForm.appendChild(idInput);

    const readButton = document.createElement("button");
    readButton.textContent = "Read Book";
    readButton.type = "button";
    readButton.style.marginLeft = "30px";
    readForm.appendChild(readButton);

    contentDiv.appendChild(readForm);

    readButton.addEventListener("click", function () {
      const bookId = Number(idInput.value);

      fetch(`/books/${bookId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          const table = document.createElement("table");
          const tableHeaders = document.createElement("tr");
          const headers = ["ID", "Tite", "Author", "Genre", "Publication Year"];
          const row = document.createElement("tr");

          headers.forEach((headerText) => {
            const th = document.createElement("th");
            th.textContent = headerText;
            tableHeaders.appendChild(th);
          });
          table.appendChild(tableHeaders);
          //id
          const idCell = document.createElement("td");
          idCell.textContent = data.Id;

          //title
          const titleCell = document.createElement("td");
          titleCell.textContent = data.Title;

          //author
          const authorCell = document.createElement("td");
          authorCell.textContent = data.Author;

          //genre
          const genreCell = document.createElement("td");
          genreCell.textContent = data.Genre;

          //pub_year
          const pubYearCell = document.createElement("td");
          pubYearCell.textContent = data.Publication_year;

          row.appendChild(idCell);
          row.appendChild(titleCell);
          row.appendChild(authorCell);
          row.appendChild(genreCell);
          row.appendChild(pubYearCell);

          table.appendChild(row);
          contentDiv.innerHTML = "";
          contentDiv.appendChild(table);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
});
