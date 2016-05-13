/*!
The MIT License (MIT)

Copyright (c) 2014 DI GREGORIO Thomas and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/**
 * tmpl Plugin == MediaWIki ==
 */
if(typeof tmpl != 'undefined')
{
	(function(){
	
	// define constants
	var IMAGE_REG = /^\[\[Image:.*?\|.*?(?:frame|thumbnail|thumb|none|right|left|center)/i;
	function parse_inline_nowiki( s )
	{
		return s;
	}


	function list_diff( s1, s2 )
	{
		var types = { '*':'ul', '#':'ol', ';':'dl', ':':'dl' },
			ini = [s1,s2],
			out = ['',''];

		for( var i = s1.length; i > 0; i-- )
		{
			if( ini[0][0] == ini[1][0] )
			{
				ini[0] = ini[0].substr(1);
				ini[1] = ini[1].substr(1);
			}
			else
				break;
		}
		for( var i = ini[0].length; i > 0; i-- ) out[0] += '</'+types[ini[0][i-1]]+'>';
		for( var i = ini[1].length; i > 0; i-- ) out[1] += '<'+types[ini[1][i-1]]+'>';
		return out;
	};
	window.list_diff = list_diff;
	// Add new rules
	tmpl.rules['text/x-tmpl-mediawiki'] = [
		
		// Unescape newlines to use multiline modifier
		{s: /\\n/g, r: '\n'},
		
		// === Titles ===
		{s: /^(={1,6})(.*)\1$/gm, r: '<h"+("$1".length)+">$2</h"+("$1".length)+">'},
		
		// ; dt : dd
// 		{s: /\;(.*?):(.*?)\n/g, r: ''},

		{s: /^([*#:;]+)(.*?)$/gm, r: function( s, $1, $2, pos, all )
			{
				tmpl.rules['text/x-tmpl-mediawiki']._prevList = tmpl.rules['text/x-tmpl-mediawiki']._prevList || '';
				var prev = tmpl.rules['text/x-tmpl-mediawiki']._prevList;
				
				var nextLineStart = all.substr(pos).search('\n') + pos,
					nextLineEnd = all.substr(nextLineStart+1).search('\n') + nextLineStart+1,
					nextline = all.substring( nextLineStart, nextLineEnd ),
					next = /^([*#:;]+)(.*?)$/m.exec( nextline );
				next = !next || next.index != 1 ? '' : next[1];
				

				var types = { '*':['ul','li'], '#':['ol','li'], ';':['dl','dt'], ':':['dl','dd'] }, 
					types = { '*':'li', '#':'li', ';':'dt', ':':'dd' }, 
// 					prevParent = prev ? types[prev[prev.length-1]][0] : '',
// 					parent = types[$1[$1.length-1]][0],
					tag = types[$1[0]]
					;
				var closeBefore = list_diff(prev, $1)[0];
				var openBefore = list_diff(prev, $1)[1];
				var closeAfter = !next ? list_diff($1,next)[0] : '';
				

				console.groupCollapsed('%c%s%c"%s"', 'color:red', $1, '', $2 );
					
					console.log( 'prev:%s this:%s next:%s', prev, $1, next );
					
// 					console.log( 'must open:', list_diff($1, next)[1] || list_diff(prev, $1)[1] );
// 					console.log( 'must close:', list_diff(prev, $1)[0] || list_diff( $1, next)[0] );
					
					
					console.log( 'must close:', closeBefore );
					console.log( 'must open:', openBefore );
					console.log( 'must close after:', closeAfter );
					

					

					console.log( '%c%s%c"%s"', 'color:red', $1, '', $2 );
					console.log( '%c%s%c%s%c%s', 'color:green', closeBefore + openBefore + '<'+tag+'>', '', $2, 'color:darkgreen', '</'+tag+'>' + closeAfter );
				console.groupEnd();

				tmpl.rules['text/x-tmpl-mediawiki']._prevList = closeAfter ? '' : $1;

				return closeBefore + openBefore + '<'+tag+'>' + parse_inline_nowiki($2) + '</'+tag+'>' + closeAfter;
				
			}},
		
		// [[Links]]
		{s : /\[\[(.*?)\]\]/g, r: '<a href="$1"></a>'},

		// Parse pictures
		{s: /^\[\[Image:(.*?\|.*?(?:frame|thumbnail|thumb|none|right|left|center))/img,
			r: function( s, $1, $2 )
			{
				console.log( '%c%s%c"%s"', 'color:red', $1, '', $2 );
				return $1;
			}},
		
		// Re-escpape newlines
		{s : /[\n]/g, r: '\\n'}

	];


	})()
}