/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/**
 * @fileOverview The "selectall2" plugin provides an editor command that
 *               allows selecting the entire content of editable area.
 *               This plugin also enables a toolbar button for the feature.
 */

( function() {
	CKEDITOR.plugins.add( 'selectall2', {
		lang: 'en,en-au,en-ca,en-gb,he', // %REMOVE_LINE_CORE%
		icons: 'selectall2', // %REMOVE_LINE_CORE%
		hidpi: true, // %REMOVE_LINE_CORE%
		init: function( editor ) {
			editor.addCommand( 'selectAll2', { modes: { wysiwyg: 1, source: 1 },
				exec: function( editor ) {
					var editable = editor.editable();

					if ( editable.is( 'textarea' ) ) {
						var textarea = editable.$;

							textarea.selectionStart = 0;
							textarea.selectionEnd = textarea.value.length;

						    textarea.focus();
					}
                    else
                    {
                        var range = editor.createRange();
                        range.selectNodeContents(editor.document.getBody());
                        range.select();

						// Force triggering selectionChange (#7008)
						editor.forceNextSelectionCheck();
						editor.selectionChange();
					}

				},
				canUndo: false
			} );

			editor.ui.addButton && editor.ui.addButton( 'SelectAll2', {
				label: editor.lang.selectall2.toolbar,
				command: 'selectAll2',
				toolbar: 'selection,10'
			} );
		}
	} );
} )();
