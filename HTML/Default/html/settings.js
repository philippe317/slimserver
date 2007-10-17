Settings = function(){
	var basicBtn, advBtn, header;

	return {
		init : function(){
			var layout = new Ext.BorderLayout(document.body, {
				north: {
					split:false,
					initialSize: 80
				},
				south: {
					split:false,
					initialSize: 65
				},
				center: {
					autoScroll: false
				}
			});

			layout.beginUpdate();
			layout.add('north', header = new Ext.ContentPanel('header', {fitToFrame:true, fitContainer:true}));
			layout.add('south', new Ext.ContentPanel('footer', {fitToFrame:true, fitContainer:true}));
			layout.add('center', new Ext.ContentPanel('main', {fitToFrame:true, fitContainer:true}));

			Ext.EventManager.onWindowResize(this.onResize, layout);
			Ext.EventManager.onDocumentReady(this.onResize, layout, true);

			layout.endUpdate();

			Ext.QuickTips.init();

			var tp = new Ext.TabPanel('settingsSelector');
			tp.addTab('t0', strings['status']).on('activate', function(){ Settings.showSettingsPage('settings/server/status.html'); });
			tp.addTab('t1', strings['basic']).on('activate', function(){ Settings.showSettingsPage('settings/server/basic.html'); });
			tp.addTab('t2', strings['player']).on('activate', function(){ Settings.showSettingsPage('settings/player/basic.html'); });
			tp.addTab('t3', strings['mymusic']).on('activate', function(){ Settings.showSettingsPage('settings/server/behavior.html'); });
			tp.addTab('t4', strings['itunes']).on('activate', function(){ Settings.showSettingsPage('plugins/iTunes/settings/itunes.html'); });
			tp.addTab('t5', strings['podcasts']).on('activate', function(){ Settings.showSettingsPage('plugins/Podcast/settings/basic.html'); });
			tp.addTab('t6', strings['accounts']).on('activate', function(){ Settings.showSettingsPage('settings/server/squeezenetwork.html'); });
			tp.addTab('t7', strings['interface']).on('activate', function(){ Settings.showSettingsPage('settings/server/interface.html'); });
			tp.addTab('t8', strings['plugins']).on('activate', function(){ Settings.showSettingsPage('settings/server/plugins.html'); });
			tp.addTab('t9', strings['advanced']).on('activate', function(){ Settings.showSettingsPage('settings/index.html?sub=advanced'); });

			tp.activate('t0');

			new Ext.Button('cancel', {
				text: strings['close'],
				handler: function(){
					window.open('javascript:window.close();','_self','');
				}
			});

			new Ext.Button('save', {
				text: strings['save'],
				handler: this.submitSettings,
				scope: this
			});

			this.onResize();
		},

		submitSettings : function() {
			var myForm;
			try { myForm = frames.settings.subSettings.document.forms.settingsForm; }
			catch(e){
				try { myForm = frames.settings.document.forms.settingsForm; }
				catch(e){}
			}

			if (myForm) {
				myForm.submit();
			}
		},

		showSettingsPage : function(page) {
			Ext.get('settings').dom.src = webroot + page + (page.search(/\?/) >= 0 ? '&' : '?') + 'player=' + player;
		},


		initDescPopup : function(){
			var section, descEl, desc, helpEl, title;

			var tpl = new Ext.Template('<img src="' + webroot + 'html/images/search.gif" class="prefHelp">');
			tpl.compile();

			Ext.QuickTips.init();

			var items = Ext.query('div.hiddenDesc');
			for(var i = 0; i < items.length; i++) {
				descEl = Ext.get(items[i]);

				if (descEl)
					section = descEl.up('div.settingGroup', 1) || Ext.get(items[i]).up('div.settingSection', 1);
				else
					continue;

				title = section.child('div.prefHead');
				if (title)
					title = title.dom.innerHTML;

				if (section && (desc = descEl.dom.innerHTML)) {
					if (desc.length > 100) {
						helpEl = tpl.insertAfter(descEl);
						Ext.QuickTips.register({
							target: helpEl,
							text: desc,
							title: title,
							maxWidth: 600,
							autoHide: false
						});
					}
					else {
						descEl.removeClass('hiddenDesc');
					}
				}
			}

		},

		// resize panels, folder selectors etc.
		onResize : function(){
			var main = Ext.get('main');
			var settings = Ext.get('settings');

			var dimensions = new Array();
			dimensions['maxHeight'] = main.getHeight();
			dimensions['maxWidth'] = main.getWidth() - 10;

			settings.setHeight(dimensions['maxHeight']);
			settings.setWidth(dimensions['maxWidth'] - 20);
			main.setWidth(dimensions['maxWidth']);
		}
	};
}();
