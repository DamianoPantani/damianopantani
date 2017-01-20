
function init(){
	var cookieColor = getCookie('main-color');
	changeColor(cookieColor ? cookieColor : 183);

	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});
}

function changeColor(color){
    document.documentElement.style.setProperty('--main-color', color);
    setCookie('main-color', color);
}

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}
function getCookie(key) {
    var value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return value === null ? undefined : value[2];
}

function confL(message) {
    return window.confirm(message);
}

function hideGPSTracksOnMainPage(){
    $('iframe.hidden').detach();
    $('button:contains("Pokaż trasę GPS")').detach();
}

function replaceSearchButton(){
    $('.searchbtn').replaceWith('<button type="submit" class="btn btn-info search"><span>Szukaj</span><span class="glyphicon glyphicon-search"></span></button>');
}
function replaceCommentsButton(){
    $('.addcommform .button').replaceWith('<button type="submit" class="button"><span>Komentuj</span><span class="glyphicon glyphicon-comment"></span></button>');
}

function replaceCategoryTableWithInfoLabel(additionalClass){
    var activitiesCount = $('.categoryArchSummary .flabel:contains("Liczba aktywności")')
    .parent().children('.value').text();
    var averageActivity = $('.categoryArchSummary .flabel:contains("Średnio na aktywność")')
    .parent().children('.value').text().replace(/i.*m/, '');
    $('.categoryArchSummary').detach();
    $('.categoryArchHeader').addClass(additionalClass)
    .append('<span><strong>'+activitiesCount+'</strong> aktywności, średnio <strong>'+averageActivity+'</strong></span>')
    .find('h2').append('.');
}

function hideCommentsLinkIfZero(){
    $.each($('.trip-metadata span'), function() {
        var commentsCount = $(this).find('a').text().replace('Komentarze: ', '');
        if (commentsCount === '0') {
            $(this).detach();
        }
    });
}

function changeSearchResultsForm(mainClass){
	$(".search-box input").attr("placeholder", "Szukaj...");
    var searchText = $('.well.mainwell h2').text();
    var foundEntriesCount = $('.well.mainwell b').text();
    var newClass = 'alert-info';
    var newContent = 'Wyniki wyszukiwania dla <strong>'+searchText+'</strong>. '+
                     'Znalezionych wpisów: <strong>'+foundEntriesCount+'</strong>.';
    if (foundEntriesCount.indexOf('Wpisz') != -1){
        newContent = 'Szukana fraza jest za krótka.';
        newClass = 'alert-warning';
    } else if (foundEntriesCount === ''){
        newContent = 'Brak wyników wyszukiwania dla frazy <strong>'+searchText+'</strong>';
        newClass = 'alert-warning';
    }
    $('.well.mainwell').removeClass('well mainwell').addClass(newClass+' '+mainClass).html(newContent);
}

function initializeColorPicker(){

    var hues = [ 135, 183, 260, 335, 0, 18 ];

    var colorPickerBlock = $('.change-color .inner');
    $.each(hues, function(index, backgroundHue) {
        var newSpan = $('<span></span>');
        newSpan.css('background-color', 'hsl('+backgroundHue+', 65%, 40%)');
        newSpan.click(function(){changeColor(backgroundHue);});
        colorPickerBlock.append(newSpan);
    });
}

function swapCommentsOrder(){
    var comments = $(".comments-box .comment");
    var swappedComments = comments.get().reverse();
    swappedComments.forEach(function(comment, i){
        $(comments[i]).replaceWith($(comment).clone());
    });
}

function addEmoticonsToComments(){
	new Emoticons().replace({selector: '.comment-text'});
}