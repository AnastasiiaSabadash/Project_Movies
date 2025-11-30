// ===========================
// 1. КОНФІГУРАЦІЯ ТА ДАНІ
// ===========================
const API_KEY = "615cea09";

// Точні дані твоїх 20 фільмів
const sampleMovies = [
    { id: '1', title: 'Той,що біжить лабіринтом', genre: 'Фантастика, Пригоди', year: 2014, rating: 6.8, poster: 'movies/Той,що біжить лабіринтом.jpg', imdbID: 'tt1790864' },
    { id: '2', title: 'Сутінки', genre: 'Драма, Фентезі', year: 2008, rating: 5.3, poster: 'movies/Сутінки.jpg', imdbID: 'tt1099212' },
    { id: '3', title: 'Час', genre: 'Фантастика, Трилер', year: 2011, rating: 6.7, poster: 'movies/Час.jpg', imdbID: 'tt1637688' },
    { id: '4', title: 'Формула 1', genre: 'Спорт, Драма', year: 2013, rating: 8.1, poster: 'movies/Формула 1.jpg', imdbID: 'tt1979320' },
    { id: '5', title: 'Ілюзія обману', genre: 'Бойовик, Кримінал', year: 2013, rating: 7.2, poster: 'movies/Ілюзія обману.jpg', imdbID: 'tt1670345' },
    { id: '6', title: 'Загублене місто', genre: 'Пригоди, Комедія', year: 2022, rating: 6.1, poster: 'movies/Загублене місто.jpg', imdbID: 'tt13320622' },
    { id: '7', title: 'Щасливого Різдва', genre: 'Драма, Мелодрама', year: 2019, rating: 6.5, poster: 'movies/Щасливого Різдва.jpg', imdbID: 'tt8623904' },
    { id: '8', title: 'Дюна', genre: 'Фантастика, Пригоди', year: 2021, rating: 8.0, poster: 'movies/Дюна.jpg', imdbID: 'tt1160419' },
    { id: '9', title: 'Погані хлопці', genre: 'Бойовик, Комедія', year: 1995, rating: 6.8, poster: 'movies/Погані хлопці.jpg', imdbID: 'tt0112442' },
    { id: '10', title: 'Кінгсмен:Золоте кільце', genre: 'Бойовик, Пригоди', year: 2017, rating: 6.7, poster: 'movies/КінгсменЗолоте кільце.jpg', imdbID: 'tt4649466' },
    { id: '11', title: 'Диявол носить Прада', genre: 'Комедія, Драма', year: 2006, rating: 6.9, poster: 'movies/Диявол носить Прада.jpg', imdbID: 'tt0458352' },
    { id: '12', title: 'Оппенгеймер', genre: 'Історичний, Драма', year: 2023, rating: 8.4, poster: 'movies/Оппенгеймер.jpg', imdbID: 'tt15398776' },
    { id: '13', title: 'Титанік', genre: 'Мелодрама, Драма', year: 1997, rating: 7.9, poster: 'movies/Титанік.jpg', imdbID: 'tt0120338' },
    { id: '14', title: 'Круелла', genre: 'Комедія, Кримінал', year: 2021, rating: 7.3, poster: 'movies/Круелла.jpg', imdbID: 'tt3228774' },
    { id: '15', title: 'Вік Аделайн', genre: 'Мелодрама, Фантастика', year: 2015, rating: 7.2, poster: 'movies/Вік Аделайн.jpg', imdbID: 'tt1655441' },
    { id: '16', title: 'Одинадцять друзів оушена', genre: 'Кримінал, Трилер', year: 2001, rating: 7.7, poster: 'movies/Одинадцять друзів оушена.jpg', imdbID: 'tt0240772' },
    { id: '17', title: 'На західному фронті без змін', genre: 'Військовий, Драма', year: 2022, rating: 7.8, poster: 'movies/На західному фронті без змін.jpg', imdbID: 'tt1016150' },
    { id: '18', title: '1917', genre: 'Військовий, Драма', year: 2019, rating: 8.2, poster: 'movies/1917.jpg', imdbID: 'tt8579674' },
    { id: '19', title: 'Барбі', genre: 'Комедія, Фентезі', year: 2023, rating: 6.9, poster: 'movies/Барбі.jpg', imdbID: 'tt1517268' },
    { id: '20', title: 'Форсаж', genre: 'Бойовик, Кримінал', year: 2001, rating: 6.8, poster: 'movies/Форсаж.jpg', imdbID: 'tt0232500' },
];

// ===========================
// 2. LOCAL STORAGE (FAVORITES)
// ===========================
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// ===========================
// 3. INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Рендер фільмів
    renderMovies(sampleMovies);
    updateFavoritesDisplay();
    
    // API (якщо сторінка movie.html)
    loadMovieFromAPI();
    
    // Живий пошук по назві
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            const filtered = sampleMovies.filter(m => m.title.toLowerCase().includes(val));
            renderMovies(filtered);
        });
    }
});

// ===========================
// 4. RENDER MOVIES
// ===========================
function renderMovies(moviesList) {
    const grid = document.getElementById('movies-grid');
    if (!grid) return; // Якщо ми на сторінці favorites, grid може не бути

    grid.innerHTML = '';

    if (!moviesList || moviesList.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: #888; margin-top: 50px;">
                <h2>Нічого не знайдено</h2>
                <p>Спробуйте змінити параметри фільтру</p>
            </div>`;
        return;
    }

    moviesList.forEach(movie => {
        const isFavorite = favorites.some(f => f.movie_id === movie.id);
        const card = createMovieCard(movie, isFavorite, false); 
        grid.appendChild(card);
    });
}

// ===========================
// 5. CREATE MOVIE CARD
// ===========================
function createMovieCard(movie, isFavorite = false, isFavoritesPage = false) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    // Кнопка
    let buttonClass = isFavorite ? (isFavoritesPage ? 'remove-favorite' : 'favorited-main') : 'add-favorite';
    
    let buttonIcon = isFavorite 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>`;
        
    let buttonText = isFavorite ? (isFavoritesPage ? 'Видалити' : 'В обраному') : 'В обране';

    card.innerHTML = `
        <div class="movie-poster">
            <a href="movie.html?id=${movie.imdbID}">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            </a>
        </div>
        <div class="movie-info">
            <h3 class="movie-title">
                <a href="movie.html?id=${movie.imdbID}" style="text-decoration: none; color: inherit;">
                    ${movie.title}
                </a>
            </h3>
            
            <div style="font-size: 13px; color: #aaa; margin-bottom: 5px; display: flex; justify-content: space-between;">
                <span>${movie.year}</span>
                <span style="color: gold;">★ ${movie.rating}</span>
            </div>
            
            <p class="movie-genre" style="margin-bottom: 10px; font-size: 12px; color: #888; height: 30px; overflow: hidden;">
                ${movie.genre}
            </p>

            <button class="movie-button ${buttonClass}">
                <span class="icon-wrap">${buttonIcon}</span> ${buttonText}
            </button>
        </div>
    `;

    // Логіка кнопки
    const button = card.querySelector('.movie-button');
    button.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (favorites.some(f => f.movie_id === movie.id)) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie.id);
        }
    });

    return card;
}

// ===========================
// 6. FAVORITES LOGIC
// ===========================
function addFavorite(id) {
    if (favorites.find(f => f.movie_id === id)) return;
    const movie = sampleMovies.find(m => m.id === id);
    if (!movie) return;
    favorites.push({ movie_id: movie.id, added_at: Date.now() });
    saveFavorites();
    updateFavoritesDisplay();
    showToast(`"${movie.title}" додано в обране`);
    
    // Оновлюємо вигляд кнопок на поточній сторінці
    if(document.getElementById('movies-grid')) renderMovies(sampleMovies);
}

function removeFavorite(id) {
    favorites = favorites.filter(f => f.movie_id !== id);
    saveFavorites();
    updateFavoritesDisplay();
    showToast("Фільм видалено з обраних");
    
    if(document.getElementById('movies-grid')) renderMovies(sampleMovies);
}

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
            grid.appendChild(createMovieCard(movie, true, true));
        }
    });
}

// ===========================
// 7. FILTER LOGIC (НОВА, З ДІАПАЗОНОМ РОКІВ)
// ===========================
const filterBtn = document.getElementById("filterBtn");
const filtersWindow = document.getElementById("filtersWindow");
const applyBtn = document.getElementById("applyFiltersBtn");
const clearBtn = document.getElementById("clearFiltersBtn");

const yearFromInput = document.getElementById("yearFrom");
const yearToInput = document.getElementById("yearTo");
const ratingInput = document.getElementById("ratingFrom");
const genreCheckboxes = document.querySelectorAll('input[name="genre"]');

// Показати вікно
if (filterBtn && filtersWindow) {
    filterBtn.addEventListener("click", () => {
        filtersWindow.classList.toggle("hidden");
    });
}

// Застосувати
if (applyBtn) {
    applyBtn.addEventListener("click", () => {
        // 1. Жанри
        const selectedGenres = Array.from(genreCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value.toLowerCase());

        // 2. Діапазон Років
        let yFrom = parseInt(yearFromInput.value);
        let yTo = parseInt(yearToInput.value);

        // Якщо не вказано - беремо межі (1900 - 2030)
        if (isNaN(yFrom)) yFrom = 1900;
        if (isNaN(yTo)) yTo = 2030;

        // 3. Рейтинг
        let minRating = parseFloat(ratingInput.value);
        if (isNaN(minRating)) minRating = 0;

        // ФІЛЬТРАЦІЯ
        const filtered = sampleMovies.filter(movie => {
            // Жанр
            const movieGenresStr = movie.genre.toLowerCase(); 
            const genreMatch = selectedGenres.length === 0 || selectedGenres.some(g => movieGenresStr.includes(g));

            // Рік (має бути між From і To)
            const yearMatch = movie.year >= yFrom && movie.year <= yTo;

            // Рейтинг
            const ratingMatch = movie.rating >= minRating;

            return genreMatch && yearMatch && ratingMatch;
        });

        renderMovies(filtered);
        filtersWindow.classList.add("hidden");
        showToast(`Знайдено: ${filtered.length} фільмів`);
    });
}

// Скинути
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        genreCheckboxes.forEach(cb => cb.checked = false);
        if(yearFromInput) yearFromInput.value = "";
        if(yearToInput) yearToInput.value = "";
        if(ratingInput) ratingInput.value = "";

        renderMovies(sampleMovies);
        filtersWindow.classList.add("hidden");
        showToast("Фільтри очищено");
    });
}


// ===========================
// 8. API LOGIC
// ===========================
async function loadMovieFromAPI() {
    const params = new URLSearchParams(window.location.search);
    const imdbID = params.get('id');
    if (!imdbID) return;

    const loadingEl = document.getElementById('loading');
    const contentEl = document.getElementById('movie-content');
    
    if(!loadingEl || !contentEl) return;

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            loadingEl.style.display = 'none';
            contentEl.style.display = 'block';

            const safeSet = (id, txt) => { const el = document.getElementById(id); if(el) el.textContent = txt; }

            safeSet('api-title', data.Title);
            safeSet('api-year', data.Year);
            safeSet('api-rating', data.imdbRating);
            safeSet('api-genre', data.Genre);
            safeSet('api-country', data.Country);
            safeSet('api-actors', data.Actors);
            safeSet('api-plot', data.Plot);

            const posterContainer = document.getElementById('api-poster-container');
            if (posterContainer) {
                if (data.Poster && data.Poster !== "N/A") {
                    posterContainer.innerHTML = `<img src="${data.Poster}" alt="${data.Title}" style="width: 100%; border-radius: 8px;">`;
                } else {
                    posterContainer.innerHTML = `<div style="height: 400px; background: #222; display: flex; align-items: center; justify-content: center; color: white;">No Poster</div>`;
                }
            }
        } else {
            loadingEl.textContent = 'Помилка API: ' + data.Error;
        }
    } catch (error) {
        console.error(error);
        if(loadingEl) loadingEl.textContent = 'Не вдалося підключитися до API.';
    }
}

// ===========================
// 9. TOAST
// ===========================
function showToast(text, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = text;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}