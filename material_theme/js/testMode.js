
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
	config.replaceInArray = config.replaceInArray ? config.replaceInArray : [];
	config.replace = config.replace ? config.replace : [];
	var singleElement = textBetweenTag(config.loopTag, source);
	var multipliedElement = multiply(singleElement, config.loopFactor);
	config.replace.forEach(function(replace){
		multipliedElement = replaceText(multipliedElement, replace.src, replace.dest);
	});
	config.replaceInArray.forEach(function(replace){
		multipliedElement = replaceTextWithArray(multipliedElement, replace.src, replace.dest);
	});
	source = replaceTextWithArray(source, config.loopTag, [config.onceAtStart ? config.onceAtStart : '']);
	source = replaceTextWithArray(source, config.loopTag.replace('<', '</'), [config.onceAtEnd ? config.onceAtEnd : '']);
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

function runTestMode(options){	

	options = options ? options : {};
	var isLogged = options.isLogged === true;
	var mainPage = options.mainPage === true;
	var categoryHeader =  options.categoryHeader === true;
	var searchResults = options.searchResults === true;
	var searchResultsFail = options.searchResultsFail === true;
	var mainPageEntries = options.searchResultsFail ? 0 : options.mainPageEntries;
	var commentsCount = options.commentsCount;

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

	var userAvatar = '<div class="commavatar"><a href="#"><img src="<$CommentAvatar$>" alt="" width="45" height="45"></a></div><a href="#"><$Commenter$></a>';
	var guestAvatar = '<b>Niezalogowany gosc</b>';
	var deleteOperation = isLogged ? ' | <a href="#" title="Kasuj komentarz" class="deleteoper" onclick="return confL(\'Czy na pewno skasować ten komentarz?\');">X</a>' : '';

	body = replaceLoop(body, {
		loopTag: '<blogkomentarze>',
		loopFactor: commentsCount,
		onceAtStart: commentsCount === 0 ? 'Nie ma jeszcze komentarzy.' : '',
		replace: [
			{
				src: '<$BlogKomentKasuj$>',
				dest: deleteOperation
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
				src: '<$Commenter$>',
				dest: ['DamianoPantani', 'DamianoPantani', 'emonika', 'DamianoPantani', 'emonika']
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

	body = replaceTextWithArray(body, '<BlogKomentParzysty>', [' commauthor', '', ' commauthor', '', ' commauthor', '']);
	body = replaceText(body, '</BlogKomentParzysty>', '');

	body = !mainPage ? body : replaceLoop(body,{
		loopTag: '<blogwpis>',
		loopFactor: 0
	});

	body = replaceText(body, '<$BlogInfId$>', 'DamianoPantani');
	body = replaceText(body, '<$BlogInfLinkMore$>', 'http://www.bikestats.pl/rowerzysta/DamianoPantani');
	body = replaceText(body, 
		'<$BlogSzukajForm$>',
		'<form action="index.php" method="get">'+
			'<input type="text" name="search" class="inp search search-query span2" size="28" value="'+ (searchResults ? (searchResultsFail ? 'słaby trening' : 'rower damiana') : '') +'" maxlength="180"> <input type="submit" value="Szukaj" class="button searchbtn btn btn-primary">'+
		'</form>'
	);

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

	body = replaceText(body, '<$BlogItemPostNextUrl$>', '#');
	body = replaceText(body, '<$BlogItemPostPrevUrl$>', '#');
	body = replaceText(body, '<$BlogItemPostNextTitle$>', 'Nastepny wpis');
	body = replaceText(body, '<$BlogItemPostPrevTitle$>', 'Poprzedni wpis');
	body = mainPage ? replaceLoop(body, {loopTag: '<ifblogitempostprev>', loopFactor: 0}) : removeTag(body, 'IfBlogItemPostPrev');
	body = mainPage ? replaceLoop(body, {loopTag: '<ifblogitempostnext>', loopFactor: 0}) : removeTag(body, 'IfBlogItemPostNext');
	body = replaceText(body, '<$BlogWpisOpcje$>', !isLogged ? '' : '<div style="margin:.5em 1.2em" class=""><a href="#" title="Edytuj \'Tytul posta\' <$BlogWpisData$>" class="deleteoper btn btn-mini btn-info">Edytuj</a></div>');
	body = replaceText(body, '<$BlogWpisKomentarze$>', '#');
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

	body = mainPage ? replaceLoop(body, {
		loopTag: '<blogwpisy>',
		loopFactor: mainPageEntries,
		onceAtEnd: mainPageEntries === 0 ? '' : '<ul class="pager categoryArchLinks"><li class="next"><a href="http://DamianoPantani.bikestats.pl/">Nowsze wpisy →</a></li><li class="previous"><a href="http://DamianoPantani.bikestats.pl/p,2.html">← Starsze wpisy</a></li></ul>',
		replaceInArray: [
			{
				src: '<$BlogWpisTitle$>',
				dest: [
					'<a href="#">Tytuł posta</a>', '<a href="#">Gdzieś daleko</a>', '<a href="#">Do Kielc i z powrotem</a>',
					'<a href="#">Obóz górski</a>', '<a href="#">Nieciecza</a>', '<a href="#">Jazda godzinna na inaugurację sezonu</a>'
				]
			},
			{
				src: '<$BlogWpisKategorie$>',
				dest: [
					'', '<span class="itemCategories">Kategoria <a href="#">Ze zdjeciami</a>, <a href="#">Goralem, bezdroza</a></span>', '',
					'', '', '<span class="itemCategories">Kategoria <a href="#">Ze zdjeciami</a>, <a href="#">Goralem, bezdroza</a>, <a href="#">Z filmem</a></span>'
				]
			},
			{
				src: '<$BlogWpisData$>',
				dest: [
					'Sobota, 2 Pazdziernika 2016', 'Środa, 13 Lipca 2015', 'Poniedziałek, 22 Stycznia 2015',
					'Sobota, 1 Listopada 2014', 'Poniedziałek, 12 Sierpnia 2014', 'Czwartek, 1 Lutego 2013'
				]
			},
			{
				src: '<$BlogWpisKomIlosc$>',
				dest: ['0', '1', '0', '4', '12', '0']
			},
			{
				src: '<$BlogWpisTresc$>',
				dest: [
					'Takie tam, bardzo spoko ale się trochę przegrzałem. Miałem jutro robić coś dalszego ale po tej długiej przerwie dupa mi się odzwyczaiła od siodełka więc jest trochę kiepsko, muszę zrobić dzień przerwy.'+
						'Miało być tak pięknie... Była to dopiero druga jazda w nowym siodle, do którego nie byłem do końca przekonany, no i dzisiaj wyszło szydło z worka. Już po 25 km myślałem że mi dupa odleci, ale najgorsze miało dopiero nadejść... <span class="fw thoughtful"></span><br><br>'+
						'Katastroficzny asfalt, duży ruch, że nie można było wyjechać na środek gdzie co równiejsza droga, a całości dopełniły tajfuny w twarz '+
						'<span class="fw meh"></span> Musiałem się zatrzymywać co 15 kilo bo chyba bym nie dojechał do domu. Jedyny plus tych przerw to to że mogłem strzelić fotę pod kościołem w Grzymałkowie. Ogólnie zero przyjemności z jazdy, ale cieszę się że dało w końcu radę przejechać jakąś 70-tkę.<br><br><a href="http://photo.bikestats.eu/zdjecie/635201/kosciol-grzymalkow" title="Kościół Grzymałków"><img alt="Kościół Grzymałków" width="675" height="900" src="http://images.photo.bikestats.eu/zdjecie,pelne,635201,20160721,kosciol-grzymalkow.jpg"></a><br><span class="pbs-photo-desc">Kościół Grzymałków © DamianoPantani</span>'+
						'<br><br></div>',
					'Niedługa, bardzo przyjemna pętla, no i o to chodzi. Idzie gorsza pogoda więc każdy metr był dzisiaj w cenie złota.',
						'Dzisiaj cieplej i przyjemniej, stąd też na niższym pulsie. Cały czas do przodu <span class="fw glasses"></span>',
					'Tak mnie ssało na kręcenie od rana, ale wróciłem później z roboty to starczyło czasu na 25 km, a w drodze okazało się że się za cienko ubrałem i trzeba było jeszcze dociąć tę trasę. Mimo wszystko jechało się wporzo.',
						'Ogólnie trening zayebongo, coraz lepiej mi się jeździ na nowej furce... Na Korczynie podjechało do mnie parę gimbów na góralach, strasznie się wypruwali żeby utrzymać tempo. Nasza konwersacja wyglądała mniej więcej:'+
						'<br><br><blockquote>-G: (śmichy-chichy)<br>-D: Łoj bo sie posrasz <span class="fw smile"></span><br>'+
						'-G: Fajny rower<br>-D: Dzięki, (z bólem) wasze też!</blockquote>',
					'W sumie już trochę jeździłem w tym roku ale sobie przypomniałem że prowadzę statystyczkę ;} Zapomniałem podsumować zeszły sezon, choć w zasadzie nie ma czego podsumowywać. Za to zmontowałem filmik z tego co się nagrało, więc oglądać, nie marudzić:&nbsp;'+
					'<br><br><div class="video-wrapper">'+
					'<iframe src="https://www.youtube.com/embed/2WlhHLzR5kY" frameborder="0" allowfullscreen=""></iframe></div><br>'+
					'Ten sezon zapowiada się znacznie ciekawiej, bo przez zimę ubyło mnie 6 kg i uzbierałem (aż za) duże fundusze na nowy sprzęciur, jeszcze nie mogę się na nic zdecydować. W sumie to i dobrze bo potrzebuję czasu na zrobienie wydolności organizmu bo w tych pulsach normalnie powinienem był jechać o 3 - 4 km/h szybciej. No nic, cza się brać do roboty, życzcie mi powodzenia i równości.'
				]
			}
		]
	}) : singleEntry(body, commentsCount);


	body = replaceText(body,
		'<$BlogKomentarzeNowyForm$>',
		isLogged ? 
			'<a id="ac" onfocus="document.addcommform.content.focus()" href="#"></a><b>Komentuj</b>'+
			'<form action="" name="addcommform" method="post" onsubmit="return checkbform(this);" class="addcommform"><br>Komentujesz jako <a href="http://www.bikestats.pl/rowerzysta/DamianoPantani">DamianoPantani</a><br>'+
				'<textarea class="inp" rows="10" cols="76" name="content" id="ccc"></textarea><br><input type="submit" value="Wyślij komentarz" class="button">'+
				'<div><i>Można używać znaczników:</i> [b][/b] i [url=][/url]<br><br></div><input type="hidden" name="did" value="1521727"><input type="hidden" name="autor_id" value="17274"><input type="hidden" name="a" value="commadd">'+
			'</form>'
		:
			'<a id="ac" onfocus="document.addcommform.content.focus()" href="#"></a><b>Komentuj</b>'+
			'<form action="" name="addcommform" method="post" onsubmit="return checkbform(this);" class="addcommform"><br>Imię: <input type="text" name="autor" size="30" maxlength="40" value="Gość" class="inp"> <a href="http://www.bikestats.pl/users/login" onmousedown="this.href=\'http://www.bikestats.pl/users/login/backtoblog/DamianoPantani/1521727\'">Zaloguj się</a> · <a href="http://www.bikestats.pl/register" onmousedown="this.href=\'http://www.bikestats.pl/register/index/backtoblog/DamianoPantani/1521727\'">Zarejestruj się!</a><br>'+
				'<textarea class="inp" rows="10" cols="76" name="content" id="ccc"></textarea><br><input type="text" name="ascode" class="inp" size="10" maxlength="10" value=""> Wpisz <strong>cztery pierwsze</strong> znaki ze słowa ieini<br><input type="submit" value="Wyślij komentarz" class="button">'+
				'<div><i>Można używać znaczników:</i> [b][/b] i [url=][/url]<br><br></div><input type="hidden" name="did" value="1521727"><input type="hidden" name="autor_id" value=""><input type="hidden" name="a" value="commadd">'+
			'</form>'
	);

	body = replaceText(body, '<$BlogInfKm$>', '16541.93');
	body = replaceText(body, '<$BlogInfKmTeren$>', '50.6');
	body = replaceText(body, '<$BlogInfPrSrednia$>', '29.9 km/h');
	body = replaceText(body, '<$BlogInfCzasHHMM$>', '23d 01h 20m');
	body = replaceText(body,
		'<$BlogKategoriaNaglowek$>',
		categoryHeader ? '<div class="categoryArchHeader mainwell">Wpisy archiwalne w kategorii <h2>Ze zdjęciami</h2> </div>' :
		searchResults ?
			(
			searchResultsFail ?
			'<div class="well mainwell"><h1>Szukaj w blogu</h1><form action="index.php" method="get">'+
				'<input type="text" name="search" class="inp search searchmain search-query span2" size="50" value="słaby trening" maxlength="180"> <input type="submit" value="Szukaj" class="button searchbtn btn btn-primary">'+
			'</form><div class="categoryArchHeader">Brak wyników wyszukiwania dla frazy:<h2>słaby trening</h2> </div></div>' :
			'<div class="well mainwell"><h1>Szukaj w blogu</h1><form action="index.php" method="get">'+
				'<input type="text" name="search" class="inp search searchmain search-query span2" size="50" value="rower damiana" maxlength="180"> <input type="submit" value="Szukaj" class="button searchbtn btn btn-primary">'+
			'</form><div class="categoryArchHeader">Wyniki wyszukiwania. Znalezionych wpisów: <b>4</b><br><h2>rower damiana</h2> </div></div>'
			) : ''
	);
	body = replaceText(body,
		'<$BlogKategoriaPodsumowanie$>',
		!categoryHeader ? '' :
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

	body = removeTestModeScriptExecution(body);

	$('body').html(body);

}

function singleEntry(body, commentsCount){
	body = replaceText(body, '<$BlogWpisTitle$>', 'Tytul wpisu!');
	body = replaceText(body, '<$BlogWpisKategorie$>', '<span class="itemCategories">Kategoria <a href="#">Ze zdjeciami</a>, <a href="#">Goralem, bezdroza</a></span>');
	body = replaceText(body, '<$BlogWpisData$>', 'Sobota, 2 Pazdziernika 2016');
	body = replaceText(body, '<$BlogWpisKomIlosc$>', commentsCount);
	body = replaceText(body, '<$BlogWpisTresc$>', 'Pojechalem na zachod zobaczyc troche nowego terenu :) No i nie zawiodlem sie, no piekne okolice, w Rogalowie pagorki, i swietokrzyskie pasiaki, kolorowo i cacy :inlove: Potem Oleszno gdzie bylem pare razy i zawsze usmiechem na ustach. Potem Chotow - taka mala wioska a jakie mnostwo zycia na drogach... moze dlatego ze dzieciaki komputerow nie maja xD');
	return body;
}

function removeTestModeScriptExecution(body){
	var wrapped = $("<div>" + body + "</div>");
	$.each(wrapped.find('script'), function() {
		var scriptSource = $(this).attr('src') ? $(this).attr('src') : '';
		if ($(this).hasClass('testModeDisabled') || scriptSource.indexOf('google-analytics') !== -1){
			$(this).detach();
		}
		if (scriptSource.indexOf('DamianoPantani/damianopantani') !== -1){
			var startindex = scriptSource.indexOf('js/');
			$(this).attr('src', scriptSource.substring(startindex));
		}
	});
    return wrapped.html();
}
