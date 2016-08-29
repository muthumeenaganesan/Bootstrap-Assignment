
(function() {

	function createInstance(namespace,component){

		if(window[namespace]) {
			return;
		}

		var isLoaded = false,
			postLoad = null;

		var root = {
			$: null,
			baseurl: 'http://www.quickquote.ford.com',
			serviceurl: '/services',
	        digurl: 'http://build.ford.com/dig/',
	        leadurl: 'www.quickquote.ford.com/services/lead/',
	        isHttpsEnabled: 'true',
	        singSiUrl: 'http://shop.ford.com',
	        components: [component],
			make: 'Ford',
			skin: 'Ford',
	        region: 'US',
	        device: 'desktop',
	        defaults: {
	            spc: '{ \"cashTerms\": { \"36\": 36, \"48\": 48, \"60\": 60, \"72\": 72, \"75\": 75 } }'
	        },
			lfas_embed: '#lfas_target',
			spc_embed: null,
			siteCookieDomain: '.ford.com',
			register: function(id, fn) {
	            root[id] = fn(root, root.defaults[id] && root.$.parseJSON(root.defaults[id]));
				for(var i = 0; i < root.components.length; i++) {
					if(!root[root.components[i]]) {
						return;
					}
				}
				isLoaded = true;
				if(postLoad) {
					for(var i = 0; i < postLoad.length; i++) {
						postLoad[i](root);
					}
				}
			},
			isLoaded: function () {
				return isLoaded;
			},
			init: function(fn) {

				if(isLoaded) {
					fn(root);
				} else {
					postLoad = postLoad || [];
					postLoad.push(fn);
				}
			},
			log: function() {
			}
		}
		window[namespace] = root;

		var jQuery = null,
			isReady = false;
		(function(fn) {
			if(document.readyState === 'complete') {
				return window.setTimeout(fn, 1);
			}
			if(document.addEventListener) {
				var cb = function() {
					document.removeEventListener('DOMContentLoaded', cb, false );
					fn();
				};
				document.addEventListener('DOMContentLoaded', cb, false);
				window.addEventListener('load', fn, false);
			} else if(document.attachEvent) {
				var cb = function() {
					if (document.readyState === 'complete') {
						document.detachEvent('onreadystatechange', cb);
						fn();
					}
				};
				document.attachEvent('onreadystatechange', cb);
				window.attachEvent('onload', fn);
				var topWin = false;
				try {
					topWin = window.frameElement == null;
				} catch(e) {}
				if(topWin) {
					(function (){ 
						var nd = document.createElement('document:ready'); 
						try {
							nd.doScroll('left'); 
							fn(); 
							nd = null; 
						} catch(e) {
							setTimeout(arguments.callee, 0); 
						} 
					})();
				}
			}
		})(function() {
			if(isReady) {
				return;
			}
			isReady = true;
			if(window.jQuery === undefined) {
				loadScript(root.baseurl + '/cc/static/js/jquery-1.7.1.min.js', function() {
					jQuery = window.jQuery.noConflict(false);
					compLoad();
				});
			} else {
				jQuery = window.jQuery;
				compLoad();
			}

		});
		function loadScript(src, fn) {
			var head = (document.getElementsByTagName('head')[0] || document.documentElement);
			var scr = document.createElement('script');
			scr.setAttribute('type', 'text/javascript');
			scr.setAttribute('src', src);
			var done = false;
			if(fn) {
				scr.onload = scr.onreadystatechange = function () {
					if(!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
						done = true;
						scr.onload = scr.onreadystatechange = null;
						if (head && scr.parentNode) {
							head.removeChild(scr);
						}
						scr = undefined;
						fn();
					}
				}
			}
			head.appendChild(scr);
		}
		function compLoad() {
			root.$ = jQuery;    
			root.$(document).ajaxError(function(e, xhr, settings, exception) {
				root.log('error in: ' + settings.url + ' \n', exception);
			});
			
			var $lfas_embed;
			if (typeof root.lfas_embed === 'string') {
				$lfas_embed = root.$(root.lfas_embed);
				$lfas_embed = ($lfas_embed.length < 1) ? undefined : $lfas_embed;
			}
			
			var $spc_embed;
			if (typeof root.spc_embed === 'string') {
				$spc_embed = root.$('#' + root.spc_embed);
				$spc_embed = ($spc_embed.length < 1) ? undefined : $spc_embed;
			}

			root.$.each(root.components, function(i, v) {
				if(v === 'lfas' &&  $lfas_embed) {
					$lfas_embed.append('<div id="fdcc_' + v + '"></div>');
				} else if(v === 'spc' && $spc_embed) {
					$spc_embed.append('<div id="fdcc_' + v + '"></div>');
				} else {
					root.$('body').append('<div id="fdcc_' + v + '"></div>');
				}
	        });
	        var prm = root.$.param({
	            
	            make: root.make,
	            skin: root.skin,
	            region: root.region,
	            device: root.device,
	            lfas_embed: '#lfas_target',
	            
	            ns: namespace,
	            id: root.components.join(',')
	        });

	        root.$('<link>', {
	            rel: 'stylesheet',
	            type: 'text/css',
	            href: root.baseurl + '/cc/file/style.css?' + prm
	        }).appendTo('head');
	        loadScript(root.baseurl + '/cc/file/script.js?' + prm);
		}
	}

		if( 'lfas' == 'lfas' ){
			createInstance(  'lfas', 'lfas' );
		}else{
			createInstance(  'fdcc', 'lfas' );
		}

})();