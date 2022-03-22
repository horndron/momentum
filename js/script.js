import playList from './playlist.js';
import contentTranslation from './translation.js';


const timeElem = document.querySelector('.time');
const dateElem = document.querySelector('.date');
const name = document.querySelector('.name');
const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const play = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const inputsRange= document.querySelectorAll("input[type='range']");
const progressAudio = document.querySelector('#progress');
const trackTitle = document.querySelector('.track-title');
const currentTimeValue= document.querySelector('.current-time');
const durationValue= document.querySelector('.duration');
const volumeSlider= document.querySelector('.volume-slider');
const volumePercentage= document.querySelector('.volume-percentage');
const volumeBnt = document.querySelector('.volume-icon');
const langAll = document.querySelectorAll('[name="lang"]');
const inputHideBlocks = document.querySelectorAll('[name="hideblocks"]');
const todoList = document.querySelector('.todo-list');
const newTodo = document.querySelector('#todo-new')
const sourceimgAll = document.querySelectorAll('[name="sourceimg"]');
let tagImage = document.querySelector('#tag-image').value;


let sourceimg = `${document.querySelector('[name="sourceimg"]:checked').value}`;
let allTodoLabel;
let allTodoDeleteBtn;
let currentLang = `${document.querySelector('[name="lang"]:checked').value}`;
let randomNum;
let playNum = 0;





function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();

  timeElem.textContent = currentTime;

  showDate();
  showGreeting();

  setTimeout(showTime, 1000);
}
showTime();


function showDate() {
  const date = new Date();
  const option = {month: 'long',day: 'numeric'}
  const currentWeekDay = date.getDay();
  let currentDate;
  if(currentLang == 'en'){
    currentDate = date.toLocaleDateString('en-En',option);
  } else {
    currentDate = date.toLocaleDateString('ru-Ru',option);
  }
  

  dateElem.textContent =`${contentTranslation.weekday[currentLang][currentWeekDay]}, ${currentDate}`;

  setTimeout(showTime, 1000);
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay = '';

  if(hours < 12 && hours > 5) {

    timeOfDay = 'morning';

  } else if(hours < 18 && hours > 11) {

    timeOfDay = 'afternoon';

  } else if(hours <= 23 && hours > 17) {

    timeOfDay = 'evening';

  } else timeOfDay = 'night';
  
  return timeOfDay;
}

function showGreeting() {

  const greeting = document.querySelector('.greeting');
  if(currentLang === 'en') {
    greeting.textContent = `${contentTranslation.greeting[currentLang]} ${contentTranslation.timeofday.en[getTimeOfDay()]}`;
  } else {
    greeting.textContent = `${contentTranslation.greeting.ru[getTimeOfDay()]} ${contentTranslation.timeofday.ru[getTimeOfDay()]}`;
  }
}

function setLocaleStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('currentLang', currentLang);
  localStorage.setItem('tagImage', tagImage);
  localStorage.setItem('langChecked', document.querySelector('[name="lang"]:checked').id);
  localStorage.setItem('sourceimg', document.querySelector('[name="sourceimg"]:checked').id);
  if(allTodoLabel) {
    let allValue = [];

    allTodoLabel.forEach((elem) => {
      let value = elem.querySelector('input').value;
      allValue.push(value);
    })

    localStorage.setItem('allValue', allValue);
  }
  

  inputHideBlocks.forEach((input) => {
      let value = input.value;
      localStorage.setItem(value, input.checked);
  });
}

window.addEventListener('beforeunload', setLocaleStorage);

function getLocaleStorage() {

  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  

  if(localStorage.getItem('currentLang')) {
    currentLang = localStorage.getItem('currentLang');
  }

  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else city.value = `${contentTranslation.minsk[currentLang]}`;

  
  if(localStorage.getItem('langChecked')){
    let langChecked = localStorage.getItem('langChecked');
    document.querySelector(`#${langChecked}[name="lang"]`).checked = true;
  }
  

  if(localStorage.getItem('sourceimg')){
    let sourceimgStorage = localStorage.getItem('sourceimg');
    document.querySelector(`#${sourceimgStorage}[name="sourceimg"]`).checked = true;
    sourceimg = `${document.querySelector('[name="sourceimg"]:checked').value}`;
  }
  

  inputHideBlocks.forEach((input) => {
    let value = input.value;

    if(localStorage.getItem(value) == 'true'){
      input.checked = true;
    };
    
    hideVisibleBlockStorage(input, value);
  });

  if(localStorage.getItem('allValue')) {
    let allValue = localStorage.getItem('allValue');
    allValue = allValue.split(',');
    
    allValue.forEach((value) => {
      addNewTodoInLocaleStorage(value);
    })
  }

  if(localStorage.getItem('tagImage')) {
    document.querySelector('#tag-image').value = localStorage.getItem('tagImage');
    tagImage = localStorage.getItem('tagImage');
  }

  getLinkToImagegithub();
  getLinkToImageUnsplash();
  getLinkToImageFlickr();
  setBg();
  getQuotes();
  getWeather();
  langsettings();
}

window.addEventListener('load', getLocaleStorage);



function getRandomNum() {
  randomNum = Math.ceil(Math.random() * 19) + 1;
}
getRandomNum();

//  GITHAB IMG


function getLinkToImagegithub() {
  let timeOfDay;
  if(tagImage) {
    timeOfDay = tagImage;
  } else {
    timeOfDay = getTimeOfDay();
  }

  let bgNum = String(randomNum);
  bgNum = bgNum.padStart(2, 0);
  let imgsrc = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;

  return imgsrc;
}

async function getLinkToImageUnsplash() {
  let timeOfDay;
  if(tagImage) {
    timeOfDay = tagImage;
  } else {
    timeOfDay = getTimeOfDay();
  }

  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=tynJmY22ivjosvY3M1A52_-GX88CmyUkzTk6CQXVA08`;
  const result = await fetch(url)
  const data = await result.json();
  
  let imgsrc = data.urls.regular;
  
  return imgsrc;
}

async function getLinkToImageFlickr() {
  let timeOfDay;
  if(tagImage) {
    timeOfDay = tagImage;
  } else {
    timeOfDay = getTimeOfDay();
  }

  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=fe8efe9e0abc0963d7602f3e3630726e&tags=${timeOfDay}&extras=url_l&per_page=21&format=json&nojsoncallback=1`;
  const result = await fetch(url)
  const data = await result.json();

  let imgsrc = data.photos.photo[randomNum].url_l;
  
  return imgsrc;
}


async function setBg() {
  const image = new Image();

  if(sourceimg == 'gitHub'){
    image.src =await getLinkToImagegithub();
  }
  if(sourceimg == 'unsplash') {
    image.src =await getLinkToImageUnsplash();
  }
  if(sourceimg == 'flickr') {
    image.src =await getLinkToImageFlickr();
  }

  image.onload = () => {
    body.style.backgroundImage = `url('${image.src}')`;
  };
}

function getSlidePrev() {
  if(sourceimg == 'gitHub' || sourceimg == 'flickr'){
    if(randomNum == 1){
      randomNum = 20;
    } else --randomNum;
    getLinkToImageFlickr();
  }

  if(sourceimg == 'unsplash') {
    getLinkToImageUnsplash();
  }
  
  setBg();
}


function getSlideNext() {
  if(sourceimg == 'gitHub' || sourceimg == 'flickr'){
    if(randomNum == 1){
      randomNum = 20;
    } else --randomNum;
    getLinkToImageFlickr();
  }

  if(sourceimg == 'unsplash') {
    getLinkToImageUnsplash();
  }
  
  setBg();
}



document.addEventListener('load', setBg);
slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

sourceimgAll.forEach((elem) => {
  elem.addEventListener('change', () => {

    sourceimg = elem.value;
    setBg();
  });
})





async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${currentLang}&appid=386670cc24cb88e6def69f94f68b07ac&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 

  weatherIcon.className = 'weather-icon owf';

  if (data.cod == 200) {
    weatherError.textContent = ``;

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${contentTranslation.wind[currentLang]}: ${Math.floor(data.wind.speed)} ${contentTranslation.ms[currentLang]}`;
    humidity.textContent = `${contentTranslation.humidity[currentLang]}: ${data.main.humidity}%`;
  } else {

    weatherError.textContent = `Error: ${data.message} for '${city.value}'!`;

    temperature.textContent = ``;
    weatherDescription.textContent = '';
    wind.textContent = ``;
    humidity.textContent = ``;
  }

  
}


function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}


document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else city.value = `${contentTranslation.minsk[currentLang]}`;

  getWeather();
})
city.addEventListener('change', getWeather);
city.addEventListener('keypress', setCity);


let randomQuote;

function getRandomQuotes() {
  randomQuote = Math.ceil(Math.random() * 10);
}
getRandomQuotes();



function getQuotes() {
  const quotes = '../assets/quotes/data.json';
  fetch(quotes)
    .then(res => res.json())
    .then(data => {
      
      quote.textContent = data[currentLang][randomQuote].text;
      author.textContent = data[currentLang][randomQuote].author;

    });
}
document.addEventListener('DOMContentLoaded', getQuotes);
changeQuote.addEventListener('click',() => {
  getRandomQuotes();
  getQuotes();
});


const audio = new Audio();

function audioPlayer() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  progressAudio.value = audio.currentTime;
}

document.addEventListener('DOMContentLoaded', audioPlayer);


playList.forEach(elem => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = elem.title;

  playListContainer.append(li);
})

let playItems = document.querySelectorAll('.play-item');
let isPlaying = false;

function togglePlayPause() {
  if(!isPlaying) {
    audio.play();
    isPlaying = true;
  } else {
    audio.pause();
    isPlaying = false;
  }
  playItemActive();
  titleAudioTrack();
}


function togglePlayPauseBtn() {
  play.classList.toggle('pause');
  playItemActive();
  
}

play.addEventListener('click', togglePlayPause);
play.addEventListener('click', togglePlayPauseBtn);
// play.addEventListener('click', () => {
//   document.querySelector('.item-active').classList.toggle('pause');
// });


playItems.forEach((elem, index) => {
  
  elem.addEventListener('click', () => {
    playNum = index;

    audioPlayer();
  
      

    if(elem.classList.contains('item-active')) {

      togglePlayPause();
      togglePlayPauseBtn();
      elem.classList.toggle('pause');
    } else {

      audio.play();
      isPlaying = true;
      elem.classList.add('pause');
      play.classList.add('pause');
    }
    
    AudioProgress();
    playItemActive();
    titleAudioTrack();
    AudioProgress();
  });

  
  
})

function playPrev() {
  
  if(playNum == 0) {
    playNum = playList.length - 1;
  } else {
    playNum--;
  }
  audioPlayer();
  playItemActive();
  titleAudioTrack();
  if(isPlaying) {
    audio.play();
  }
}

function playNext() {
  
  if(playNum == playList. length - 1) {
    playNum = 0;
  } else {
    playNum++;
  }
  audioPlayer();
  playItemActive();
  titleAudioTrack();
  
  if(isPlaying) {
    audio.play();
  }
}


function playItemActive() {
  let playItemsActive = document.querySelector('.item-active');
  if(playItemsActive) {
    playItemsActive.classList.remove('item-active');
  }
  playItems[playNum].classList.add('item-active');
  if(isPlaying) {
    playItems[playNum].classList.add('pause');
  } else {
    playItems[playNum].classList.remove('pause');
  }
}


audio.addEventListener('ended', playNext);
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);










inputsRange.forEach(function(item) {
  item.addEventListener('input', function() {
    const value = this.value;
    // this.style.background = `linear-gradient(to right, #fff 0%, #fff ${value * 100}%, rgb(255, 255, 255, 0.5) ${value * 100}%, rgb(255, 255, 255, 0.5) 100%)`;
  })
})



function AudioProgress() {
  progressAudio.max = audio.duration || 0;
  let progressPercent = (audio.currentTime / audio.duration) || 0;

  let current = formatAudioTime(Math.floor(audio.currentTime)) || '00:00';
  let duration = formatAudioTime(Math.floor(audio.duration));
  if (duration === "NaN:NaN") {
    duration = "0:00";
}
  currentTimeValue.textContent = current;
  durationValue.textContent = duration;
  progressAudio.value = audio.currentTime;
  // progressAudio.style.background = `linear-gradient(to right, #fff 0%, #fff ${progressPercent * 100}%, rgb(255, 255, 255, 0.5) ${progressPercent *100}%, rgb(255, 255, 255, 0.5) 100%)`;
}

function changeProgressBar() {
  audio.currentTime = progressAudio.value;
};

function scrub(elem) {
  const scrubTime = (elem.offsetX / progressAudio.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
}


function titleAudioTrack() {
  trackTitle.textContent = playList[playNum].title;
}


function formatAudioTime(s) {
  let minute = Math.floor((s / 60));
  let second = Math.floor(s - (minute * 60));
  if (second < 10){ 
    second  = `0${second}`;
  };
  return `${minute}:${second}`;
};




let mousedown = false;

audio.addEventListener('timeupdate', AudioProgress);
progressAudio.addEventListener('change', changeProgressBar);
progressAudio.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressAudio.addEventListener('mousedown', () => mousedown = true);
progressAudio.addEventListener('mouseup', () => mousedown = false);



function changeVolume(e) {
  const volumeWidth = window.getComputedStyle(volumeSlider).width;

  let newVolume = e.offsetX / parseInt(volumeWidth);
  audio.volume = newVolume;
  volumePercentage.style.width = newVolume * 100 + '%';
}

volumeSlider.addEventListener('click', changeVolume);


function muteToggle() {

  if(volumeBnt.classList.contains('mute')) {
    volumeBnt.classList.remove('mute');
    audio.muted = false;
  } else {
    volumeBnt.classList.add('mute');
    audio.muted = true;
  }

}

volumeBnt.addEventListener('click', muteToggle);




langAll.forEach((elem) => {
  elem.addEventListener('click', () => {
    currentLang = elem.value;

    showDate();
    showGreeting();
    getWeather();
    getQuotes();
    langsettings();
  })
})





const settingBtn = document.querySelector('.setting');

settingBtn.addEventListener('click', () => {
  settingBtn.classList.toggle('open');
  document.querySelector('.setting-window').classList.toggle('visible');
})



function langsettings() {
  const langLabel = document.querySelector('.choose-lang-label');
  const sourceLabel = document.querySelector('.source-label');
  const hideBlocksLabel = document.querySelector('.hide-blocks-label');

  const hideAudioplayer = document.querySelector('.hide-audioplayer span');
  const hideWeather = document.querySelector('.hide-weather span');
  const hideTime = document.querySelector('.hide-time span');
  const hideDate = document.querySelector('.hide-date span');
  const hideGreeting = document.querySelector('.hide-greeting span');
  const hideQuotes = document.querySelector('.hide-quotes span');
  const hideTodo = document.querySelector('.hide-todo span');
  const todayTodo = document.querySelector('.today-todo');
  const todoNew = document.querySelector('#todo-new');
  const tagImage = document.querySelector('#tag-image');
  const todoBtn = document.querySelector('.todo-btn');

  langLabel.textContent = `${contentTranslation.chooselanglabel[currentLang]}`;
  sourceLabel.textContent = `${contentTranslation.sourceLabel[currentLang]}`;
  hideBlocksLabel.textContent = `${contentTranslation.hideBlocksLabel[currentLang]}`;

  hideAudioplayer.textContent = `${contentTranslation.hideAudioplayer[currentLang]}`;
  hideWeather.textContent = `${contentTranslation.hideWeather[currentLang]}`;
  hideTime.textContent = `${contentTranslation.hideTime[currentLang]}`;
  hideDate.textContent = `${contentTranslation.hideDate[currentLang]}`;
  hideGreeting.textContent = `${contentTranslation.hideGreeting[currentLang]}`;
  hideQuotes.textContent = `${contentTranslation.hideQuotes[currentLang]}`;
  hideTodo.textContent = `${contentTranslation.hideTodo[currentLang]}`;
  todayTodo.textContent = `${contentTranslation.todayTodo[currentLang]}`;
  todoNew.placeholder = `${contentTranslation.todoNew[currentLang]}`;
  tagImage.placeholder = `${contentTranslation.tagImage[currentLang]}`;
  todoBtn.textContent = `${contentTranslation.todoBtn[currentLang]}`;
}

document.addEventListener('DOMContentLoaded', langsettings);


function hideVisibleBlock() {
  const inpitValue = this.value;
  const hideblock = document.querySelector(`#${inpitValue}`);
  if(this.checked == true) {
    hideblock.classList.add('hidden');
  } else {
    hideblock.classList.remove('hidden');
  }
}

function hideVisibleBlockStorage(e, value) {
  const hideblock = document.querySelector(`#${value}`);
  if(e.checked == true) {
    hideblock.classList.add('hidden');
  } else {
    hideblock.classList.remove('hidden');
  }
}

inputHideBlocks.forEach((input) => {
  input.addEventListener('change', hideVisibleBlock);
})



const todogBtn = document.querySelector('.todo-btn');

todogBtn.addEventListener('click', () => {
  document.querySelector('.todo-window').classList.toggle('visible');
})




function addNewTodoInLocaleStorage(elem) {
  const todoLabel = document.createElement('label');
  const todo = document.createElement('input');
  const todoLabelSpan = document.createElement('span');
  const todoDeleteBtn = document.createElement('button');

  todo.setAttribute('type', 'checkbox');
  todo.setAttribute('name', 'todolist');
  todo.value = elem;

  todoLabelSpan.textContent = elem;

  todoLabel.append(todo);
  todoLabel.append(todoLabelSpan);
  todoLabel.append(todoDeleteBtn);

  todoList.append(todoLabel);
  allTodoLabel = document.querySelectorAll('.todo-list label');
  allTodoDeleteBtn = document.querySelectorAll('.todo-list button');
  eventTodoRemove()
}




function addNewTodo() {
  const todoLabel = document.createElement('label');
  const todo = document.createElement('input');
  const todoLabelSpan = document.createElement('span');
  const todoDeleteBtn = document.createElement('button');

  todo.setAttribute('type', 'checkbox');
  todo.setAttribute('name', 'todolist');
  todo.value = newTodo.value;

  todoLabelSpan.textContent = newTodo.value;

  todoLabel.append(todo);
  todoLabel.append(todoLabelSpan);
  todoLabel.append(todoDeleteBtn);

  todoList.append(todoLabel);
  allTodoLabel = document.querySelectorAll('.todo-list label');
  allTodoDeleteBtn = document.querySelectorAll('.todo-list button');
  eventTodoRemove()
}


newTodo.addEventListener('keypress', (e) => {
  if(e.code == 'Enter') {
    addNewTodo();
    newTodo.value = '';
  }
})


function removeTodo() {
  this.closest('label').remove();
  allTodoLabel = document.querySelectorAll('.todo-list label');
  allTodoDeleteBtn = document.querySelectorAll('.todo-list button');
  eventTodoRemove()
}

function eventTodoRemove() {
  allTodoDeleteBtn.forEach((elem)=> {
    elem.addEventListener('click', removeTodo);
  })
}


document.querySelector('#tag-image').addEventListener('keypress', (e) => {
  if(e.code == 'Enter') {
    tagImage = e.target.value;


    getLinkToImagegithub();
    getLinkToImageUnsplash();
    getLinkToImageFlickr();
    setBg();
  }
});




let sselfAssessment = `
Ваша оценка - 163 балла 
Отзыв по пунктам ТЗ:

Привет! Спасибо за проверку моего задания, вроде бы сделано все что требуется к проверке. 
Единственное фотки с Flickr грузятся почему-то долговато.
Если будут вопросы можете смело мне писать!

Выполненные пункты:
1) время выводится в 24-часовом формате, например: 21:01:00 

2) время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) 

3) выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня" 

4) текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь). Проверяется соответствие приветствия текущему времени суток 

5) пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется 

6) ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20). Проверяем, что при перезагрузке страницы фоновое изображение изменилось. Если не изменилось, перезагружаем страницу ещё раз 

7) изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана.Изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) 

8) изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) 

9) при смене слайдов важно обеспечить плавную смену фоновых изображений. Плавную смену фоновых изображений не проверяем: 1) при загрузке и перезагрузке страницы 2) при открытой консоли браузера 3) при слишком частых кликах по стрелкам для смены изображения 

10) при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage 

11) для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API. Данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел 

12) выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) 

13) при загрузке страницы приложения отображается рандомная цитата и её автор 

14) при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) 

15) при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause 

16) при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play 

17) треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) 

18) трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем 

19) после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. 

20) добавлен прогресс-бар в котором отображается прогресс проигрывания 

21) при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека 

22) над прогресс-баром отображается название трека 

23) отображается текущее и общее время воспроизведения трека 

24) есть кнопка звука при клике по которой можно включить/отключить звук 

25) добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука 

26) можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте 

27) переводится язык и меняется формат отображения даты 

28) переводится приветствие 

29) переводится прогноз погоды в т.ч описание погоды 

30) переводится цитата дня  

31) переводятся настройки приложения, при переключении языка приложения в настройках, язык настроек тоже меняется 

32) в качестве источника изображений может использоваться Unsplash API 

33) в качестве источника изображений может использоваться Flickr API 

34) в настройках приложения можно указать язык приложения (en/ru или en/be)  

35) язык настроек определяется языком приложения, при переключении языка приложения, язык настроек тоже меняется 

36) в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API 

37) если источником получения фото указан API, в настройках приложения можно указать тег, для которого API будет присылает фото 

38) в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал 

39) Скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их 

40) настройки приложения сохраняются при перезагрузке страницы 

41) ToDo List - список дел (как в оригинальном приложении) или Список ссылок (как в оригинальном приложении) или Свой собственный дополнительный функционал, по сложности аналогичный предложенным 
`;



