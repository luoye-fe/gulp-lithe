/**
 * Created by zhangmike on 16/6/19.
 */
var esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require('escodegen');
var fs = require('fs');
var path = require('path');
var through = require('through-gulp');
var jsonData = {};
var main = function(config, lc) {
	var stream = through(function(file, encoding, callback) {
		var jsfile = '';
		try {
			var uglify = fs.readFileSync(lc.MD5File);
		}catch (e) {
			console.log("jsMD5文件没有生成...", e)
			return;
		}

		function createAst(name, value) {
			var astObj = {};
			astObj.type = estraverse.Syntax.Property;
			astObj.key = {
				type: estraverse.Syntax.Identifier,
				name: ''
			};
			astObj.computed = false;
			astObj.value = value;
			astObj.kind = 'init';
			astObj.method = false;
			astObj.shorthand = false;
			astObj.key.name = '"' + name + '"';
			return astObj;
		}

		function main(fileName) {
			var code = require('fs').readFileSync(fileName).toString();
			var ast = esprima.parse(code);
			ast = estraverse.replace(ast, {
				enter: function(node) {},
				leave: function(node) {
					if (node.type === estraverse.Syntax.Property &&
							node.key.name == 'preload') {
						return createAst("preload", {
							"type": estraverse.Syntax.ArrayExpression,
							"elements": [{
								"type": estraverse.Syntax.Literal,
								"value": lc.preload[0],
								"raw": lc.preload[0]
							}]
						})
					}
					if (node.type === estraverse.Syntax.Property &&
							node.key.name == 'manifest'
					) {
						var array = [];

						Object.keys(jsonData).forEach(function (cur) {
							var astObj = createAst(cur, {
								type: estraverse.Syntax.Literal,
								value: jsonData[cur],
								raw: jsonData[cur]
							});
							array.push(astObj);
						});
						array.push(createAst("expires", {
							type: estraverse.Syntax.Literal,
							value: lc.manifest.expires,
							raw: lc.manifest.expires
						}));
						array.push(createAst("version", {
							type: estraverse.Syntax.Literal,
							value: config.timestamp,
							raw: config.timestamp
						}));array.push(createAst("prefix", {
							type: estraverse.Syntax.Literal,
							value: lc.manifest.prefix,
							raw: lc.manifest.prefix
						}));
						return createAst('manifest',{
							type: estraverse.Syntax.ObjectExpression,
							properties: array
						})
					}
				}
			});
			var code =escodegen.generate(ast);
			fs.writeFileSync(path.join(path.join(config.basepath, lc.tmpPath), lc.configFile), code);
		}

		if (config.localcache) {

			file.history.forEach(function(f) {
				// console.log(path.extname(f))
				if (fs.statSync(f).isFile()
				&& path.extname(f) == '.js') {
					jsfile = fs.readFileSync(f).toString();
					try {
						var obj = esprima.parse(jsfile);
						var json = JSON.parse(uglify);
						estraverse.traverse(obj, {
							enter: function (node, parent) {
								if (node.type == estraverse.Syntax.ExpressionStatement
										&& node.expression.type == estraverse.Syntax.CallExpression
										&& node.expression.callee.name == 'define')
								Object.keys(json).forEach(function(cur){
									var fp = cur.split(path.sep).join('/')
									//console.log("argumentslength...",node.expression.arguments)
									if (fp.indexOf(node.expression.arguments[0].value) != -1) {
										if (node.expression.arguments[0].value.lastIndexOf('.js') < 0 ) {
											jsonData[node.expression.arguments[0].value + ".js"] = json[cur]
										}else{
											jsonData[node.expression.arguments[0].value] = json[cur]
										}
									}
								});
							}
						});
					} catch (e) {
						console.log('异常...',e, f);
					}
				}
			});
			//console.log('jsonData...', jsonData);
			main(path.join(config.basepath, lc.configFile));
		}
		else {
			var configContent = require('fs').readFileSync(path.join(config.basepath, lc.configFile))
			fs.writeFileSync(path.join(config.basepath + lc.tmpPath, lc.configFile), configContent);
		}
		callback();
	}, function (callback){
		callback();
	});
	return stream;
}

module.exports = main;

