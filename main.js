/**
 * absUrl.js 相对路径->绝对路径函数
 * DH (http://denghao.me)
 * 2017-11-08 09:48:52
 */
;
(function() {
  function MyModule(src, basePath) {
    var protocol = /^((ht|f)tps?)/.exec(basePath),
      basePath = protocol ? basePath : 'http://' + basePath,
      domain = /^\w+\:\/\/\/?[^\/]+/.exec(basePath)[0];

    function deleteLastFolder(str) {
      var i = str.lastIndexOf("\/");
      if (i < 10) {
        return str;
      } else {
        return str.substring(0, i);
      }
    }

    function folderParse(path) {
      var level = 0,
        name = path.replace(/\.\.\//g, function(v) {
          level++;
          return '';
        });
      return {
        level: level,
        name: name
      }
    }

    function basePathParse(path, basePath) {
      var folder = folderParse(path);
      basePath = basePath.replace(/(.*)\/+$/g, '$1');
      for (var i = 0; i < folder.level; i++) {
        basePath = deleteLastFolder(basePath)
      }
      return basePath + '/' + folder.name;
    }

    if (/^\/\/\/?/.test(src)) {
      // eg.  //cdn.com/1.jpg
      src = (protocol ? (protocol[0] + ':') : 'http:') + src;
    } else if (!/^\w+\:\/\//.test(src)) {
      if (/^\/+/.test(src)) {
        // eg.  /1.jpg
        src = domain + src;
      } else if (/^\.\/+/.test(src)) {
        // eg.  ./1.jpg
        src = src.replace(/^\.\/+/, '');
        src = basePath + '/' + src;
      } else if (/^\.\.\/+/.test(src)) {
        // eg.  ../1.jpg
        src = basePathParse(src, basePath)
      } else {
        // eg.  1.jpg
        src = basePath + '/' + src;
      }
    }
    return src;
  }

  var absUrl = MyModule;
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = absUrl;
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(function() {
      return absUrl;
    });
  } else {
    this.absUrl = absUrl;
  }
}).call(this || (typeof window !== 'undefined' ? window : global));