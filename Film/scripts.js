// ===========================
// SAMPLE MOVIES
// ===========================
const sampleMovies = [
    { id: '1', title: 'Той,що біжить лабіринтом', genre: 'Наукова фантастика', poster:'movies/Той,що біжить лабіринтом.jpg' },
    { id: '2', title: 'Сутінки', genre: 'Бойовик', poster: 'movies/Сутінки.jpg' },
    { id: '3', title: 'Час', genre: 'Драма', poster: 'movies/Час.jpg' },
    { id: '4', title: 'Формула 1', genre: 'Наукова фантастика', poster: 'movies/Формула 1.jpg' },
    { id: '5', title: 'Ілюзія обману', genre: 'Романтика', poster: 'movies/Ілюзія обману.jpg' },
    { id: '6', title: 'Загублене місто', genre: 'Фантастика', poster: 'movies/Загублене місто.jpg' },
    { id: '7', title: 'Щасливого Різдва', genre: 'Трилер', poster: 'movies/Щасливого Різдва.jpg' },
    { id: '8', title: 'Дюна', genre: 'Супергерої', poster: 'movies/Дюна.jpg' },
    { id: '9', title: 'Погані хлопці', genre: 'Анімація', poster: 'movies/Погані хлопці.jpg' },
    { id: '10', title: 'Кінгсмен:Золоте кільце', genre: 'Історичний', poster: 'movies/КінгсменЗолоте кільце.jpg' },
    { id: '11', title: 'Диявол носить Прада', genre: 'Кримінал', poster: 'movies/Диявол носить Прада.jpg' },
    { id: '12', title: 'Оппенгеймер', genre: 'Фантастика', poster: 'movies/Оппенгеймер.jpg' },
    { id: '13', title: 'Титанік', genre: 'Фантастика', poster: 'movies/Титанік.jpg' },
    { id: '14', title: 'Круелла', genre: 'Фантастика', poster: 'movies/Круелла.jpg' },
    { id: '15', title: 'Вік Аделайн', genre: 'Фантастика', poster: 'movies/Вік Аделайн.jpg' },
    { id: '16', title: 'Одинадцять друзів оушена', genre: 'Фантастика', poster: 'movies/Одинадцять друзів оушена.jpg' },
    { id: '17', title: 'На західному фронті без змін', genre: 'Фантастика', poster: 'movies/На західному фронті без змін.jpg' },
    { id: '18', title: '1917', genre: 'Фантастика', poster: 'movies/1917.jpg' },
    { id: '19', title: 'Барбі', genre: 'Фантастика', poster: 'movies/Барбі.jpg' },
    { id: '20', title: 'Форсаж', genre: 'Фантастика', poster: 'movies/Форсаж.jpg' },
];



// ===========================
// LOCAL STORAGE FAVORITES
// ===========================
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// зберегти
function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}


// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    renderMovies();
    updateFavoritesDisplay();
});


// ===========================
// RENDER MOVIES
// ===========================
function renderMovies() {
    const grid = document.getElementById('movies-grid');
    if (!grid) return;

    grid.innerHTML = '';

    sampleMovies.forEach(movie => {
        const card = createMovieCard(movie, false);
        grid.appendChild(card);
    });
}


// ===========================
// CREATE MOVIE CARD
// ===========================
function createMovieCard(movie, isFavorite) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    card.innerHTML = `
        <div class="movie-poster">
        <img src="${movie.poster}" alt="${movie.title}">
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-genre">${movie.genre}</p>
            
            <button class="movie-button ${isFavorite ? 'remove-favorite' : 'add-favorite'}"
            onclick="${isFavorite ? `removeFavorite('${movie.id}')` : `addFavorite('${movie.id}')`}">
            ${
                isFavorite 
                ? 'Видалити' 
                : `<span class="icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                </svg>
                </span>
                В обране`
            }
            </button>
        </div>
    `;

    return card;
}


// ===========================
// ADD TO FAVORITES
// ===========================
function addFavorite(id) {
    if (favorites.find(f => f.movie_id === id)) return;

    const movie = sampleMovies.find(m => m.id === id);
    if (!movie) return;

    favorites.push({
        movie_id: movie.id,
        added_at: Date.now()
    });

    saveFavorites();
    updateFavoritesDisplay();
    showToast(`"${movie.title}" додано в обране`);
}


// ===========================
// REMOVE FAVORITE
// ===========================
function removeFavorite(id) {
    favorites = favorites.filter(f => f.movie_id !== id);
    saveFavorites();

    updateFavoritesDisplay();
    showToast("Фільм видалено з обраних");
}


// ===========================
// UPDATE FAVORITES PAGE
// ===========================
function updateFavoritesDisplay() {
    const grid = document.getElementById('favorites-grid');
    const empty = document.getElementById('empty-favorites');

    if (!grid || !empty) return;

    if (favorites.length === 0) {
        empty.style.display = 'block';
        grid.style.display = 'none';
        return;
    }

    empty.style.display = 'none';
    grid.style.display = 'grid';
    grid.innerHTML = '';

    favorites.forEach(f => {
        const movie = sampleMovies.find(m => m.id === f.movie_id);
        if (movie) {
            const card = createMovieCard(movie, true);
            grid.appendChild(card);
        }
    });
}


// ===========================
// TOAST
// ===========================
function showToast(text, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = text;

    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}