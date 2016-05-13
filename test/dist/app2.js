define('src/a',function(require,exports,module){
    
});
define('src/b',function(require,exports,module){

	var c = require('src/c');

});
define('src/alias',function(require,exports,module){
    console.log('src/alias');
});
define('src/c',function(require,exports,module){

});
define('src/app2',function(require,exports,module){
	var a = require('src/a');
	var b = require('src/b');
	var test = require('test');
});
