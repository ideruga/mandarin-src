var currentPointer = -1
var currentData = {}
var lesson1data = [
  {'sc': "我", 'py': "wǒ", 'eng': "I, me"},
  {'sc': "你", 'py': "nǐ", 'eng': "you (informal, singular)"},
  {'sc': "你们", 'py': "nǐ men", 'eng': "you (informal, plural)"},
  {'sc': "是", 'py': "shì", 'eng': "to be"},
  {'sc': "您", 'py': "nín", 'eng': "you (formal, singular)"},
  {'sc': "他", 'py': "tā", 'eng': "he"},
  {'sc': "她", 'py': "tā", 'eng': "she"},
  {'sc': "好", 'py': "hăo", 'eng': "good / very"},
  {'sc': "没", 'py': "méi", 'eng': "negative indicator"},
  {'sc': "有", 'py': "yŏu", 'eng': "to have"},
  {'sc': "叫", 'py': "jiào", 'eng': "to be called / to shout"},
  {'sc': "大家", 'py': "dàjiā", 'eng': "everyone"},
  {'sc': "人", 'py': "rén", 'eng': "person"},

  {'sc': "要", 'py': "yào", 'eng': "to want"},
  {'sc': "什么", 'py': "shénme", 'eng': "what"},
  {'sc': "名字", 'py': "míngzi", 'eng': "name"},
  {'sc': "这", 'py': "zhè", 'eng': "here/this"},
  {'sc': "那个", 'py': "nàge", 'eng': "that"},
  {'sc': "里", 'py': "lǐ", 'eng': "interior/inside"},
  {'sc': "哪里", 'py': "nă lĭ", 'eng': "where"},
  {'sc': "这里", 'py': "zhè lǐ", 'eng': "here"},
  {'sc': "那里", 'py': "nà lǐ", 'eng': "there"},
  {'sc': "几", 'py': "jĭ", 'eng': "how many / several"},
  {'sc': "岁", 'py': "suì", 'eng': "age"},
  {'sc': "老师", 'py': "lăoshī", 'eng': "teacher"},
  {'sc': "学生", 'py': "xuéshēng", 'eng': "student"},
  {'sc': "国", 'py': "guó", 'eng': "country"},
  {'sc': "男", 'py': "nán", 'eng': "male/boy"},
  {'sc': "女", 'py': "nǚ", 'eng': "female/girl"},
  {'sc': "的", 'py': "de", 'eng': "possessive indicator"},
  {'sc': "朋友", 'py': "péngyǒu", 'eng': "friend"},

  {'sc': "请", 'py': "qǐng", 'eng': "please"},
  {'sc': "不", 'py': "bù", 'eng': "negative particle (not)"},
  {'sc': "也", 'py': "yĕ", 'eng': "also / too"},
  {'sc': "来", 'py': "lái", 'eng': "to come"},
  {'sc': "从", 'py': "cóng", 'eng': "from"},

  {'sc': "高兴", 'py': "gāoxìng", 'eng': "happy"},
  {'sc': "见到", 'py': "jiàndào", 'eng': "to meet / to see"},
  {'sc': "很", 'py': "hěn", 'eng': "quite / very"},
  {'sc': "非常", 'py': "fēicháng", 'eng': "very / extremely"},
  {'sc': "可以", 'py': "kěyǐ", 'eng': "can / could"},
  {'sc': "告诉", 'py': "gàosù", 'eng': "tell / let know"},
]
var data = {'lesson1': lesson1data}

function initFlashcardDataStorage(lessonName, value) {
  var storage = {}
  $(data[lessonName]).each(function(idx, el) {
    var sc = el['sc']
    storage[sc] = value
  })
  localStorage.setItem(lessonName, JSON.stringify(storage))
}

function flashcardWordSettingChangeAll(tag, lessonName) {
  var value = tag.checked
  $('[id^=flashcardSettingCheckbox' + lessonName + ']').prop('checked', value)
  initFlashcardDataStorage(lessonName, value)

  resetFlashcard(lessonName, '&nbsp;')
}

function flashcardWordSettingChange(tag, lessonName, idx) {
  var dataStorage = JSON.parse(localStorage.getItem(lessonName))
  var word = data[lessonName][idx]['sc']
  dataStorage[word] = tag.checked
  localStorage.setItem(lessonName, JSON.stringify(dataStorage))
  resetFlashcard(lessonName, '&nbsp;')
}

function initFlashcardDataSettings(element, lessonName) {
  if (localStorage.getItem(lessonName) == undefined) {
    initFlashcardDataStorage(lessonName, true)
  }
  var dataStorage = JSON.parse(localStorage.getItem(lessonName))

  $(element).empty()
  var checkAllValue = $.grep(Object.keys(dataStorage), function(key, idx) {
    console.debug(dataStorage[key])
    return !dataStorage[key]
  }).length == 0//no unchecked elements

  var table = '<table class="table table-bordered">'
  table += '<thead><tr><th><input type="checkbox" ' + (checkAllValue? 'checked': '') + ' onchange="flashcardWordSettingChangeAll(this, \'' + lessonName + '\')"/></th> <th>Simplified</th> <th>Pinyin</th> <th>English</th></tr></thead>'
  $(data[lessonName]).each(function(idx, el) {
    table += '<tr><td><input id="flashcardSettingCheckbox' + lessonName + idx + '" type="checkbox" onchange="flashcardWordSettingChange(this, \'' + lessonName + '\', ' + idx + ')" ' + (dataStorage[el['sc']]? 'checked': '')  + '/></td> <td><a href="http://www.yellowbridge.com/chinese/dictionary.php?word=' + el['sc'] + '">'+ el['sc'] + '</a></td> <td>' + el['py'] + '</td> <td>' + el['eng'] + '</td></tr>'
  })
  table += '</table>'
  $(element).append(table)
}

function initFlashcards() {
  $('[id^=settings]').each(function(idx, settingsDiv) {
    $(settingsDiv).find(".modal-body").each(function(idx2, el) {
      var lessonName = $(settingsDiv).attr('flashcard')
      initFlashcardDataSettings(el, lessonName)
   })
  })
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function resetFlashcard(lessonName, prompt) {
  currentPointer = -1;
  var dataStorage = JSON.parse(localStorage.getItem(lessonName))
  var currentDataValues = jQuery.grep(data[lessonName], function(el, idx) {
    return dataStorage[el['sc']]
  })
  currentData[lessonName] = currentDataValues
  console.debug(currentDataValues)

  shuffle(currentData[lessonName])
  $('#' + lessonName + 'en').html("&nbsp;");
  $('#' + lessonName + 'sc').html(prompt);
  $('#' + lessonName + 'py').html("&nbsp;");
  $('#' + lessonName + 'button').html("Start");
}

function flashCard(lessonName, button) {
  if (currentPointer == -1) {
    resetFlashcard(lessonName, '&nbsp;')
  }
  currentPointer++;
  if (currentPointer == currentData[lessonName].length*2) {
    resetFlashcard(lessonName, "You're done!")
  } else if (currentPointer%2 == 0) {
    $('#' + lessonName + 'en').html(currentData[lessonName][currentPointer/2]['eng']);
    $('#' + lessonName + 'sc').html("&nbsp;");
    $('#' + lessonName + 'py').html("&nbsp;");
    button.html("Answer");
  } else {
    console.debug(currentPointer/2)
    $('#' + lessonName + 'sc').html("<a href='http://www.yellowbridge.com/chinese/dictionary.php?word=" + currentData[lessonName][(currentPointer-1)/2]['sc'] + "'>" + currentData[lessonName][(currentPointer-1)/2]['sc'] + "</a>");
    $('#' + lessonName + 'py').html(currentData[lessonName][(currentPointer-1)/2]['py']);
    button.html("Next");
  }
}
