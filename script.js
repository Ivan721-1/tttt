const пользователи = [];

        // Текущий пользователь (пока не авторизован)
        let текущийПользователь = null;

        // Массив статей
        const статьи = [];

        // Класс Пользователь
        class Пользователь {
            constructor(почта, пароль, имя) {
                this.почта = почта;
                this.пароль = пароль;
                this.имя = имя;
                this.сохраненныеСтатьи = []; // добавляем список сохраненных статей для каждого пользователя
            }
        }

        // Класс Статья
        class Статья {
            constructor(заголовок, содержание, теги, файл) {
                this.заголовок = заголовок;
                this.содержание = содержание;
                this.теги = теги;
                this.файл = файл;
            }
        }

        // Функция для входа
        function войти() {
            const почта = document.getElementById("почта").value;
            const пароль = document.getElementById("пароль").value;

            // Проверяем наличие пользователя с такой почтой и паролем
            const найденныйПользователь = пользователи.find(пользователь => пользователь.почта === почта && пользователь.пароль === пароль);

            if (найденныйПользователь) {
                текущийПользователь = найденныйПользователь;
                отобразитьГлавнуюСтраницу();
            } else {
                alert("Неверная почта или пароль.");
            }
        console.log() }

        // Функция для регистрации нового пользователя
        function зарегистрировать() {
            const новоеИмя = document.getElementById("новоеИмя").value;
            const новаяПочта = document.getElementById("новаяПочта").value;
            const новыйПароль = document.getElementById("новыйПароль").value;

            // Создаем нового пользователя
            const новыйПользователь = new Пользователь(новаяПочта, новыйПароль, новоеИмя);
            пользователи.push(новыйПользователь);

            // Очищаем поля формы регистрации
            document.getElementById("новоеИмя").value = "";
            document.getElementById("новаяПочта").value = "";
            document.getElementById("новыйПароль").value = "";

            alert("Регистрация успешно завершена. Теперь вы можете войти на сайт.");
        }

        // Функция для отображения главной страницы
        function отобразитьГлавнуюСтраницу() {
            document.getElementById("страницаАвторизации").style.display = "none";
            document.getElementById("главнаяСтраница").style.display = "block";

            // Приветствие пользователя
            if (текущийПользователь) {
                const приветствие = document.getElementById("приветствиеПользователя");
                приветствие.textContent = `Добро пожаловать, ${текущийПользователь.имя}!`;
                приветствие.style.display = "block";
            }

            // Проверяем, является ли текущий пользователь администратором
            if (текущийПользователь && текущийПользователь.почта === "kalitkin03@list.ru") {
                // Если пользователь администратор, отображаем кнопку "Добавить статью"
                document.getElementById("добавитьСтатью").style.display = "block";
                // Также отображаем кнопку "Профиль" и "Выход"
                document.getElementById("перейтиКПрофилю").style.display = "block";
                document.getElementById("выйти").style.display = "block";
            }

            // Отображаем список статей
            отобразитьСтатьи();
                console.log()
        }

        // Функция для отображения списка статей
        function отобразитьСтатьи() {
            const списокСтатей = document.getElementById("списокСтатей");
            списокСтатей.innerHTML = "";

            статьи.forEach(статья => {
                const ссылка = document.createElement("a");
                ссылка.href = "#";
                ссылка.classList.add("article-link");
                ссылка.textContent = статья.заголовок;
                ссылка.onclick = () => показатьСтатью(статья);
                списокСтатей.appendChild(ссылка);
            });
        }

        // Функция для отображения конкретной статьи
        function показатьСтатью(статья) {
    const страница = document.createElement("div");
    страница.innerHTML = `
        <h2>${статья.заголовок}</h2>
        <p>${статья.содержание}</p>
        <div class="tags">
            ${статья.теги.map(тег => `<span>${тег}</span>`).join("")}
        </div>
        <form>
            <input type="checkbox" id="сохранитьСтатью" onclick="сохранитьСтатью('${статья.заголовок}')">
            <label for="сохранитьСтатью">Сохранить статью</label><br>
            <input type="submit" value="Скачать файл" onclick="скачатьФайл('${статья.файл}')">
        </form>
        <button onclick="вернутьсяНаГлавнуюСтраницу()">Вернуться на главную страницу</button> <!-- Вот здесь добавлена кнопка -->
    `;
    document.body.innerHTML = "";
    document.body.appendChild(страница);
}

        // Функция для скачивания файла
        function скачатьФайл(файл) {
            alert(`Файл ${файл} загружен.`);
        }

        // Функция для сохранения статьи в профиль пользователя
        function сохранитьСтатью(заголовок) {
            текущийПользователь.сохраненныеСтатьи.push(заголовок);
            alert(`Статья "${заголовок}" сохранена в вашем профиле.`);
        }

        // Функция для показа формы добавления статьи
        function показатьФормуДобавленияСтатьи() {
            document.getElementById("главнаяСтраница").style.display = "none";
            document.getElementById("страницаДобавленияСтатьи").style.display = "block";
        }

        // Функция для отображения формы регистрации
        function показатьФормуРегистрации() {
            document.getElementById("страницаАвторизации").style.display = "none";
            document.getElementById("формаРегистрации").style.display = "block";
        }

        // Функция для перехода к профилю администратора
        function перейтиКПрофилю() {
            document.getElementById("главнаяСтраница").style.display = "none";
            document.getElementById("страницаПрофиля").style.display = "block";
            // Отобразить список всех пользователей
            отобразитьПользователей();
            // Отобразить сохраненные статьи пользователя
            отобразитьСохраненныеСтатьи();
        }

        // Функция для выхода из аккаунта
        function выйти() {
            текущийПользователь = null;
            location.reload();
        }

        // Функция для отображения списка всех пользователей (доступна только администратору)
        function отобразитьПользователей() {
            const списокПользователей = document.getElementById("списокПользователей");
            списокПользователей.innerHTML = "";
            пользователи.forEach(пользователь => {
                const элемент = document.createElement("div");
                элемент.textContent = пользователь.почта;
                списокПользователей.appendChild(элемент);
            });
        }

        // Функция для отображения сохраненных статей пользователя
        function отобразитьСохраненныеСтатьи() {
            const списокСтатей = document.getElementById("списокСтатей");
            списокСтатей.innerHTML = "";

            текущийПользователь.сохраненныеСтатьи.forEach(заголовок => {
                const ссылка = document.createElement("a");
                ссылка.href = "#";
                ссылка.classList.add("article-link");
                ссылка.textContent = заголовок;
                ссылка.onclick = () => показатьСтатью(статьи.find(статья => статья.заголовок === заголовок));
                списокСтатей.appendChild(ссылка);
            });
        }

        // Функция для сохранения изменений в профиле администратора
        function сохранитьИзменения() {
            const новоеИмя = document.getElementById("новоеИмяПрофиль").value;
            const новаяПочта = document.getElementById("новаяПочтаПрофиль").value;
            const новыйПароль = document.getElementById("новыйПарольПрофиль").value;

            // Обновляем данные администратора (пока просто выводим их в консоль)
            console.log("Новое имя: " + новоеИмя);
            console.log("Новая почта: " + новаяПочта);
            console.log("Новый пароль: " + новыйПароль);
        }

        // Функция для возвращения на главную страницу из профиля или страницы добавления статьи
        function вернутьсяНаГлавнуюСтраницу() {
    document.getElementById("страницаПрофиля").style.display = "none";
    document.getElementById("страницаДобавленияСтатьи").style.display = "none";
    document.getElementById("главнаяСтраница").style.display = "block";
        }

        // Инициализация пользователей и статей (замените на данные из базы данных)
пользователи.push(new Пользователь("null7211@mail.ru", "000", "Пользователь0"));
пользователи.push(new Пользователь("johndoe7211@gmail.com", "123456789", "Пользователь1"));
пользователи.push(new Пользователь("eliza79@mail.ru", "987654321", "Пользователь2"));
пользователи.push(new Пользователь("kalitkin15@inbox.ru", "190675", "Пользователь3"));
пользователи.push(new Пользователь("kalitkin03@list.ru", "fbtusur", "Администратор"));
        статьи.push(new Статья("Режиссёрский почерк Стэнли Кубрика", "Стэнли Кубрик в большинстве своих фильмов в качестве основы сюжета выбирал существующий роман, затем договаривался и вместе с автором редактировал сюжет для будущей экранизации. Во многих его фильмах можно услышать закадровый голос (в основном от лица главного героя), комментирующий некоторые сцены.
Начиная с фильма «Космическая одиссея 2001 года» во всех его фильмах, за исключением «Цельнометаллической оболочки», используются предварительно подготовленные записи
классической музыки. Кроме того, он часто использует весёлое звучание поп-музыки в сценах, изображающих разрушение и уничтожение, особенно в заключительных титрах или последних кадрах фильма.
В своём обзоре фильма «Цельнометаллическая оболочка» Роджер Эберт отметил, что во многих фильмах Кубрика встречаются крупные планы, где голова персонажа наклонена вниз, а его глаза обращены вверх. Кубрик также активно использует широкоугольную съёмку, характер отслеживания съёмки, специфическое использование крупных планов, необычное панорамирование, наплыв и использование кадров с длинными параллельными стенами.
Многие фильмы Кубрика содержат отсылки к предыдущим фильмам Кубрика. Наиболее известным примером этого является появление альбома с саундтреком фильма «2001 год: Космическая одиссея» в магазине «Мелодия» в фильме «Заводной апельсин». Менее очевидным является ссылка на художника с именем Людовик в «Барри Линдоне» из фильма «Заводной апельсин».
Кубрик тщательно следил за выпусками своих фильмов в других странах. Режиссёр не только оставлял за собой полный контроль над процессом дубляжа на иностранные языки; иногда он отдельно снимал альтернативный материал для разных стран. Так, например, в «Сиянии» текст для пишущей машинки Джека был снят на разных языках, причём на каждом языке была подыскана подходящая поговорка. В фильме «С широко закрытыми глазами» для разных стран заголовки газет и бумажные записки были таким же образом сняты на разных языках. После смерти Кубрика лицензионным издателям его фильмов не разрешается создавать новые голосовые переводы к фильмам, над которыми он имел творческий контроль; в странах, где не существует авторизированных дубляжей (в их число входит и Россия), в качестве перевода допущены только субтитры. Кроме того, Кубрик дотошно следил за качеством перевода сценария на иностранные языки; как правило, он заставлял переводить иностранные версии диалогов обратно на английский язык для сравнения с оригиналом.
Стэнли Кубрик перед съёмками своих фильмов проводил тщательные исследования на их тему, и после его смерти в его поместье были найдены тысячи коробок с материалами этих исследований. В 2007 году его жена, Кристиана Кубрик, передала весь архив лондонскому университету искусств.", ["Кубрик", "режиссура"], "кубрик.pdf"));
статьи.push(new Статья("Первый фильм в истории кино", "На звание первого фильма в истории претендуют несколько картин. Это связано с тем, что в последней четверти XIX века несколько изобретателей из разных стран параллельно занимались созданием кинокамеры. Свои изобретения они проверяли на практике, снимая фильмы. В США это были Томас Эдисон и Уильям Диксон (создали устройство под названием «кинетограф»), в Германии — братья Макс и Эмиль Складановские (изобрели устройство для съемки и проекции под названием «биоскоп»), в Италии — Филотео Альберини, в Российской империи — инженер Иосиф Тимченко.
Но родиной кинематографа стала Франция. И чаще всего первым фильмом в истории называют «Прибытие поезда на вокзал Ла-Сьота́» братьев Огюста и Луи Люмьер. Этот 48-секундный немой черно-белый фильм был снят в 1895 году на вокзале города Ла-Сьота под Марселем. Как и другие ранние фильмы братьев Люмьер, «Прибытие поезда» снято одним дублем на неподвижную камеру, без монтажных склеек. Съемка велась на изобретенный Люмьерами киноаппарат (он так и назывался — синематограф), в который была заправлена пленка 35 мм. Тем не менее первый кинофильм в истории сняли не они.
Их соотечественник Луи Лепренс, придумавший собственный киноаппарат, в октябре 1888 года снял в Англии «Сцену в саду Раундхэй». В этом коротком, меньше двух секунд, фильме родные и друзья Лепренса прогуливаются по саду. «Сцена», состоявшая из 20 кадров, осталась только на фотобумаге (изобретатель использовал ее вместо пленки) и как фильм не демонстрировалась. Судьба самого Лепренса сложилась трагически: в 1890 году он отправился в поездку по Франции и исчез. Установить, что с ним произошло, полиции так и не удалось.", ["история", "факты"], "example.txt"));
статьи.push(new Статья("Визуальный стиль Зака Снайдера",
"Действие фильмов Снайдера всегда происходит в фантастическом, условном мире. Чтобы экранное пространство было живым и убедительным, Снайдер уделяет внимание наполняющим деталям. Это особенно заметно в статичных кадрах или в сценах, где нет особого действия. Снайдер обязательно придает таким сценам динамику кинематографическими элементами, вроде дождя, снега, дыма, огня и так далее. Кроме того, подобные детали всегда имеют символическое значение. Вода и огонь могут указывать на эмоциональное состояние героя.
Еще один способ создания нереальной атмосферы, которым пользуется Снайдер — цифровая цветокоррекция, как правило, темная и приглушенная. За счет этого режиссер создает узнаваемый брутальных характер своих фильмов. Привычные представления зрителя о том, каким должен быть цвет в той или иной истории режиссер разрушает и в более неожиданных случаях. Показательный пример — сравните костюм Супермена в комиксах, в большинстве картин о нем и в фильмах Снайдера.
Снайдера нередко упрекают в том, что он делает не фильмы, а двухчасовые музыкальные видео. Доля правды в этом есть — режиссер пришел в кино из клипов, и некоторые элементы клиповой эстетики перенес на большой экран. Отголоском клипового опыта Снайдера можно считать и его привычку делать открывающие титры самостоятельными эпизодами. Обычно из монтажа коротких и эффектных кадров складывается предыстория к основному сюжету. Пожалуй, самый интересный пример можно найти в начале «Хранителей», где титровый эпизод становится не только кратким экскурсом в прошлое главных героев, но и освещает ключевые события альтернативной истории второй половины XX века.
Обычно яркий экшн монтируется из времен из большого количества коротких кадров. Снайдер подошел к решению экшена иначе. В его картинах такие сцены часто делаются относительно длинными кадрами с чередованием быстрой трансфокации на важные детали и обратно к общим планам. Вкупе со slow motion неразрывность действия усиливает эффект вовлечения зрителя. Убедиться можно на примере знаменитой однокадровой батальной сцены из «300 спартанцев».", ["Снайдер", "режиссура"], "example.txt"));
статьи.push(new Статья("Последний фильм, снятый в СССР", "Фильм «Сердца трех» на киностудии имени Довженко полагают «последним, сделанным в СССР».
Кажется, роман "Сердца трех" вполне может рассматриваться как произведение, прошедшее самый долгий путь от создания сценария до экранизации. Лондон изначально писал роман как сценарий для приключенческого фильма еще в 1916 году, а первая и единственная экранизация состоялась аж в 1992 году, т.е. 76 лет спустя.
Судьба у романа и фильма примечательная: Джек Лондон вскоре после написания этого произведения скончался от передозировки, и роман вышел в свет только спустя три года. В 1991 году съемочная группа Владимира Попкова получила советские деньги на съемки и уехала из СССР в Индию, а, отсняв несколько сцен, вернулась уже в Россию.
По возвращении на родину, Попков столкнулся с проблемой, которая ставила под угрозу весь проект: Госкино прекратило вое существование, а, значит, прекратилось и финансирование. Режиссер пошел на крайние меры: взял в долг миллион долларов. К счастью, фильм оказался успешным, и он смог вернуть долги. Денег на Индию уже не было, поэтому все остальные сцены снимали в Крыму. Благодаря кропотливой работе по поиску мест, которые по описанию были похожи на Латинскую Америку, подмены практически никто не заметил.", ["история", "экранизация"], "example.txt"));


console.log(пользователи);
console.log(статьи);

        // Отображение страницы авторизации при загрузке страницы
        document.getElementById("страницаАвторизации").style.display = "block";
    

