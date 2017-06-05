function saveTags (id, icon_id) {

	var tagsArea = ge(id);

	var query = "tag=" + tagsArea.value + "&icon_id=" + icon_id;



	var ajax = new Ajax();

	ajax.onDone = function(ajaxObj,responseText) {

		ge('okSaveTags').innerHTML = responseText;

		tagsArea.value = "";

	};

	ajax.post('/ajax/save_tags.php', query);

}







function loadError (icon_id) {

	var query = "icon_id=" + icon_id;

	

	var ajax = new Ajax();

	ajax.onDone = function(ajaxObj,responseText) {

		// все ok

	}; 

	ajax.post('/ajax/load_error.php', query);

	ge('okLoadError').innerHTML = "&nbsp;&nbsp;Благодарим за информацию!";

}



function ge()

{

  var ea;

  for( var i = 0; i < arguments.length; i++ ) {

    var e = arguments[i];

    if( typeof e == 'string' )

      e = document.getElementById(e);

    if( arguments.length == 1 )

      return e;

    if( !ea )

      ea = new Array();

    ea[ea.length] = e;

  }

  return ea;

}



function saveIconsBg (c) {

	// поставим cookie

	setCookie("color", c, "Mon, 01-Jan-2021 00:00:00 GMT", "/");

	setIconsBg (c);

}

function saveIconsDim (c) {

	// поставим cookie

	setCookie("dim", c, "Mon, 01-Jan-2021 00:00:00 GMT", "/");

	var addr = ROOT_DIR;

	if (QUERY) addr += "?q="+QUERY;





	location.href= addr;

}





function screenSize() {

	var w, h;

	w = (window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.offsetWidth));

	return w;

}



function getNumSelect () {

	if (ge('iconsPerPage')) {

		if (screenSize() > '1150') {

			ge('iconsPerPageTitle').style.display = 'block';

			ge('iconsPerPage').style.display = 'block';

		} else {

			ge('iconsPerPageTitle').style.display = 'none';

			ge('iconsPerPage').style.display = 'none';

		}

	}

}

function saveIconsPerPage (c) {

	// поставим cookie

	setCookie("per_page", c, "Mon, 01-Jan-2021 00:00:00 GMT", "/");

	var addr = ROOT_DIR;

	if (QUERY) addr += "?q="+QUERY;



	location.href= addr;

}



function setIconsBg () {

	f_colors = new Array('', 'white', 'url(/i/transparent_bg.gif)', 'black');

	s = getCookie("color");

	

	if (!s) s = 1;

	

	for (var i=1;i<=3;i++) ge('sbgc_'+i).style.border = '#DDDDDD 1px solid';

	if (1) ge('sbgc_'+s).style.border = '#479422 1px solid';

	// заменим фон

	for (i in icon_ids) {

		//alert (i);

		ge('icon_'+icon_ids[i]).style.background = f_colors[s];

	}

	



}



function isIE() {

 return (navigator.userAgent.toLowerCase().indexOf("msie") != -1);

}   



function setCookie (name, value, expires, path, domain, secure) {

      document.cookie = name + "=" + escape(value) +

        ((expires) ? "; expires=" + expires : "") +

        ((path) ? "; path=" + path : "") +

        ((domain) ? "; domain=" + domain : "") +

        ((secure) ? "; secure" : "");

}



function getCookie(name) {

	var cookie = " " + document.cookie;

	var search = " " + name + "=";

	var setStr = null;

	var offset = 0;

	var end = 0;

	if (cookie.length > 0) {

		offset = cookie.indexOf(search);

		if (offset != -1) {

			offset += search.length;

			end = cookie.indexOf(";", offset)

			if (end == -1) {

				end = cookie.length;

			}

			setStr = unescape(cookie.substring(offset, end));

		}

	}

	return(setStr);

}



function showBlock (id) {

	if (ge(id).style.display == 'block') ge(id).style.display = 'none';

	else ge(id).style.display = 'block';

}

function don (v) {
	if (v == 1 || v == 3) setCookie("don", 1, "Mon, 01-Jan-2021 00:00:00 GMT", "/");
	else {
		var dz = new Date();
        dz.setTime(dz.getTime()+(1*20*60*60*1000));
        var expires = "; expires="+dz.toGMTString();
		setCookie("don", 1, expires, "/");
	}

	var query = "don=" + v;

	var ajax = new Ajax();
	ajax.post('/ajax/don.php', query);
	jQuery.fancybox.close();
}