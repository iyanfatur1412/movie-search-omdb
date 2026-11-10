const mainContent = document.querySelector(".content");
const search = document.querySelector(".search input");
const btnSearch = document.querySelector(".search button");

// function searchMovie(url, success, error) {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4) {
//             if (xhr.status == 200) {
//                 success(JSON.parse(xhr.response));
//             } else {
//                 error(xhr.responseText);
//             }
//         }
//     }
//     xhr.open("get", url);
//     xhr.send();
// }

const proxyUrl = 'https://corsproxy.io/?';
let searchURL = proxyUrl + encodeURIComponent("https://www.omdbapi.com/?apikey=8716308&s=");
let detailURL = proxyUrl + encodeURIComponent("https://www.omdbapi.com/?apikey=78716308&i=");

btnSearch.addEventListener("click", function() {
    // searchMovie(searchURL+search.value, tampilkanData, error => console.log(error));
    fetch(searchURL+search.value)
    .then(data => data.json())
    .then(data => console.log(data.Search))
    .catch(err => console.log(err))
})
search.addEventListener("keyup", function(e) {
    e.preventDefault();
    if(e.key == "Enter") {
        searchMovie(searchURL+search.value, tampilkanData, error => console.log(error));
    }
})



// Function Tampilkan Data
function tampilkanData(data) {
    let card = "";
    // console.log(data.Search);
    data.Search.forEach(el => card += elTampilData(el));
    mainContent.innerHTML = card;
    detail();
}



// Function ketika card diklik tampil Detail Data (modal pop up)
function detail() {
    const modalBox = document.querySelector(".contain-modal");
    const btnCard = Array.from(document.querySelectorAll(".card"));
    btnCard.map(btn => btn.addEventListener("click", function() {
        searchMovie(detailURL+this.dataset.id, data => { 
            modalBox.innerHTML = elTampilBox(data)
            const close = document.querySelector(".close");
            close.addEventListener("click", function() {
                modalBox.innerHTML = "";
            })
        },
        error => console.log(error));
    }));
}






// Function Template HTML Card
function elTampilData(data) {
    return `
            <figure class="card" data-id=${data.imdbID}>
                <img src="${data.Poster}" alt="movie">
                <div class="info">
                    <h3 class="title">${data.Title}</h3>
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
