$(function() {
  // Cache jQuery selectors
  const $newMovieForm = $("#new-movie-form");
  const $movieTableBody = $("#movie-table-body");

  // Incremental ID and movies list
  let currentId = 0;
  let moviesList = [];

  $newMovieForm.on("submit", function(evt) {
    evt.preventDefault();

    const title = $("#title").val();
    const rating = $("#rating").val();
    const movieData = { title, rating, currentId };
    const HTMLtoAppend = `
      <tr>
        <td>${movieData.title}</td>
        <td>${movieData.rating}</td>
        <td><button class="btn btn-danger" data-delete-id="${movieData.currentId}">Delete</button></td>
      </tr>`;

    currentId++;
    moviesList.push(movieData);

    $movieTableBody.append(HTMLtoAppend);
    $newMovieForm.trigger("reset");
  });

  $movieTableBody.on("click", ".btn.btn-danger", function(evt) {
    const indexToRemoveAt = moviesList.findIndex(movie => movie.currentId === +$(evt.target).data("deleteId"));
    moviesList.splice(indexToRemoveAt, 1);
    $(evt.target).closest("tr").remove();
  });
});