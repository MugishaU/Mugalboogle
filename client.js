const form = document.getElementById("form");
const search = document.getElementById("search");
const lucky = document.getElementById("lucky");
let question;

search.addEventListener("click", (event) => {
  event.preventDefault();
  question = form.input.value; //BUG: breaks when '&' is included in search
  console.log(question + " search");
  fetch(`http://localhost:3000/search?q=${question}`);
});

lucky.addEventListener("click", (event) => {
  event.preventDefault();
  question = form.input.value;
  console.log(question + " lucky");
  fetch(`http://localhost:3000/lucky?q=${question}`);
});
