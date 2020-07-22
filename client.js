const form = document.getElementById("form");
const search = document.getElementById("search");
const lucky = document.getElementById("lucky");
const results = document.getElementById("results");
let question;

search.addEventListener("click", (event) => {
  event.preventDefault();
  question = form.input.value; //BUG: breaks when '&' is included in search
  question = titleCase(question);
  fetch(`http://localhost:3000/search?q=${question}`)
    .then((r) => r.json())
    .then((data) => displayData(data))
    .catch((err) => console.warn("Server Connection Issue"));
});

lucky.addEventListener("click", (event) => {
  event.preventDefault();
  question = form.input.value;
  question = titleCase(question);
  fetch(`http://localhost:3000/lucky?q=${question}`)
    .then((r) => r.json())
    .then(openLucky)
    .catch((err) => console.warn("Server Connection Issue"));
});

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function openLucky(film) {
  let filmTitle = film.title;
  filmTitle === undefined
    ? console.log("No results to open!")
    : window.open(`https://en.wikipedia.org/wiki/${filmTitle}`);
}

function displayData(data) {
  for (index in data) {
    document.getElementById(
      index
    ).textContent = `Title: ${data[index].title}    Director: ${data[index].director}     Year: ${data[index].year}`;
  }
}
