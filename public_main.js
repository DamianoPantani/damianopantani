
function init(){
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});
}

function confL(message) {
    return window.confirm(message);
}

function hideGPSTracksOnMainPage(){
    $('iframe.hidden').detach();
}

function replaceSearchButton(){
    $('.searchbtn').replaceWith('<button type="submit" class="btn btn-info search"><span>Szukaj</span><span class="glyphicon glyphicon-search"></span></button>');
}
function replaceCommentsButton(){
    $('.addcommform .button').replaceWith('<button type="submit" class="button"><span>Komentuj</span><span class="glyphicon glyphicon-comment"></span></button>');
}

function replaceCategoryTableWithInfoLabel(){
    var activitiesCount = $('.categoryArchSummary .flabel:contains("Liczba aktywności")')
    .parent().children('.value').text();
    var averageActivity = $('.categoryArchSummary .flabel:contains("Średnio na aktywność")')
    .parent().children('.value').text().replace(/i.*m/, '');
    $('.categoryArchHeader').addClass('alert alert-info')
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

function changeSearchResultsForm(){
	$(".search-box input").attr("placeholder", "Szukaj...");
    var searchText = $('.well.mainwell h2').text();
    var foundEntriesCount = $('.well.mainwell b').text();
    var newClass = 'alert-info';
    var newContent = 'Wyniki wyszukiwania dla <strong>'+searchText+'</strong> '+
                     'Znalezionych wpisów: <strong>'+foundEntriesCount+'</strong>.';
    if (foundEntriesCount.indexOf('Wpisz') != -1){
        newContent = 'Szukana fraza jest za krótka.';
        newClass = 'alert-warning';
    } else if (foundEntriesCount === ''){
        newContent = 'Brak wyników wyszukiwania dla frazy <strong>'+searchText+'</strong>';
        newClass = 'alert-warning';
    }
    $('.well.mainwell').removeClass('well mainwell').addClass('alert '+newClass).html(newContent);
}

function swapCommentsOrder(){
    var comments = $(".comments-box .comment");
    var swappedComments = comments.get().reverse();
    swappedComments.forEach(function(comment, i){
        $(comments[i]).replaceWith($(comment).clone());
    });
}