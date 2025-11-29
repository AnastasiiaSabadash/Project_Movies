// ===========================
// SAMPLE MOVIES
// ===========================
const sampleMovies = [
    { id: '1', title: 'Той,що біжить лабіринтом', genre: 'Фантастика', poster:'movies/Той,що біжить лабіринтом.jpg' },
    { id: '2', title: 'Сутінки', genre: 'Драма', poster: 'movies/Сутінки.jpg' },
    { id: '3', title: 'Час', genre: 'Фантастика', poster: 'movies/Час.jpg' },
    { id: '4', title: 'Формула 1', genre: 'Спортивна драма', poster: 'movies/Формула 1.jpg' },
    { id: '5', title: 'Ілюзія обману', genre: 'Бойовик', poster: 'movies/Ілюзія обману.jpg' },
    { id: '6', title: 'Загублене місто', genre: 'Пригоди', poster: 'movies/Загублене місто.jpg' },
    { id: '7', title: 'Щасливого Різдва', genre: 'Драма', poster: 'movies/Щасливого Різдва.jpg' },
    { id: '8', title: 'Дюна', genre: 'Фантастика', poster: 'movies/Дюна.jpg' },
    { id: '9', title: 'Погані хлопці', genre: 'Кримінал', poster: 'movies/Погані хлопці.jpg' },
    { id: '10', title: 'Кінгсмен:Золоте кільце', genre: 'Бойовик', poster: 'movies/КінгсменЗолоте кільце.jpg' },
    { id: '11', title: 'Диявол носить Прада', genre: 'Комедія', poster: 'movies/Диявол носить Прада.jpg' },
    { id: '12', title: 'Оппенгеймер', genre: 'Історичний', poster: 'movies/Оппенгеймер.jpg' },
    { id: '13', title: 'Титанік', genre: 'Мелодрами', poster: 'movies/Титанік.jpg' },
    { id: '14', title: 'Круелла', genre: 'Пригоди', poster: 'movies/Круелла.jpg' },
    { id: '15', title: 'Вік Аделайн', genre: 'Мелодрами', poster: 'movies/Вік Аделайн.jpg' },
    { id: '16', title: 'Одинадцять друзів оушена', genre: 'Кримінал', poster: 'movies/Одинадцять друзів оушена.jpg' },
    { id: '17', title: 'На західному фронті без змін', genre: 'Військова драма', poster: 'movies/На західному фронті без змін.jpg' },
    { id: '18', title: '1917', genre: 'Військова драма', poster: 'movies/1917.jpg' },
    { id: '19', title: 'Барбі', genre: 'Комедія', poster: 'movies/Барбі.jpg' },
    { id: '20', title: 'Форсаж', genre: 'Кримінал', poster: 'movies/Форсаж.jpg' },
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
        const isFavorite = favorites.some(f => f.movie_id === movie.id);
        const card = createMovieCard(movie, isFavorite, false); // false = це головна сторінка
        grid.appendChild(card);
    });
}




// ===========================
// CREATE MOVIE CARD
// ===========================
function createMovieCard(movie, isFavorite = false, isFavoritesPage = false) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    // Клас та текст кнопки
    let buttonClass = 'add-favorite';
    let buttonText = `<span class="icon-wrap">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                        </svg>
                      </span>В обране`;

    if (isFavorite) {
        if (isFavoritesPage) {
            buttonClass = 'remove-favorite'; // червона кнопка на сторінці обраного
            buttonText = 'Видалити';
        } else {
            buttonClass = 'favorited-main';   // рожева кнопка на головній
            buttonText = `<span class="icon-heart">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                            2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
                            C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 
                            c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </span>В обраному`;

        }
    }

    card.innerHTML = `
        <div class="movie-poster">
            <img src="${movie.poster}" alt="${movie.title}">
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-genre">${movie.genre}</p>
            <button class="movie-button ${buttonClass}">
                ${buttonText}
            </button>
        </div>
    `;

    const button = card.querySelector('.movie-button');
    button.addEventListener('click', () => {
        if (favorites.some(f => f.movie_id === movie.id)) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie.id);
        }
        // Перерендер обох сторінок, щоб кнопки оновились
        renderMovies();           // головна сторінка
        updateFavoritesDisplay(); // сторінка обраного
    });

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
    // Зміна кнопки на головній сторінці
    const buttonMain = document.querySelector(`.movie-button[onclick*="addFavorite('${id}')"]`);
    if (buttonMain) {
        buttonMain.classList.remove('add-favorite');
        buttonMain.classList.add('favorited-main'); // тепер рожевий
        buttonMain.textContent = 'В обраному';
    }

    // Зміна кнопки на "В обраному"
    const button = document.querySelector(`.movie-button[onclick*="addFavorite('${id}')"]`);
    if (button) {
        button.classList.remove('add-favorite');
        button.classList.add('favorited');
        button.textContent = 'В обраному';
    }
}


// ===========================
// REMOVE FAVORITE
// ===========================
function removeFavorite(id) {
    favorites = favorites.filter(f => f.movie_id !== id);
    saveFavorites();

    updateFavoritesDisplay();
    showToast("Фільм видалено з обраних");

    // Повертаємо кнопку на головній сторінці до "В обране"
    const buttonMain = document.querySelector(`.movie-button[onclick*="removeFavorite('${id}')"]`);
    if (buttonMain) {
        buttonMain.classList.remove('favorited-main');
        buttonMain.classList.add('add-favorite');
        buttonMain.innerHTML = `<span class="icon-wrap">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                                    </svg>
                                </span>В обране`;
    }


    const button = document.querySelector(`.movie-button[onclick*="removeFavorite('${id}')"]`);
    if (button) {
        button.classList.remove('favorited');
        button.classList.add('add-favorite');
        button.innerHTML = `<span class="icon-wrap">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                                </svg>
                            </span>В обране`;
    }
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
            const card = createMovieCard(movie, true, true); // true = в фаворитах, true = сторінка обраного
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


// ===========================
// FILTERS WINDOW TOGGLE
// ===========================
// Кнопка відкриття/закриття фільтрів
const filterBtn = document.getElementById("filterBtn");
const filtersWindow = document.getElementById("filtersWindow");

// Кнопки Apply та Clear
const applyBtn = document.getElementById("applyFiltersBtn");
const clearBtn = document.getElementById("clearFiltersBtn");

// Поле для року
const yearInput = document.getElementById("yearFrom");

// Всі чекбокси жанрів
const genreCheckboxes = document.querySelectorAll('input[name="genre"]');


// 🔹 Показати / сховати вікно
filterBtn.addEventListener("click", () => {
  filtersWindow.classList.toggle("hidden");
});


// 🔹 Apply Filters — тихо збираємо вибрані фільтри
applyBtn.addEventListener("click", () => {
  const selectedGenres = [];

  genreCheckboxes.forEach(cb => {
    if (cb.checked) {
      selectedGenres.push(cb.value);
    }
  });

  const selectedYear = yearInput.value;

  // Тут ти можеш вставити свій код фільтрації фільмів
  // filterMovies(selectedGenres, selectedYear);
});


// 🔹 Clear Filters — тихо очищаємо все
clearBtn.addEventListener("click", () => {
  genreCheckboxes.forEach(cb => cb.checked = false);
  yearInput.value = "";

  // Тут можна викликати твою функцію, щоб показати всі фільми
  // resetFilters();
});
