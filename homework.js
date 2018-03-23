var fs       = require('fs');
var jsonfile = require('jsonfile');

var filePath = '../words-from-the-heart/words/';

var writePath  = './heart_words.json';
var errorPath  = './error_data.json';

fs.readdir(filePath, function(err, files) {
  if (err) {
    console.log('获取文件失败');
    return;
  }

  if (files.length <= 0) {
    console.log('没有找到任何文件');
    return;
  }

  // 分别获取格式合法与不合法的文件名，对获取到的文件名分别存储在不同的数组中
  var correctNames   = [];
  var incorrectNames = [];
  for (var i = 0; i < files.length; i++) {
    var suffix = /.json$/i;
    if (suffix.test(files[i])) {
      correctNames.push(files[i]);
    } else {
      incorrectNames.push(files[i]);
    }
  }

  // 读取 json 文件内容，将读取正常的文件内容存入 jsonList，将读取失败的文件内容存入 errorList。
  var jsonList  = [];
  var errorList = [];
  for (var i = 0; i < correctNames.length; i++) {
    try {
      var content = jsonfile.readFileSync(filePath + correctNames[i]);
      jsonList.push(content);
    } catch(err) {
      errorList.push(content);
    }
  }

  // 将 json 文件内容写入最终文件
  jsonfile.writeFile(writePath, jsonList, {spaces: 2, EOL: '\r\n'}, function(err) {
    console.error(err);
  });

  jsonfile.writeFile(errorPath, errorList, {spaces: 2, EOL: '\r\n'}, function(err) {
    console.error(err);
  });

  // 打印出不合法的文件名
  if (incorrectNames.length > 0) {
    console.log(incorrectNames);
  }
});
