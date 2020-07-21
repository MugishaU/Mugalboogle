const form = document.getElementById("form");
const search = document.getElementById("search");
const lucky = document.getElementById("lucky");

search.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(search.value);
});

lucky.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(lucky.value);
});
