const form = document.getElementById("form");
const search = document.getElementById("search");
const lucky = document.getElementById("lucky");
let question;

search.addEventListener("click", (event) => {
  event.preventDefault();
  question = form.input.value; //BUG: breaks when '&' is included in search
  question = titleCase(question);
  console.log(question + " search");
  fetch(`http://localhost:3000/search?q=${question}`);
});

lucky.addEventListener("click", (event) => {
  event.preventDefault();
  question = form.input.value;
  question = titleCase(question);
  console.log(question + " lucky");
  fetch(`http://localhost:3000/lucky?q=${question}`)
    .then(r => r.json())
    .then(openLucky);
});

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
};

function openLucky(film) {
  let filmTitle = film.title;
  return window.open(`https://en.wikipedia.org/wiki/${filmTitle}`);
}
