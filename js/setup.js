'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = document.querySelector('.setup-close');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizards = [];

var fragment = document.createDocumentFragment();


// Открытие и закрытие формы
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

// Функция для получения рандомного элемента массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция для рандомного набора параметров волшебника
var generateWizardData = function (wizardsNumber) {
  for (var i = 0; i < wizardsNumber; i++) {
    wizards[i] = {
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    };
  }
};

// Функция отрисовки одного волшебника
var renderWizardElement = function (arrWizards) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = arrWizards.name;
  wizardElement.querySelector('.wizard-coat').setAttribute('fill', arrWizards.coatColor);
  wizardElement.querySelector('.wizard-eyes').setAttribute('fill', arrWizards.eyesColor);

  return wizardElement;
};

var renderWizards = function () {
  generateWizardData(4);
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizardElement(wizards[i]));
  }
};

renderWizards();
similarListElement.appendChild(fragment);

var form = document.querySelector('.setup-wizard-form');
var coatColorInput = form.querySelector('[name="coat-color"]');
var eyesColorInput = form.querySelector('[name="eyes-color"]');
var fireballColorInput = form.querySelector('[name="fireball-color"]');

var coat = document.querySelector('.wizard-coat');
var eyes = document.querySelector('.wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');

// Измененеие цвета элементов
var changeColor = function (element, colorsArray, elementInput) {
  var randomColor = getRandomElement(colorsArray);
  element.style.fill = randomColor;
  element.style.backgroundColor = randomColor;
  elementInput.value = randomColor;
};

eyes.addEventListener('click', function () {
  changeColor(eyes, EYES_COLORS, eyesColorInput);
});

coat.addEventListener('click', function () {
  changeColor(coat, COAT_COLORS, coatColorInput);
});

fireball.addEventListener('click', function () {
  changeColor(fireball, FIREBALL_COLORS, fireballColorInput);
});

// Валидация форма
var userNameInput = form.querySelector('.setup-user-name');
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;
  form.reportValidity();

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});
