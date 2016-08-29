/*************************************************************************
 Copyright (C) Unpublished Versata Software, Inc. All rights reserved.
 Versata Software, Inc., Confidential and Proprietary.

 This software is subject to copyright protection
 under the laws of the United States and other countries.

 Unless otherwise explicitly stated, this software is provided
 by Versata "AS IS".
*************************************************************************/
/**
 * This script file provides the functionality to add the widgets into the 3rd party site.
 * In order to add BrandSites UI widgets into other sites, one needs to include
 * yahoo-dom-event.js file and this file in the head.
 * Then any widget being added requires an addition "loadWidget" script file to be added.
 * URL pattern for the widget file to be added:
 * <script type="text/javascript" src="<BS_Server>/suvs/escape/?block=loadWidget&widget=<WidgetID>&divId=<DivID>"></script>
 *
 */
/*global YAHOO, getPackageForName, _instances */
(function () {
	'use strict';
	var $D = YAHOO.util.Dom;
	var $E = YAHOO.util.Event;
	var $P = getPackageForName("com.forddirect.ng.wtk");

	$P.BrandSitesWidgetLoader = function () {
		/**
		 * Defining member variables to be used for loading widgets.
		 */

		// Contains widget objects in array
		this.__bsWidgetsInfo = [];

		// List of files (scripts as well as styles) already considered for adding to the head.
		this.__loaded = {};

		// Used to generating unique ID for the files being added to the head.
		this.__idCount = 0;

		// Array contains list of the file ID that are being added to the head.
		this.__loadedFilesID = [];

		this.init = function () {

			var __bodyTagStyleClass = window.__bodyTagStyleClass || "";
			// Add style class to the body tag, if it is missing. This class is important from the skinning prospective.
			var bodyNode = document.getElementsByTagName('body')[0];
			$D.addClass(bodyNode, __bodyTagStyleClass);

			// Attach widgets
			var i;
			for (i = 0; i < this.__bsWidgetsInfo.length; i++) {
				this.attachWidget(this.__bsWidgetsInfo[i]);
			}

			/**
			 * Wait for all BrandSites widget resources to be loaded. Once all are loaded, 'initializeWidgets' method is invoked.
			 */
			var onContentReadyEventCount = 0;
			var self = this;
			$E.onContentReady(this.__loadedFilesID, function () {
				onContentReadyEventCount++;

				if (onContentReadyEventCount >= self.__loadedFilesID.length) {
					self.initializeWidgets();
				}
			});
		};

		/**
		 * Adding widget information into the common map "__bsWidgetsInfo".
		 * Called by each BrandSites widget to add its information into the common map.
		 */
		this.appendWidgets = function (widgetObj) {
			this.__bsWidgetsInfo.push(widgetObj);
		};


		/**
		 * This method attaches the widget
		 * TODO: Document the expected object format.
		 */
		this.attachWidget = function (widgetObj) {
			var el = document.getElementById(widgetObj.id);
			if (el !== null) {
				el.innerHTML = widgetObj.markup;
				this.__loadedFilesID.push(widgetObj.id);
			}
		};


		/**
		 * This method takes care of initializing the widget if their 'jsClass' is provided.
		 */
		this.initializeWidgets = function () {
			if (typeof _instances.bsLoader !== 'undefined') {
				_instances.bsLoader.init();

				if (_instances.bsLoader.initializationComplete === true) {
					this.instantiateWidgets();
				} else {
					_instances.bsLoader.initCompleteEvent.subscribe(this.instantiateWidgets, this, true);
				}
			}
		};

		this.instantiateWidgets = function () {
			var i;
			for (i = 0; i < this.__bsWidgetsInfo.length; i++) {
				if (typeof this.__bsWidgetsInfo[i].jsClass !== 'undefined') {
					var el = $D.get(this.__bsWidgetsInfo[i].id);
					var ClassObj = getPackageForName(this.__bsWidgetsInfo[i].jsClass);
					var myInstance = new ClassObj(el);
				}
			}

		};

	};

	/**
	 * Iterates to the list of widget object (to be loaded) and invokes "attachWidget" method for each one of them.
	 * After widget markup is attached and resource files are getting loaded, 'onContentReady' for each resource being loaded
	 * is called.
	 * Once all resources are loaded, that is, widgets required resource file and widget templates are loaded, widgets
	 * JS objects are initialized.
	 *
	 * Called when main page is loaded completely.
	 * Once main page is loaded, the loading of brandsite widgets is initiated.
	 * NOTE: We need to wait for the DOM Ready, since the required libraries as well as the DOM elements that are to be updated,
	 *      needs to be present.
	 */
	//The global instance of the WidgetLoader
	_instances.bsWidgetLoader = new $P.BrandSitesWidgetLoader();


	$E.onDOMReady(function () {

		_instances.bsWidgetLoader.init();
	});
}());
