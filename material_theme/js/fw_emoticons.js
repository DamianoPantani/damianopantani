(function() {
this.Emoticons = (function() {

function Emoticons(emoMap) {
	this.defaultEmoRegexMap = convertToRegexMap(this.defaultEmoMap);
	this.defaultEmoRegexMap = emoMap ? this.mergeAndGetRegexMap(emoMap) : this.defaultEmoRegexMap;
}

Emoticons.prototype.defaultEmoMap = {
'smile': [':)',':}',':]',':-)',':-}',':-]'],
'wink': [';)',';}',';]',';-)',';-}',';-]'],
'happy': [':D',';D',':-D',';-D','xD','xd','XD'],
'sad': [':(',':{',':[',':-(',':-{',':-['],
'weird': [';(',';{',';[',';-(',';-{',';-['],
'glasses': ['B-)','B-}','B-]','8-)','8-}','8-]'],
'happytongue': [':P',':p',';P',';p',':-P',';-P',':-p',';-p'],
'meh': [':|'],
'dead': [':X',':x',';x',';X'],
'lol': ['o_o','o_O','o_0','o.o','o.O','o.0','O_o','O_O','O_0','O.o','O.O','O.0','0_o','0_O','0_0','0.o','0.O','0.0',':lol:'],
'shocked': [':O',':o',':-O',':-o',';O',';o',';-O',';-o'],
'thoughtful': [';-/',':-/',';/',':/'],
'thoughtful2': [':\\',':-\\',';\\',';-\\'],
'nerd': [':nerd:'],
'inlove': [':inlove:'],
'angry': [':angry:'],
'mad': [':mad:'],
'evil2': [':evil:'],
'devil': [':devil:'],
'angel': [':angel:'],
'target': [':target:'],
'ban': [':ban:']
};

Emoticons.prototype.mergeAndGetRegexMap = function(userMap){
	var newMap = Object.assign({}, this.defaultEmoRegexMap); //clone
	for (var emoClass in userMap) {
		var emoArray = userMap[emoClass];
		emoArray = typeof emoArray === 'string' ? [emoArray] : Array.isArray(emoArray) ? emoArray : [];
		newMap[emoClass] = toRegex(emoArray);
	}
	return newMap;
};

Emoticons.prototype.replace = function(options){
	options = options ? options : {};
	var mainClass = options.mainClass ? options.mainClass : '';
	var emoTag = options.emoTag ? options.emoTag : 'i';
	var newContentPrefix = '<'+emoTag+' class="fw '+(mainClass ? mainClass+' ' : '');
	var newContentSuffix = '"></'+emoTag+'>';
	var regexMap = options.emoMap ? this.mergeAndGetRegexMap(options.emoMap) : this.defaultEmoRegexMap;

	document.querySelectorAll(options.selector).forEach(function(element){
		var content = element.innerHTML;
		for (var emoClass in regexMap) {
			content = content.replace(regexMap[emoClass], newContentPrefix+emoClass+newContentSuffix);
		}
		element.innerHTML = content;
	});
};

function toRegex(emoArray){
	var newArray = [];
	emoArray.forEach(function(emo, i){
		newArray[i] = emo.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	});
	return newArray.length === 0 ? undefined : new RegExp('('+newArray.join("|")+')(?![^<]*>|[^<>]*</)', 'g');
}

function convertToRegexMap(emoMap){
	var regexMap = {};
	for (var emoClass in emoMap) {
		regexMap[emoClass] = toRegex(emoMap[emoClass]);
	}
	return regexMap;
}

return Emoticons;
	
})();
}).call(this);