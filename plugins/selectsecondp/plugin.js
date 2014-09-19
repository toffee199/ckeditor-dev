/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/**
 * @fileOverview The "selectsecondp" plugin provides an editor command that
 *               allows selecting the entire content of editable area.
 *               This plugin also enables a toolbar button for the feature.
 */

( function() {
	CKEDITOR.plugins.add( 'selectsecondp', {
		lang: 'en,en-au,en-ca,en-gb,he', // %REMOVE_LINE_CORE%
		icons: 'selectsecondp', // %REMOVE_LINE_CORE%
		hidpi: true, // %REMOVE_LINE_CORE%
		init: function( editor ) {
			editor.addCommand( 'SelectSecondP', { modes: { wysiwyg: 1, source: 1 },
				exec: function( editor ) {
					var editable = editor.editable();

					if ( editable.is( 'textarea' ) ) {
						var textarea = editable.$;

						if ( CKEDITOR.env.ie )
							textarea.createTextRange().execCommand( 'SelectSecondP' );
						else {
							textarea.selectionStart = 0;
							textarea.selectionEnd = textarea.value.length;
						}

						textarea.focus();
					} else {
						if ( editable.is( 'body' ) )
							editor.document.$.execCommand( 'SelectSecondP', false, null );
						else {
							var range = editor.createRange();
							range.selectNodeContents( editable );
							range.select();
						}

						// Force triggering selectionChange (#7008)
						editor.forceNextSelectionCheck();
						editor.selectionChange();
					}

				},
				canUndo: false
			} );

			editor.ui.addButton && editor.ui.addButton( 'SelectSecondP', {
				label: editor.lang.selectsecondp.toolbar,
				command: 'SelectSecondP',
				toolbar: 'selection,10'
			} );
		}
	} );
} )();
