var fs = require('fs')
var http = require('http')
var path = require('path')
var url = require('url')

http.createServer(function(req, res){

	var parsed = url.parse(req.url)
	var filename = path.parse(parsed.pathname)
	var filen
	var ext
	var dir
	var page
	
	if(filename.name === ''){
		filen = "indexWebServer"
	}else if(filename.name === 'about'){
		filen = "aboutWebServer"
	}else{
		filen = filename.name
	}
	
	ext = filename.ext === '' ? ".html" : filename.ext
	dir = filename.dir === '/' ? "" : filename.dir + '/'
	
	var f = (dir + filen + ext).replace("/","")
	
	var mimeTypes = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.png': 'image/png',
	'.jpg': 'image/jpg',
	'.gif': 'image/gif',
	}
	
	var splitExtArray = ext.split('.')
	var splitExt
	/*
	if(splitExtArray[1] === 'html'){
		splitExt = mimeTypes[.html]
	}else if(splitExtArray[1] === 'js'){
		splitExt = mimeTypes.js
	}else if(splitExtArray[1] === 'css'){
		splitExt = mimeTypes.css
	}else if(splitExtArray[1] === 'png'){
		splitExt = mimeTypes.png
	}else if(splitExtArray[1] === 'jpg'){
		splitExt = mimeTypes.jpg
	}else{
		splitExt = mimeTypes.gif
	}
	*/
	// console.log(splitExtArray[1])
	// console.log(ext)
	
	if(filename.name === ''){
		page = "indexWebServer.html"
	}else if(filename.name === 'about'){
		page = "aboutWebServer.html"
	}else {
		page = (filename.name + mimeTypes[ext])
	}
	
	if(f){
		fs.readFile(f, function(err, data){
	
			if(page){
			
				if(mimeTypes.hasOwnProperty(ext)){
					/*
						if(err){
							console.log('An error has occurred!', err)
						}
					*/
					res.writeHead(200, {'Content-Type': mimeTypes[ext]})
					res.write('<script>var page="' + page + '"</script>')
					res.end(data, 'utf-8')
				
				}
			
			}
	
		})	
	
	}


}).listen("8080", function(err) {
	
	if(err){
		console.log('An error occurred', err)
	}else{
		console.log('Server is listening on port 8080')
	}

})