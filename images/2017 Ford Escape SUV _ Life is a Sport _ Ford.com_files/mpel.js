MpElDs={'es.ford.com':'es','www.ford.com':'en','mqa.ford.com':'en','ford.com':'en','www.warriorsinpink.ford.com':'en','warriorsinpink.ford.com':'en','www.support.ford.com':'en','support.ford.com':'en', 'm.ford.com':'en', 'es-m.ford.com':'es','www.quickquote.ford.com':'en','m.quickquote.ford.com':'en','t.quickquote.ford.com':'en','es.quickquote.ford.com':'es','wwwqa.shopus.ford.com':'en','www.shopus.ford.com':'en','wwwqa.quickquoteus.ford.com':'en','wwwqa.t.quickquoteus.ford.com':'en','wwwqa.m.quickquoteus.ford.com':'en','www.quickquoteus.ford.com':'en','www.t.quickquoteus.ford.com':'en','www.m.quickquoteus.ford.com':'en','t.quickquoteus.ford.com':'en','m.quickquoteus.ford.com':'en'};
if(!new RegExp('MP_LANG='+MpElDs[location.host]).test(document.cookie)){
    MpElD='//es.ford.com';
		if (location.host.toString().indexOf('m.ford') != -1) {
		    MpElD = '//es-m.ford.com';
	}
	else
	{
		MpElD = '//es.ford.com';
	}
	MpL=navigator.browserLanguage;
	if(!MpL)MpL=navigator.language;
	 var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = MpElD + '/mpel.js?href=' + encodeURIComponent(location.href) + '&ref=' + encodeURIComponent(document.referrer) + '&lang=' + MpL;
    var target = document.getElementsByTagName('script')[0];
    target.parentNode.insertBefore(script, target);
    //document.write(unescape("%3Cscript src='"+MpElD+"/mpel.js?href="+escape(location.href)+"&ref="+escape(document.referrer)+"&lang="+MpL+"' type='text/javascript'%3E%3C/script%3E"));
}