'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_Y_BOTTOM = CLOUD_Y + CLOUD_HEIGHT;
var CLOUD_PADDING = 20;

var WELCOME_TEXT_X = CLOUD_X + CLOUD_PADDING;
var WELCOME_TEXT_Y = CLOUD_Y + CLOUD_PADDING;

var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var HORIZONTAL_GAP = 50;
var VERTICAL_GAP = 10;

// Функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция получения максимального элемента
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// Функция получения минимального времени для дальнейшего нахождения индекса победителя (для вывода результатов)
var getMinElement = function (arr) {
  var minElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < minElement) {
      minElement = arr[i];
    }
  }
  return minElement;
};

// Функция определения имени победителя для вывода результатов
var getWinnerName = function (arrPlayers, arrTimes) {
  var minTime = getMinElement(arrTimes);
  var winnerIndex = arrTimes.indexOf(minTime);
  var winnerName = arrPlayers[winnerIndex];
  return winnerName;
};

// Функция получения случайного значения для насыщенности hsl цвета
var getRandomValue = function (min, max) {
  return min + Math.random() * (max - min);
};

// Функия вывода текста
var renderText = function (ctx, x, y, text, baseline) {
  ctx.fillStyle = '#000';
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
};

// Функция вывода облака с результатами
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, 100, 10, '#fff');

  // Сообщение с фактическим именем победителя
  if (getWinnerName(players, times) === 'Вы') {
    renderText(ctx, WELCOME_TEXT_X, WELCOME_TEXT_Y, 'Ура вы победили!', 'hanging');
  } else {
    renderText(ctx, WELCOME_TEXT_X, WELCOME_TEXT_Y, 'Победил(а) ' + getWinnerName(players, times) + '!', 'hanging');
  }

  renderText(ctx, WELCOME_TEXT_X, WELCOME_TEXT_Y + VERTICAL_GAP * 2, 'Список результатов:', 'hanging');

  var maxTime = getMaxElement(times);

  // Гистограмма
  for (var i = 0; i < players.length; i++) {
    // отступ слева + ширина колонки + (отступ + колонка) * количчество предшествующих колонок
    var columnX = HORIZONTAL_GAP + CLOUD_X + (COLUMN_WIDTH + HORIZONTAL_GAP) * i;
    // отступ от низа облака до нижнего текста
    var columnYBottom = CLOUD_Y_BOTTOM - 1.5 * CLOUD_PADDING;
    // пропорциональная высота бара
    var currentBarHeight = Math.round((COLUMN_HEIGHT * times[i]) / maxTime);
    // отступ от максимального Y бара до верха текущего бара
    var currentBarYTop = COLUMN_HEIGHT - currentBarHeight;

    ctx.fillText(Math.round(times[i]), columnX, columnYBottom - 2.5 * VERTICAL_GAP - currentBarHeight);

    ctx.fillStyle = 'hsl(242, 79%, ' + getRandomValue(10, 90) + '%';
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(columnX, columnYBottom - VERTICAL_GAP - COLUMN_HEIGHT + currentBarYTop, COLUMN_WIDTH, currentBarHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], columnX, columnYBottom);
  }
};
