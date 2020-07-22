const form = document.getElementById("form");
const search = document.getElementById("search");
const lucky = document.getElementById("lucky");

let question;

search.addEventListener("click", (event) => {
  event.preventDefault();
  question = form.input.value; //BUG: breaks when '&' is included in search
  question = titleCase(question);
  fetch(`http://localhost:3000/search?q=${question}`)
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
      ).innerHTML = `<p>Title: ${data[index].title}</p><p>Director: ${data[index].director}</p><p>Year: ${data[index].year}</p><hr>`;
    }
  } else {
    document.getElementById("0").style.visibility = "visible";
    document.getElementById("0").textContent = data;
  }
}
