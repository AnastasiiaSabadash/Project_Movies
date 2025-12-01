// ===========================
// 1. КОНФІГУРАЦІЯ ТА ДАНІ
// ===========================
const API_KEY = "615cea09";

// МАСИВ ФІЛЬМІВ
const sampleMovies = [
    { 
        id: '1', title: 'Той, що біжить лабіринтом', genre: 'Фантастика, Пригоди', year: 2014, rating: 6.8, poster: 'movies/Той,що біжить лабіринтом.jpg', imdbID: 'tt1790864',
        description: 'Сюжет розгортається у похмурому постапокаліптичному майбутньому. Підліток на ім\'я Томас прокидається у ліфті, що стрімко піднімається вгору. Він не пам\'ятає нічого зі свого минулого, окрім власного імені. Ліфт привозить його в Глейд — замкнутий простір, оточений величним і смертельно небезпечним Лабіринтом. Тут живе громада хлопців, які роками намагаються знайти вихід, але Лабіринт щоночі змінює свою конфігурацію, а в його коридорах чатують жахливі біомеханічні монстри — грівери. Томас вирішує порушити встановлені правила і стати "бігуном", щоб розгадати таємницю цього місця і врятувати нових друзів.'
    },
    { 
        id: '2', title: 'Сутінки', genre: 'Драма, Фентезі', year: 2008, rating: 5.3, poster: 'movies/Сутінки.jpg', imdbID: 'tt1099212',
        description: 'Сімнадцятирічна Белла Свон, яка завжди почувалася трохи чужою у світі своїх однолітків, переїжджає до батька в дощове і похмуре містечко Форкс, штат Вашингтон. Там її увагу привертає загадкова родина Калленів, особливо Едварда — хлопець із блідою шкірою та проникливим поглядом. Згодом Белла дізнається неймовірну таємницю: Едвард — вампір, який живе вже понад століття, але відмовився від полювання на людей. Між ними спалахує небезпечне і всепоглинаюче кохання, яке ставить під загрозу життя Белли, адже запах її крові є нестерпною спокусою навіть для Едварда, не кажучи вже про ворожі клани вампірів.'
    },
    { 
        id: '3', title: 'Час', genre: 'Фантастика, Трилер', year: 2011, rating: 6.7, poster: 'movies/Час.jpg', imdbID: 'tt1637688',
        description: 'Ласкаво просимо у світ, де час став єдиною і найтвердішою валютою. Завдяки генній інженерії люди перестають старіти у 25 років, але подальше життя коштує грошей. Багаті можуть жити вічно, залишаючись молодими, тоді як бідні змушені щодня тяжко працювати, щоб заробити ще кілька годин життя. Головний герой, Вілл Салас, живе у гетто і випадково отримує у спадок більше століття часу. Звинувачений у вбивстві, якого не скоював, він змушений тікати, взявши в заручниці доньку найбагатшої людини світу. Разом вони кидають виклик жорстокій системі.'
    },
    { 
        id: '4', title: 'F1', genre: 'Спорт, Драма', year: 2025, rating: 0.0, poster: 'movies/Формула 1.jpg', imdbID: 'tt1631106',
        // ТУТ Я ПРОПИСАВ АКТОРІВ ВРУЧНУ:
        actors: "Бред Пітт, Демсон Ідріс, Керрі Кондон, Хав'єр Бардем, Тобайас Мензіс, Кім Боднія, Сара Найлз, Вілл Меррік, Пепе Балдеррама, Абдул Селіс, Каллі Кук",
        description: 'Сонні Хейс колись був одним із найперспективніших пілотів Формули-1. Багато років тому він їхав швидше всіх і дуже круто заходив в повороти. Він був одним з кращих пілотів свого часу та його майбутнє обіцяло славу, але одна жахлива аварія перекреслила всі мрії. Чоловік пішов з гонки та більше не повертався. Минуло багато років. Сонні живе тихим життям, уникає публічності й намагається не повертатися до минулого. Та несподіваний дзвінок від власника гоночної команди змінює все. Йому пропонують стати другим пілотом у Формулі та наставником молодого таланта – Джошуа Пірса, юного вундеркінда, що вже привернув увагу світу своїм неймовірним талантом. Та Хейс вагається. Колись гонка вже зламала його, але поступово він все ж змінює думку. Тепер в нього є другий шанс здобути перемогу, перекресливши минулі провали. Та не все так просто – ні «наставник», ні «учень» не хочуть працювати командно і кожен хоче показати, чого вартий саме він.'
    },
    { 
        id: '5', title: 'Ілюзія обману', genre: 'Бойовик, Кримінал', year: 2013, rating: 7.2, poster: 'movies/Ілюзія обману.jpg', imdbID: 'tt1670345',
        description: 'Четверо неймовірно талановитих вуличних фокусників отримують таємничі запрошення, які об\'єднують їх у команду під назвою "Чотири вершники". Вони влаштовують грандіозні шоу, під час яких прямо на сцені здійснюють неможливі пограбування: спочатку банку в Парижі, перебуваючи в Лас-Вегасі, а потім спустошують рахунки корумпованого мільярдера. Агенти ФБР та Інтерполу намагаються розгадати їхні секрети, але щоразу опиняються на крок позаду. Це захоплива гра в кішки-мишки, де головне правило — чим ближче ви дивитесь, тим менше ви бачите.'
    },
    { 
        id: '6', title: 'Загублене місто', genre: 'Пригоди, Комедія', year: 2022, rating: 6.1, poster: 'movies/Загублене місто.jpg', imdbID: 'tt13320622',
        description: 'Лоретта Сейдж — відома, але відлюдькувата письменниця, авторка популярних пригодницьких романів про кохання в екзотичних місцях. Під час промо-туру її нової книги Лоретту викрадає ексцентричний мільярдер, який переконаний, що вона може привести його до справжніх скарбів загубленого стародавнього міста, описаного в її романі. На порятунок вирушає Алан — модель з обкладинок її книг, який все життя лише зображав героя. Тепер він має шанс довести, що здатен на справжній подвиг у диких джунглях.'
    },
    { 
        id: '7', title: 'Щасливого Різдва', genre: 'Драма, Мелодрама', year: 2019, rating: 6.5, poster: 'movies/Щасливого Різдва.jpg', imdbID: 'tt8623904',
        description: 'Кейт — молода дівчина, яка працює ельфом у цілорічному різдвяному магазині в Лондоні. Вона постійно приймає неправильні рішення, зловживає алкоголем, свариться з рідними й не може знайти своє місце в житті після перенесеної важкої хвороби серця. Здається, що удача відвернулася від неї назавжди. Але все змінюється, коли вона випадково зустрічає Тома — загадкового, доброго і надзвичайно позитивного хлопця, який здається надто ідеальним, щоб бути реальним. Ця зустріч змушує Кейт повірити у різдвяне диво.'
    },
    { 
        id: '8', title: 'Дюна', genre: 'Фантастика, Пригоди', year: 2021, rating: 8.0, poster: 'movies/Дюна.jpg', imdbID: 'tt1160419',
        description: 'Екранізація культового роману Френка Герберта. У далекому майбутньому людство розселилося по різних планетах, а влада належить могутнім аристократичним домам. Юний Пол Атрід, спадкоємець шляхетного роду, разом із родиною вирушає на Арракіс — найнебезпечнішу планету у Всесвіті. Тільки тут видобувають "прянощі" — безцінну речовину, що подовжує життя і дає можливість подорожувати крізь простір. Після підступної зради і знищення його дому, Пол тікає в пустелю до місцевих жителів фріменів, щоб прийняти свою долю і стати тим, хто змінить імперію назавжди.'
    },
    { 
        id: '9', title: 'Погані хлопці', genre: 'Бойовик, Комедія', year: 1995, rating: 6.8, poster: 'movies/Погані хлопці.jpg', imdbID: 'tt0112442',
        description: 'Маркус Бернетт — зразковий сім\'янин, а Майк Ловрі — багатий плейбой і холостяк. Вони — найкращі детективи відділу боротьби з наркотиками в Маямі, але повні протилежності один одному. Коли з поліцейського складу зухвало викрадають конфісковану партію героїну на 100 мільйонів доларів, відділ опиняється під загрозою закриття. Напарники мають лише 72 години, щоб знайти злочинців. Ситуація стає критичною, коли їм доводиться захищати єдиного свідка вбивства, при цьому вдаючи, що вони — це один одного.'
    },
    { 
        id: '10', title: 'Кінгсмен:Золоте кільце', genre: 'Бойовик, Пригоди', year: 2017, rating: 6.7, poster: 'movies/КінгсменЗолоте кільце.jpg', imdbID: 'tt4649466',
        description: 'Після нищівної атаки на штаб-квартиру британської секретної служби "Kingsman", світ опиняється в заручниках у могутньої наркобаронеси Поппі Адамс. Агенти Еггсі та Мерлін, що вижили, змушені діяти за протоколом "Судного дня", який приводить їх до США. Там вони знаходять союзну шпигунську організацію "Statesman", що ховається за фасадом виробника віскі. Британські джентльмени та американські ковбої повинні подолати свої культурні розбіжності й об\'єднатися, щоб врятувати мільйони людей.'
    },
    { 
        id: '11', title: 'Диявол носить Прада', genre: 'Комедія, Драма', year: 2006, rating: 6.9, poster: 'movies/Диявол носить Прада.jpg', imdbID: 'tt0458352',
        description: 'Амбітна, але далека від моди провінційна випускниця Андреа Сакс приїжджає до Нью-Йорка з мрією стати серйозною журналісткою. Волею долі вона отримує роботу, за яку "мільйони дівчат готові вмерти" — посаду асистентки Міранди Прістлі, деспотичної та геніальної редакторки найвпливовішого модного журналу. Андреа потрапляє у вир гламуру, інтриг і неможливих завдань. Вона змінюється зовні та внутрішньо, але згодом постає перед вибором: кар\'єра мрії чи збереження власної душі та стосунків із близькими.'
    },
    { 
        id: '12', title: 'Оппенгеймер', genre: 'Історичний, Драма', year: 2023, rating: 8.4, poster: 'movies/Оппенгеймер.jpg', imdbID: 'tt15398776',
        description: 'Масштабна біографічна драма Крістофера Нолана, що розповідає про життя і трагедію Роберта Оппенгеймера — блискучого фізика-теоретика. Під час Другої світової війни він очолив секретний "Мангеттенський проєкт", метою якого було створення першої у світі атомної бомби раніше за нацистів. Фільм показує не лише науковий прорив, а й глибокі моральні страждання вченого, який усвідомив, що дав людству інструмент для самознищення. Це історія про тріумф розуму і крах сумління.'
    },
    { 
        id: '13', title: 'Титанік', genre: 'Мелодрама, Драма', year: 1997, rating: 7.9, poster: 'movies/Титанік.jpg', imdbID: 'tt0120338',
        description: 'Одна з найвеличніших історій кохання в кіно. Бідний художник Джек Доусон виграє квиток на "Титанік" у карти в останню мить, а юна аристократка Роуз піднімається на борт, щоб вирушити до Америки на власне весілля з нелюбим багатієм. Їхні світи ніколи не мали перетнутися, але доля зводить їх разом на палубі найбільшого корабля в історії. Їхнє коротке, але яскраве кохання розгортається на тлі грандіозної катастрофи, коли "непотоплюваний" лайнер стикається з айсбергом у крижаних водах Атлантики.'
    },
    { 
        id: '14', title: 'Круелла', genre: 'Комедія, Кримінал', year: 2021, rating: 7.3, poster: 'movies/Круелла.jpg', imdbID: 'tt3228774',
        description: 'Лондон 1970-х років, розквіт панк-року. Юна Естелла — талановита шахрайка з бездоганним смаком і мрією стати дизайнеркою одягу. Її креативність помічає легендарна, але зарозуміла Баронеса фон Геллман, ікона високої моди. Естелла починає працювати на неї, але згодом дізнається шокуючу правду про своє минуле, пов\'язану з Баронесою. Це відкриття пробуджує в ній темну сторону, і на світ з\'являється зухвала, геніальна і мстива Круелла де Віль.'
    },
    { 
        id: '15', title: 'Вік Аделайн', genre: 'Мелодрама, Фантастика', year: 2015, rating: 7.2, poster: 'movies/Вік Аделайн.jpg', imdbID: 'tt1655441',
        description: 'Аделайн Боуман народилася на початку ХХ століття. Після страшної автокатастрофи та удару блискавки з нею стається диво — вона перестає старіти. Протягом багатьох десятиліть Аделайн залишається 29-річною красунею. Щоб не стати об\'єктом експериментів, вона змушена кожні 10 років змінювати ім\'я, роботу та місце проживання, уникаючи будь-яких серйозних стосунків. Її самотнє вічне життя триває доти, доки вона не зустрічає чоловіка, заради якого готова ризикнути своєю таємницею і знову стати смертною.'
    },
    { 
        id: '16', title: 'Одинадцять друзів оушена', genre: 'Кримінал, Трилер', year: 2001, rating: 7.7, poster: 'movies/Одинадцять друзів оушена.jpg', imdbID: 'tt0240772',
        description: 'Елегантний і харизматичний злодій Денні Оушен виходить із в\'язниці з уже готовим планом найзухвалішого пограбування в історії. Він збирається обчистити сховище трьох найбільших казино Лас-Вегаса, що належать жорстокому Террі Бенедикту, який, до того ж, зустрічається з колишньою дружиною Оушена. Для реалізації плану Денні збирає команду з 11 вузькопрофільних спеціалістів: від геніального хакера до китайського акробата. Ставки неймовірно високі: 160 мільйонів доларів і кохання всього життя.'
    },
    { 
        id: '17', title: 'На західному фронті без змін', genre: 'Військовий, Драма', year: 2022, rating: 7.8, poster: 'movies/На західному фронті без змін.jpg', imdbID: 'tt1016150',
        description: 'Потужна антивоєнна драма за мотивами роману Еріха Марії Ремарка. Події розгортаються під час Першої світової війни. 17-річний Пауль та його друзі, натхненні патріотичними промовами вчителя, з ентузіазмом записуються добровольцями до німецької армії. Однак їхні романтичні уявлення про героїзм розбиваються в перші ж дні на фронті. Хлопці стикаються з брудом, голодом, щурами та безглуздою смертю в окопах. Фільм без прикрас показує трагедію "втраченого покоління", чиї життя були перемелені жорнами війни.'
    },
    { 
        id: '18', title: '1917', genre: 'Військовий, Драма', year: 2019, rating: 8.2, poster: 'movies/1917.jpg', imdbID: 'tt8579674',
        description: 'Напружений військовий трилер, знятий так, ніби це один безперервний кадр. Двоє молодих британських солдатів, Скофілд і Блейк, отримують наказ, який здається неможливим для виконання. Вони повинні перетнути нічию землю і територію ворога, щоб доставити термінове повідомлення про скасування наступу. Якщо вони не встигнуть до світанку, 1600 солдатів, серед яких рідний брат Блейка, потраплять у смертельну пастку німців. Це гонка з часом, де кожен крок може стати останнім.'
    },
    { 
        id: '19', title: 'Барбі', genre: 'Комедія, Фентезі', year: 2023, rating: 6.9, poster: 'movies/Барбі.jpg', imdbID: 'tt1517268',
        description: 'У яскравому і бездоганному Барбіленді все ідеально: кожен день — найкращий, всі дівчата успішні, а вечірки ніколи не закінчуються. Але стереотипна Барбі раптом починає думати про смерть, а її ідеальні стопи стають пласкими. Щоб повернути все як було, вона змушена вирушити у Реальний Світ. Разом із нею "зайцем" їде Кен. Зіткнення з людською реальністю, патріархатом та недосконалістю світу стає для ляльок справжнім шоком, але водночас допомагає їм знайти себе.'
    },
    { 
        id: '20', title: 'Форсаж', genre: 'Бойовик, Кримінал', year: 2001, rating: 6.8, poster: 'movies/Форсаж.jpg', imdbID: 'tt0232500',
        description: 'Поліція Лос-Анджелеса підозрює банду вуличних гонщиків на чолі з харизматичним Домініком Торетто у серії зухвалих пограбувань вантажівок із побутовою технікою. Молодий офіцер Браян О\'Коннор отримує завдання працювати під прикриттям: він має втертися в довіру до Домініка і знайти докази його вини. Однак Браян сам захоплюється світом нелегальних перегонів, тюнінгованих авто і швидкості. Згодом він закохується в сестру Домініка і розуміє, що грань між законом і дружбою стає все тоншою.'
    },
];

// ===========================
// 2. LOCAL STORAGE
// ===========================
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// ===========================
// 3. INIT (ЗАПУСК)
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Рендер головної сторінки
    if(document.getElementById('movies-grid')) {
        renderMovies(sampleMovies);
    }
    
    // Рендер обраного
    if(document.getElementById('favorites-grid')) {
        const favMovies = sampleMovies.filter(m => favorites.some(f => f.movie_id === m.id));
        renderFavorites(favMovies);
    }
    
    // API (movie.html)
    loadMovieFromAPI();
    
    // Живий пошук
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            const isFavPage = !!document.getElementById('favorites-grid');
            
            if(isFavPage) {
                const favMovies = sampleMovies.filter(m => favorites.some(f => f.movie_id === m.id));
                const filteredFavs = favMovies.filter(m => m.title.toLowerCase().includes(val));
                renderFavorites(filteredFavs);
            } else {
                const filtered = sampleMovies.filter(m => m.title.toLowerCase().includes(val));
                renderMovies(filtered);
            }
        });
    }
});

// ===========================
// 4. RENDER (ГОЛОВНА)
// ===========================
function renderMovies(moviesList) {
    const grid = document.getElementById('movies-grid');
    if (!grid) return; 

    grid.innerHTML = '';

    if (!moviesList || moviesList.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #888; margin-top: 50px;"><h2>За вашим запитом нічого не знайдено</h2></div>`;
        return;
    }

    moviesList.forEach(movie => {
        const isFavorite = favorites.some(f => f.movie_id === movie.id);
        const card = createMovieCard(movie, isFavorite, false); 
        grid.appendChild(card);
    });
}

// ===========================
// 5. RENDER (ОБРАНЕ)
// ===========================
function renderFavorites(moviesList) {
    const grid = document.getElementById('favorites-grid');
    const empty = document.getElementById('empty-favorites');
    
    if (!grid || !empty) return;

    if (!moviesList || moviesList.length === 0) {
        if (favorites.length > 0 && moviesList.length === 0) {
             empty.style.display = 'none';
             grid.style.display = 'block'; 
             grid.innerHTML = `<h2 style="color: #888; text-align: center; width: 100%;">За фільтрами нічого не знайдено</h2>`;
             return;
        }
        empty.style.display = 'block';
        grid.style.display = 'none';
        return;
    }

    empty.style.display = 'none';
    grid.style.display = 'grid';
    grid.innerHTML = '';

    moviesList.forEach(movie => {
        grid.appendChild(createMovieCard(movie, true, true));
    });
}

// ===========================
// 6. СТВОРЕННЯ КАРТКИ
// ===========================
function createMovieCard(movie, isFavorite = false, isFavoritesPage = false) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    let buttonClass = isFavorite ? (isFavoritesPage ? 'remove-favorite' : 'favorited-main') : 'add-favorite';
    
    let buttonIcon = isFavorite 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>`;
        
    let buttonText = isFavorite ? (isFavoritesPage ? 'Видалити' : 'В обраному') : 'В обране';

    // ТУТ БЕРЕМО КАРТИНКУ З ПАПКИ (movie.poster), А НЕ З API
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
                <span style="color: gold;">★ ${movie.rating || 'N/A'}</span>
            </div>
            <p class="movie-genre" style="margin-bottom: 10px; font-size: 12px; color: #888; height: 30px; overflow: hidden;">
                ${movie.genre}
            </p>
            <button class="movie-button ${buttonClass}">
                <span class="icon-wrap">${buttonIcon}</span> ${buttonText}
            </button>
        </div>
    `;

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
// 7. ЛОГІКА ADD/REMOVE
// ===========================
function addFavorite(id) {
    if (favorites.find(f => f.movie_id === id)) return;
    const movie = sampleMovies.find(m => m.id === id);
    if (!movie) return;
    favorites.push({ movie_id: movie.id, added_at: Date.now() });
    saveFavorites();
    
    if(document.getElementById('movies-grid')) renderMovies(sampleMovies);
    if(document.getElementById('favorites-grid')) {
        const allFavs = sampleMovies.filter(m => favorites.some(f => f.movie_id === m.id));
        renderFavorites(allFavs);
    }
    showToast(`"${movie.title}" додано в обране`);
}

function removeFavorite(id) {
    favorites = favorites.filter(f => f.movie_id !== id);
    saveFavorites();
    
    if(document.getElementById('movies-grid')) renderMovies(sampleMovies);
    if(document.getElementById('favorites-grid')) {
        const allFavs = sampleMovies.filter(m => favorites.some(f => f.movie_id === m.id));
        renderFavorites(allFavs);
    }
    showToast("Фільм видалено з обраних");
}

// ===========================
// 8. ФІЛЬТРИ
// ===========================
const filterBtn = document.getElementById("filterBtn");
const filtersWindow = document.getElementById("filtersWindow");
const applyBtn = document.getElementById("applyFiltersBtn");
const clearBtn = document.getElementById("clearFiltersBtn");
const yearFromInput = document.getElementById("yearFrom");
const yearToInput = document.getElementById("yearTo");
const ratingInput = document.getElementById("ratingFrom");
const genreCheckboxes = document.querySelectorAll('input[name="genre"]');

if (filterBtn && filtersWindow) {
    filterBtn.addEventListener("click", () => {
        filtersWindow.classList.toggle("hidden");
    });
}

if (applyBtn) {
    applyBtn.addEventListener("click", () => {
        const selectedGenres = Array.from(genreCheckboxes).filter(cb => cb.checked).map(cb => cb.value.toLowerCase());
        let yFrom = parseInt(yearFromInput.value);
        let yTo = parseInt(yearToInput.value);
        if (isNaN(yFrom)) yFrom = 1900;
        if (isNaN(yTo)) yTo = 2030;
        let minRating = parseFloat(ratingInput.value);
        if (isNaN(minRating)) minRating = 0;

        const isFavoritesPage = !!document.getElementById('favorites-grid');
        let sourceList = isFavoritesPage ? sampleMovies.filter(m => favorites.some(f => f.movie_id === m.id)) : sampleMovies;

        const filtered = sourceList.filter(movie => {
            const movieGenresStr = movie.genre.toLowerCase(); 
            const genreMatch = selectedGenres.length === 0 || selectedGenres.some(g => movieGenresStr.includes(g));
            const yearMatch = movie.year >= yFrom && movie.year <= yTo;
            const ratingMatch = movie.rating >= minRating;
            return genreMatch && yearMatch && ratingMatch;
        });

        if (isFavoritesPage) renderFavorites(filtered);
        else renderMovies(filtered);

        filtersWindow.classList.add("hidden");
        showToast(`Знайдено: ${filtered.length} фільмів`);
    });
}

if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        genreCheckboxes.forEach(cb => cb.checked = false);
        if(yearFromInput) yearFromInput.value = "";
        if(yearToInput) yearToInput.value = "";
        if(ratingInput) ratingInput.value = "";

        const isFavoritesPage = !!document.getElementById('favorites-grid');
        if (isFavoritesPage) {
            const allFavs = sampleMovies.filter(m => favorites.some(f => f.movie_id === m.id));
            renderFavorites(allFavs);
        } else {
            renderMovies(sampleMovies);
        }
        filtersWindow.classList.add("hidden");
        showToast("Фільтри очищено");
    });
}

// ===========================
// 9. API ЛОГІКА (ОБОВ'ЯЗКОВА ЧАСТИНА КУРСОВОЇ)
// ===========================
async function loadMovieFromAPI() {
    const params = new URLSearchParams(window.location.search);
    const imdbID = params.get('id');
    if (!imdbID) return;

    const loadingEl = document.getElementById('loading');
    const contentEl = document.getElementById('movie-content');
    if(!loadingEl || !contentEl) return;

    const localMovie = sampleMovies.find(m => m.imdbID === imdbID);
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            loadingEl.style.display = 'none';
            contentEl.style.display = 'block';

            const safeSet = (id, txt) => { const el = document.getElementById(id); if(el) el.textContent = txt; }

            // Пріоритет: локальні дані (укр мова + правильний опис F1)
            if (localMovie) {
                safeSet('api-title', localMovie.title);
                safeSet('api-genre', localMovie.genre);
                safeSet('api-plot', localMovie.description);
                safeSet('api-year', localMovie.year); // Беремо наш 2025 рік
            } else {
                safeSet('api-title', data.Title);
                safeSet('api-genre', data.Genre);
                safeSet('api-plot', data.Plot);
                safeSet('api-year', data.Year);
            }

            // Пріоритет: API дані (Актори) - Тільки якщо це НЕ F1, бо там нові актори
            // Або для надійності беремо акторів, які я додав у масив
            if(localMovie && localMovie.actors) {
                 safeSet('api-actors', localMovie.actors);
            } else {
                 safeSet('api-actors', data.Actors);
            }
            
            safeSet('api-rating', data.imdbRating);
            safeSet('api-country', data.Country);
            
            // ВАЖЛИВО: КАРТИНКА ЛОКАЛЬНА
            const posterContainer = document.getElementById('api-poster-container');
            if (posterContainer) {
                const posterSrc = localMovie ? localMovie.poster : data.Poster;
                posterContainer.innerHTML = `<img src="${posterSrc}" alt="${data.Title}" style="width: 100%; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.5);">`;
            }
        } else {
            loadingEl.textContent = 'Помилка API: ' + data.Error;
        }
    } catch (error) {
        console.error(error);
        if(localMovie) {
             loadingEl.style.display = 'none';
             contentEl.style.display = 'block';
             document.getElementById('api-title').textContent = localMovie.title;
             document.getElementById('api-plot').textContent = localMovie.description;
             document.getElementById('api-year').textContent = localMovie.year;
             if(localMovie.actors) document.getElementById('api-actors').textContent = localMovie.actors;
             document.getElementById('api-poster-container').innerHTML = `<img src="${localMovie.poster}" style="width:100%">`;
        }
    }
}

// ===========================
// 10. TOAST
// ===========================
function showToast(text, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = text;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}