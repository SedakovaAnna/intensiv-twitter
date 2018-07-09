$(document).ready(function(){



var getDate = function(){

	var d     = new Date(),
		day   = d.getDate(),
		month = d.getMonth(),
		year  = d.getFullYear(),
		hrs   = d.getHours(),
		min   = d.getMinutes();

	var monthArray= new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "деабря");
	// var actualDate = day + ' ' + monthArray[month] + ' ' + year + ' года'+ ' ' + hrs +':' + min;
	var actualDate = `${day} ${monthArray[month]} ${year} года ${hrs}:${min} `;

	return actualDate;
}
	// console.log(getDate());

var countTweets = function() {
	var tweetCounter = $('.tweet-card').length;
	$('#tweetCounter').text(tweetCounter);
}


// https://gist.github.com/ryansmith94/0fb9f6042c1e0af0d74f#file-wrapurls-js
var wrapURLs = function (text, new_window) {
  var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
  var target = (new_window === true || new_window == null) ? '_blank' : '';
  
  return text.replace(url_pattern, function (url) {
    var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
    var href = protocol_pattern.test(url) ? url : 'http://' + url;
    return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
  });
};




var createTweet = function(date,text){
	var $tweetBox  = $('<div class="card tweet-card">'); // Создаем обертку для твита
	var $tweetDate = $('<div class="tweet-date">').text(date); // Создаем дату
	var $tweetText = $('<div class="tweet-text">').html(wrapURLs(text)).wrapInner('<p></p>'); // Создаем контент с твитом и оборачиваем контент в тег <p>
	
	var additionalClassName;

		if (text.length < 100) {
			additionalClassName = 'font-size-large';
			}
		else if ( text.length >150 ) {
			additionalClassName = 'font-size-small';
			}
		else {
			additionalClassName = 'font-size-normal';
			}
		
		$tweetText.addClass(additionalClassName);

	$tweetBox.append($tweetDate).append($tweetText); // Получаем разметку твита с датой и текстом твита
	$('#tweetlist').prepend($tweetBox);
	countTweets();


}


var tweetBase = [
		{
			date:'07 июня 2018 г.',
			text:'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. За свое семантика правилами, на берегу от всех она одна до переписывается однажды. <a href="#">Ссылка на сайт</a>'
		},
		{
			date:'17 мая 2018 г.',
			text:'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Буквоград которой, бросил подзаголовок имени ее семь толку даже рукопись? <a href="#">Ссылка на сайт</a>'
		}		
	];

tweetBase.forEach(function(tweet){
	// console.log(tweet.date);
	// console.log(tweet.text);
	createTweet(tweet.date, tweet.text);

});


	// Форма отправка твитта
	$('#postNewTweet').on('submit', function(e){
		e.preventDefault(); // Отменяем отправку формы
		var tweetText = $('#tweetText').val(); // Получаем техт твита = Привет мир!
		createTweet(getDate(), tweetText);

		$('#tweetText').val('');
	});
});