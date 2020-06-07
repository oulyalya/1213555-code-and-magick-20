'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizards = [];

// Функция для получения рандомного элемента массива
var getRandomElemet = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция для рандомного набора параметров волшебника
var generateWizardData = function (wizardsNumber) {
  for (var i = 0; i < wizardsNumber; i++) {
    wizards[i] = {
      name: getRandomElemet(WIZARD_NAMES) + ' ' + getRandomElemet(WIZARD_SURNAMES),
      coatColor: getRandomElemet(COAT_COLORS),
      eyesColor: getRandomElemet(EYES_COLORS)
    };
  }
};

var renderWizard = function (arrWizards) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = arrWizards.name;
  wizardElement.querySelector('.wizard-coat').setAttribute('fill', arrWizards.coatColor);
  wizardElement.querySelector('.wizard-eyes').setAttribute('fill', arrWizards.eyesColor);

  return wizardElement;
};

generateWizardData(4);

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');
