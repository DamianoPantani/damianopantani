
hideGPSTracksOnMainPage();
replaceCategoryTableWithInfoLabel();
changeSearchResultsForm();
replaceButtons();
hideCommentsLinkIfZero();
initializeColorPicker();
initializeTooltips();
swapCommentsOrder();
//addEmoticonsToComments();

function hideGPSTracksOnMainPage(){
    $('iframe.hidden').detach();
    $('button:contains("Pokaż trasę GPS")').detach();
}

function replaceButtons(){
    $('.searchbtn').replaceWith('<button type="submit" class="btn btn-info search"><span>Szukaj</span><span class="glyphicon glyphicon-search"></span></button>');
    $('.addcommform .button').replaceWith('<button type="submit" class="button"><span>Komentuj</span><span class="glyphicon glyphicon-comment"></span></button>');
}

function replaceCategoryTableWithInfoLabel(){
    var activitiesCount = $('.categoryArchSummary .flabel:contains("Liczba aktywności")')
    .parent().children('.value').text();
    var averageActivity = $('.categoryArchSummary .flabel:contains("Średnio na aktywność")')
    .parent().children('.value').text().replace(/i.*m/, '');
    $('.categoryArchSummary').detach();
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
    var searchText = $('.search-box .inp').val();
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
    $('.well.mainwell').removeClass('well mainwell').addClass('alert '+newClass).html(newContent);
}

function initializeTooltips(){
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
}

function initializeColorPicker(){

    var hues = [ 140, 180, 260, 335, 0, 25 ];

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
    $.each($('.comment-text'), function() {
        var comment = $(this).html();
        comment = comment.replace(':)', '<span class="e smile"/>')
        .replace(';}', '<span class="e perky"/>');
        $(this).html(comment);
    });
}