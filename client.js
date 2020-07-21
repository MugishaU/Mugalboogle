const form = document.getElementById("form");
const search = document.getElementById("search");
const lucky = document.getElementById("lucky");
let question;

search.addEventListener("click", (event) => {
  event.preventDefault();
  question = form.input.value;
  console.log(question + " search");
  fetch("http://localhost:3000/search");
});

lucky.addEventListener("click", (event) => {
  event.preventDefault();
  question = form.input.value;
  console.log(question + " lucky");
  fetch("http://localhost:3000/lucky");
});
