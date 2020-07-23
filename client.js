const form = document.getElementById("form");
const search = document.getElementById("search");
const lucky = document.getElementById("lucky");

let question;

search.addEventListener("click", (event) => {
  event.preventDefault();
  question = form.input.value;
  let question_edit = "";
  for (letter of question) {
    letter === "&" ? (question_edit += "%26") : (question_edit += letter);
  }

  question_edit = titleCase(question_edit);
  fetch(`http://localhost:3000/search?q=${question_edit}`)
    .then((r) => r.json())
    .then((data) => displayData(data))
    .catch((err) => {
      for (let i = 0; i < 10; i++) {
        document.getElementById(i).style.visibility = "hidden";
      }
      document.getElementById("0").style.visibility = "visible";
      document.getElementById("0").textContent = "Server Connection Issue";
    });
});

lucky.addEventListener("click", (event) => {
  event.preventDefault();
  question = form.input.value;
  question = titleCase(question);
  fetch(`http://localhost:3000/lucky?q=${question}`)
    .then((r) => r.json())
    .then(openLucky)
    .catch((err) => {
      for (let i = 0; i < 10; i++) {
        document.getElementById(i).style.visibility = "hidden";
      }
      document.getElementById("0").style.visibility = "visible";
      document.getElementById("0").textContent = "Server Connection Issue";
    });
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
  if (film) {
    let filmTitle = film.title;
    window.open(`https://en.wikipedia.org/wiki/${filmTitle}`);
  } else {
    document.getElementById("0").style.visibility = "visible";
    document.getElementById(
      "0"
    ).textContent = `"${question}" did not return any results!`;
  }
}

function displayData(data) {
  for (let i = 0; i < 10; i++) {
    document.getElementById(i).style.visibility = "hidden";
  }
  if (typeof data === "object") {
    for (index in data) {
      document.getElementById(index).style.visibility = "visible";
      document.getElementById(
        index
      ).innerHTML = `<p><strong>Title:</strong> ${data[index].title}</p><p><strong>Director:</strong> ${data[index].director}</p><p><strong>Year:</strong> ${data[index].year}</p><p><strong>IMDb Rating:</strong> ${data[index].rate}</p><hr>`;
    }
  } else {
    document.getElementById("0").style.visibility = "visible";
    document.getElementById("0").textContent = data;
  }
}
