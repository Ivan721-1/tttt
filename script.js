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
        }

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
        пользователи.push(new Пользователь("kalitkin03@list.ru", "fbtusur", "Администратор"));
пользователи.push(new Пользователь("eliza79@mail.ru", "987654321", "Пользователь2"));
пользователи.push(new Пользователь("kalitkin15@inbox.ru", "190675", "Пользователь3"));
        статьи.push(new Статья("Пример статьи", "Содержание примера статьи", ["пример", "статья"], "example.txt"));
console.log(пользователи);
console.log(статьи);

        // Отображение страницы авторизации при загрузке страницы
        document.getElementById("страницаАвторизации").style.display = "block";
    

