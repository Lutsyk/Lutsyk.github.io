// простенький скрипт autocomplete для списков.
// (c) Sunmedia Ltd, www.sunmedia.ru

var isSearch = 1;
var keyflag = -1;
var cListIndex = -1;
var cListLastIndex = -1;
var lastSearchString = "";

function getQuickTagsSearch (obj) {
	if (obj.value.length > 1 && obj.value.length < 7 && obj.value != lastSearchString) {
		lastSearchString = obj.value;
		tagsSearch (obj.value, 'quickSearchDiv');
	}
}

function tagsSearch (v, ob) {
	if (!isSearch) return;
	var ajax = new Ajax();
	qArr = new Array();
	qArr['v'] = v;

	ajax.onDone = function(ajaxObj,responseText) {
		if (responseText == "0") {
			ge (ob).style.display = "none";
		} else {
			ge(ob).innerHTML = responseText;
			ge (ob).style.display = "block";
		}
	};
	ajax.get('/ajax/quick_tags_search.php', qArr);
}

function clearQuickTagsSearchStyle (i) {
	if (cListIndex >= 0) ge('sli_'+cListIndex).className = '';
	cListIndex = -1;
	cListLastIndex = -1;
}

function setQuickTagsSearch (value) {
	ge('inputField').value = value;
	ge('quickSearchDiv').style.display = "none";
	ge('searchFormBig').submit();
}

function listKeyClick(list_id, kcode){
	if (kcode==40 || kcode==38) {
		cListLastIndex = cListIndex;
		if (kcode == 40) {
			isSearch = 0;
			if (ge('sli_'+(cListIndex+1))) {
				cListIndex++;
			} else cListIndex = 0;

		} else if (kcode == 38) {
			if (ge('sli_'+(cListIndex-1))) {
				cListIndex--;
			} else cListIndex = 0;
		}

		if (ge('sli_'+cListIndex)) {
			ge('inputField').value = ge('sli_'+cListIndex).innerHTML;
			ge('sli_'+cListIndex).className = 'selected';
			if (cListLastIndex != cListIndex && ge('sli_'+cListLastIndex)) ge('sli_'+cListLastIndex).className = '';
		}
	} else {
		isSearch = 1;
		keyflag = -1;
		cListIndex = -1;
		cListLastIndex = -1;
	}
}

function closeSearchDiv (e) {
	var evt = e||window.event;
	var target = evt.target||evt.srcElement;
	if (target == 'quickSearchDiv') return false;
	ge('quickSearchDiv').style.display = "none";
	lastSearchString = "";
}