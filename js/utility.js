/**
* Various utility functions to make life easier
*/

/**
* Pick 'number' of random values from 'array'
* The returned array will not contain duplicate entities (i.e. will be a set)
* @param array The array of values from which to pick
* @param number The number of values to return in a picked list
* @return array An array of 'number' entries of 'array'
*/
$.pick = function(array, number) {
	var out = [];
	var used = {};
	for (var x = 0; x < number; x++) {
		var id;
		do {
			id = Math.floor(Math.random() * array.length);
		} while(used[id])
		out.push(array[id]);
		used[id] = 1;
	}
	return out;
};

$.pick2 = function(array, number) {
	var out = [];
	var i=0;
	while (i<number) {
		
		var	id = Math.floor(Math.random() * array.length);
		
		if (id<array.length)
		{
			out.push(array[id]);
			i++;
		}
		
		
	}
	return out;
};

/**
* Function to shuffle an array
* @param array The array to be shuffled
* @return The shuffled array
*/
$.shuffle = function(array) {
	return array.sort(function() {
		return (Math.round(Math.random())-0.5);
	});
}

/**
* Generates a filled array of values between min and max
* @param int min The minimum number to iterate from
* @param int max The maximum number to iterate to
* @param int increment Optional increment value to cycle by. Default is 1
* @return array An array of all values between min and max
*/
$.range = function(min, max, increment) {
	var out = [];
	if (!increment)
		increment = 1;
	for (var i = min; i < max-1; i += increment)
		out.push(i);
	return out;
};

/**
* Sanitize a string and return the safe version devoid of anything dangerous
* @param string value The string to sanitize
* @return string The safe version of the input 'value'
*/
$.safe = function(value) {
	return value.replace(/[^a-z0-9]/ig, '-');
}

/**
* Extract the directory portion of a file path
* @param string path The absolute file name to examine
* @return string The directory the above absolute path exists within
*/
$.dirname = function(path) {
	return path.replace(/^(?:(.*)\/)?(.+)$/, '$1');
}
