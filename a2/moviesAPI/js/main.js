// Import MoviesDB (make sure to use it in the server side, not on the client side)
// const MoviesDB = require("../modules/moviesDB");

function loadMovieData(title) {
    let page = 1;
    let perPage = 10;
    let apiUrl = `https://web422-puce.vercel.app/api/movies?page=${page}&perPage=${perPage}`;

    if (title) {
        apiUrl += `&title=${title}`;
        
        document.querySelector('pagination').classList.add('d-none');
        document.querySelector('pagination').classList.remove('d-none');

    }

    fetch(apiUrl)
        .then(res => {
            if(!res.ok) {
                throw new Error(`HTTP error: $(res.status)`);
            }
            return res.json(); 
        })
        

        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
}
