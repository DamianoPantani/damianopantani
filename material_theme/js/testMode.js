
function replaceText(source, pattern, destination){
	return source.split(pattern).join(destination);       
}

function replaceTextWithArray(source, pattern, destinationArray){
	destinationArray.forEach(function(destination){
		source = source.replace(pattern, destination);
	});
	return source;
}

function replaceLoop(source, config){
	var singleElement = textBetweenTag(config.loopTag, source);
	var multipliedElement = multiply(singleElement, config.loopFactor);
	config.replace.forEach(function(replace){
		multipliedElement = replaceText(multipliedElement, replace.src, replace.dest);
	});
	config.replaceInArray.forEach(function(replace){
		multipliedElement = replaceTextWithArray(multipliedElement, replace.src, replace.dest);
	});
	source = replaceTextWithArray(source, config.loopTag, ['']);
	source = replaceTextWithArray(source, config.loopTag.replace('<', '</'), ['']);
	return replaceText(source, singleElement, multipliedElement);
}

function textBetweenTag(startTag, source){
	var endTag = startTag.replace('<', '</');
	return source.split(startTag)[1].split(endTag)[0];
}

function multiply(source, n){
	var target = '';
	for(i=0;i<n;i++){
		target += source;
	}
	return target;
}

function removeTag(source, tagname){
	tagname = tagname.toLowerCase();
	var startTag = '<' + tagname + '>';
	var endTag =  '</' + tagname + '>';
	source = replaceText(source, startTag, '');
	return replaceText(source, endTag, '');
}

var body = $('html').html();

body = replaceText(body, '&lt;', '<');
body = replaceText(body, '&gt;', '>');

body = replaceLoop(body, {
	loopTag: '<blogkategorie>',
	loopFactor: 7,
	replace: [
		{
			src: '<$BlogKategoriaLink$>',
			dest: '<a href="#" title="Zobacz wszystkie wpisy w kategorii \'Nazwa Ketegorii\'"><$NazwaKategorii$></a>'
		}
	],
	replaceInArray: [
		{
			src: '<$NazwaKategorii$>',
			dest: ['100 - 199 km', '200 km <', 'Do / Ze / szkoly / roboty', 'Goralem / Bezdroza', 'Ile Fabryka Dala', 'Z filmem', 'Ze zdjeciami']
		},
		{
			src: '<$BlogKategoriaWpisy$>',
			dest: ['20', '2', '35', '2', '8', '2', '116']
		}
	]
});

//TODO too hard
body = replaceLoop(body, {
	loopTag: '<blogkategorie>',
	loopFactor: 7,
	replace: [
		{
			src: '<$BlogKategoriaLink$>',
			dest: '<a href="#" title="Zobacz wszystkie wpisy w kategorii \'Nazwa Ketegorii\'"><$NazwaKategorii$></a>'
		}
	],
	replaceInArray: [
		{
			src: '<$NazwaKategorii$>',
			dest: ['100 - 199 km', '200 km <', 'Do / Ze / szkoly / roboty', 'Goralem / Bezdroza', 'Ile Fabryka Dala', 'Z filmem', 'Ze zdjeciami']
		}
	]
});

body = replaceLoop(body, {
	loopTag: '<blogarchiwum>',
	loopFactor: 12,
	replace: [
		{
			src: '<$BlogArchLink$>',
			dest: '<a class="<$ArchClass$>" href="#"><$ArchName$></a>'
		}
	],
	replaceInArray: [
		{
			src: '<$ArchClass$>',
			dest: ['archive2017', 'archive2017', 'archive2017', 'archive2016', 'archive2016', 'archive2016', 'archive2015', 'archive2015', 'archive2015', 'archive2014', 'archive2013', 'archive2013']
		},
		{
			src: '<$ArchName$>',
			dest: ['2017, Grudzien', '2017, Listopad', '2017, Pazdziernik', '2016, Wrzesien', '2016, Sierpien', '2016, Lipiec', '2015, Czerwiec', '2015, Maj', '2015, Kwiecien', '2014, Marzec', '2013, Luty', '2013, Styczen']
		},
		{
			src: '<$BlogArchWpisy$>',
			dest: ['23','23','3','3','333','333','11','11','4','4','1','1','44','44','111','111','4','4','2','2','23','23','11','11']
		},
		{
			src: '<$BlogArchKomentarze$>',
			dest: ['0','0','3','3','0','0','11','11','0','0','0','0','0','0','0','0','4','4','2','2','0','0','211','211']
		}
	]
});

var userAvatar = '<div class="commavatar"><a href="#"><img src="<$CommentAvatar$>" alt="" width="45" height="45"></a></div>';
var guestAvatar = '<b>Niezalogowany gosc</b>';

body = replaceLoop(body, {
	loopTag: '<blogkomentarze>',
	loopFactor: 6,
	replace: [
		{
			src: '<$BlogKomentKasuj$>',
			dest: ' | <a href="#" title="Kasuj komentarz" class="deleteoper" onclick="return confL(\'Czy na pewno skasować ten komentarz?\');">X</a>'
		}
	],
	replaceInArray: [
		{
			src: '<$BlogKomentAutorLink$>',
			dest: [userAvatar,guestAvatar,userAvatar,userAvatar,userAvatar,userAvatar]
		},
		{
			src: '<$CommentAvatar$>',
			dest: ['http://st14.static.bikestats.pl/avatars/74/23d9d17274_mini.jpg?1488830110', 'http://st14.static.bikestats.pl/avatars/74/23d9d17274_mini.jpg?1488830110', 'http://st15.static.bikestats.pl/avatars/45/e0ba76245_mini.jpg?1387523758', 'http://st14.static.bikestats.pl/avatars/74/23d9d17274_mini.jpg?1488830110', 'http://st15.static.bikestats.pl/avatars/45/e0ba76245_mini.jpg?1387523758']
		},
		{
			src: '<$BlogKomentData$>',
			dest: ['Czwartek, 17.11.2016 08:24:54', 'Czwartek, 17.11.2016 04:05:01', 'Czwartek, 06.10.2016 10:06:55', 'Czwartek, 06.10.2016 09:53:03', 'Czwartek, 06.10.2016 07:37:58', 'Środa, 05.10.2016 07:14:47']
		},
		{
			src: '<$BlogKomentTresc$>',
			dest: [
				'Mam kategorię <a href="http://damianopantani.bikestats.pl/c,29878,Ze-zdjeciami.html">Ze zdjęciami</a> w której jest 30,25% wszystkich wpisów. Pozdrower.',
				'Szablon, szablon... Co tam szablon! Na tym blogu to faktycznie nic ciekawego. Bez zdjęć to takiej jałowe.'+
				'cyt "Słabość Bikestats polega na tym że całość obsługuje jedna osoba. Jedna osoba na kilka tysięcy użytkowników to dzisiaj zupełna abstrakcja. To tak teoretycznie bo praktycznie portal obsługuje zero osób. Strona wygląda jak sprzed wojny zarówno wizualnie jak i w kodzie, niedługo zniknie w czeluściach..." '+
				'Jak dla mnie to "Słabość Bikestats" tworzą chyba tacy jak ty, prowadząc taki nijaki blog',
				'Daj spokój, sory, czasami ciężko wyczuć moje poczucie humoru :P Szablon nie jest jeszcze idealny ale za to responsywny, tzn. że ładnie się skaluje do wszystkich urządzeń niezależnie od rozmiaru. O to mi głównie chodziło a to że jest przy okazji w miarę ładnie to tylko taki bonus ;}',
				'heh - głupio napisałam - ale skupiłam się na grafice - oglądam i czytam wiele blogów - a ten Twój jest poprostu idealny dla mnie (taki chciałabym mieć) - co do treści - pozwól, że się w nią zagłębię i dam znać :) hehe',
				'Ehh już myślałem że w sensie treści ;}'+
				'Nie no dzięki, jeszcze muszę wprowadzić parę liźnięć. Pozdrower',
				'Bardzo mi się podoba Twój blog - w sensie grafiki. '+
				'Super. '+
				'Pozdrawiam serdecznie.'
			]
		}
	]
});


body = replaceText(body, '<$BlogInfId$>', 'DamianoPantani');
body = replaceText(body, '<$BlogInfLinkMore$>', 'http://www.bikestats.pl/rowerzysta/DamianoPantani');
body = replaceText(body, 
	'<$BlogSzukajForm$>',
	'<form action="index.php" method="get">'+
		'<input type="text" name="search" class="inp search search-query span2" size="28" value="" maxlength="180"> <input type="submit" value="Szukaj" class="button searchbtn btn btn-primary">'+
    '</form>'
);

body = removeTag(body, 'IfBlogItemPostPrev');
body = removeTag(body, 'IfBlogItemPostNext');
body = removeTag(body, 'IfBlogItemDistance');
body = removeTag(body, 'IfBlogItemDistanceOffRoad');
body = removeTag(body, 'IfBlogItemTimeNetHHMMSS');
body = removeTag(body, 'IfBlogItemAvgSpeed');
body = removeTag(body, 'IfBlogItemMaxSpeed');
body = removeTag(body, 'IfBlogItemUphill');
body = removeTag(body, 'IfBlogItemHRavg');
body = removeTag(body, 'IfBlogItemHRmax');
body = removeTag(body, 'IfBlogItemKcal');
body = removeTag(body, 'IfBlogItemTemperature');
body = removeTag(body, 'IfBlogItemEquipment');
body = removeTag(body, 'IfBlogItemParticipants');
body = removeTag(body, 'BlogKomentarzeWlaczone');
body = removeTag(body, 'BlogKomentParzysty');


body = replaceText(body, '<$BlogItemPostNextUrl$>', '#');
body = replaceText(body, '<$BlogItemPostPrevUrl$>', '#');
body = replaceText(body, '<$BlogItemPostNextTitle$>', 'Nastepny wpis');
body = replaceText(body, '<$BlogItemPostPrevTitle$>', 'Poprzedni wpis');
body = replaceText(body, '<$BlogWpisOpcje$>', '<div style="margin:.5em 1.2em" class=""><a href="#" title="Edytuj \'<$BlogWpisTitle$>\' <$BlogWpisData$>" class="deleteoper btn btn-mini btn-info">Edytuj</a></div>');
body = replaceText(body, '<$BlogWpisTitle$>', 'Tytul wpisu!');
body = replaceText(body, '<$BlogWpisKategorie$>', '<span class="itemCategories">Kategoria <a href="#">Ze zdjeciami</a>, <a href="#">Goralem, bezdroza</a></span>');
body = replaceText(body, '<$BlogWpisData$>', 'Sobota, 2 Pazdziernika 2016');
body = replaceText(body, '<$BlogWpisKomentarze$>', '#');
body = replaceText(body, '<$BlogWpisKomIlosc$>', '6');
body = replaceText(body, '<$BlogItemDistance$>', '45');
body = replaceText(body, '<$BlogItemDistanceOffRoad$>', '2');
body = replaceText(body, '<$BlogItemTimeNetHHMMSS$>', '1:23');
body = replaceText(body, '<$BlogItemAvgSpeed$>', '23');
body = replaceText(body, '<$BlogItemMaxSpeed$>', '46');
body = replaceText(body, '<$BlogItemUphill$>', '359');
body = replaceText(body, '<$BlogItemHRavgPerc$>', '70');
body = replaceText(body, '<$BlogItemHRavg$>', '140');
body = replaceText(body, '<$BlogItemHRmaxPerc$>', '80');
body = replaceText(body, '<$BlogItemHRmax$>', '160');
body = replaceText(body, '<$BlogItemKcal$>', '900');
body = replaceText(body, '<$BlogItemTemperature$>', '21');
body = replaceText(body, '<$BlogItemEquipment$>', '<a href="#">Guerciotti SHM50</a>');
body = replaceText(body, '<$BlogItemParticipantsAvatar$>', '<a href="#" class="" title="uczestnik"><span class="CommentIcon s20"><img src="http://st15.static.bikestats.pl/avatars/95/696646395_micro.jpg?1387523758" alt="" width="20" height="20"></span></a>');
body = replaceText(body, '<$BlogWpisTresc$>', 'Pojechalem na zachod zobaczyc troche nowego terenu :) No i nie zawiodlem sie, no piekne okolice, w Rogalowie pagorki, i swietokrzyskie pasiaki, kolorowo i cacy :inlove: Potem Oleszno gdzie bylem pare razy i zawsze usmiechem na ustach. Potem Chotow - taka mala wioska a jakie mnostwo zycia na drogach... moze dlatego ze dzieciaki komputerow nie maja xD');
body = replaceText(body,
	'<$BlogKomentarzeNowyForm$>',
	'<a id="ac" onfocus="document.addcommform.content.focus()" href="#"></a><b>Komentuj</b>'+
	'<form action="" name="addcommform" method="post" onsubmit="return checkbform(this);" class="addcommform"><br>Imię: <input type="text" name="autor" size="30" maxlength="40" value="Gość" class="inp"> <a href="http://www.bikestats.pl/users/login" onmousedown="this.href=\'http://www.bikestats.pl/users/login/backtoblog/DamianoPantani/1521727\'">Zaloguj się</a> · <a href="http://www.bikestats.pl/register" onmousedown="this.href=\'http://www.bikestats.pl/register/index/backtoblog/DamianoPantani/1521727\'">Zarejestruj się!</a><br>'+
		'<textarea class="inp" rows="10" cols="76" name="content" id="ccc"></textarea><br><input type="text" name="ascode" class="inp" size="10" maxlength="10" value=""> Wpisz <strong>cztery pierwsze</strong> znaki ze słowa ieini<br><input type="submit" value="Wyślij komentarz" class="button">'+
		'<div><i>Można używać znaczników:</i> [b][/b] i [url=][/url]<br><br></div><input type="hidden" name="did" value="1521727"><input type="hidden" name="autor_id" value=""><input type="hidden" name="a" value="commadd">'+
	'</form>'
);

body = replaceText(body, '<$BlogInfKm$>', '16541.93');
body = replaceText(body, '<$BlogInfKmTeren$>', '50.60');
body = replaceText(body, '<$BlogInfPrSrednia$>', '29.90 km/h');
body = replaceText(body, '<$BlogInfCzasHHMM$>', '23d 01h 20m');
body = replaceText(body, '<$BlogKategoriaNaglowek$>', '<div class="categoryArchHeader mainwell">Wpisy archiwalne w kategorii <h2>Ze zdjęciami</h2> </div>');
body = replaceText(body,
	'<$BlogKategoriaPodsumowanie$>',
	'<table class="categoryArchSummary table mainwell">'+
		'<colgroup>'+
		'<col class="span2">'+
		'<col class="span6">'+
		'</colgroup><tbody>'+
		'<tr class="row1"><td class="flabel">Dystans całkowity:</td><td class="value">7501.54 km (w terenie 50.60 km; 0.67%)</td></tr>'+
		'<tr class="row2"><td class="flabel">Czas w ruchu:</td><td class="value">250:58</td></tr>'+
		'<tr class="row3"><td class="flabel">Średnia prędkość:</td><td class="value">29.89 km/h</td></tr>'+
		'<tr class="row3"><td class="flabel">Maksymalna prędkość:</td><td class="value">81.70 km/h</td></tr>'+
		'<tr class="row3"><td class="flabel">Suma podjazdów:</td><td class="value">47732 m</td></tr>'+
		'<tr class="row3"><td class="flabel">Maks. tętno maksymalne:</td><td class="value">184 <acronym title="% tętna maksymalnego">(93 %)</acronym></td></tr>'+
		'<tr class="row3"><td class="flabel">Maks. tętno średnie:</td><td class="value">156 <acronym title="% tętna maksymalnego">(79 %)</acronym></td></tr>'+
		'<tr class="row3"><td class="flabel">Suma kalorii:</td><td class="value">116311 kcal</td></tr>'+
		'<tr class="row4"><td class="flabel">Liczba aktywności:</td><td class="value">113</td></tr>'+
		'<tr class="row5"><td class="flabel">Średnio na aktywność:</td><td class="value">66.39 km i  2h 13m</td></tr>'+
		'<tr class="row5"><td class="flabel" colspan="2"><a href="http://www.bikestats.pl/statystyki/rowerowe/DamianoPantani">Więcej statystyk</a></td></tr></tbody>'+
	'</table>'
);
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');
body = replaceText(body, '', '');

$('body').html(body);
