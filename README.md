<div align="center">
    <h1>Текстовый редактор для работы с рукописной видео- и аудиоинформацией</h1>
</div>

Данный проект представляет из себя текстовый редактор работающий в браузере пользователя и позволяющий обрабатывать текст при помощи мыши, голосовых команд и использования видеопотока.

![Изображение редактора](https://github.com/DmitryPotemkin/Rich_text_editor_with_alternative_input_methods/blob/main/img/md%20images/main.jpg)

Разрабатываемый проект отвечает следующим требованиям:
- **Адаптивный дизайн:** Редактор разработан с использованием отзывчивого дизайна (responsive web design), чтобы обеспечить правильное отображение и функциональность на различных устройствах и экранах, включая настольные компьютеры, ноутбуки, планшеты и мобильные устройства.
- **Интерактивность:** Редактор обеспечивает возможность взаимодействия с пользователем. Это включает в себя такие функции, как выделение, копирование, вставка, замена и другие функции, свойственные текстовым редакторам.
- **Визуальный дизайн:** Редактор имеет привлекательный и интуитивно понятный дизайн пользовательского интерфейса. Внешний вид и расположение элементов продуманы таким образом, чтобы облегчить использование редактора и повысить удобство работы с ним.
- **Поддержка форматирования текста:** Редактор предоставляет возможность форматирования текста: изменение размера шрифта, жирный, курсив, подчеркнутый и зачеркнутый текст, списки, выравнивание и другие свойства форматирования, которые позволят пользователям создавать и редактировать текст по своему усмотрению.
- **Возможность сохранения файлов:** Редактор предоставляет возможность сохранения и загрузки текстовых файлов, чтобы пользователи могли сохранять свою работу и восстанавливать ее позже.
- **Поддержка многоязычности:** Редактор поддерживает возможность работы с русскими и английскими языками и символами.
- **Поддержка альтернативных методов ввода:** Редактор предоставляет возможность ввода текста не только с помощью клавиатуры, но и с использованием других методов, таких как голосовой ввод, считывание информации при помощи камеры или ввод с помощью стилуса на устройствах сенсорного экрана. Для этого могут потребоваться дополнительные библиотеки или API, в зависимости от выбранных альтернативных методов ввода.

<div align="center">
    <h2>Инструменты реализации</h2>
</div>

![Инструменты реализации](https://github.com/DmitryPotemkin/Rich_text_editor_with_alternative_input_methods/blob/main/img/md%20images/Tecnologies.jpg)

Реализуемый проект написан при помощи инструментов веб разработки: языка разметки **HTML**, каскадных таблиц стилей **CSS** и языка программирования **JavaScript**.

- Для распознавания текста на графических файлах было решено выбрать JavaScript библиотеку **Tesseract.js** благодаря её простоте и эффективности распознавания. 
- Для распознавания речевой информации была выбрана стандартная JavaScript-библиотека **Web Speech API**.

<div align="center">
    <h2>Рукописный ввод</h2>
</div>

Дря активации режима рукописного ввода требуется нажать кнопку с изображением пера. Появится панель в которую можно мышью вводить текст.Если результатом распознавания соответствует ожиданиям, после нажатия клавишы ctrl или кнопки ввода результата распознавания, находящейся в верхнем правом углу панели рукописного ввода, можно перенести результат распознавания в место расположения курсора.

![Рукописный ввод](https://github.com/DmitryPotemkin/Rich_text_editor_with_alternative_input_methods/blob/main/img/md%20images/Handwrite.gif)

Помимо кнопки, отвечающей за ввод распознанной информации в редактор, по бокам рукописной панели расположены ещё пять кнопок:
- Кнопка “стереть” – отвечает за удаление символа с позиции курсора в текстовом редакторе
- Кнопка “пробел” – ставит пропуск (пробел) на месте курсора
- Кнопка “Enter” – отвечает за добавление новой строки (переход на следующую строку)
- Кнопка “Ластик” – при активации меняет цвет для рисования на белый. При отключении возвращает чёрный цвет для рисования
- Кнопка “Очистить” – “Заливает” холст белым цветом

<div align="center">
    <h2>Голосовой ввод</h2>
</div>

Для активации режима голосового ввода требуется нажать кнопку с изображением микрофона. В данном режиме пользователь может вводить в редактор текст голосом.

![Голосовой ввод](https://github.com/DmitryPotemkin/Rich_text_editor_with_alternative_input_methods/blob/main/img/md%20images/Voice.gif)

Для упрощения голосового ввода реализованы следующие команды:
- “пробел”, “точка”, “запятая”, “вопросительный знак”, “восклицательный знак”, “тире”, “кавычки” - вводят соответствующий символ
- “новая строка” - переносит курсор на новую строку
- “начало”, “конец” - переносят курсор в начало или конец документа
- “стоп” - останавливает режим голосового ввода
- “стереть” - стирает слово перед курсором

<div align="center">
    <h2>Ввод с помощью веб камеры</h2>
</div>

Для активации режима ввода с использованием видеопотока требуется нажать кнопку с изображением камеры. Появляются две панели: в первую производится вывод видеопотока, а во вторую выводится результат обработки изображения и кнопка, при нажатии на которую результат распознавания будет вставлен в редактор. 

![Ввод с использованием видеопотока](https://github.com/DmitryPotemkin/Rich_text_editor_with_alternative_input_methods/blob/main/img/md%20images/Camera.gif)
