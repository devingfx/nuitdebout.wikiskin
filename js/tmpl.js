// Simple JavaScript Templating for both nodejs and browsers - Thomas Di Grégorio - http://www.devingfx.com/ - derived from
// Simple JavaScript Templating - John Resig - http://ejohn.org/ - MIT Licensed
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

if(typeof tmpl == 'undefined')
{
	(function(exports, document){
		var cache = {}, el,
			fs = typeof require == 'function' ? require('fs') : null;

		var tmpl = exports.tmpl = function tmpl(str, ruleSetName)
		{
			// Figure out if we're getting a template, or if we need to
			// load the template - and be sure to cache the result.

			var fn = (cache[ruleSetName] = cache[ruleSetName] || {}) [str] = cache[ruleSetName][str] || 		// First try if we have a cached fn or
					(fs && fs.existsSync(str) ? 																// try if we are in node env and file exists
						tmpl(fs.readFileSync(str, 'utf-8')) 													// to load it
						:																						// or
						document && (el = document.getElementById(str)) ? 										// try if we are in window and the node exists
							tmpl( el.innerHTML, ruleSetName = (ruleSetName || el.type) )						// to get the content
							:
																												// or create the function
							(function(){
								// Apply rules
								var rules = tmpl.rules.defaults.concat(tmpl.rules[ruleSetName] || tmpl.rules[tmpl.defaultRules] || []);
								for(var i = 0, rule; rule = rules[i++];)
									str = str.replace(rule.s, rule.r);
								// console.log('var o="";\nwith(data){\no+="' + str + '";\n}\nreturn o;');
								// Convert the template into pure JavaScript
								return new Function('data', 'data = data || {}; var o="";with(data){o+="' + str + '";}return o;');
							})()
					)

			// Provide some basic currying to the user
			return fn;
		};
		
		tmpl.unescapeCode = function(pattern)
		{
			return function(s)
			{
				var args = arguments;
				return pattern.replace(/\$(\d)/g, function(ref, id)
					{
						return args[parseInt(id)]
									.replace(/\\"/g, '"')
									.replace(/\\n/g, '\n');
					});
			}
		};
		
		tmpl.defaultRules = null;
		
		tmpl.rules = {
			defaults: [
				{s/*earch*/: /\\/g, r/*eplace*/: '\\\\'},											// Escape '\' so that output string will still have char escaped (needed when processing js code string)
				{s: /"/g, r: '\\"'},																// Escape '"' same has above
				{s: /[\n]/g, r: '\\n'},																// Escape '\n' same has above
				{s: /[\r]/g, r: '\\r'}																// Escape '\n' same has above
			]
		};
	})(typeof window != 'undefined' ? window : exports, typeof document != 'undefined' ? document : null);
}



/* TODO: Implement popular templating library support: EJS doT.js Handlerbar Mustache t.js ICANHAZ.JS */

/* Handlebar.js * 
tmpl.rules['text/x-handlebars-template'] = [
	{s: /\{\{(.*?)\}\}/g, r: '",$1,"'}			// Templating part: replace vars {{var}}
	 ...
];

*/
