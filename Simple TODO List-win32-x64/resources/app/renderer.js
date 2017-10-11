// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//json storage
const os = require('os');
const storage = require('electron-json-storage')


storage.setDataPath(__dirname + "/myfiles");
const dataPath = storage.getDataPath();

var colorPallette = ["#FF6E6F", "#0DCBBF", "#FDD657", "#C6DE5C"];
var colmd4 = $("<div>", {"class": "col-md-4"});
var todoList = $("<div>", {"class": "todolist"});
var listTitle = $("<h1>");

var inputGroup = $('<div>', {"class": "input-group"});

var inputText = $('<input type="text" class="form-control add-todo" placeholder="Add todo">');
var inputGroupBtnDiv = $('<div>', {"class": "input-group-btn"});
var inputGroupBtn = $('<button>', {"class": "btn btn-default add-todo-btn", "type": "submit"});
var inputGroupBtnI = $('<i>', {"class": "glyphicon glyphicon-plus"});

var ul = $('<ul>', {"class": "list-unstyled"});
var listItemDef = $('<li>', {"class": "ui-state-default"});
var listItemCheck = $('<div>', {"class": "checkbox"});
var label = $('<label>');
var inputCheckbox = $('<input type="checkbox" value=""/>');

var categoriesDOM = $("#categories-content");

var categories;


getFile();

$("#add-category-btn").click(function () {
    var newCategory = $("#add-category-name").val();
    var cat = {"categoryname": newCategory, "tasks": []};
    categories.push(cat);
    updateFileAndDisplay();
})

function updateFileAndDisplay() {
    writeFile();
    categoriesDOM.html('');
    displayData();
}
function writeFile() {
    storage.set("tasks", categories);
}
function getFile() {
    storage.get('tasks', function (error, data) {
        if (error) throw error;
        categories = data;
        displayData();
    });
}

function displayData() {
    for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        var categoryName = category["categoryname"];

        var categoryTitle = listTitle.clone();
        categoryTitle.html(categoryName);
        var list = todoList.clone();
        list.css("background-color", colorPallette[i % colorPallette.length]);
        list.append(categoryTitle);

        var inputs = inputGroup.clone();
        var inputt = inputText.clone().attr("id", i + "-input");
        inputs.append(inputt);
        var inputgrpbtndiv = inputGroupBtnDiv.clone();
        var inputbtn = inputGroupBtn.clone().attr("id", i + "-input-btn");
        inputbtn.click(function () {
            var myId = $(this).attr("id").split("-")[0];
            var myText = $("#" + myId + "-input").val();
            categories[myId]["tasks"].push(myText);

            updateFileAndDisplay();
        })
        inputgrpbtndiv.append(inputbtn.append(inputGroupBtnI.clone()));
        //inputgrpbtndiv.append(inputGroupBtnI.clone());

        inputs.append(inputgrpbtndiv);

        list.append(inputs);

        var myul = ul.clone();

        var tasks = category["tasks"];
        for (var j = 0; j < tasks.length; j++) {
            var task = tasks[j];
            var mylistItem = listItemCheck.clone();
            var mylabel = label.clone().attr("id", i + "-" + j + "-label");
            mylabel.text(task);

            var checkBox = inputCheckbox.clone().attr("id", i + "-" + j + "-check");
            checkBox.change(function () {
                var dat = $(this).attr("id").split("-");
                var catId = dat[0];
                var taskId = dat[1];
                console.log(catId + "ddd" + taskId);
                var tempTasks = categories[catId]["tasks"].splice(taskId, 1);
                //categories[catId]["tasks"] = tempTasks;

                updateFileAndDisplay();
            });
            mylabel.prepend(checkBox);

            mylistItem.append(mylabel);

            myul.append(listItemDef.clone().append(mylistItem));
        }

        list.append(myul);

        var div = colmd4.clone();
        div.attr("id", "item-" + i);
        div.append(list);
        categoriesDOM.append(div);
    }
}
