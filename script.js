// заводим переменные под наши задачи
let List = document.querySelector('#tdlApp ul');
let Mask = 'tdl_';
// тут будем хранить внутренний номер документа, чтобы связать список и текст в редакторе
let N_store;
let language = "Ru"
let editor = document.getElementById('editor');

const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
const recognition = new speechRecognition()
recognition.continuous = true;
recognition.iterimResults = true;
recognition.lang = 'ru-RU';

function formatText(command, value = null) {
    if (command === 'backColor') {
        document.execCommand('hiliteColor', false, value);
        return;
    }
    document.execCommand(command, false, value);
    if (command != 'fontName' && command != 'fontSize' && command != 'foreColor' && command != 'backColor') {
        updateActiveState(command); // Обновление состояния активности кнопок
    }
    updateDropdownValues(); // Обновление значений выпадающих списков
    updateColorInputs(); // Обновить значения цветов в <input type="color">
    editor.focus();
}

if (window.innerWidth < 800) {
    let editorScale = (window.innerWidth / 800) * 0.97
    let editorHeight = editor.clientHeight * editorScale;
    editor.style.transform = `scale(${editorScale})`;
    document.getElementById('editorContainer').style.height = editorHeight + "px";
}
else {
    editor.style.transform = `scale(${1})`;
}
window.addEventListener("resize", function () {
    if (window.innerWidth < 800) {
        let editorScale = (window.innerWidth / 800) * 0.97
        let editorHeight = editor.clientHeight * editorScale;
        editor.style.transform = `scale(${editorScale})`;
        if (editorHeight == 0) {
            document.getElementById('editorContainer').style.height = 1000 + "px";
        }
        else {
            document.getElementById('editorContainer').style.height = editorHeight + "px";
        }

    }
    else {
        let editorHeight = editor.clientHeight
        editor.style.transform = `scale(${1})`;
        document.getElementById('editorContainer').style.height = editorHeight + "px";
    }
});

function updateActiveState(command) {
    const buttons = {
        bold: document.getElementById('boldButton'),
        italic: document.getElementById('italicButton'),
        underline: document.getElementById('underlineButton'),
        strikeThrough: document.getElementById('strikeThroughButton'),
        superscript: document.getElementById('superscriptButton'),
        subscript: document.getElementById('subscriptButton'),
        justifyLeft: document.getElementById('justifyLeftButton'),
        justifyCenter: document.getElementById('justifyCenterButton'),
        justifyRight: document.getElementById('justifyRightButton'),
        justifyFull: document.getElementById('justifyFullButton'),
        insertUnorderedList: document.getElementById('insertUnorderedListButton'),
        insertOrderedList: document.getElementById('insertOrderedListButton'),
        cardbold: document.getElementById('cardboldButton'),
        carditalic: document.getElementById('carditalicButton'),
        cardunderline: document.getElementById('cardunderlineButton'),
        cardstrikeThrough: document.getElementById('cardstrikeThroughButton'),
        cardsuperscript: document.getElementById('cardsuperscriptButton'),
        cardsubscript: document.getElementById('cardsubscriptButton'),
        cardjustifyLeft: document.getElementById('cardjustifyLeftButton'),
        cardjustifyCenter: document.getElementById('cardjustifyCenterButton'),
        cardjustifyRight: document.getElementById('cardjustifyRightButton'),
        cardjustifyFull: document.getElementById('cardjustifyFullButton'),
        cardinsertUnorderedList: document.getElementById('cardinsertUnorderedListButton'),
        cardinsertOrderedList: document.getElementById('cardinsertOrderedListButton')
    };

    const isActive = document.queryCommandState(command);
    if (isActive) {
        buttons[command].classList.add('active');
        buttons['card' + command].classList.add('active');
    } else {
        buttons[command].classList.remove('active');
        buttons['card' + command].classList.remove('active');
    }
}

function updateDropdownValues() {
    const fontNameSelect = document.getElementById('fontNameSelect');
    const fontSizeSelect = document.getElementById('fontSizeSelect');
    const cardfontNameSelect = document.getElementById('cardfontNameSelect');
    const cardfontSizeSelect = document.getElementById('cardfontSizeSelect');
    const fontNameValue = document.queryCommandValue('fontName');
    const fontSizeValue = document.queryCommandValue('fontSize');
    if (fontNameValue == "Arial, sans-serif" || fontNameValue == "Arial") {
        fontNameSelect.value = "Arial";
        cardfontNameSelect.value = "Arial";
    }
    else if (fontNameValue == "\"Times New Roman\"") {
        fontNameSelect.value = "Times New Roman";
        cardfontNameSelect.value = "Times New Roman";
    }
    else if (fontNameValue == "\"Courier New\"") {
        fontNameSelect.value = "Courier New";
        cardfontNameSelect.value = "Courier New";
    }
    fontSizeSelect.value = fontSizeValue;
    cardfontSizeSelect.value = fontSizeValue;
}

document.addEventListener('click', function (event) {
    if (editor.contains(event.target)) {
        updateDropdownValues();
        updateColorInputs();
        updateActiveState('bold');
        updateActiveState('italic');
        updateActiveState('underline');
        updateActiveState('strikeThrough');
        updateActiveState('superscript');
        updateActiveState('subscript');
        updateActiveState('justifyLeft');
        updateActiveState('justifyCenter');
        updateActiveState('justifyRight');
        updateActiveState('justifyFull');
        updateActiveState('insertUnorderedList');
        updateActiveState('insertOrderedList');
    }
});

function updateColorInputs() {
    var fontColor = document.queryCommandValue('foreColor');
    var fontBackColor = document.queryCommandValue('backColor');
    fontColor = rgbToHex(fontColor);
    fontBackColor = rgbToHex(fontBackColor);
    document.getElementById('fontColor').value = fontColor;
    document.getElementById('fontBackColor').value = fontBackColor;
    document.getElementById('cardfontColor').value = fontColor;
    document.getElementById('cardfontBackColor').value = fontBackColor;
}

function rgbToHex(rgb) {
    var values = rgb.match(/\d+/g); // Получить числовые значения RGB
    var hex = "#";
    for (var i = 0; i < 3; i++) {
        var hexValue = parseInt(values[i]).toString(16); // Преобразовать в шестнадцатеричный формат
        if (hexValue.length < 2) {
            hexValue = "0" + hexValue;
        }
        hex += hexValue;
    }
    return hex;
}

//Создание таблицы
function createTable() {
    let rows = prompt("Введите количество строк:");
    let columns = prompt("Введите количество столбцов:");
    let table = "<table style='border-collapse: collapse;'>";
    for (let i = 0; i < rows; i++) {
        table += "<tr>";
        for (let j = 0; j < columns; j++) {
            table += "<td style='border: 1px solid black; padding: 5px;'>";
            table += " ";
            table += "</td>";
        }
        table += "</tr>";
    }
    table += "</table>";
    document.execCommand('insertHTML', false, table);
    editor.focus();
}

//Сохранение документа в локальное хранилище
document.querySelector('#editor').addEventListener('input', function () {
    localStorage.setItem(N_store + 'text_in_editor', editor.innerHTML);
});

// функция, которая берёт из памяти наши документы и делает из них список
function showTasks() {
    // временно скрываем окно редактора
    editor.style.display = "none";

    // узнаём размер хранилища
    let Storage_size = localStorage.length;

    // если в хранилище что-то есть…
    if (Storage_size > 0) {
        // то берём и добавляем это в список документов
        for (let i = 0; i < Storage_size; i++) {
            let key = localStorage.key(i);
            if (key.indexOf(Mask) == 0) {
                // запоминаем внутренний номер документа, чтобы правильно показать текст в редакторе
                N_store = key[4];
                // создаем элемент списка
                let listItem = document.createElement('li');
                listItem.classList.add('tdItem');
                listItem.setAttribute('data-itemid', key);
                listItem.textContent = localStorage.getItem(key);
                List.appendChild(listItem);

                // создаем кнопку удаления
                let deleteButton = document.createElement('button');
                deleteButton.classList.add('deleteButton');
                listItem.prepend(deleteButton);
            }
        }
    }
}

// сразу вызываем эту функцию, вдруг в памяти уже остались документы с прошлого раза
showTasks();

// следим, когда пользователь напишет название нового документа в поле ввода и нажмёт Enter
let input = document.querySelector('#tdlApp input');
input.addEventListener('keydown', function (e) {
    if (e.keyCode != 13) return;
    let str = e.target.value;
    e.target.value = "";

    // если в поле ввода было что-то написано — начинаем обрабатывать
    if (str.length > 0) {
        let number_Id = 0;
        let listItemElements = List.children;
        for (let i = 0; i < listItemElements.length; i++) {
            let element_Id = listItemElements[i].getAttribute('data-itemid').slice(4);
            if (element_Id > number_Id)
                number_Id = element_Id;
        }
        number_Id++;
        // отправляем новый документ сразу в память
        localStorage.setItem(Mask + number_Id, str);

        // готовим для него новое поле редактора
        // берём текущий внутренний номер документа
        N_store = number_Id;
        // отправляем в память 
        localStorage.setItem(N_store + 'text_in_editor', '');
        // делаем окно редактора видимым и очищаем текст в нём
        let editor = document.getElementById('editor');
        editor.innerHTML = '';
        editor.style.display = "block";
        // создаем элемент списка
        let listItem = document.createElement('li');
        listItem.classList.add('tdItem');
        listItem.setAttribute('data-itemid', Mask + number_Id);
        listItem.textContent = str;
        List.appendChild(listItem);
        // создаем кнопку удаления
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        listItem.prepend(deleteButton);
        // меняем заголовок редактора
        document.getElementById('name').innerHTML = localStorage.getItem('tdl_' + N_store);
        // Делаем шрифт документа Times New Roman
        editor.style.fontFamily = "Times New Roman";
    }
});

// при клике на названии документа — делаем его активным и даём с ним работать
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('tdItem')) {
        // находим документ, по которому кликнули
        let jet = e.target;
        // делаем документ активным
        // получаем внутренний номер документа
        N_store = jet.getAttribute('data-itemid')[4];
        // делаем окно редактора видимым и заполняем его содержимым из памяти
        let editor = document.getElementById('editor');
        editor.style.display = "block";
        editor.innerHTML = localStorage.getItem(N_store + 'text_in_editor');

        // меняем заголовок редактора
        document.getElementById('name').innerHTML = localStorage.getItem('tdl_' + N_store);
    }
});

// при клике на кнопке "Удалить" — удаляем соответствующий элемент списка
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('deleteButton')) {
        let listItem = e.target.closest('.tdItem'); // находим родительский элемент списка
        let itemId = listItem.getAttribute('data-itemid'); // получаем идентификатор элемента списка
        // удаляем элемент из памяти
        localStorage.removeItem(itemId);
        localStorage.removeItem(itemId[4] + 'text_in_editor');
        // очищаем и скрываем окно редактора, если удаляемый элемент был активным
        let editor = document.getElementById('editor');
        if (N_store == itemId[4]) {
            editor.innerHTML = '';
            editor.style.display = "none";
            document.getElementById('name').innerHTML = 'Редактор';
        }
        // удаляем элемент из списка
        listItem.remove();
    }
});


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function downloadDocument(element, filename = '') {
    if (editor.style.display != "none") {
        let preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        let postHtml = "</body></html>";
        let html = preHtml + document.getElementById(element).innerHTML + postHtml;
        let blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });
        let url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
        filename = document.getElementById('name').innerHTML + '.doc';
        let downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            downloadLink.href = url;
            downloadLink.download = filename;
            downloadLink.click();
        }
        document.body.removeChild(downloadLink);
    }
}

lengButton = document.getElementById('language')
function switchLanguage() {
    if (language == "Ru") {
        language = "En";
        lengButton.textContent = "En";
        recognition.lang = 'en-US';
    }
    else {
        language = "Ru"
        lengButton.textContent = "Ru";
        recognition.lang = 'ru-RU';
    }
}

let handwritingPanel = document.getElementById('handwritingPanel');

function toggleHandwritingPanel() {
    if (handwritingPanel.style.display === 'none') {
        if (videoPanel.style.display != 'none') {
            toggleVideo()
        }
        handwritingPanel.style.display = 'block'
        document.getElementById('handwritingPanelButton').classList.add('active');
        editor.style.paddingBottom = "220px"
    }
    else {
        handwritingPanel.style.display = 'none'
        document.getElementById('handwritingPanelButton').classList.remove('active');
        editor.style.paddingBottom = "50px"
    }
    editor.focus();
}

//рукописный ввод:
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let isMouseDown = false;
let isColorBlack = true;
ctx.lineWidth = 5 * 2;

function clearCanv() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    document.getElementById('eraseButton').classList.remove('active');
    document.getElementById('smallEraseButton').classList.remove('active');
    starting();
    editor.focus();
}

clearCanv();

function changeColor() {
    if (isColorBlack) {
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        isColorBlack = false;
        document.getElementById('eraseButton').classList.add('active');
        document.getElementById('smallEraseButton').classList.add('active');
    }
    else {
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        isColorBlack = true;
        document.getElementById('eraseButton').classList.remove('active');
        document.getElementById('smallEraseButton').classList.remove('active');
    }
    editor.focus();
}

let cursorPos = 0
canvas.addEventListener('mousedown', function () {
    if (document.activeElement === editor) {
        cursorPos = getCursorPosition(editor)
    }
    isMouseDown = true;
});

canvas.addEventListener('mouseup', function () {
    setCursorPosition(editor, cursorPos)
    isMouseDown = false;
    ctx.beginPath();
    starting();
});

canvas.onmousemove = function (event) {
    if (isMouseDown) {
        let x = event.offsetX;
        let y = event.offsetY;

        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

function getImage(canvas) {
    let imageData = canvas.toDataURL();
    let image = new Image();
    image.src = imageData;
    return image;
}

function backspaceButton() {
    document.execCommand('delete');
    editor.focus();
    localStorage.setItem(N_store + 'text_in_editor', editor.innerHTML);
}

function spaceButton() {
    pushResult(" ");
    localStorage.setItem(N_store + 'text_in_editor', editor.innerHTML);
}

function enterButton() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const br = document.createElement("br");
    range.insertNode(br);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    localStorage.setItem(N_store + 'text_in_editor', editor.innerHTML);
}

// Распознавание изображения
function recognize(file) {
    if (language == "Ru") {
        return Tesseract.recognize(file, "rus")
            .then(({ data: { text } }) => {
                return text;
            });
    }
    else {
        return Tesseract.recognize(file, "eng")
            .then(({ data: { text } }) => {
                return text;
            });
    }
}

const recognizedText = document.getElementById('recognizedText');

// Вывод результата
function setResult(text) {
    text = text.replace(/\n\s*\n/g, '\n');
    text = text.slice(0, -1);
    recognizedText.innerHTML = text;
}

function starting() {
    let file = getImage(document.getElementById("canvas"));
    if (!file) return;

    recognize(file)
        .then(setResult);
}


window.addEventListener("keydown", function (e) {
    if (handwritingPanel.style.display === 'block' && e.ctrlKey) {
        pushResult(document.getElementById("recognizedText").textContent)
        clearCanv();
    }
    if (videoPanel.style.display === 'block' && e.ctrlKey) {
        pushResult(document.getElementById("photoRecognizedText").textContent)
    }
});

function handwritingPanelPushButton() {
    pushResult(document.getElementById("recognizedText").textContent)
    clearCanv();
}

function videoPanelPushButton() {
    pushResult(document.getElementById("photoRecognizedText").textContent)
}

function pushResult(txt) {
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let insertionArea = editor;

    // Проверяем, что диапазон выделения находится внутри элемента "insertionArea"
    if (insertionArea.contains(range.startContainer) && insertionArea.contains(range.endContainer)) {
        range.deleteContents();
        let txtWithSpaces = txt.replace(/ /g, '\u00A0'); // Заменяем все пробелы на неразрывные пробелы
        let txtNode = document.createTextNode(txtWithSpaces);
        range.insertNode(txtNode);
        range.setStartAfter(txtNode);
        range.setEndAfter(txtNode);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    localStorage.setItem(N_store + 'text_in_editor', editor.innerHTML);
    if (document.activeElement === editor) {
        cursorPos = getCursorPosition(editor)
    }
}


function getCursorPosition(parent) {
    let selection = document.getSelection()
    let range = new Range
    range.setStart(parent, 0)
    range.setEnd(selection.anchorNode, selection.anchorOffset)
    return range.toString().length
}

function setCursorPosition(parent, position) {
    let child = parent.firstChild
    while (position > 0) {
        let length = child.textContent.length
        if (position > length) {
            position -= length
            child = child.nextSibling
        }
        else {
            if (child.nodeType == 3) return document.getSelection().collapse(child, position)
            child = child.firstChild
        }
    }
    editor.focus();
}

function cursorLeft() {
    let range = window.getSelection().getRangeAt(0);
    let newRange = document.createRange();
    newRange.setStart(range.startContainer, range.startOffset - 1);
    newRange.setEnd(range.endContainer, range.endOffset - 1);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(newRange);
    editor.focus();
}

function setCursorToEnd() {
    let range = document.createRange();
    let selection = window.getSelection();
    range.selectNodeContents(editor);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    editor.focus();
}

function eraseWord() {
    cursorPos = getCursorPosition(editor);
    if (cursorPos > 0) {
        if (editor.textContent.charAt(cursorPos - 1) == " ") {
            document.execCommand('delete');
            cursorPos = getCursorPosition(editor);
        } else {
            while ((editor.textContent.charAt(cursorPos - 1) != " ") && (editor.textContent.charAt(cursorPos - 1) != "\n") && cursorPos > 0) {
                console.log(editor.textContent.charAt(cursorPos - 1))
                document.execCommand('delete');
                cursorPos = getCursorPosition(editor);
            }
        }
    }
    editor.focus();
    localStorage.setItem(N_store + 'text_in_editor', editor.innerHTML);
}

//Распознавание речи
let flag_recog = false

const startRecogn = () => {
    if (!flag_recog) {
        recognition.start()
        flag_recog = true
    }
    else {
        recognition.abort()
        flag_recog = false
    }
    editor.focus();
}

recognition.onstart = () => { document.getElementById("speechRecognitionButton").classList.add('active'); }
recognition.onerror = ({ error }) => { console.log(error) }
recognition.onend = () => { document.getElementById("speechRecognitionButton").classList.remove('active'); }

recognition.onresult = (e) => {
    let i = e.results.length - 1
    if (e.results[i].isFinal) {
        let last_text = e.results[i][0].transcript.trim().toLowerCase();
        switch (last_text) {
            case "пробел":
            case "space":
                pushResult(' ');
                break;
            case "точка":
            case "dot":
                pushResult('.');
                break;
            case "запятая":
            case "comma":
                pushResult(',');
                break;
            case "вопросительный знак":
            case "question mark":
                pushResult('?');
                break;
            case "восклицательный знак":
            case "exclamation point":
                pushResult('!');
                break;
            case "тире":
            case "dash":
                pushResult('-');
                break;
            case "кавычки":
            case "quotes":
                pushResult('"');
                break;
            case "новая строка":
            case "new line":
                enterButton();
                break;
            case "начало":
            case "start":
                setCursorPosition(editor, 1);
                cursorLeft();
                break;
            case "конец":
            case "end":
                setCursorToEnd();
                break;
            case "стоп":
            case "stop":
                startRecogn();
                break;
            case "стереть":
            case "erase":
                eraseWord();
                break;
            default:
                cursorPos = getCursorPosition(editor);
                if (cursorPos > 0) {
                    if (editor.textContent.charAt(cursorPos - 1) == "." || editor.textContent.charAt(cursorPos - 1) == "!" || editor.textContent.charAt(cursorPos - 1) == "?") {
                        last_text = last_text[0].toUpperCase() + last_text.slice(1);
                    }
                    else if (editor.textContent.charAt(cursorPos - 1) == " ") {
                        while (editor.textContent.charAt(cursorPos - 1) == " " && cursorPos > 0) {
                            cursorPos = cursorPos - 1;
                            if (editor.textContent.charAt(cursorPos - 1) == "." || editor.textContent.charAt(cursorPos - 1) == "!" || editor.textContent.charAt(cursorPos - 1) == "?") {
                                last_text = last_text[0].toUpperCase() + last_text.slice(1);
                            }
                        }
                    }
                }
                else {
                    last_text = last_text[0].toUpperCase() + last_text.slice(1);
                }
                pushResult(last_text);
        }
    }
}

// Видеоввод
const video = document.getElementById('video');
const toggleButton = document.getElementById('toggleButton');
let stream;
let intervalId; // Переменная для хранения идентификатора интервала
let videoPanel = document.getElementById('videoPanel');

function toggleVideo() {
    if (stream) {
        // Если видео уже запущено, остановить его
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        stream = null;
        video.srcObject = null;
        videoPanel.style.display = 'none';
        document.getElementById('toggleButton').classList.remove('active');
        clearInterval(intervalId);
    } else {
        if (handwritingPanel.style.display != 'none') {
            toggleHandwritingPanel()
        }
        // Включить видео
        videoPanel.style.display = 'block';
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        }).then(newStream => {
            stream = newStream;
            video.srcObject = stream;
            intervalId = setInterval(takePhoto, 2000);
        }).catch(console.error);
        document.getElementById('toggleButton').classList.add('active');
    }
    editor.focus();
}

function takePhoto() {
    const photoCanvas = document.createElement('canvas');
    const context = photoCanvas.getContext('2d');
    photoCanvas.width = video.videoWidth;
    photoCanvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, photoCanvas.width, photoCanvas.height);
    imgFile = getImage(photoCanvas);
    if (!imgFile) return;
    recognize(imgFile)
        .then(setResultPhoto);
}

const photoRecognizedText = document.getElementById('photoRecognizedText');

let ftSize = 0
let ftSizeText = ''
// Вывод результата
function setResultPhoto(text) {
    text = text.replace(/\n\s*\n/g, '\n');
    text = text.slice(0, -1);
    photoRecognizedText.innerHTML = text;
    if (text.length > 500) {
        ftSize = 500 / text.length
        ftSizeText = ftSize.toFixed(2) + 'em'
        photoRecognizedText.style.fontSize = ftSizeText;
    } else {
        photoRecognizedText.style.fontSize = '1em';
    }
}