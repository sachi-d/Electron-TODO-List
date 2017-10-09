// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//json storage
const os = require('os');
const storage = require('electron-json-storage')


storage.setDataPath(__dirname + "/myfiles");
const dataPath = storage.getDataPath();
console.log("sss" + dataPath);

storage.get('tasks', function (error, data) {
    if (error) throw error;
    var categories = data.categories;
    for (var category in categories) {
        //console.log(data.categories[0]);
        var categoryName = categories[category]["categoryname"];
        $("#categories").append(categoryName);
    }
});