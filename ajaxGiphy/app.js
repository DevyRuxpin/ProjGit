const $gifArea = $("#gif-area");
const $searchInput = $("#search");

/* use ajax result to add a gif */
function addGif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100"
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

/* fetch gifs from API */
async function fetchGifs(searchTerm) {
  try {
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
      params: {
        q: searchTerm,
        api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
      }
    });
    addGif(response.data);
  } catch (error) {
    console.error("Error fetching gifs:", error);
  }
}

/* handle form submission: clear search box & make ajax call */
$("form").on("submit", function(evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val();
  $searchInput.val("");

  fetchGifs(searchTerm);
});