'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coat = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyes = ['black', 'red', 'blue', 'yellow', 'green'];

// Функция получения рандомного значения (дублируется из stats.js)
var getRandomValue = function (min, max) {
  return min + Math.random() * (max - min);
};

// Функция для получения индекса рандомного элемента массива
var getRandomIndex = function (arr) {
  var index = Math.round(getRandomValue(0, arr.length - 1));
  return index;
};

var wizards = [
  {
    name: WIZARD_NAMES[getRandomIndex(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomIndex(WIZARD_SURNAMES)],
    coatColor: coat[getRandomIndex(coat)],
    eyesColor: eyes[getRandomIndex(eyes)]
  },
  {
    name: WIZARD_NAMES[getRandomIndex(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomIndex(WIZARD_SURNAMES)],
    coatColor: coat[getRandomIndex(coat)],
    eyesColor: eyes[getRandomIndex(eyes)]
  },
  {
    name: WIZARD_NAMES[getRandomIndex(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomIndex(WIZARD_SURNAMES)],
    coatColor: coat[getRandomIndex(coat)],
    eyesColor: eyes[getRandomIndex(eyes)]
  },
  {
    name: WIZARD_NAMES[getRandomIndex(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandomIndex(WIZARD_SURNAMES)],
    coatColor: coat[getRandomIndex(coat)],
    eyesColor: eyes[getRandomIndex(eyes)]
  }
];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (arrWizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = arrWizard.name;
  wizardElement.querySelector('.wizard-coat').setAttribute('fill', arrWizard.coatColor);
  wizardElement.querySelector('.wizard-eyes').setAttribute('fill', arrWizard.eyesColor);

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
