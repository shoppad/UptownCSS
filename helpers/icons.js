// Using:
// node icons.js


var fs = require('fs');

fs.readFile('../styles/icons.scss', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var matches = data.match(/\$icons\: \(([\s\S]+?)\);/);
  var json = '{'+matches[1]+'}'
  json = json.replace(/\"/g, '\\\"').replace(/\'/g, '"').replace(/([a-z|\_]+?)\:\s+?\"/g, '"$1":"');
  json = JSON.parse(json);

  generate(json);
});


function generate(icons) {
  Object.keys(icons).forEach(function(key) {
    var val = icons[key];

    var filename = key.replace('_','-');
    // Base icon
    fs.writeFile("../icons/" + filename + '.svg', icons[key].replace('#{$color}', 'rgb(145,158,171)'), function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("Saved: " + filename + '.svg');
    });

    // Disabled icon
    fs.writeFile("../icons/" + filename + '-disabled.svg', icons[key].replace('#{$color}', 'rgb(196,205,213)'), function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("Saved: " + filename + '-disabled.svg');
    });
  });

}
