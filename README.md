# abs-url
> relative to absolute url 相对路径转绝对路径方法

### Install
    npm install abs-url --save

### Usage
	var absUrl=require('abs-url');
	var result=absUrl('../1.jpg','http://denghao.me/a');
	console.log(result);
	// => 'http://denghao.me/1.jpg'

### more situation
	absUrl('1.jpg', 'http://denghao.me/a');
	// => http://denghao.me/a/1.jpg

	absUrl('/1.jpg', 'http://denghao.me/a');
	// => http://denghao.me/1.jpg

	absUrl('./1.jpg', 'http://denghao.me/a');
	// => http://denghao.me/a/1.jpg

	absUrl('../1.jpg', 'http://denghao.me/a');
	// => http://denghao.me/1.jpg

	absUrl('1.jpg', 'denghao.me');
	// => http://denghao.me/1.jpg

	absUrl('//cdn.bootcss.com/1.jpg', 'http://denghao.me');
	// => http://cdn.bootcss.com/1.jpg

	absUrl('http://cdn.bootcss.com/1.jpg', 'http://denghao.me');
	// => http://cdn.bootcss.com/1.jpg

	absUrl('../../../../../../../1.jpg', 'http://denghao.me/a');
	// => http://denghao.me/1.jpg
