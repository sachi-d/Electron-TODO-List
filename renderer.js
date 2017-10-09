// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//json storage
const os = require('os');
const storage = require('electron-json-storage')


storage.setDataPath(__dirname + "/myfiles");
const dataPath = storage.getDataPath();

var colorPallette = ["#EDB2AE", "#99BF6A", "#5E769C", "#C7AFBD"];
var colmd4 = $("<div>", {"class": "col-md-4"});
var todoList = $("<div>", {"class": "todolist"});
var listTitle = $("<h1>");

var inputGroup = $('<div class="input-group">' +
    '<input type="text" class="form-control add-todo" placeholder="Add todo">' +
    '<div class="input-group-btn">' +
    '<button class="btn btn-default" type="button">' +
    '<i class="glyphicon glyphicon-plus"></i>' +
    '</button>' +
    '</div>' +
    '</div>');

var ul = $('<ul>', {"class": "list-unstyled"});
var listItemDef = $('<li>', {"class": "ui-state-default"});
var listItemCheck = $('<div>', {"class": "checkbox"});
var label = $('<label>');
var inputCheckbox = $('<input type="checkbox" value=""/>');

var categoriesDOM = $("#categories .row");

storage.get('tasks', function (error, data) {
    if (error) throw error;
    var categories = data.categories;
    for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        var categoryName = category["categoryname"];
        console.log(categoryName);
        var categoryTitle = listTitle.clone();
        categoryTitle.html(categoryName);
        var list = todoList.clone();
        list.css("background-color", colorPallette[i % colorPallette.length]);
        list.append(categoryTitle);

        var inputs = inputGroup.clone();
        list.append(inputs);

        var myul = ul.clone();

        var tasks = category["tasks"];
        for (var j = 0; j < tasks.length; j++) {
            var task = tasks[j];
            var mylistItem = listItemCheck.clone();
            var mylabel = label.clone();
            mylabel.text(task);
            mylabel.prepend(inputCheckbox.clone());

            mylistItem.append(mylabel);

            myul.append(listItemDef.clone().append(mylistItem));
        }

        list.append(myul);

        var div = colmd4.clone();
        div.append(list);
        categoriesDOM.append(div);
        console.log(div);
    }
});