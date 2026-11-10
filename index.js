const mainContent = document.querySelector(".content");
const search = document.querySelector(".search input");
const btnSearch = document.querySelector(".search button");

let searchURL = "http://www.omdbapi.com/?apikey=78716308&s=";
let detailURL = "http://www.omdbapi.com/?apikey=78716308&i=";

defaultView();


async function defaultView() {
    const defaultData = await getData(searchURL, search.value);
    tampilkanData(defaultData);
}

btnSearch.addEventListener("click", async function () {
    const data = await getData(searchURL, search.value);
    tampilkanData(data);
})
search.addEventListener("keyup", async function (e) {
    e.preventDefault();
    const data = await getData(searchURL, search.value);
    if (e.key == "Enter") {
        tampilkanData(data);
    }
})

// Live Searching
// search.addEventListener("input", function(e) {
//     const query = e.target.value.trim();

//     if(query === "") {
//         mainContent.innerHTML = "";
//     }

//     const debugCount = setTimeout(async () => {
//         try {
//             const data = await getData(searchURL, query)
//             tampilkanData(data);
//         } catch {
//             mainContent.innerHTML = "<h3>Terjadi Kesalahan</h3>"
//         }
//     }, 500)
// })


mainContent.addEventListener("click", async function (e) {
    e.preventDefault();
    if (e.target.classList.contains("card")) {
        const id = e.target.dataset.id;
        const data = await getData(detailURL, id);
        detail(data);
    }
})

function getData(api, value) {
    const data = fetch(api + value)
        .then(data => data.json())
        .then(data => data)
        .catch(err => err)

    return data;
}


// Function Tampilkan Data
function tampilkanData(data) {
    let card = "";
    // console.log(data.Search);
    data.Search.forEach(el => card += elTampilData(el));
    mainContent.innerHTML = card;
}



// Function ketika card diklik tampil Detail Data (modal pop up)
function detail(data) {
    const modalBox = document.querySelector(".contain-modal");
    const btnCard = Array.from(document.querySelectorAll(".card"));
    modalBox.innerHTML = elTampilBox(data)
    const close = document.querySelector(".close");
    close.addEventListener("click", function () {
        modalBox.innerHTML = "";
    })
}






// Function Template HTML Card
function elTampilData(data) {
    return `
            <figure class="card" data-id=${data.imdbID}>
                <img src="${data.Poster}" alt="movie">
                <div class="info">
                    <h3 class="title">${titleSub(data.Title)}</h3>
                    <p class="year">${data.Year}</p>
                    <p class="genre">Action, Adventure</p>
                    <h4 class="score">8.6</h4>
                </div>
            </figure>
    `
}

// Function Template HTML Modal Box
function elTampilBox(data) {
    return `
            <div class="modal-box">
                <div class="modal-body">
                    <div class="img">
                        <img src="${data.Poster}">
                    </div>
                    <div class="text">
                        <h2>${data.Title}</h2>
                        <p><strong>Genre :</strong> ${data.Genre}</p>
                        <p><strong>Realesed :</strong> ${data.Released}</p>
                        <p><strong>Director :</strong> ${data.Director}</p>
                        <p><strong>Write :</strong> ${data.Writer}</p>
                        <p><strong>Actors :</strong> ${data.Actors}</p>
                        <p><strong>Rating :</strong> ${data.imdbRating}</p>
                        <p><strong>Sinopsis :</strong> <br>${data.Plot}</p>
                    </div>
                    <span class="close">x</span>
                </div>
            </div>
    `
}


function titleSub(title) {
    return title.length > 20 ? title.substring(0,20)+"...." : title;
}