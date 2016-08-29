/* *****************FORD & SUPPORT DYNAMIC H.27.2 Code PATCHED ********/
/*

	160412 - add shop.ford.com to divert to T3
	160414 - s.manageVars and new target params
	160621 - update p14 and add T1T2 All suite
	160630 - remove evars 37,38,39,40
	
*/

/************************ ADDITIONAL FEATURES ************************
	Dynamic Report Suite Selection
	Universal Tag
	Plugins
*/


var Support=false, Ford=false

if(document.URL.match("support.ford.com")){
	Support=true	
}else{
	Ford=true
}

if(Ford)
{ 
	var s_account="fmcfvngdev"
	var s=s_gi(s_account,1)
	
	var url1=curr=document.URL;
	var currHost = document.location.host;
	url1=url1.toLowerCase();
	var curr2 =fnGetDomain(url1);
 	if(!(curr2.indexOf('www.')>-1))curr2=location.protocol+"//"+document.domain
 	
 	var url2=url1.split('?')
 	var urlclean=url2[0];
	
	if((url1.indexOf('&intcmp=dc')>-1||url1.indexOf('?intcmp=dc')>-1) && (curr2=='http://bp3.ford.com' ||curr2=='http://t.bp3.ford.com'||curr2=='https://bp3.ford.com'||curr2=='https://t.bp3.ford.com'|| curr2=='http://incentives.ford.com' || curr2=='https://incentives.ford.com' || curr2=='https://shop.ford.com' || curr2=='http://shop.ford.com')){
		s_account="fmcdealerconnection,fmcglobal";
	}else if((url1.indexOf('&intcmp=t2')>-1||url1.indexOf('?intcmp=t2')>-1) && (curr2=='http://bp3.ford.com' ||curr2=='http://t.bp3.ford.com'||curr2=='https://bp3.ford.com'||curr2=='https://t.bp3.ford.com')){
		s_account="fmctier2prod,fmcglobal";		
	}else if(urlclean=="http://www.syncmyride.com/"){
		s_account="fmcfvngprod,fmcfordt12all,fmcglobal";
	}else{
		var siteHost = document.location.host; 
		
		//fmcfvngdev
		var hostList1 = 'qa.nearlydouble.com,wwwqa.bp3.ford.com,wwwdev.bp3.ford.com,wwwqa.t.bp3.ford.com,wwwdev.t.bp3.ford.com,qa.syncsupport.ford.com,incentivesqa.ford.com,cpoqa.ford.com,wwwqa.shop.ford.com,wwwdev.brandus.ford.com'
		//fmcfvngprod,fmcglobal
		var hostList2 = 'www.ford.com,secure.ford.com,www.fordstory.com,secure.thefordstory.com,www.thefordstory.com,www.forddriveone.com,www.quickquote.ford.com,www2.quickquote.ford.com,www.showroom.ford.com,www2.showroom.ford.com,www.shoppingtools.ford.com,www.inventory.ford.com,bp2.ford.com,bp3.ford.com,t.bp3.ford.com,commtruck.ford.com,yourfordcpo.com,intellipriceauto.com,www.localfordoffer.com,fordvehicles.emipowered.net/americanride,syncsupport.ford.com,incentives.ford.com,www.ford-incentives.com,cpo.ford.com,t.quickquote.ford.com,nearlydouble.com,shop.ford.com,forddrivesu.com,www.forddrivesu.com,www.fordsalutesthosewhoserve.com,fordsalutesthosewhoserve.com,fordspecialoffer.com';
		//fordvehiclesespanol,fmcglobal
		var hostList3 = 'www.fordenespanol.com';
		//fmclincolncom,fmcglobal
		var hostList4 = 'www.lincoln.com,build.lincoln.com,www.lincolnvehicles.com,www.quickquote.lincoln.com,www.locallincolnoffer.com';
		//fmclincolncomdev
		var hostList5 = 'qa.testlincoln.forddirectweb.com,builddev.lincoln.com,buildqa.lincoln.com,qa.lincoln.jwtdigital.com,origin-buildqa.lincoln.com,qa.testlincoln.forddirectweb.com';
		//fmcmercuryvehicles,fmcglobal
		var hostList6 = 'www.mercuryvehicles.com,build.mercuryvehicles.com,www.quickquote.mercuryvehicles.com,www.localmercuryoffer.com';
		//fmcmercuryvehiclesdev
		var hostList7 = 'qa.testmercury.forddirectweb.com,builddev.mercuryvehicles.com,buildqa.mercuryvehicles.com,qa.mercury.jwtdigital.com,origin-buildqa.mercuryvehicles.com,qa.testmercury.forddirectweb.com';
		
		if (hostList1.indexOf(siteHost) != -1) s_account = 'fmcfvngdev';
		if (hostList2.indexOf(siteHost) != -1) s_account = 'fmcfvngprod,fmcfordt12all,fmcglobal';
		if (hostList3.indexOf(siteHost) != -1) s_account = 'fordvehiclesespanol,fmcfordt12all,fmcglobal';
		if (hostList4.indexOf(siteHost) != -1) s_account = 'fmclincolncom,fmcglobal';
		if (hostList5.indexOf(siteHost) != -1) s_account = 'fmclincolncomdev';
		if (hostList6.indexOf(siteHost) != -1) s_account = 'fmcmercuryvehicles,fmcglobal';
		if (hostList7.indexOf(siteHost) != -1) s_account = 'fmcmercuryvehiclesdev';
	}

	//look for spanish sites
	var isSpanish = false;
	if (currHost == 'es.ford.com'){s_account='fmcfvngdev';isSpanish=true;}	

	var esProdQual = new Array('es.ford.com','es.support.ford.com','es.bp3.ford.com','es.inventory.ford.com','es.quickquote.ford.com');
	for (i=0;i<esProdQual.length;i++){if(currHost == esProdQual[i]){s_account='fordvehiclesespanol,fmcglobal';isSpanish=true;}}
	
	/* look for mobile radUIVersion */
	if (typeof radUIVersion != 'undefined' && radUIVersion != null && radUIVersion != ""){
  		if (radUIVersion.indexOf('mobile') != -1){
    		s_account = 'fmcmobfordprod,fmcfordt12all';
  		}
	}
	/* exception for m.ford.com */
	if (document.URL.indexOf('m.ford.com') != -1){s_account = 'fmcmobfordprod,fmcfordt12all';}
		
	//regardless of condition, set filters - update account
	var s=s_gi(s_account,1);
	s.linkInternalFilters="javascript:,quickquote.ford.com,secure.ford.com,showroom.ford.com,shoppingtools.ford.com,inventory.ford.com,bp2.ford.com,bp3.ford.com,intellipriceauto.com,localfordoffer.com,fordvehicles.emipowered.net/americanride,fordenespanol.com,mercuryvehiclesdirect.com,lincolnvehiclesdirect.com,lincoln.com,lincolnmercury.com,lincolnvehicles.com,mercuryvehicles.com,forddirect.com,dealerconnection.com,ford.com,corporate-ir.net,fordmotorcompany.com,fordnews.com,fordglobal.com,fordworldwide.com,buildyourlincolnmercury.com,fordcpo.com,fordaccessoriesstore.com,eprize.net,mercuryowner.com,flmowner.com,lincolnowner.com,fordowner.com,myford,fordaccessories.com,lincolnaccessories.com,mercuryaccessories.com,forddriveone.com,fordstory.com,thefordstory.com,secure.thefordstory.com,quickquote.lincoln.com,quickquote.mercuryvehicles.com,fiestamovement2.com,locallincolnoffer.com,localmercuryoffer.com,commtruck.ford.com,yourfordcpo.com,fordcpo.forddirectweb.com,syncsupport.ford.com,incentives.ford.com,ford-incentives.com,cpo.ford.com,teamdetroit.com,nearlydouble.com,intelliprice.com,fordspecialoffer.com,fordsalutesthosewhoserve.com,forddrivesu.com"	
	
}

if(Support){
	var current=document.URL
	if(current.match("www."))current=current.replace("www.","")
	if(current.match("http://"))current=current.replace("http://",'')	
	if(current.match("https://"))current=current.replace("https://",'')

	var tempdomain=current.split('/')
	
	var s_account=(tempdomain[0]=="support.ford.com")?"fmcfordsupportprod":"fmcfordsupportdev";	
	var s=s_gi(s_account)	
	
	s.linkInternalFilters="javascript:,support.ford"
}

/**************************************************COMMON CODE******************************************/
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/* DynamicObjectIDs config */
function s_getObjectID(o) {
	var ID=o.href;
	return ID;
}
s.getObjectID=s_getObjectID

/* Plugin Config */
s.usePlugins=true

/* Visitor ID Service 
if (typeof Visitor != 'undefined') {
       s.visitor = Visitor.getInstance("EFD95E09512D2A8E0A490D4D@AdobeOrg");
}
*/

function s_doPlugins(s) {

/* Dynamic Object IDs */
	s.setupDynamicObjectIDs();
	
/* Force pageName to Lowercase all sites*/
	if(s.pageName)
		s.pageName=s.pageName.toLowerCase();

/* Visitor ID Service Coverage 
  if (typeof Visitor != 'undefined') {s.prop72 = "VisitorAPI Present";}else {s.prop72 = "VisitorAPI Missing";}      
*/		
		
/* External Campaign Tracking */
	if(!s.campaign){
		if(s.getQueryParam('campid'))s.campaign=s.getQueryParam('campid')
		if(s.getQueryParam('sReferrer'))s.campaign=s.getQueryParam('sReferrer')
		if(s.getQueryParam('bannerid'))s.campaign=s.getQueryParam('bannerid')
		s.campaign=s.getCustomValOnce(s.campaign,"cmp_getval",0)
		}

	if(s.campaign){
		s.eVar9 = s.campaign;
	s.events=s.apl(s.events,"event53",",",2)
	}
	s.prop17=s.getAndPersistValue(s.campaign,'s_p17_pers',90);

	s.eVar26 = s.prop26 = s.getQueryParam('searchid','');
	s.eVar26=s.getCustomValOnce(s.eVar26,"eVar26_getval",0)
	if(s.eVar26)s.events=s.apl(s.events,"event54",",",2)

/* Set global campaign ID*/
	if(s.getQueryParam('glbcmp'))s.eVar30=s.getQueryParam('glbcmp');
	if(s.getQueryParam('fmccmp'))s.eVar30=s.getQueryParam('fmccmp');
	s.eVar30=s.getCustomValOnce(s.eVar30,"eVar30_getval",0);
	s.prop30=s.getAndPersistValue(s.eVar30,'s_p30_pers',90);	

/* Campaign Path Tracking */  
	s.prop19=s.pageName;
	if(s.campaign)
		s.prop19=s.campaign+': '+s.pageName;
	else if(s.eVar30)
		s.prop19=s.eVar30+': '+s.pageName;   
			
/* Internal Campaign Tracking */
	if(!s.eVar13)
		s.eVar13=s.getQueryParam('intcmp'); 
	s.eVar13=s.getCustomValOnce(s.eVar13,"int_getval",0)
	s.prop13=s.getAndPersistValue(s.eVar13,'s_p13_pers',0);
	
/* Adobe Social Integration */
	if (!s.eVar60) s.eVar60=s.getQueryParam('scmp');
	s.socialPlatforms();

/* Referrer Overide */
	if (!isInternal()){
		if(s.getQueryParam('referrer')){s.referrer=s.getQueryParam('referrer');}   
	}

/* Email Campaign Tracking */
	s.eVar33=s.getQueryParam('emailid');
	s.prop33=s.getAndPersistValue(s.eVar33,'s_cp_pers',90);
	if (s.getQueryParam('cks')) s.eVar31=s.getQueryParam('cks');
	
	s.eVar33=s.getCustomValOnce(s.eVar33,"eVar33_getval",0)
	s.eVar31=s.getCustomValOnce(s.eVar31,"eVar31_getval",0)

/* TnT Tracking */ 
	s.prop35=s.pageName;
	
	if(s.getQueryParam('gmbxtid'))s.eVar69 = prop69 = s.getQueryParam('gmbxtid');	
	if (s.prop68 || s.eVar68) s.prop35 = s.prop68 + ': ' + s.pageName;
	
	if (s.prop32) s.prop35=s.prop32 + ': ' + s.pageName;
	if (s.prop65) s.prop35=s.prop65 + ': ' + s.pageName;
	if (s.prop66) s.prop35=s.prop66 + ': ' + s.pageName;
	
	if (s.eVar32) s.prop67=s.eVar32;
	if (s.eVar65) s.prop67=s.eVar65;
	if (s.eVar66) s.prop67=s.eVar66;
	
	s.eVar61=s.prop61=s.getQueryParam('hptid');
	s.eVar62=s.prop62=s.getQueryParam('vhptid');
	s.eVar63=s.prop63=s.getQueryParam('rsttid');
	
	if (s.eVar61) s.prop64=s.eVar61;
	if (s.eVar62) s.prop64=s.eVar62;
	if (s.eVar63) s.prop64=s.eVar63;
	
	s.tnt = s.trackTNT();
	
/* Visit Start Logic */	

	var tempSuite="nosuite"
	if(!s.c_r("s_suite")){s.setSuite(s_account,"s_suite",0);}else{tempSuite=s.c_r("s_suite");}

	if(!s.c_r('v_starting')){
		s_visIdFloodlight('690327','fvflup','adobesvi','u2',1);	
		
		if((!tempSuite.match(s_account))&& tempSuite!=""){
			if(!isInternal()||document.referrer==''){
				s.prop48=s.prop49=s.eVar8=trafficsource();s.prop8=s.getAndPersistValue(s.eVar8,'s_p_s_prop8',0);
				s.eVar36 = s.getCustomValOnce(dt,'ev_36_getval',0);s.events = s.apl(s.events,'event17,event52',',',2);
				var dt=popDT();
			}
		} 
	}
	var expTime=new Date;expTime.setTime(expTime.getTime()+1800000);
	s.c_w('v_starting','nfp',expTime);
		
	if(!tempSuite.match(s_account)){s.setSuite(tempSuite+s_account,"s_suite",0);tempSuite=s.c_r("s_suite");}

/* Search ID */

	if (refSearch(document.referrer)){
    	if (s.getQueryParam('searchid')){
      		s.eVar50 = s.prop50 = "paid:"+s.prop50;
		}else{
      		s.eVar50 = s.prop50 = "natural:"+s.prop50;
    	}
    	s.eVar50=s.getCustomValOnce(s.eVar50,"eVar50_getval",0);
	}
	
	
/* Leadsource and Altleadsource */

	s.eVar41=s.prop41=s.getQueryParam('leadsource');
	s.eVar43=s.prop43=s.getQueryParam('altleadsource');
	
/* AAM cookie values */

	if (s.c_r('aam_sc')){
		var scSplitVal = s.c_r('aam_sc').split('x=');
		s.list3 = s.prop59 =  scSplitVal[1];
		s.prop51 = scSplitVal[1].split(',').length.toString();
	}
	if (s.c_r('aam_tpc')){
		var tpcSplitVal = s.c_r('aam_tpc').split('x=');
		s.eVar58 = s.prop58 =  tpcSplitVal[1];
	}
	if (s.c_r('aam_tnt')){
		s.prop53 = s.c_r('aam_tnt').split(',').length.toString();
	}
		    
/* Detect onClicks and Add Data */
	
	if((s.linkTrackVars!='None'&& s.linkTrackVars!='')||s.linkTrackVars.match('prop')||s.linkTrackVars.match('eVar')||s.linkTrackVars.match('evar')||s.linkTrackVars.match('events')){
		
		/* Window Sticker */
		if ((s.linkTrackVars.indexOf('eVar48') != -1 || s.linkTrackVars.indexOf('evar48') != -1) && s.linkTrackEvents.indexOf('event43') != -1){
			if (s.eVar48.indexOf('window sticker') != -1){
				s.events = s.apl(s.events, 'event26', ',', 1);
				s.linkTrackEvents = s.linkTrackEvents + ',event26';
			}
		}
		
		s.linkTrackVars=s.linkTrackVars + ",prop37,prop38,prop39,pageName,eVar52,prop52,prop14,eVar14,prop15,eVar15,zip,prop1,prop2,prop3,eVar1,eVar2,eVar3";		
	
	}
	
	
//support vars

   	s.prop37="160630"
   	if(!s.prop39 && s.pageName)s.prop39=s.pageName
	s.eVar52=s.prop52=document.URL
	s.prop47=s.eVar47="D=UserAgent"
		
	if (s_account){
		if (s_account.indexOf('fmcfvngdev') != -1) s.prop38 = 'fmcfvngdev';
		if (s_account.indexOf('fmcdealerconnection') != -1) s.prop38 = 'fmcdealerconnection';
		if (s_account.indexOf('fmctier2prod') != -1) s.prop38 = 'fmctier2prod';
		if (s_account.indexOf('fmcfvngprod') != -1) s.prop38 = 'fmcfvngprod';
		if (s_account.indexOf('fordvehiclesespanol') != -1) s.prop38 = 'fordvehiclesespanol';
		if (s_account.indexOf('fmclincolncom') != -1) s.prop38 = 'fmclincolncom';
		if (s_account.indexOf('fmclincolncomdev') != -1) s.prop38 = 'fmclincolncomdev';
		if (s_account.indexOf('fmcmercuryvehicles') != -1) s.prop38 = 'fmcmercuryvehicles';
		if (s_account.indexOf('fmcmercuryvehiclesdev') != -1) s.prop38 = 'fmcmercuryvehiclesdev';
		if (s_account.indexOf('fmcfordsupportprod') != -1) s.prop38 = 'fmcfordsupportprod';
		if (s_account.indexOf('fmcfordsupportdev') != -1) s.prop38 = 'fmcfordsupportdev';
		if (s_account.indexOf('fmcmobfordprod') != -1) s.prop38 = 'fmcmobfordprod';
		
	}	
		
// region cookie variables
	if (Ford){
		if (s.c_r('regions')){
			setRegionVariables(s.c_r('regions'));
		}
	}

//clearing products
s.products=""
	
	if (Ford){
		FordV()
	}else FSupport()
	
	/************************ TNT Integration *************************/
	
	//SPECIAL CASE EVARS
	if (s.eVar16) updateCookie('fv_v16','v16',s.eVar16,365);
	if (s.eVar34) updateCookie('fv_v34','v34',s.eVar34,365);
	if (s.eVar54) updateCookie('fv_v54','v54',s.eVar54,365);
	
	//EVARS
	if (s.campaign) updateCookie('fv_v1_v10','v0',s.campaign,365);
	if (s.eVar1) updateCookie('fv_v1_v10','v1',s.eVar1,365);
	if (s.eVar3) updateCookie('fv_v1_v10','v3',s.eVar3,365);
	if (s.eVar8) updateCookie('fv_v1_v10','v8',s.eVar8,365);
	
	if (s.eVar16) updateCookie('fv_v11_v20','v16',s.eVar16,365);
	if (s.eVar17) updateCookie('fv_v11_v20','v17',s.eVar17,365);
	if (s.eVar18) updateCookie('fv_v11_v20','v18',s.eVar18,365);
	
	if (s.eVar26) updateCookie('fv_v21_v30','v26',s.eVar26,365);
	if (s.eVar30) updateCookie('fv_v21_v30','v30',s.eVar30,365);
	
	if (s.eVar31) updateCookie('fv_v31_v40','v31',s.eVar31,365);
	if (s.eVar32) updateCookie('fv_v31_v40','v32',s.eVar32,365);
	if (s.eVar33) updateCookie('fv_v31_v40','v33',s.eVar33,365);
	if (s.eVar34) updateCookie('fv_v31_v40','v34',s.eVar34,365);
	if (s.eVar40) updateCookie('fv_v31_v40','v40',s.eVar40,365);
	
	if (s.eVar42) updateCookie('fv_v41_v50','v42',s.eVar42,365);
	if (s.eVar45) updateCookie('fv_v41_v50','v45',s.eVar45,365);
	if (s.eVar48) updateCookie('fv_v41_v50','v48',s.eVar48,365);
	if (s.eVar50) updateCookie('fv_v41_v50','v50',s.eVar50,365);
	
	if (s.eVar61) updateCookie('fv_v61_v70','v61',s.eVar61,365);
	if (s.eVar62) updateCookie('fv_v61_v70','v62',s.eVar62,365);
	if (s.eVar63) updateCookie('fv_v61_v70','v63',s.eVar63,365);
	if (s.eVar65) updateCookie('fv_v61_v70','v65',s.eVar65,365);
	if (s.eVar66) updateCookie('fv_v61_v70','v66',s.eVar66,365);
	
	//EVENTS
	if (s.events){
		if (s.events.match("event1")) updateCookie('fv_ev1_ev10','ev1','none',365);
 		if (s.events.match("event3")) updateCookie('fv_ev1_ev10','ev3','none',365);
		if (s.events.match("event5")) updateCookie('fv_ev1_ev10','ev5','none',365);
		if (s.events.match("event9")) updateCookie('fv_ev1_ev10','ev9','none',365);
		if (s.eVar16)  {if (s.events.match("event2")) updateCookie('fv_ev1_ev10','ev2',s.eVar16,365);}
		if (!s.eVar16) {if (s.events.match("event2")) updateCookie('fv_ev1_ev10','ev2','none',365);}
		if (s.eVar27)  {if (s.events.match("event8")) updateCookie('fv_ev1_ev10','ev8',s.eVar27,365);}
		if (!s.eVar27) {if (s.events.match("event8")) updateCookie('fv_ev1_ev10','ev8','none',365);}

		if (s.events.match("event12")) updateCookie('fv_ev11_ev20','ev12','none',365);
		if (s.events.match("event13")) updateCookie('fv_ev11_ev20','ev13','none',365);
		if (s.events.match("event18")) updateCookie('fv_ev11_ev20','ev18','none',365);
		if (s.events.match("event19")) updateCookie('fv_ev11_ev20','ev19','none',365);
		
		//SPECIAL CASES
		if (s.events.match("event17")) updateCookie('fv_entpg','entpg',s.pageName,365);
		if (s.events.match("event17") && document.referrer != ""){
			var refArray=new Array();refArray = document.referrer.split('/');
			var trimmedRefDom = refArray[2];
			updateCookie('fv_refdom','refdom',trimmedRefDom,365);
		}
	}

/*******************************************SITE FUNCTIONS***************************************/
	function FordV(){
		s.prop14="ford-us"
		s.eVar14="ford-us"
		s.eVar15 = s.prop15="fordvehicles.com"
		s.prop4=s.eVar4='eng';
		
		//exceptions to default values
		if (s_account.indexOf('fmcmobfordprod') != -1){
			s.eVar15 = s.prop15 = 'm.ford.com';
		}
		if (s_account.indexOf("fordvehiclesespanol")>-1 || isSpanish) {
			s.prop4=s.eVar4='esp';
		}
		
		s.eVar22=s.getCustomValOnce(s.eVar22,"ev22_getval",0)
		s.prop22=s.eVar22;
		s.eVar5 = s.getQueryParam('gnav');
		
		if(s.eVar12 && s.eVar16)s.prop36=s.eVar34=s.eVar12+":"+s.eVar16
		
		checklast();
		popval();
	}		
		
	function FSupport(){
		s.prop14="ford-us"
		s.eVar14="ford-us"
		s.prop15="support.com"
		s.eVar15="support.com"
	}
} //end doPlugins

/*************************************CUSTOM COMMON SITE FUNCTIONS*****************************/
function padFrontZero(val) {
	if (val < 10) return '0'+val; else return val.toString();
}

function popDT() {
	var dte = new Date();
	return dte.getFullYear()+padFrontZero(dte.getMonth()+1)+padFrontZero(dte.getDate())+' '+padFrontZero(dte.getHours());
}


function trafficsource() {

	 var fs = new Array('fmc:ford.com|corporate.ford.com','fmc:fordvehicles.com|www.ford.com|fordenespanol.com','fmc:lincoln.com|lincoln.com|lincolnmercury.com',
      'fmc:mercuryvehicles.com|mercuryvehicles.com','fmc:flmowner.com|flmowner.com','fmc:motocraft.com|motocraft.com','fmc:fordracing.com|fordracing.com',
      'fmc:fordaccessories.com|fordaccessoriesstore.com|fordaccessories.com','fmc:lincolnaccessories.com|lincolnaccessories.com',
      'fmc:mercuryaccessories.com|mercuryaccessories.com','fmc:genuineservice.com|genuineservice.com|genuineflmservice.com|genuinefordservice.com|genuinemercuryservice.com|genuinelincolnservice.com|fordautoclub.com|genuineflmservice.com',
      'fmc:syncmyride.com|syncmyride.com','fmc:fordaxz.com|fordaxz.com','fmc:fordurban.com|fordurban.com',
      'fmc:quicklane.com|quicklane.com|quicklaneservice.com','fmc:dealerconnection.com|.dealerconnection.com',
      'fmc:owneradvantage.com|owneradvantage.com','fmc:fordworksolutions.com|fordworksolutions.com|fordworkssolutions.com',
      'fmc:fordcredit.com|fordcredit.com|acctaccess.com|onlinevehiclefinancing.com|billerweb.com','fmc:fordcpo.com|fordcpo.com','fmc:fordpartsonline.com|fordparts.com|fordpartsonline.com','fmc:fordpartner.com|fordpartner.com');


	if(s.getQueryParam('referrer')) var ref=s.getQueryParam('referrer') 
	else var ref = document.referrer; 
    
    for (i=0;i<fs.length;i++) {
    var fss = fs[i].split('|');
    	for (j=1;j<fss.length;j++) {
        	if (ref.indexOf(fss[j])>-1){
        		if(refSearch(ref)){ return camp();}else return fss[0];		   
        	}
      	}
    }
  	return camp()
}

function camp(){

	if(s.getQueryParam('referrer')) var ref=s.getQueryParam('referrer') 
	else var ref = document.referrer; 
	
	var fordCamp = s.getQueryParam('fmccmp');
	 
	if(s.getQueryParam('bannerid')) return 'banner';
	else if(s.getQueryParam('emailid')) return 'email';
    else if(s.getQueryParam('searchid')) {s.eVar50 = s.prop50 = "paid:" + s.prop50; return 'search-paid';}
    else if(s.getQueryParam('scmp')) return 'social-placement';
    else if(fordCamp){if (fordCamp.indexOf('t2-fdaf')>-1 || fordCamp.indexOf('t2-lda')>-1){return 'fmc:tier2';}else return 'fmc:other';}
    else if(ref=='') return 'typed-bookmarked';
    else if(refSearch(ref)) {s.eVar50 = s.prop50 = "natural:"+s.prop50; return 'search-natural';}
    else if(refSocial(ref)) return 'social';
    else return 'natural-referrer';
}


function refSearch(ref) {
   	var se = new Array('google.|q','yahoo.com|p','msn.com|q','ask.com|q','myway.com|searchfor','altavista.com|q','netscape.com|query','live.com|q','allthweb.com|q','lycos.com|query','.aol.|q','.aol.|query','suche.aolsvc.de|query','suche.aolsvc.de|q','bing.com|q','ask.jp|q','ask.co|ask','ask.jp|ask','ask.co|q','search.mywebsearch.com|searchfor');

    for (i = 0; i < se.length; i++) {
        var tmp = se[i].split('|');
        var keyword = s.getQueryParam(tmp[1], '', ref);
        if (ref.indexOf(tmp[0]) > -1) {
	        if(keyword == ''&& typeof keyword != "undefined")keyword="no keyword"
	   		s.eVar50 = s.prop50 = keyword;
            if (tmp[0] == 'google.') {
                var rnk1 = s.getQueryParam('resnum', '', ref);
                var rnk2 = s.getQueryParam('cd', '', ref);
    
                if (rnk1||rnk2) {
                    s.events = s.apl(s.events, "event50", ",", 1);
                    s.events = s.apl(s.events, "event51", ",", 1);
                   
                    if(rnk1)s.products = s.apl(s.products, ";;;;" + "event50=" + rnk1, ",", 1);
                    if(rnk2)s.products = s.apl(s.products, ";;;;" + "event50=" + rnk2, ",", 1);
                	}
            	}
        
            return true;
        }
    }

    return false;
}

function refSocial(ref) {
   	var socialSites = new Array('12seconds.tv','4travel.jp','advogato.org','ameba.jp','anobii.com','asmallworld.net','backtype.com','badoo.com','bebo.com','bigadda.com','bigtent.com','biip.no','blackplanet.com','blog.seesaa.jp','blogspot.com','blogster.com','blomotion.jp','bolt.com','brightkite.com','buzznet.com','cafemom.com','care2.com','classmates.com','cloob.com','collegeblender.com','cyworld.co.kr','cyworld.com.cn','dailymotion.com','delicious.com','deviantart.com','digg.com','diigo.com','disqus.com','draugiem.lv','facebook.com','faceparty.com','fc2.com','flickr.com','flixster.com','fotolog.com','foursquare.com','friendfeed.com','friendsreunited.com','friendster.com','fubar.com','gaiaonline.com','geni.com','goodreads.com','grono.net','habbo.com','hatena.ne.jp','hi5.com','hotnews.infoseek.co.jp','hyves.nl','ibibo.com','identi.ca','imeem.com','intensedebate.com','irc-galleria.net','iwiw.hu','jaiku.com','jp.myspace.com','kaixin001.com','kaixin002.com','kakaku.com','kanshin.com','kozocom.com','last.fm','linkedin.com','livejournal.com','me2day.net','meetup.com','mister-wong.com','mixi.jp','mixx.com','mouthshut.com','multiply.com','myheritage.com','mylife.com','myspace.com','myyearbook.com','nasza-klasa.pl','netlog.com','nettby.no','netvibes.com','nicovideo.jp','ning.com','odnoklassniki.ru','orkut.com','pakila.jp','photobucket.com','pinterest.com','plaxo.com','plurk.com','plus.google.com','reddit.com','renren.com','skyrock.com','slideshare.net','smcb.jp','smugmug.com','sonico.com','studivz.net','stumbleupon.com','t.163.com','t.co','t.hexun.com','t.ifeng.com','t.people.com.cn','t.qq.com','t.sohu.com','tabelog.com','tagged.com','taringa.net','tripit.com','trombi.com','trytrend.jp','tuenti.com','tumblr.com','twine.com','twitter.com','uhuru.jp','viadeo.com','vimeo.com','vkontakte.ru','vox.com','wayn.com','weibo.com','weourfamily.com','wer-kennt-wen.de','wordpress.com','xanga.com','xing.com','yaplog.jp','yelp.com','youtube.com','yozm.daum.net','yuku.com','zooomr.com');
	
    for (i = 0; i < socialSites.length; i++) {
        if (ref.indexOf(socialSites[i]) > -1) {return true;}
    }
    return false;
}

function setRegionVariables(cookieVal){
	cookieVal = '?' + cookieVal;
	if(s.getQueryParam('zip','',cookieVal)) s.zip = s.getQueryParam('zip','',cookieVal);
	if(s.getQueryParam('PACode','',cookieVal)) s.eVar1 = s.prop1 = s.getQueryParam('PACode','',cookieVal);
	if(s.getQueryParam('Marketing','',cookieVal)) s.eVar2 = s.prop2 = s.getQueryParam('Marketing','',cookieVal);
	if(s.getQueryParam('FDAF','',cookieVal)) s.eVar3 = s.prop3 = s.getQueryParam('FDAF','',cookieVal);
}


function isInternal()
{
	
	var ref=document.referrer
	if(ref!='')
	{
		if(ref.indexOf('www.')>-1)ref=ref.replace('www.','')
		if(ref.indexOf('https://')>-1)ref=ref.replace('https://','')
		if(ref.indexOf('http://')>-1)ref=ref.replace('http://','')	
		var ref1=ref.split('/');
		var refdom=ref1[0];
		
	var filter =s.linkInternalFilters.split(',')
	
		for(i=0;i<filter.length; i++)
		{
		if(refdom.indexOf(filter[i])>-1)return true;
		}
	}	

		return false;
}



/* ---------- TNT integration start	-------------*/ 

//tnt cookieRead - reads the cookie, returns the value in that cookie
function cookieRead(cookieName){

	var cvalue =document.cookie
	var carray=cvalue.split(';')
	for (i=0;i<carray.length;i++){
		if(carray[i].indexOf(cookieName)>-1) {
			var cresult=carray[i].split("=")		
			return(cresult[1]);
		}
	}
}
	
//tnt setCookie - sets the cookie. Only used within the updateCookie function
function setCookie(c_name,value,exdays)
{
var temp = location.host.split('.').reverse();
var root_domain = '.' + temp[1] + '.' + temp[0];

var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=value + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value + "; domain=" + root_domain + "; path=/";
}

//tnt updateCookie - main cookie function to update cookies and values
//note: valueN=the variable name
//note: if value exists, it updates the value. if it does not exist, it appends it to the list
function updateCookie(c_name,valueN,value,exdays)
{
	var cValue=cookieRead(c_name);
	if (value=="" || value==undefined)value='none';
	if(value!="" && value!=undefined){
	if(cValue== undefined)
	{
		value=valueN+"|"+value
		setCookie(c_name,value,exdays);
		}
	else{
		var exVar=finCookieVal(c_name,valueN)
		if(exVar=="not in the cookie")
			{
	
			value=valueN+"|"+value
			cValue=cValue+","+value
			setCookie(c_name,cValue,exdays);
			}
		else
			{
			cValue=cValue.replace(exVar,value);
			setCookie(c_name,cValue,exdays);
			}
		
		}
	}
		
}

//tnt finCookieVal - returns the value of the individual variable >> it will give me the VALUE of eVarX, not 'eVarX'
function finCookieVal(cookieN,varn){
	var cval= cookieRead(cookieN);
	if(cval==undefined){return "undefined"}
	else{
		if(cval.indexOf(varn)>-1)
		{
		var ar1=cval.split(',')
		for(var i=0;i<ar1.length;i++)
			{
				var ar2=ar1[i].split('|')
				if(ar2[0]==varn)
				return ar2[1];
			}
		}
		else return "not in the cookie"
	}	
}


/*********************************** CUSTOM FV FUNCTIONS ******************************************/
function checklast() {
    if (!s.c_r('lastcheck')) {
        //if (s.c_r('visivalm')) {
            var valm = s.c_r('visivalm');
            var vale = s.c_r('visivale');
            if (valm=='') valm = 0;
            if (vale=='') vale = 0;
            
            s.events = s.apl(s.events, "event38", ",", 1);
            s.events = s.apl(s.events, "event40", ",", 1);
            s.products = s.apl(s.products, ";;;;" + "event38=" + valm, ",", 1);
            //s.eVar38 = '+' + valm;
            s.products = s.apl(s.products, ";;;;" + "event40=" + vale, ",", 1);
            //s.eVar40 = '+' + vale;

            s.c_w("visivalm","0",0);
            s.c_w("visivale","0",0);
        //}
    }

    var dt = new Date();
    dt.setMinutes(dt.getMinutes() + 30);
    s.c_w("lastcheck","1",dt);
}

function containsEvent(val) {
  if (s.events) {
    var temp = s.events.split(',');
    for (i = 0; i < temp.length; i++)
          if (temp[i] == val) return true;
  }
  return false;
}

function popval() {
    //s.eVar37 = 0;
    //s.eVar39 = 0;
  if((s.linkTrackVars!='None'&& s.linkTrackVars!='')||s.linkTrackVars.match('prop')||s.linkTrackVars.match('eVar')||s.linkTrackVars.match('evar')||s.linkTrackVars.match('events'))
	{
	s.linkTrackVars=s.linkTrackVars+",eVar49,eVar48,products,eVar39,eVar37,prop48,prop49"		
	}
    
    if (containsEvent('event13') && s.evar28 != 'sweeps entry') {
        switch (s.prop20) {
            case 'email only opt-in':
                s.eVar48 = 'event: updates opt-in'; s.eVar49 = 'email only'; appendVal(10.2); break;
            case 'email opt-in full':
                s.eVar48 = 'event: updates opt-in'; s.eVar49 = 'full'; appendVal(10.2); break;
            case 'email direct opt-in':
                s.eVar48 = 'event: updates opt-in'; s.eVar49 = 'direct only'; appendVal(10.2); break;
        }
   }    

    if (containsEvent('event2')) {
        s.eVar48 = 'event: b&p finished'; appendVal(13.25);
    } if (containsEvent('event5') || s.eVar28 == 'brochure: identified: usps') {
        s.eVar48 = 'event: mail brochure'; s.eVar49 = 'mail'; appendVal(26.91);
    } else if (containsEvent('event15') || s.eVar28 == 'brochure: anonymous: pdf') {
        s.eVar48 = 'event: pdf brochure'; s.eVar49 = 'pdf'; appendVal(9.45);
    } else if (containsEvent('event12')) {
        s.eVar48 = 'event: competitive compare'; appendVal(3.72);
    } else if (containsEvent('event1')) {
        s.eVar48 = 'event: find dealer'; appendVal(1.17);
    } else if (containsEvent('event3')) {
        switch (s.eVar28) {
            case 'vrfq: bp: as-built':
                s.eVar48 = 'event: vehicle quote'; s.eVar49 = 'bp: as-built'; appendVal(38.23); break;
            case 'vrfq: si: as-built':
                s.eVar48 = 'event: vehicle quote'; s.eVar49 = 'si: as-built'; appendVal(38.23); break;
            case 'vrfq: si: vin':
                s.eVar48 = 'event: vehicle quote'; s.eVar49 = 'si: vin'; appendVal(38.23); break;
            case 'vrfq: vls: vin':
                s.eVar48 = 'event: vehicle quote'; s.eVar49 = 'vls: vin'; appendVal(38.23); break;
            case 'vrfq: vls: as-built':
                s.eVar48 = 'event: vehicle quote'; s.eVar49 = 'vls: as-built'; appendVal(38.23); break;
        }
    } else if (containsEvent('event9')) {
        s.eVar48 = 'event: incentive views'; appendVal(3.58);
    } else if (containsEvent('event19')) {
        switch (s.eVar28) {
            case 'si: b&p':
            case 'si: bp':
                s.eVar48 = 'event: search inventory'; s.eVar49 = 'bp'; appendVal(7.58); break;
            case 'si: vls':
                s.eVar48 = 'event: search inventory'; s.eVar49 = 'vls'; appendVal(7.58); break;
        }
    } else if (containsEvent('event8')) {
        s.eVar48 = 'event: trade ins'; appendVal(56.89);
    } else if (containsEvent('event21')||s.prop48 == 'payment estimator')  {
        appendVal(5.12);
    } else if (s.prop5 == 'si: window sticker' || s.prop11 == 'fv: si: vls: window sticker') {
        s.eVar48 = 'event: window sticker'; s.eVar49 = 'view'; appendVal(7.43);
    } else if (containsEvent('event18')) {
        switch (s.eVar28) {
            case 'qrfq: gip':
                s.eVar48 = 'event: quick quote'; s.eVar49 = 'gip'; appendVal(44.69); break;
            case 'qrfq: gip: incentives':
                s.eVar48 = 'event: quick quote'; s.eVar49 = 'gip: incentives'; appendVal(44.69); break;
            case 'qrfq: bp: let us find it':
                s.eVar48 = 'event: quick quote'; s.eVar49 = 'bp: find it'; appendVal(44.69); break;
            case 'qrfq: si: let us find it':
                s.eVar48 = 'event: quick quote'; s.eVar49 = 'si: find it'; appendVal(44.69); break;
            case 'qrfq: fdaf banner':
                s.eVar48 = 'event: quick quote'; s.eVar49 = 'fdaf banner'; appendVal(44.69); break;
            case 'qrfq: bp: fast track':
                s.eVar48 = 'event: quick quote'; s.eVar49 = 'bp: fast'; appendVal(44.69); break;
        }
    }
  
  
/*  if (s.eVar37&&s.eVar37!=0&&s.eVar37!='') {
    s.products = s.apl(s.products, ";;;;" + "event37=" + s.eVar37, ",", 1);
    s.eVar37 = '+'+s.eVar37; 
  } else { 
    s.eVar37='';
  } 
  if (s.eVar39&&s.eVar39!=0&&s.eVar39!='') {
    s.products = s.apl(s.products, ";;;;" + "event39=" + s.eVar39, ",", 1);
    s.eVar39 = '+'+s.eVar39; 
  } else {
    s.eVar39='';
  }
  
*/
  
  if (s.eVar48) s.prop48 = s.eVar48;
  if (s.eVar49) s.prop49 = s.eVar49;     
}


function appendVal(val) {
    var newval = Math.round((val * gmmv())*100)/100;
    
    //s.eVar37 += newval;
    //s.eVar39 += val;
    
    s.events = s.apl(s.events, "event43", ",", 1);
    s.events = s.apl(s.events, "event37", ",", 1);
    s.events = s.apl(s.events, "event39", ",", 1);
    
    var savevalm = parseFloat(s.c_r('visivalm'));
    var savevale = parseFloat(s.c_r('visivale'));
    
    if((s.linkTrackVars!='None'&& s.linkTrackVars!='')||s.linkTrackVars.match('prop')||s.linkTrackVars.match('eVar')||s.linkTrackVars.match('evar')||s.linkTrackVars.match('events'))
	{
		if(s.linkTrackVars.indexOf('events')>-1 && s.linkTrackEvents!="None" && s.linkTrackEvents!='')
		s.linkTrackEvents=s.linkTrackEvents+",event43,event37,event39"	
		else
		{
			s.linkTrackVars=s.linkTrackVars+",events"
			s.linkTrackEvents=s.linkTrackEvents+",event43,event37,event39"
			}
	}

    if (isNaN(savevalm))
        savevalm = savevale = 0;

    savevalm += newval;
    savevale += val;
    
    savevalm = Math.round((savevalm)*100)/100;
    savevale = Math.round((savevale)*100)/100;

    var dt = new Date();
    dt.setFullYear(dt.getFullYear() + 1);
    s.c_w("visivalm",savevalm,dt);
    s.c_w("visivale",savevale,dt);    
}

function gmmv() {
    var vls = new Array('ford edge','ford focus','ford fusion','ford mustang','ford escape','ford expedition','ford explorer','ford flex','ford sport trac','ford e-series','ford f-150','ford ranger','ford super duty','ford f-250','ford f-350','ford f-450','ford taurus','ford taurus x','ford escape hybrid');
    var vlr = new Array(1.18,0.51,0.56,0.76,0.85,1.76,1.13,1.59,1.06,1.32,1.32,0.74,1.62,1.62,1.62,1.62,0.84,1.21,0.85);

    if (containsEvent('event1')) return 1;

    for (i = 0; i < vls.length; i++)
        if (s.prop16 == vls[i])
            return vlr[i];

    return 1;
}

//List of plugins
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/* Floodlight Tag Generation Plugin v0.1 */
s_visIdFloodlight = function (ds, dt, dc, dn, ep) {

    if (!ep || ep != 1) {
        var isFirstPage = s.getVisitStart('s_visit');
    }
    if (ep == 1 || isFirstPage == 1) {
        var dviCookie = s.c_r('s_fid');
        var visRegExp = /[0-9A-F]+-[0-9A-F]+/g;
        var dvi = dviCookie.match(visRegExp);
        var pr = location.protocol;
        var du = pr + '//fls.doubleclick.net/activityi;src=' + ds + ';type=' + dt + ';cat=' + dc + ';' + dn + '=';
        if (dvi) {
            s_dfaCall(du, dvi);
        } else {
            setTimeout('s_dfaCall(\'' + du + '\')', 4000);
        }
    }
}
s_dfaCall = function (du, dvi) {
      s.prop60 = s.c_r('s_fid');
      if(!dvi) {
		var dviCookie = s.c_r('s_fid');
		var visRegExp = /[0-9A-F]+-[0-9A-F]+/g;
		var dvi = dviCookie.match(visRegExp);
      }
      var axel = Math.random() + '';
      var a = axel * 10000000000000;
      dfaUrl = du + dvi + ';ord=' + a + '?';
      var createIframe = document.createElement('iframe');
      createIframe.setAttribute('src', dfaUrl);
      createIframe.setAttribute('width', '1');
      createIframe.setAttribute('height', '1');
      createIframe.setAttribute('frameborder', '0');
      createIframe.setAttribute('style', 'display:none');
      //document.getElementsByTagName('body')[0].appendChild(createIframe);
}

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin: socialPlatforms v1.1
 */
s.socialPlatforms=new Function("a",""
+"var s=this,g,K,D,E,F,i;g=s.referrer?s.referrer:document.referrer;g=g."
+"toLowerCase();K=s.split(s.socPlatList,'|');for(i=0;i<K.length;i++){"
+"D=s.split(K[i],'>');if(g.indexOf(D[0])!=-1){s.contextData['a.socialcontentprovider']=D[1];}}");
 
s.socPlatList="facebook.com>Facebook|twitter.com>Twitter|t.co/>Twitter|youtube.com>Youtube|clipmarks.com>Clipmarks|dailymotion.com>Dailymotion|delicious.com>Delicious|digg.com>Digg|diigo.com>Diigo|flickr.com>Flickr|flixster.com>Flixster|fotolog.com>Fotolog|friendfeed.com>FriendFeed|google.com/buzz>Google Buzz|buzz.googleapis.com>Google Buzz|plus.google.com>Google+|hulu.com>Hulu|identi.ca>identi.ca|ilike.com>iLike|intensedebate.com>IntenseDebate|myspace.com>MySpace|newsgator.com>Newsgator|photobucket.com>Photobucket|plurk.com>Plurk|slideshare.net>SlideShare|smugmug.com>SmugMug|stumbleupon.com>StumbleUpon|tumblr.com>Tumblr|vimeo.com>Vimeo|wordpress.com>WordPress|xanga.com>Xanga|metacafe.com>Metacafe|pinterest.com>Pinterest";

/*  
 * socialAuthors v1.5.2
 */
s.socialAuthors=new Function("",""
+"var s=this,g;g=s.referrer?s.referrer:document.referrer;if(g.indexOf"
+"('http://t.co/')===0||g.indexOf('https://t.co/')===0||g.indexOf('pi"
+"nterest.com/pin')!==-1||g.indexOf('tumblr.com')!==-1||g.indexOf('yo"
+"utube.com')!==-1){s.Integrate.add('SocialAuthor');s.Integrate.Socia"
+"lAuthor.tEvar='reserved';s.Integrate.SocialAuthor.get('http://sa-se"
+"rvices.social.omniture.com/author/name?var=[VAR]&callback=s.socialA"
+"uthorSearch&rs='+encodeURIComponent(s_account)+'&q='+encodeURICompo"
+"nent(g));s.Integrate.SocialAuthor.delay();s.Integrate.SocialAuthor."
+"setVars=function(s,p){if(p.tEvar==='reserved'){s.contextData['a.soc"
+"ialauthor']=s.user;}else{s[p.tEvar]=s.user;}}}");
s.socialAuthorSearch=new Function("obj",""
+"var s=this;if(typeof obj==='undefined'||typeof obj.author==='undefi"
+"ned'){s.user='Not Found';}else{s.user=obj.author;}s.Integrate.Socia"
+"lAuthor.ready();");

/*
* Utility manageVars v1.4 - clear variable values (requires split 1.5)
*/
s.manageVars=new Function("c","l","f",""
+"var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa"
+"geName,purchaseID,channel,server,pageType,campaign,state,zip,events"
+",products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar"
+"'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl"
+"it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l"
+"a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}"
+"}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0"
+");return true;}else{return false;}");
s.clearVars=new Function("t","var s=this;s[t]='';");
s.lowercaseVars=new Function("t",""
+"var s=this;if(s[t]&&t!='events'){s[t]=s[t].toString();if(s[t].index"
+"Of('D=')!=0){s[t]=s[t].toLowerCase();}}");

/*
* Plugin Utility: apl v1.1
*/
s.apl = new Function("l", "v", "d", "u", ""
+ "var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+ "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+ "e()));}}if(!m)l=l?l+d+v:v;return l");

s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");


/*
* Utility Function: split v1.5 (JS 1.0 compatible)
*/
s.split = new Function("l", "d", ""
+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: Set Suite
 */
s.setSuite=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+1800000);s.c_w(c,v,a);}else{v='novalue';a.setTime(a.getTime()+1800000);s.c_w(c,v,a);}");

/*
 * DynamicObjectIDs v1.4: Setup Dynamic Object IDs based on URL
 */
s.setupDynamicObjectIDs=new Function(""
+"var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
+">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
+" if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
+"lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
+"re=1}");
s.setOIDs=new Function("e",""
+"var s=s_c_il["+s._in+"],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
+",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
+"{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
+"=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
+"objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re"
+"pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';"
+"if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0"
+")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this."
+"s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o"
+"]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");

/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
 * Plugin: getCustomValOnce 
 */
s.getCustomValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+1800000);if(!s.c_w(c,v,a))s.c_w(c,v,0);}else{a.setTime(a.getTime()+1800000);v=s.c_r(c);if(!s.c_w(c,v,a))s.c_w(c,v,a);}return v==k?'':v");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");


s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Plugin: getVisitStart v2.0 - returns 1 on first page of visit
 * otherwise 0
 */
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;"); 

/*
* TNT Integration Plugin v1.0
*/
s.trackTNT =new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");


function fnGetDomain(url) {
return (url.match(/:\/\/(.[^/]+)/)[1]);
}

/* Configure Modules and Plugins */

s.maxDelay='3000';
s.loadModule("Integrate")
s.Integrate.onLoad=function(s,m){
	s.socialAuthors();
	//add other integration module dependent functions here
 };

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/

s.visitorNamespace="ford"
s.trackingServer="metrics.ford.com"
s.trackingServerSecure="smetrics.ford.com"
s.dc="112"
s.vmk="4A43B06B"

/* Configure Modules and Plugins */

s.loadModule("Media")


/*Configure Media Module Functions */
s.Media.autoTrack= false;
s.Media.trackWhilePlaying=true;
s.Media.segmentByMilestones=true;
s.Media.trackMilestones="25,50,75,100";
s.Media.trackVars="prop39,prop55,eVar55,eVar56,prop56,prop57,eVar57,events";
s.Media.trackEvents="event56,event57,event58,event59,event60,event61,event62";
s.Media.playerName="My Media Player";


s.Media.trackUsingContextData = true;
s.Media.contextDataMapping = {
"a.media.name":"eVar56,prop56",
"a.media.segment":"eVar55",
"a.media.timePlayed":"event61",
"a.media.view":"event56",
"a.media.segmentView":"event62",
"a.media.milestones":{
25:"event58",
50:"event59",
75:"event57",
100:"event60"
}
};

var tracked25=false
var tracked50=false
var tracked75=false
var tracked100=false
var fireRequest=false

  
s.Media.monitor = function (s,media){
  
if ((media.event == "MILESTONE") && (media.eventFirstTime)) {
	 if (media.milestone == 25) {
          s.prop57 = media.name+ " : " +"25%";
		  s.eVar57 = media.name+ " : " +"25%";
          fireRequest = true;
     }
     if (media.milestone == 50) {
          s.prop57 = media.name+ " : " +"50%";
		  s.eVar57 = media.name+ " : " +"50%";
          fireRequest = true;
     }
     if (media.milestone == 75) {
          s.prop57 = media.name+ " : " +"75%";
		  s.eVar57 = media.name+ " : " +"75%";
          fireRequest = true;
     }
     if (fireRequest) {
          fireRequest = false;
          sendRequest();
     }
}                


	if(media.event=="OPEN") {
        s.prop57 = media.name+ " : " +"0%";
		s.eVar57 = media.name+ " : " +"0%";
		s.prop39 = s.prop39
		s.prop55 = media.name+ " : " +s.prop39;
        sendRequest();
        s.prop57=""
		s.eVar57=""
		s.prop55=""
    }

    if(media.percent>=98)
	{
        s.prop57 = media.name+ " : " +"100%";
		s.eVar57 = media.name+ " : " +"100%";	
	}
  
    if(media.event=="CLOSE"&& media.percent>98) {
        sendRequest();
        s.prop57=""
		s.eVar57=""
    }
    

    function sendRequest(){
        s.Media.track(media.name);
    }
}

/****************************** MODULES *****************************/
/* Module: Media */
s.m_Media_c="var m=s.m_i('Media');m.cn=function(n){var m=this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',"
+"x;n=m.cn(n);if(!l)l=-1;if(n&&p){if(!m.l)m.l=new Object;if(m.l[n])m.close(n);if(b&&b.id)a=b.id;if(a)for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.o=0;i.x=0;i.p=m.cn(m.playerNa"
+"me?m.playerName:p);i.a=a;i.t=0;i.ts=0;i.s=Math.floor(tm.getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;i.tc=0;i.fel=new Object;i.vt=0;i.sn=0;i.sx=\"\";i.sl=0;i.sg=0;i.sc=0;i.us=0;i.lm=0;i.lo"
+"m=0;m.l[n]=i}};m._delete=function(n){var m=this,i;n=m.cn(n);i=m.l[n];m.l[n]=0;if(i&&i.m)clearTimeout(i.m.i)};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o,sn,sx,sl){var m=this,i;i=m.e(n,1"
+",o,sn,sx,sl);if(i&&!i.m){i.m=new Object;i.m.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.m.i=setTimeout(i.m.m,1000)}}"
+"');i.m.m()}};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){this.e(n,4,-1)};m.bcd=function(vo,i){var m=this,ns='a.media.',v=vo.linkTrackVars,e=vo.linkTrackEvents,pe='m_i',pev3,c=vo.context"
+"Data,x;c['a.contentType']='video';c[ns+'name']=i.n;c[ns+'playerName']=i.p;if(i.l>0){c[ns+'length']=i.l;}c[ns+'timePlayed']=Math.floor(i.ts);if(!i.vt){c[ns+'view']=true;pe='m_s';i.vt=1}if(i.sx){c[ns"
+"+'segmentNum']=i.sn;c[ns+'segment']=i.sx;if(i.sl>0)c[ns+'segmentLength']=i.sl;if(i.sc&&i.ts>0)c[ns+'segmentView']=true}if(i.lm>0)c[ns+'milestone']=i.lm;if(i.lom>0)c[ns+'offsetMilestone']=i.lom;if(v"
+")for(x in c)v+=',contextData.'+x;pev3='video';vo.pe=pe;vo.pev3=pev3;var d=m.contextDataMapping,y,a,l,n;if(d){vo.events2='';if(v)v+=',events';for(x in d){if(x.substring(0,ns.length)==ns)y=x.substrin"
+"g(ns.length);else y=\"\";a=d[x];if(typeof(a)=='string'){l=m.s.sp(a,',');for(n=0;n<l.length;n++){a=l[n];if(x==\"a.contentType\"){if(v)v+=','+a;vo[a]=c[x]}else if(y){if(y=='view'||y=='segmentView'||y"
+"=='timePlayed'){if(e)e+=','+a;if(c[x]){if(y=='timePlayed'){if(c[x])vo.events2+=(vo.events2?',':'')+a+'='+c[x];}else if(c[x])vo.events2+=(vo.events2?',':'')+a}}else if(y=='segment'&&c[x+'Num']){if(v"
+")v+=','+a;vo[a]=c[x+'Num']+':'+c[x]}else{if(v)v+=','+a;vo[a]=c[x]}}}}else if(y=='milestones'||y=='offsetMilestones'){x=x.substring(0,x.length-1);if(c[x]&&d[x+'s'][c[x]]){if(e)e+=','+d[x+'s'][c[x]];"
+"vo.events2+=(vo.events2?',':'')+d[x+'s'][c[x]]}}}vo.contextData=0}vo.linkTrackVars=v;vo.linkTrackEvents=e};m.bpe=function(vo,i,x,o){var m=this,pe='m_o',pev3,d='--**--';pe='m_o';if(!i.vt){pe='m_s';i"
+".vt=1}else if(x==4)pe='m_i';pev3=m.s.ape(i.n)+d+Math.floor(i.l>0?i.l:1)+d+m.s.ape(i.p)+d+Math.floor(i.t)+d+i.s+d+(i.to>=0?'L'+Math.floor(i.to):'')+i.e+(x!=0&&x!=2?'L'+Math.floor(o):'');vo.pe=pe;vo."
+"pev3=pev3};m.e=function(n,x,o,sn,sx,sl,pd){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),c,l,v=m.trackVars,e=m.trackEvents,ti=m.trackSeconds,tp=m.trackMilestones,to=m.trackOffsetMilesto"
+"nes,sm=m.segmentByMilestones,so=m.segmentByOffsetMilestones,z=new Array,j,t=1,w=new Object,x,ek,tc,vo=new Object;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){if(o<0){if(i.lx==1&&i.lt>0)o=(ts-i.lt)+i.l"
+"o;else o=i.lo}if(i.l>0)o=o<i.l?o:i.l;if(o<0)o=0;i.o=o;if(i.l>0){i.x=(i.o/i.l)*100;i.x=i.x>100?100:i.x}if(i.lo<0)i.lo=o;tc=i.tc;w.name=n;w.length=i.l;w.openTime=new Date;w.openTime.setTime(i.s*1000)"
+";w.offset=i.o;w.percent=i.x;w.playerName=i.p;if(i.to<0)w.mediaEvent=w.event='OPEN';else w.mediaEvent=w.event=(x==1?'PLAY':(x==2?'STOP':(x==3?'MONITOR':(x==4?'TRACK':(x==5?'FLUSH':('CLOSE'))))));if("
+"!pd){if(i.pd)pd=i.pd}else i.pd=pd;w.player=pd;if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {if(!sx){sn=i.sn;sx=i.sx;sl=i.sl}if(x){if(x==1)i.lo=o;if(x<=3&&i.to>=0){t=0;v=e=\"None\";if(i.to!=o){l=i.to;if(l>o)"
+"{l=i.lo;if(l>o)l=o}z=tp?m.s.sp(tp,','):0;if(i.l>0&&z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&(l/i.l)*100<c&&i.x>=c){t=1;j=z.length;w.mediaEvent=w.event='MILESTONE';i.lm=w.m"
+"ilestone=c}}z=to?m.s.sp(to,','):0;if(z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&l<c&&o>=c){t=1;j=z.length;w.mediaEvent=w.event='OFFSET_MILESTONE';i.lom=w.offsetMilestone=c}}"
+"}}if(i.sg||!sx){if(sm&&tp&&i.l>0){z=m.s.sp(tp,',');if(z){z[z.length]='100';l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c){if(i.x<c){sn=j+1;sx='M:'+l+'-'+c;j=z.length}l=c}}}}else if("
+"so&&to){z=m.s.sp(to,',');if(z){z[z.length]=''+(i.l>0?i.l:'E');l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c||z[j]=='E'){if(o<c||z[j]=='E'){sn=j+1;sx='O:'+l+'-'+c;j=z.length}l=c}}}}i"
+"f(sx)i.sg=1}if((sx||i.sx)&&sx!=i.sx){i.us=1;if(!i.sx){i.sn=sn;i.sx=sx}if(i.to>=0)t=1}if(x>=2&&i.lo<o){i.t+=o-i.lo;i.ts+=o-i.lo}if(x<=2||(x==3&&!i.lx)){i.e+=(x==1||x==3?'S':'E')+Math.floor(o);i.lx=("
+"x==3?1:x)}if(!t&&i.to>=0&&x<=3){ti=ti?ti:0;if(ti&&i.ts>=ti){t=1;w.mediaEvent=w.event='SECONDS'}}if(x==5)v=e=\"None\";i.lt=ts;i.lo=o}if(!x||i.x>=100){x=0;m.e(n,2,-1,0,0,-1,pd);v=e=\"None\"}ek=w.medi"
+"aEvent;if(ek=='MILESTONE')ek+='_'+w.milestone;else if(ek=='OFFSET_MILESTONE')ek+='_'+w.offsetMilestone;if(!i.fel[ek]) {w.eventFirstTime=true;i.fel[ek]=1}else w.eventFirstTime=false;w.timePlayed=i.t"
+";w.segmentNum=i.sn;w.segment=i.sx;w.segmentLength=i.sl;if(m.monitor&&x!=4)m.monitor(m.s,w);if(x==0)m._delete(n);if(t&&i.tc==tc){vo=new Object;vo.contextData=new Object;vo.linkTrackVars=v;vo.linkTra"
+"ckEvents=e;if(!vo.linkTrackVars)vo.linkTrackVars='';if(!vo.linkTrackEvents)vo.linkTrackEvents='';if(m.trackUsingContextData)m.bcd(vo,i);else m.bpe(vo,i,x,o);m.s.t(vo);if(i.us){i.sn=sn;i.sx=sx;i.sc="
+"1;i.us=0}else if(i.ts>0)i.sc=0;i.e=\"\";i.lm=i.lom=0;i.ts-=Math.floor(i.ts);i.to=o;i.tc++}}}return i};m.ae=function(n,l,p,x,o,sn,sx,sl,pd,b){var m=this,r=0;if(n&&(!m.autoTrackMediaLengthRequired||("
+"length&&length>0)) &&p){if(!m.l||!m.l[n]){if(x==1||x==3){m.open(n,l,p,b);r=1}}else r=1;if(r)m.e(n,x,o,sn,sx,sl,pd)}};m.a=function(o,t){var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,"
+"x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'"
+"+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&"
+"&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,"
+"p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p='Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,m"
+"n;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8)x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if"
+"(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x.type='text/javascript';x.htmlFor=i;x.event='PlayStateChange(Ne"
+"wState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p==2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':"
+"'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTimeScale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!="
+"o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,0,\"\",0,0,o);m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l,\"'+p+'"
+"\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c);o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '+o.GetVe"
+"rsionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetLength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if(n==3)x="
+"1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n==3&&(o.'+f7+'>=10||!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}"
+"o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o.'+f"
+"3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName(m.s"
+".isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd.addEventListener)s.wd.addEventListener('load',m.as,false);if(m"
+".onLoad)m.onLoad(s,m)";
s.m_i("Media");

/* Module: Integrate */
s.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!m.s.wd[o])m.s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p"
+".get=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m."
+"l[i]];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=func"
+"tion(p,u){var m=this,s=m.s,v,x,y,z,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*10000"
+"000000000):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;x=0;while(x>=0){x=u.indexOf('[',x);if(x>=0){y=u.indexOf(']',x);if(y>x){z=u.substring(x+1,y);if(z.length>2&&z.substring(0,2)=='s."
+"'){v=s[z.substring(2)];if(!v)v=''}else{v=''+p[z];if(!(v==p[z]||parseFloat(v)==p[z]))z=0}if(z) {u=u.substring(0,x)+s.rep(escape(v),'+','%2B')+u.substring(y+1);x=y-(z.length-v.length+1)} else {x=y}}}"
+"}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule('Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay"
+"=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&"
+"&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d[x];p._d--}};m.beacon=function(u){var p=this,m"
+"=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;im=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.s"
+"cript=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
s.m_i("Integrate");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.27.2';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
+"\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}retur"
+"n y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;ret"
+"urn 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent("
+"x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.su"
+"bstring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+"
+"','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00"
+"'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unesc"
+"ape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r"
+";z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring("
+"0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf'"
+",f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visi"
+"bilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){whil"
+"e(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\")"
+";s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.li"
+"nkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostnam"
+"e,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'"
+".','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<"
+"0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-6"
+"0);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':''"
+");return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i"
+";l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tc"
+"f=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s"
+".wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0"
+";return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return "
+"s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)fo"
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackin"
+"gServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLow"
+"erCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.vers"
+"ion+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if"
+"(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]"
+"=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd["
+"imn];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!"
+"s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e"
+".getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'"
+"+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,"
+"l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='ht"
+"tps://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l="
+"',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'"
+"+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextDat"
+"a\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(n"
+"fn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){n"
+"k=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLi"
+"ghtData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(s"
+"p=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return "
+"qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe"
+"=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if"
+"(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv|"
+"|fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';e"
+"lse if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocationHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='pageURL'"
+"){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigratio"
+"nKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}"
+"else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='co"
+"okieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='"
+"resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='br"
+"owserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v=''"
+";else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q"
+"='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k"
+"],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev"
+"'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring("
+"0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function("
+"h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',"
+"h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e'"
+";return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.d"
+"ispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s"
+"._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useFor"
+"cedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.targe"
+"t;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h="
+"0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}"
+"catch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX"
+",e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediateP"
+"ropagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||"
+"(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)"
+"!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase()"
+":'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;"
+"if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''"
+"),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o"
+".s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')"
+">=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un)"
+";return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){v"
+"ar s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if"
+"(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+"
+"=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o="
+"s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s"
+".apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s."
+"n.userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,"
+"s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n"
+"){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0"
+"&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,"
+"i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.u"
+"n.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n"
+",a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._"
+"il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}"
+"else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)"
+"g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\"
+"'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m="
+"function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m"
+"[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};"
+"s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s."
+"h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){"
+"if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a("
+"\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c"
+"','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendC"
+"hild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g"
+".length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"|"
+"|k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!"
+"'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}"
+"else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTi"
+"me();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketi"
+"ngCloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloudVisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrac"
+"kCheck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID = false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analytic"
+"sVisitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._a"
+"udienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s.audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;"
+"s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWaitingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s"
+".audienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.v"
+"isitor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisitorID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s._waitingForMarketingCloudVisi"
+"torID = true;s.marketingCloudVisitorID = visitor.getMarketingCloudVisitorID([s,s._marketingCloudVisitorIDCallback]);if (s.marketingCloudVisitorID) {s._doneWaitingForMarketingCloudVisitorID = true;}"
+"}if ((!s._waitingForAnalyticsVisitorID) && (!s.analyticsVisitorID) && (visitor.getAnalyticsVisitorID)) {s._waitingForAnalyticsVisitorID = true;s.analyticsVisitorID = visitor.getAnalyticsVisitorID(["
+"s,s._analyticsVisitorIDCallback]);if (s.analyticsVisitorID) {s._doneWaitingForAnalyticsVisitorID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (vis"
+"itor.getAudienceManagerLocationHint)) {s._waitingForAudienceManagerLocationHint = true;s.audienceManagerLocationHint = visitor.getAudienceManagerLocationHint([s,s._audienceManagerLocationHintCallba"
+"ck]);if (s.audienceManagerLocationHint) {s._doneWaitingForAudienceManagerLocationHint = true;}}if ((!s._waitingForAudienceManagerBlob) && (!s.audienceManagerBlob) && (visitor.getAudienceManagerBlob"
+")) {s._waitingForAudienceManagerBlob = true;s.audienceManagerBlob = visitor.getAudienceManagerBlob([s,s._audienceManagerBlobCallback]);if (s.audienceManagerBlob) {s._doneWaitingForAudienceManagerBl"
+"ob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarketingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)          && (!s."
+"_doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingForAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceManagerLocati"
+"onHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceManagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._callbackWhen"
+"ReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToTrack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo.callbackThis"
+" = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;if (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWhenReadyToTra"
+"ckQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWhenReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReadyToTrackCheck"
+"=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack()) {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._callbackWhen"
+"ReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._callbackWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();callbackInfo.ca"
+"llback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrack=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = null;if (!s."
+"isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {};for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}setVariables ="
+" {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s.callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this,d='01234567"
+"89ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);"
+"l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTrack,trk=1,tm"
+"=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?"
+"y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if ((!s.supplementalDataID) &&"
+" (s.visitor) && (s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}if(s.mpc('t',argum"
+"ents))return;s.gl(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,o,i,x='',c='"
+"',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)"
+"j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a."
+"reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?"
+"'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.do"
+"cumentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}ca"
+"tch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.p"
+"l.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeigh"
+"t=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins"
+")s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s."
+"eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid("
+"o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf("
+"'?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s."
+"ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAt"
+"tribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_object"
+"ID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(o"
+"cq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=n"
+"ew Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.a"
+"pe(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,"
+"ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.supplementalDataID=s.pageU"
+"RLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t"
+",n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s."
+"t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;"
+"i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeo"
+"f(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);e"
+"lse y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.ge"
+"tElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE ')"
+",o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if"
+"(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parse"
+"Float(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l="
+"'supplementalDataID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrat"
+"ionServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLight"
+"Profiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreFo"
+"rSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,linkName,linkType';var n;"
+"for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,p"
+"ev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+"
+"',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamic"
+"AccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo"
+",lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs="
+"function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}

/************* Audience Manager ***********************/
"function"!==typeof window.DIL&&(window.DIL=function(a,c){var d=[],b,g;a!==Object(a)&&(a={});var f,k,n,u,s,m,p,y,x,J,K,D;f=a.partner;k=a.containerNSID;n=!!a.disableDestinationPublishingIframe;u=a.iframeAkamaiHTTPS;s=a.mappings;m=a.uuidCookie;p=!0===a.enableErrorReporting;y=a.visitorService;x=a.declaredId;J=!0===a.removeFinishedScriptsAndCallbacks;K=!0===a.delayAllUntilWindowLoad;D=!0===a.disableIDSyncs;var L,M,N,G,E,O,P,Q;L=!0===a.disableScriptAttachment;M=!0===a.disableCORSFiring;N=!0===a.disableDefaultRequest;
G=a.afterResultForDefaultRequest;E=a.dpIframeSrc;O=!0===a.testCORS;P=!0===a.useJSONPOnly;Q=a.visitorConstructor;p&&DIL.errorModule.activate();var R=!0===window._dil_unit_tests;(b=c)&&d.push(b+"");if(!f||"string"!==typeof f)return b="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",message:b,filename:"dil.js"}),Error(b);b="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";if(k||"number"===typeof k)k=parseInt(k,10),
!isNaN(k)&&0<=k&&(b="");b&&(k=0,d.push(b),b="");g=DIL.getDil(f,k);if(g instanceof DIL&&g.api.getPartner()===f&&g.api.getContainerNSID()===k)return g;if(this instanceof DIL)DIL.registerDil(this,f,k);else return new DIL(a,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+f+" and containerNSID = "+k);var B={IS_HTTPS:"https:"===document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,COOKIE_MAX_EXPIRATION_DATE:"Tue, 19 Jan 2038 03:14:07 UTC"},H=
{stuffed:{}},l={},q={firingQueue:[],fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_cors_responses:0,num_of_cors_errors:0,corsErrorSources:[],num_of_img_responses:0,num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,platformParams:{d_nsid:k+"",d_rtbd:"json",d_jsonv:DIL.jsonVersion+
"",d_dst:"1"},nonModStatsParams:{d_rtbd:!0,d_dst:!0,d_cts:!0,d_rs:!0},modStatsParams:null,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2E3,calledBack:!1,mid:null,noVisitorAPI:!1,instance:null,releaseType:"no VisitorAPI",admsProcessingStarted:!1,process:function(e){try{if(!this.admsProcessingStarted){this.admsProcessingStarted=!0;var t=this,a,h,b,d,c;if("function"===typeof e&&"function"===typeof e.getInstance){if(y===Object(y)&&(a=y.namespace)&&"string"===typeof a)h=e.getInstance(a,{idSyncContainerID:k});
else{this.releaseType="no namespace";this.releaseRequests();return}if(h===Object(h)&&"function"===typeof h.isAllowed&&"function"===typeof h.getMarketingCloudVisitorID&&"function"===typeof h.getCustomerIDs){if(!h.isAllowed()){this.releaseType="VisitorAPI not allowed";this.releaseRequests();return}this.instance=h;b=function(e){"VisitorAPI"!==t.releaseType&&(t.mid=e,t.releaseType="VisitorAPI",t.releaseRequests())};R&&(d=y.server)&&"string"===typeof d&&(h.server=d);c=h.getMarketingCloudVisitorID(b);if("string"===
typeof c&&c.length){b(c);return}setTimeout(function(){"VisitorAPI"!==t.releaseType&&(t.releaseType="timeout",t.releaseRequests())},this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);return}this.releaseType="invalid instance"}else this.noVisitorAPI=!0;this.releaseRequests()}}catch(f){this.releaseRequests()}},releaseRequests:function(){this.calledBack=!0;q.registerRequest()},getMarketingCloudVisitorID:function(){return this.instance?this.instance.getMarketingCloudVisitorID():null},getMIDQueryString:function(){var e=
w.isPopulatedString,t=this.getMarketingCloudVisitorID();e(this.mid)&&this.mid===t||(this.mid=t);return e(this.mid)?"d_mid="+this.mid+"&":""},getCustomerIDs:function(){return this.instance?this.instance.getCustomerIDs():null},getCustomerIDsQueryString:function(e){if(e===Object(e)){var t="",a=[],h=[],b,d;for(b in e)e.hasOwnProperty(b)&&(h[0]=b,d=e[b],d===Object(d)&&(h[1]=d.id||"",h[2]=d.authState||0,a.push(h),h=[]));if(h=a.length)for(e=0;e<h;e++)t+="&d_cid_ic="+a[e].join("%01");return t}return""}},
declaredId:{declaredId:{init:null,request:null},declaredIdCombos:{},setDeclaredId:function(e,t){var a=w.isPopulatedString,h=encodeURIComponent;if(e===Object(e)&&a(t)){var b=e.dpid,d=e.dpuuid,c=null;if(a(b)&&a(d)){c=h(b)+"$"+h(d);if(!0===this.declaredIdCombos[c])return"setDeclaredId: combo exists for type '"+t+"'";this.declaredIdCombos[c]=!0;this.declaredId[t]={dpid:b,dpuuid:d};return"setDeclaredId: succeeded for type '"+t+"'"}}return"setDeclaredId: failed for type '"+t+"'"},getDeclaredIdQueryString:function(){var e=
this.declaredId.request,t=this.declaredId.init,a="";null!==e?a="&d_dpid="+e.dpid+"&d_dpuuid="+e.dpuuid:null!==t&&(a="&d_dpid="+t.dpid+"&d_dpuuid="+t.dpuuid);return a}},registerRequest:function(e){var a=this.firingQueue;e===Object(e)&&a.push(e);this.firing||!a.length||K&&!DIL.windowLoaded||!this.adms.calledBack||(e=a.shift(),e.src=e.src.replace(/demdex.net\/event\?d_nsid=/,"demdex.net/event?"+this.adms.getMIDQueryString()+"d_nsid="),w.isPopulatedString(e.corsPostData)&&(e.corsPostData=e.corsPostData.replace(/^d_nsid=/,
this.adms.getMIDQueryString()+"d_nsid=")),C.fireRequest(e),this.firstRequestHasFired||"script"!==e.tag&&"cors"!==e.tag||(this.firstRequestHasFired=!0))},processVisitorAPI:function(){this.adms.process(Q||window.Visitor)},requestRemoval:function(e){if(!J)return"removeFinishedScriptsAndCallbacks is not boolean true";var a=this.toRemove,r,h;e===Object(e)&&(r=e.script,h=e.callbackName,(r===Object(r)&&"SCRIPT"===r.nodeName||"no script created"===r)&&"string"===typeof h&&h.length&&a.push(e));if(this.readyToRemove&&
a.length){h=a.shift();r=h.script;h=h.callbackName;"no script created"!==r?(e=r.src,r.parentNode.removeChild(r)):e=r;window[h]=null;try{delete window[h]}catch(b){}this.removed.push({scriptSrc:e,callbackName:h});DIL.variables.scriptsRemoved.push(e);DIL.variables.callbacksRemoved.push(h);return this.requestRemoval()}return"requestRemoval() processed"}};g=function(){var e="http://fast.",a="?d_nsid="+k+"#"+encodeURIComponent(document.location.href);if("string"===typeof E&&E.length)return E+a;B.IS_HTTPS&&
(e=!0===u?"https://fast.":"https://");return e+f+".demdex.net/dest5.html"+a};var z={THROTTLE_START:3E4,throttleTimerSet:!1,id:"destination_publishing_iframe_"+f+"_"+k,url:g(),iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messageSendingInterval:B.POST_MESSAGE_ENABLED?15:100,ibsDeleted:[],jsonProcessed:[],newIframeCreated:null,iframeIdChanged:!1,originalIframeHasLoadedAlready:null,attachIframe:function(){function e(){h=document.createElement("iframe");h.id=b.id;h.style.cssText=
"display: none; width: 0; height: 0;";h.src=b.url;b.newIframeCreated=!0;a();document.body.appendChild(h)}function a(){v.addListener(h,"load",function(){h.className="aamIframeLoaded";b.iframeHasLoaded=!0;b.requestToProcess()})}var b=this,h=document.getElementById(this.id);h?"IFRAME"!==h.nodeName?(this.id+="_2",this.iframeIdChanged=!0,e()):(this.newIframeCreated=!1,"aamIframeLoaded"!==h.className?(this.originalIframeHasLoadedAlready=!1,a()):(this.iframeHasLoaded=this.originalIframeHasLoadedAlready=
!0,this.requestToProcess())):e();this.iframe=h},requestToProcess:function(e,a){var b=this;e&&!w.isEmptyObject(e)&&this.process(e,a);this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages&&(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){b.messageSendingInterval=B.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},process:function(e,a){var b=encodeURIComponent,h,d,c,f,g,k;a===Object(a)&&(k=v.encodeAndBuildRequest(["",a.dpid||
"",a.dpuuid||""],","));if((h=e.dests)&&h instanceof Array&&(d=h.length))for(c=0;c<d;c++)f=h[c],f=[b("dests"),b(f.id||""),b(f.y||""),b(f.c||"")],this.addMessage(f.join("|"));if((h=e.ibs)&&h instanceof Array&&(d=h.length))for(c=0;c<d;c++)f=h[c],f=[b("ibs"),b(f.id||""),b(f.tag||""),v.encodeAndBuildRequest(f.url||[],","),b(f.ttl||""),"",k],this.addMessage(f.join("|"));if((h=e.dpcalls)&&h instanceof Array&&(d=h.length))for(c=0;c<d;c++)f=h[c],g=f.callback||{},g=[g.obj||"",g.fn||"",g.key||"",g.tag||"",g.url||
""],f=[b("dpm"),b(f.id||""),b(f.tag||""),v.encodeAndBuildRequest(f.url||[],","),b(f.ttl||""),v.encodeAndBuildRequest(g,","),k],this.addMessage(f.join("|"));this.jsonProcessed.push(e)},addMessage:function(e){var a=encodeURIComponent,a=p?a("---destpub-debug---"):a("---destpub---");this.messages.push(a+e)},sendMessages:function(){var e=this,a;this.messages.length?(a=this.messages.shift(),DIL.xd.postMessage(a,this.url,this.iframe.contentWindow),this.messagesPosted.push(a),setTimeout(function(){e.sendMessages()},
this.messageSendingInterval)):this.sendingMessages=!1}},I={traits:function(e){w.isValidPdata(e)&&(l.sids instanceof Array||(l.sids=[]),v.extendArray(l.sids,e));return this},pixels:function(e){w.isValidPdata(e)&&(l.pdata instanceof Array||(l.pdata=[]),v.extendArray(l.pdata,e));return this},logs:function(e){w.isValidLogdata(e)&&(l.logdata!==Object(l.logdata)&&(l.logdata={}),v.extendObject(l.logdata,e));return this},customQueryParams:function(e){w.isEmptyObject(e)||v.extendObject(l,e,q.reservedKeys);
return this},signals:function(e,a){var b,h=e;if(!w.isEmptyObject(h)){if(a&&"string"===typeof a)for(b in h={},e)e.hasOwnProperty(b)&&(h[a+b]=e[b]);v.extendObject(l,h,q.reservedKeys)}return this},declaredId:function(e){q.declaredId.setDeclaredId(e,"request");return this},result:function(e){"function"===typeof e&&(l.callback=e);return this},afterResult:function(e){"function"===typeof e&&(l.postCallbackFn=e);return this},useImageRequest:function(){l.useImageRequest=!0;return this},clearData:function(){l=
{};return this},submit:function(){C.submitRequest(l);l={};return this},getPartner:function(){return f},getContainerNSID:function(){return k},getEventLog:function(){return d},getState:function(){var e={},a={};v.extendObject(e,q,{callbackPrefix:!0,useJSONP:!0,registerRequest:!0});v.extendObject(a,z,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{pendingRequest:l,otherRequestInfo:e,destinationPublishingInfo:a}},idSync:function(e){if(D)return"Error: id syncs have been disabled";
if(e!==Object(e)||"string"!==typeof e.dpid||!e.dpid.length)return"Error: config or config.dpid is empty";if("string"!==typeof e.url||!e.url.length)return"Error: config.url is empty";var a=e.url,b=e.minutesToLive,h=encodeURIComponent,d,a=a.replace(/^https:/,"").replace(/^http:/,"");if("undefined"===typeof b)b=20160;else if(b=parseInt(b,10),isNaN(b)||0>=b)return"Error: config.minutesToLive needs to be a positive number";d=v.encodeAndBuildRequest(["",e.dpid,e.dpuuid||""],",");e=["ibs",h(e.dpid),"img",
h(a),b,"",d];z.addMessage(e.join("|"));q.firstRequestHasFired&&z.requestToProcess();return"Successfully queued"},aamIdSync:function(e){if(D)return"Error: id syncs have been disabled";if(e!==Object(e)||"string"!==typeof e.dpuuid||!e.dpuuid.length)return"Error: config or config.dpuuid is empty";e.url="//dpm.demdex.net/ibs:dpid="+e.dpid+"&dpuuid="+e.dpuuid;return this.idSync(e)},passData:function(e){if(w.isEmptyObject(e))return"Error: json is empty or not an object";z.ibsDeleted.push(e.ibs);delete e.ibs;
C.defaultCallback(e);return e},getPlatformParams:function(){return q.platformParams},getEventCallConfigParams:function(){var e=q,a=e.modStatsParams,b=e.platformParams,h;if(!a){a={};for(h in b)b.hasOwnProperty(h)&&!e.nonModStatsParams[h]&&(a[h.replace(/^d_/,"")]=b[h]);e.modStatsParams=a}return a}},C={corsMetadata:function(){var e="none",a=!0;"undefined"!==typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?e="XMLHttpRequest":(new Function("/*@cc_on return /^10/.test(@_jscript_version) @*/"))()?
e="XMLHttpRequest":"undefined"!==typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(a=!1),0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&(a=!1));return{corsType:e,corsCookiesEnabled:a}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new window[this.corsMetadata.corsType]},submitRequest:function(e){q.registerRequest(C.createQueuedRequest(e));return!0},createQueuedRequest:function(e){var a=q,b,h=e.callback,d="img",c;if(!w.isEmptyObject(s)){var f,
g,m;for(f in s)s.hasOwnProperty(f)&&(g=s[f],null!=g&&""!==g&&f in e&&!(g in e||g in q.reservedKeys)&&(m=e[f],null!=m&&""!==m&&(e[g]=m)))}w.isValidPdata(e.sids)||(e.sids=[]);w.isValidPdata(e.pdata)||(e.pdata=[]);w.isValidLogdata(e.logdata)||(e.logdata={});e.logdataArray=v.convertObjectToKeyValuePairs(e.logdata,"=",!0);e.logdataArray.push("_ts="+(new Date).getTime());"function"!==typeof h&&(h=this.defaultCallback);a.useJSONP=!0!==e.useImageRequest;a.useJSONP&&(d="script",b=a.callbackPrefix+"_"+k+"_"+
(new Date).getTime());a=this.makeRequestSrcData(e,b);!P&&(c=this.getCORSInstance())&&a.truncated&&(this.corsMetadata.corsCookiesEnabled||a.isDeclaredIdCall)&&(d="cors");return{tag:d,src:a.src,corsSrc:a.corsSrc,internalCallbackName:b,callbackFn:h,postCallbackFn:e.postCallbackFn,useImageRequest:!!e.useImageRequest,requestData:e,corsInstance:c,corsPostData:a.corsPostData,hasCORSError:!1}},defaultCallback:function(e,a){var b,h,d,c,f,g,k,x,p;if((b=e.stuff)&&b instanceof Array&&(h=b.length))for(d=0;d<h;d++)if((c=
b[d])&&c===Object(c)){f=c.cn;g=c.cv;k=c.ttl;if("undefined"===typeof k||""===k)k=Math.floor(v.getMaxCookieExpiresInMinutes()/60/24);x=c.dmn||"."+document.domain.replace(/^www\./,"");p=c.type;f&&(g||"number"===typeof g)&&("var"!==p&&(k=parseInt(k,10))&&!isNaN(k)&&v.setCookie(f,g,1440*k,"/",x,!1),H.stuffed[f]=g)}b=e.uuid;w.isPopulatedString(b)&&!w.isEmptyObject(m)&&(h=m.path,"string"===typeof h&&h.length||(h="/"),d=parseInt(m.days,10),isNaN(d)&&(d=100),v.setCookie(m.name||"aam_did",b,1440*d,h,m.domain||
"."+document.domain.replace(/^www\./,""),!0===m.secure));n||q.abortRequests||z.requestToProcess(e,a)},makeRequestSrcData:function(e,a){e.sids=w.removeEmptyArrayValues(e.sids||[]);e.pdata=w.removeEmptyArrayValues(e.pdata||[]);var b=q,d=b.platformParams,c=v.encodeAndBuildRequest(e.sids,","),g=v.encodeAndBuildRequest(e.pdata,","),m=(e.logdataArray||[]).join("&");delete e.logdataArray;var x=B.IS_HTTPS?"https://":"http://",p=b.declaredId.getDeclaredIdQueryString(),s=b.adms.instance?b.adms.getCustomerIDsQueryString(b.adms.getCustomerIDs()):
"",A;A=[];var l,n,u,y;for(l in e)if(!(l in b.reservedKeys)&&e.hasOwnProperty(l))if(n=e[l],l=encodeURIComponent(l),n instanceof Array)for(u=0,y=n.length;u<y;u++)A.push(l+"="+encodeURIComponent(n[u]));else A.push(l+"="+encodeURIComponent(n));A=A.length?"&"+A.join("&"):"";l=!1;c="d_nsid="+d.d_nsid+p+s+(c.length?"&d_sid="+c:"")+(g.length?"&d_px="+g:"")+(m.length?"&d_ld="+encodeURIComponent(m):"");d="&d_rtbd="+d.d_rtbd+"&d_jsonv="+d.d_jsonv+"&d_dst="+d.d_dst;x=x+f+".demdex.net/event";g=b=x+"?"+c+(b.useJSONP?
d+"&d_cb="+(a||""):"")+A;2048<b.length&&(b=b.substring(0,b.lastIndexOf("&")),l=!0);return{corsSrc:x+"?"+(O?"testcors=1&d_nsid="+k+"&":"")+"_ts="+(new Date).getTime(),src:b,originalSrc:g,truncated:l,corsPostData:c+d+A,isDeclaredIdCall:""!==p}},fireRequest:function(e){if("img"===e.tag)this.fireImage(e);else{var a=q.declaredId,a=a.declaredId.request||a.declaredId.init||{},a={dpid:a.dpid||"",dpuuid:a.dpuuid||""};"script"===e.tag?this.fireScript(e,a):"cors"===e.tag&&this.fireCORS(e,a)}},fireImage:function(e){var a=
q,c,h;a.abortRequests||(a.firing=!0,c=new Image(0,0),a.sent.push(e),c.onload=function(){a.firing=!1;a.fired.push(e);a.num_of_img_responses++;a.registerRequest()},h=function(c){b="imgAbortOrErrorHandler received the event of type "+c.type;d.push(b);a.abortRequests=!0;a.firing=!1;a.errored.push(e);a.num_of_img_errors++;a.registerRequest()},c.addEventListener?(c.addEventListener("error",h,!1),c.addEventListener("abort",h,!1)):c.attachEvent&&(c.attachEvent("onerror",h),c.attachEvent("onabort",h)),c.src=
e.src)},fireScript:function(a,c){var g=this,h=q,k,m,x=a.src,p=a.postCallbackFn,l="function"===typeof p,s=a.internalCallbackName;h.abortRequests||(h.firing=!0,window[s]=function(g){try{g!==Object(g)&&(g={});D&&(z.ibsDeleted.push(g.ibs),delete g.ibs);var k=a.callbackFn;h.firing=!1;h.fired.push(a);h.num_of_jsonp_responses++;k(g,c);l&&p(g,c)}catch(r){r.message="DIL jsonp callback caught error with message "+r.message;b=r.message;d.push(b);r.filename=r.filename||"dil.js";r.partner=f;DIL.errorModule.handleError(r);
try{k({error:r.name+"|"+r.message},c),l&&p({error:r.name+"|"+r.message},c)}catch(x){}}finally{h.requestRemoval({script:m,callbackName:s}),h.registerRequest()}},L?(h.firing=!1,h.requestRemoval({script:"no script created",callbackName:s})):(m=document.createElement("script"),m.addEventListener&&m.addEventListener("error",function(c){h.requestRemoval({script:m,callbackName:s});b="jsonp script tag error listener received the event of type "+c.type+" with src "+x;g.handleScriptError(b,a)},!1),m.type="text/javascript",
m.src=x,k=DIL.variables.scriptNodeList[0],k.parentNode.insertBefore(m,k)),h.sent.push(a),h.declaredId.declaredId.request=null)},fireCORS:function(a,c){function g(r){var m;try{if(m=JSON.parse(r),m!==Object(m)){h.handleCORSError(a,c,"Response is not JSON");return}}catch(p){h.handleCORSError(a,c,"Error parsing response as JSON");return}try{var x=a.callbackFn;k.firing=!1;k.fired.push(a);k.num_of_cors_responses++;x(m,c);n&&s(m,c)}catch(l){l.message="DIL handleCORSResponse caught error with message "+l.message;
b=l.message;d.push(b);l.filename=l.filename||"dil.js";l.partner=f;DIL.errorModule.handleError(l);try{x({error:l.name+"|"+l.message},c),n&&s({error:l.name+"|"+l.message},c)}catch(q){}}finally{k.registerRequest()}}var h=this,k=q,m=this.corsMetadata.corsType,x=a.corsSrc,p=a.corsInstance,l=a.corsPostData,s=a.postCallbackFn,n="function"===typeof s;if(!k.abortRequests){k.firing=!0;if(M)k.firing=!1;else try{p.open("post",x,!0),"XMLHttpRequest"===m?(p.withCredentials=!0,p.setRequestHeader("Content-Type",
"application/x-www-form-urlencoded"),p.onreadystatechange=function(){4===this.readyState&&(200===this.status?g(this.responseText):h.handleCORSError(a,c,"onreadystatechange"))}):"XDomainRequest"===m&&(p.onload=function(){g(this.responseText)}),p.onerror=function(){h.handleCORSError(a,c,"onerror")},p.ontimeout=function(){h.handleCORSError(a,c,"ontimeout")},p.send(l)}catch(u){this.handleCORSError(a,c,"try-catch")}k.sent.push(a);k.declaredId.declaredId.request=null}},handleCORSError:function(a,b,c){a.hasCORSError||
(a.hasCORSError=!0,q.num_of_cors_errors++,q.corsErrorSources.push(c),a.tag="script",this.fireScript(a,b))},handleScriptError:function(a,b){q.num_of_jsonp_errors++;this.handleRequestError(a,b)},handleRequestError:function(a,b){var c=q;d.push(a);c.abortRequests=!0;c.firing=!1;c.errored.push(b);c.registerRequest()}},w={isValidPdata:function(a){return a instanceof Array&&this.removeEmptyArrayValues(a).length?!0:!1},isValidLogdata:function(a){return!this.isEmptyObject(a)},isEmptyObject:function(a){if(a!==
Object(a))return!0;for(var b in a)if(a.hasOwnProperty(b))return!1;return!0},removeEmptyArrayValues:function(a){for(var b=0,c=a.length,d,f=[],b=0;b<c;b++)d=a[b],"undefined"!==typeof d&&null!==d&&""!==d&&f.push(d);return f},isPopulatedString:function(a){return"string"===typeof a&&a.length}},v={addListener:function(){if(document.addEventListener)return function(a,b,c){a.addEventListener(b,function(a){"function"===typeof c&&c(a)},!1)};if(document.attachEvent)return function(a,b,c){a.attachEvent("on"+
b,function(a){"function"===typeof c&&c(a)})}}(),convertObjectToKeyValuePairs:function(a,b,c){var d=[],f,g;b||(b="=");for(f in a)a.hasOwnProperty(f)&&(g=a[f],"undefined"!==typeof g&&null!==g&&""!==g&&d.push(f+b+(c?encodeURIComponent(g):g)));return d},encodeAndBuildRequest:function(a,b){return this.map(a,function(a){return encodeURIComponent(a)}).join(b)},map:function(a,b){if(Array.prototype.map)return a.map(b);if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==
typeof b)throw new TypeError;for(var f=Array(d),g=0;g<d;g++)g in c&&(f[g]=b.call(b,c[g],g,c));return f},filter:function(a,b){if(!Array.prototype.filter){if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var g=[],f=0;f<d;f++)if(f in c){var k=c[f];b.call(b,k,f,c)&&g.push(k)}return g}return a.filter(b)},getCookie:function(a){a+="=";var b=document.cookie.split(";"),c,d,f;c=0;for(d=b.length;c<d;c++){for(f=b[c];" "===f.charAt(0);)f=
f.substring(1,f.length);if(0===f.indexOf(a))return decodeURIComponent(f.substring(a.length,f.length))}return null},setCookie:function(a,b,c,d,f,g){var k=new Date;c&&(c*=6E4);document.cookie=a+"="+encodeURIComponent(b)+(c?";expires="+(new Date(k.getTime()+c)).toUTCString():"")+(d?";path="+d:"")+(f?";domain="+f:"")+(g?";secure":"")},extendArray:function(a,b){return a instanceof Array&&b instanceof Array?(Array.prototype.push.apply(a,b),!0):!1},extendObject:function(a,b,c){var d;if(a===Object(a)&&b===
Object(b)){for(d in b)!b.hasOwnProperty(d)||!w.isEmptyObject(c)&&d in c||(a[d]=b[d]);return!0}return!1},getMaxCookieExpiresInMinutes:function(){return((new Date(B.COOKIE_MAX_EXPIRATION_DATE)).getTime()-(new Date).getTime())/1E3/60}};"error"===f&&0===k&&v.addListener(window,"load",function(){DIL.windowLoaded=!0});var S=!1,F=function(){S||(S=!0,q.registerRequest(),U(),n||q.abortRequests||z.attachIframe(),q.readyToRemove=!0,q.requestRemoval())},U=function(){n||setTimeout(function(){N||q.firstRequestHasFired||
("function"===typeof G?I.afterResult(G).submit():I.submit())},DIL.constants.TIME_TO_DEFAULT_REQUEST)},T=document;"error"!==f&&(DIL.windowLoaded?F():"complete"!==T.readyState&&"loaded"!==T.readyState?v.addListener(window,"load",function(){DIL.windowLoaded=!0;F()}):(DIL.windowLoaded=!0,F()));q.declaredId.setDeclaredId(x,"init");q.processVisitorAPI();this.api=I;this.getStuffedVariable=function(a){var b=H.stuffed[a];b||"number"===typeof b||(b=v.getCookie(a))||"number"===typeof b||(b="");return b};this.validators=
w;this.helpers=v;this.constants=B;this.log=d;R&&(this.pendingRequest=l,this.requestController=q,this.setDestinationPublishingUrl=g,this.destinationPublishing=z,this.requestProcs=C,this.variables=H,this.callWindowLoadFunctions=F)},function(){var a=document,c;null==a.readyState&&a.addEventListener&&(a.readyState="loading",a.addEventListener("DOMContentLoaded",c=function(){a.removeEventListener("DOMContentLoaded",c,!1);a.readyState="complete"},!1))}(),DIL.extendStaticPropertiesAndMethods=function(a){var c;
if(a===Object(a))for(c in a)a.hasOwnProperty(c)&&(this[c]=a[c])},DIL.extendStaticPropertiesAndMethods({version:"6.2",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50},variables:{scriptNodeList:document.getElementsByTagName("script"),scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoad:function(a){this.windowLoaded="function"===typeof a?!!a():"boolean"===typeof a?a:!0},create:function(a){try{return new DIL(a)}catch(c){return(new Image(0,0)).src="http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D"+
(new Date).getTime(),Error("Error in attempt to create DIL instance with DIL.create()")}},registerDil:function(a,c,d){c=c+"$"+d;c in this.dils||(this.dils[c]=a)},getDil:function(a,c){var d;"string"!==typeof a&&(a="");c||(c=0);d=a+"$"+c;return d in this.dils?this.dils[d]:Error("The DIL instance with partner = "+a+" and containerNSID = "+c+" was not found")},dexGetQSVars:function(a,c,d){c=this.getDil(c,d);return c instanceof this?c.getStuffedVariable(a):""},xd:{postMessage:function(a,c,d){var b=1;c&&
(window.postMessage?d.postMessage(a,c.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):c&&(d.location=c.replace(/#.*$/,"")+"#"+ +new Date+b++ +"&"+a))}}}),DIL.errorModule=function(){var a=DIL.create({partner:"error",containerNSID:0,disableDestinationPublishingIframe:!0}),c={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},d=!1;return{activate:function(){d=!0},handleError:function(b){if(!d)return"DIL error module has not been activated";
b!==Object(b)&&(b={});var g=b.name?(b.name+"").toLowerCase():"",f=[];b={name:g,filename:b.filename?b.filename+"":"",partner:b.partner?b.partner+"":"no_partner",site:b.site?b.site+"":document.location.href,message:b.message?b.message+"":""};f.push(g in c?c[g]:c.noerrortypedefined);a.api.pixels(f).logs(b).useImageRequest().submit();return"DIL error report sent"},pixelMap:c}}(),DIL.tools={},DIL.modules={helpers:{handleModuleError:function(a,c,d){var b="";c=c||"Error caught in DIL module/submodule: ";
a===Object(a)?b=c+(a.message||"err has no message"):(b=c+"err is not a valid object",a={});a.message=b;d instanceof DIL&&(a.partner=d.api.getPartner());DIL.errorModule.handleError(a);return this.errorMessage=b}}});
DIL.tools.getSearchReferrer=function(a,c){var d=DIL.getDil("error"),b=DIL.tools.decomposeURI(a||document.referrer),g="",f="",k={queryParam:"q"};return(g=d.helpers.filter([c===Object(c)?c:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(a){return!(!a.hasOwnProperty("hostPattern")||!b.hostname.match(a.hostPattern))}).shift())?{valid:!0,name:b.hostname,keywords:(d.helpers.extendObject(k,g),f=k.queryPattern?
(g=(""+b.search).match(k.queryPattern))?g[1]:"":b.uriParams[k.queryParam],decodeURIComponent(f||"").replace(/\+|%20/g," "))}:{valid:!1,name:"",keywords:""}};
DIL.tools.decomposeURI=function(a){var c=DIL.getDil("error"),d=document.createElement("a");d.href=a||document.referrer;return{hash:d.hash,host:d.host.split(":").shift(),hostname:d.hostname,href:d.href,pathname:d.pathname.replace(/^\//,""),protocol:d.protocol,search:d.search,uriParams:function(a,d){c.helpers.map(d.split("&"),function(c){c=c.split("=");a[c.shift()]=c.shift()});return a}({},d.search.replace(/^(\/|\?)?|\/$/g,""))}};
DIL.tools.getMetaTags=function(){var a={},c=document.getElementsByTagName("meta"),d,b,g,f,k;d=0;for(g=arguments.length;d<g;d++)if(f=arguments[d],null!==f)for(b=0;b<c.length;b++)if(k=c[b],k.name===f){a[f]=k.content;break}return a};
DIL.modules.siteCatalyst={dil:null,handle:DIL.modules.helpers.handleModuleError,init:function(a,c,d,b){try{var g=this,f={name:"DIL Site Catalyst Module Error"},k=function(a){f.message=a;DIL.errorModule.handleError(f);return a};this.options=b===Object(b)?b:{};this.dil=null;if(c instanceof DIL)this.dil=c;else return k("dilInstance is not a valid instance of DIL");f.partner=c.api.getPartner();if(a!==Object(a))return k("siteCatalystReportingSuite is not an object");window.AppMeasurement_Module_DIL=a.m_DIL=
function(a){var b="function"===typeof a.m_i?a.m_i("DIL"):this;if(b!==Object(b))return k("m is not an object");b.trackVars=g.constructTrackVars(d);b.d=0;b.s=a;b._t=function(){var a,b,c=","+this.trackVars+",",d=this.s,f,s=[];f=[];var n={},u=!1;if(d!==Object(d))return k("Error in m._t function: s is not an object");if(this.d){if("function"===typeof d.foreachVar)d.foreachVar(function(a,b){"undefined"!==typeof b&&(n[a]=b,u=!0)},this.trackVars);else{if(!(d.va_t instanceof Array))return k("Error in m._t function: s.va_t is not an array");
if(d.lightProfileID)(a=d.lightTrackVars)&&(a=","+a+","+d.vl_mr+",");else if(d.pe||d.linkType)a=d.linkTrackVars,d.pe&&(b=d.pe.substring(0,1).toUpperCase()+d.pe.substring(1),d[b]&&(a=d[b].trackVars)),a&&(a=","+a+","+d.vl_l+","+d.vl_l2+",");if(a){b=0;for(s=a.split(",");b<s.length;b++)0<=c.indexOf(","+s[b]+",")&&f.push(s[b]);f.length&&(c=","+f.join(",")+",")}f=0;for(b=d.va_t.length;f<b;f++)a=d.va_t[f],0<=c.indexOf(","+a+",")&&"undefined"!==typeof d[a]&&null!==d[a]&&""!==d[a]&&(n[a]=d[a],u=!0)}g.includeContextData(d,
n).store_populated&&(u=!0);u&&this.d.api.signals(n,"c_").submit()}}};a.loadModule("DIL");a.DIL.d=c;return f.message?f.message:"DIL.modules.siteCatalyst.init() completed with no errors"}catch(n){return this.handle(n,"DIL.modules.siteCatalyst.init() caught error with message ",this.dil)}},constructTrackVars:function(a){var c=[],d,b,g,f,k;if(a===Object(a)){d=a.names;if(d instanceof Array&&(g=d.length))for(b=0;b<g;b++)f=d[b],"string"===typeof f&&f.length&&c.push(f);a=a.iteratedNames;if(a instanceof Array&&
(g=a.length))for(b=0;b<g;b++)if(d=a[b],d===Object(d)&&(f=d.name,k=parseInt(d.maxIndex,10),"string"===typeof f&&f.length&&!isNaN(k)&&0<=k))for(d=0;d<=k;d++)c.push(f+d);if(c.length)return c.join(",")}return this.constructTrackVars({names:"pageName channel campaign products events pe pev1 pev2 pev3".split(" "),iteratedNames:[{name:"prop",maxIndex:75},{name:"eVar",maxIndex:250}]})},includeContextData:function(a,c){var d={},b=!1;if(a.contextData===Object(a.contextData)){var g=a.contextData,f=this.options.replaceContextDataPeriodsWith,
k=this.options.filterFromContextVariables,n={},u,s,m,p;"string"===typeof f&&f.length||(f="_");if(k instanceof Array)for(u=0,s=k.length;u<s;u++)m=k[u],this.dil.validators.isPopulatedString(m)&&(n[m]=!0);for(p in g)!g.hasOwnProperty(p)||n[p]||!(k=g[p])&&"number"!==typeof k||(p=("contextData."+p).replace(/\./g,f),c[p]=k,b=!0)}d.store_populated=b;return d}};
DIL.modules.GA={dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,signals:{},hasSignals:!1,handle:DIL.modules.helpers.handleModuleError,init:function(a,c,d){try{this.tv=this.arr=this.dil=null;this.errorMessage="";this.signals={};this.hasSignals=!1;var b={name:"DIL GA Module Error"},g="";c instanceof DIL?(this.dil=c,b.partner=this.dil.api.getPartner()):(g="dilInstance is not a valid instance of DIL",
b.message=g,DIL.errorModule.handleError(b));a instanceof Array&&a.length?this.arr=a:(g="gaArray is not an array or is empty",b.message=g,DIL.errorModule.handleError(b));this.tv=this.constructTrackVars(d);this.errorMessage=g}catch(f){this.handle(f,"DIL.modules.GA.init() caught error with message ",this.dil)}finally{return this}},constructTrackVars:function(a){var c=[],d,b,g,f;if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){g=this.defaultTrackVars;f={};d=0;for(b=g.length;d<b;d++)f[g[d]]=
!0;this.defaultTrackVarsObj=f}else f=this.defaultTrackVarsObj;if(a===Object(a)){a=a.names;if(a instanceof Array&&(b=a.length))for(d=0;d<b;d++)g=a[d],"string"===typeof g&&g.length&&g in f&&c.push(g);if(c.length)return c}return this.defaultTrackVars},constructGAObj:function(a){var c={};a=a instanceof Array?a:this.arr;var d,b,g,f;d=0;for(b=a.length;d<b;d++)g=a[d],g instanceof Array&&g.length&&(g=[],f=a[d],g instanceof Array&&f instanceof Array&&Array.prototype.push.apply(g,f),f=g.shift(),"string"===
typeof f&&f.length&&(c[f]instanceof Array||(c[f]=[]),c[f].push(g)));return c},addToSignals:function(a,c){if("string"!==typeof a||""===a||null==c||""===c)return!1;this.signals[a]instanceof Array||(this.signals[a]=[]);this.signals[a].push(c);return this.hasSignals=!0},constructSignals:function(){var a=this.constructGAObj(),c={_setAccount:function(a){this.addToSignals("c_accountId",a)},_setCustomVar:function(a,b,c){"string"===typeof b&&b.length&&this.addToSignals("c_"+b,c)},_addItem:function(a,b,c,d,
f,g){this.addToSignals("c_itemOrderId",a);this.addToSignals("c_itemSku",b);this.addToSignals("c_itemName",c);this.addToSignals("c_itemCategory",d);this.addToSignals("c_itemPrice",f);this.addToSignals("c_itemQuantity",g)},_addTrans:function(a,b,c,d,f,g,k,n){this.addToSignals("c_transOrderId",a);this.addToSignals("c_transAffiliation",b);this.addToSignals("c_transTotal",c);this.addToSignals("c_transTax",d);this.addToSignals("c_transShipping",f);this.addToSignals("c_transCity",g);this.addToSignals("c_transState",
k);this.addToSignals("c_transCountry",n)},_trackSocial:function(a,b,c,d){this.addToSignals("c_socialNetwork",a);this.addToSignals("c_socialAction",b);this.addToSignals("c_socialTarget",c);this.addToSignals("c_socialPagePath",d)}},d=this.tv,b,g,f,k,n,u;b=0;for(g=d.length;b<g;b++)if(f=d[b],a.hasOwnProperty(f)&&c.hasOwnProperty(f)&&(u=a[f],u instanceof Array))for(k=0,n=u.length;k<n;k++)c[f].apply(this,u[k])},submit:function(){try{if(""!==this.errorMessage)return this.errorMessage;this.constructSignals();
return this.hasSignals?(this.dil.api.signals(this.signals).submit(),"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,"=",!0)+this.dil.log):"No signals present"}catch(a){return this.handle(a,"DIL.modules.GA.submit() caught error with message ",this.dil)}},Stuffer:{LIMIT:5,dil:null,cookieName:null,delimiter:null,errorMessage:"",handle:DIL.modules.helpers.handleModuleError,callback:null,v:function(){return!1},init:function(a,c,d){try{this.callback=this.dil=null,this.errorMessage=
"",a instanceof DIL?(this.dil=a,this.v=this.dil.validators.isPopulatedString,this.cookieName=this.v(c)?c:"aam_ga",this.delimiter=this.v(d)?d:"|"):this.handle({message:"dilInstance is not a valid instance of DIL"},"DIL.modules.GA.Stuffer.init() error: ")}catch(b){this.handle(b,"DIL.modules.GA.Stuffer.init() caught error with message ",this.dil)}finally{return this}},process:function(a){var c,d,b,g,f,k;k=!1;var n=1;if(a===Object(a)&&(c=a.stuff)&&c instanceof Array&&(d=c.length))for(a=0;a<d;a++)if((b=
c[a])&&b===Object(b)&&(g=b.cn,f=b.cv,g===this.cookieName&&this.v(f))){k=!0;break}if(k){c=f.split(this.delimiter);"undefined"===typeof window._gaq&&(window._gaq=[]);b=window._gaq;a=0;for(d=c.length;a<d&&!(k=c[a].split("="),f=k[0],k=k[1],this.v(f)&&this.v(k)&&b.push(["_setCustomVar",n++,f,k,1]),n>this.LIMIT);a++);this.errorMessage=1<n?"No errors - stuffing successful":"No valid values to stuff"}else this.errorMessage="Cookie name and value not found in json";if("function"===typeof this.callback)return this.callback()},
submit:function(){try{var a=this;if(""!==this.errorMessage)return this.errorMessage;this.dil.api.afterResult(function(c){a.process(c)}).submit();return"DIL.modules.GA.Stuffer.submit() successful"}catch(c){return this.handle(c,"DIL.modules.GA.Stuffer.submit() caught error with message ",this.dil)}}}};
DIL.modules.Peer39={aid:"",dil:null,optionals:null,errorMessage:"",calledBack:!1,script:null,scriptsSent:[],returnedData:[],handle:DIL.modules.helpers.handleModuleError,init:function(a,c,d){try{this.dil=null;this.errorMessage="";this.calledBack=!1;this.optionals=d===Object(d)?d:{};d={name:"DIL Peer39 Module Error"};var b=[],g="";this.isSecurePageButNotEnabled(document.location.protocol)&&(g="Module has not been enabled for a secure page",b.push(g),d.message=g,DIL.errorModule.handleError(d));c instanceof
DIL?(this.dil=c,d.partner=this.dil.api.getPartner()):(g="dilInstance is not a valid instance of DIL",b.push(g),d.message=g,DIL.errorModule.handleError(d));"string"===typeof a&&a.length?this.aid=a:(g="aid is not a string or is empty",b.push(g),d.message=g,DIL.errorModule.handleError(d));this.errorMessage=b.join("\n")}catch(f){this.handle(f,"DIL.modules.Peer39.init() caught error with message ",this.dil)}finally{return this}},isSecurePageButNotEnabled:function(a){return"https:"===a&&!0!==this.optionals.enableHTTPS?
!0:!1},constructSignals:function(){var a=this,c=this.constructScript(),d=DIL.variables.scriptNodeList[0];window["afterFinished_"+this.aid]=function(){try{var b=a.processData(p39_KVP_Short("c_p","|").split("|"));b.hasSignals&&a.dil.api.signals(b.signals).submit()}catch(c){}finally{a.calledBack=!0,"function"===typeof a.optionals.afterResult&&a.optionals.afterResult()}};d.parentNode.insertBefore(c,d);this.scriptsSent.push(c);return"Request sent to Peer39"},processData:function(a){var c,d,b,g,f={},k=
!1;this.returnedData.push(a);if(a instanceof Array)for(c=0,d=a.length;c<d;c++)b=a[c].split("="),g=b[0],b=b[1],g&&isFinite(b)&&!isNaN(parseInt(b,10))&&(f[g]instanceof Array||(f[g]=[]),f[g].push(b),k=!0);return{hasSignals:k,signals:f}},constructScript:function(){var a=document.createElement("script"),c=this.optionals,d=c.scriptId,b=c.scriptSrc,c=c.scriptParams;a.id="string"===typeof d&&d.length?d:"peer39ScriptLoader";a.type="text/javascript";"string"===typeof b&&b.length?a.src=b:(a.src=(this.dil.constants.IS_HTTPS?
"https:":"http:")+"//stags.peer39.net/"+this.aid+"/trg_"+this.aid+".js","string"===typeof c&&c.length&&(a.src+="?"+c));return a},submit:function(){try{return""!==this.errorMessage?this.errorMessage:this.constructSignals()}catch(a){return this.handle(a,"DIL.modules.Peer39.submit() caught error with message ",this.dil)}}};


//Instantiate DIL v6.2 code
var fDil = DIL.create({
	partner : "ford",
	uuidCookie : {
		name : 'aam_uuid',
		days : 30
	},
	visitorService: {
	namespace: "EFD95E09512D2A8E0A490D4D@AdobeOrg" 
	},
});
	
//SC object Instantiation
if (typeof s != 'undefined' && s === Object(s) && typeof s.account != 'undefined' && s.account) {
	_scDilObj = s_gi(s.account);
} else {
	_scDilObj = s_gi(s_account);
};

//SC Object Data Collection 
DIL.modules.siteCatalyst.init(_scDilObj, fDil, {
names: ['pageName', 'channel', 'campaign', 'products', 'events', 'pe', 'referrer', 'server', 'purchaseID', 'zip', 'state'],
    iteratedNames: [{
	   name: 'eVar',
	   maxIndex: 200
	}, {
	   name: 'prop',
	   maxIndex: 200
	}, {
	   name: 'pev',
	   maxIndex: 3
	}, {
	   name: 'hier',
	   maxIndex: 4
	}]
});
	
//ID sync	
if(typeof s.eVar31 != 'undefined' && s.eVar31)
{
			var cksId = s.eVar31;
			visitor.setCustomerIDs({
						"ioes337y":{
						"id":cksId,
						"authState":Visitor.AuthState.AUTHENTICATED
						}
			});
}
