 "use strict";

//get the store tasks



var newTasks ={};


// 2. completed tasks
var completedTasks = [];


// get save list from cookies
var savedToDo = getSavedToDo() ;
if (savedToDo != undefined) {
  newTasks = savedToDo
  inflateDo(newTasks);

}

var buttonObj = document.getElementById('addTask');

buttonObj.addEventListener("click", newTaskAction);

function newTaskAction() {

    var newtodo = document.getElementById('newtodo');



    var timeToDo = document.getElementById('time').value;
    console.log(timeToDo);
    if (newtodo.value != '') {

        if (newTasks[timeToDo] == undefined) { // if if that timeToDo has not been added to the object newTasks
        newTasks[timeToDo] = [newtodo.value];
      }else {
        var timeIndex = [];
        timeIndex = newTasks[timeToDo];
        if (timeIndex.indexOf(newtodo.value) < 0) {
          timeIndex.push(newtodo.value);
        }else {
          alert('"'+newtodo.value+'"\n'+'has already been added to the your to do list');
        }
      }

      document.cookie = "toDoList="+JSON.stringify(newTasks);

      inflateDo(newTasks);
    }
}

function inflateDone() {
  completedTasks
  var doneView = "";
  for (var i = 0; i < completedTasks.length; i++) {
    doneView += '<p>'+completedTasks[i]+'</p>'
  }
  document.getElementById('completed').innerHTML = doneView;
}

function getSavedToDo() {
  var toDo = document.cookie.replace('toDoList=', '');
  return (toDo == undefined || toDo == '')? null : JSON.parse(toDo);
}

function inflateDo(tasks) {
  var toDoView = "<tr><th>Time</th><th>Tasks</th><th></th></tr>";
  for (var key in tasks) {
    var list = tasks[key];
    for (var i = 0; i < list.length; i++) {
      toDoView += '<tr><td>'+key+'</td><td>'+list[i]+'</td><td><button class="btn-cancel" data-key="'+key+'" data-entry ="'+list[i]+'">Completed</button><td></tr> ';
    }
  }
  document.getElementById('toDoList').innerHTML = toDoView;
  cancelListner()
}

function cancelListner(){
  var  btnCancel= document.getElementsByClassName("btn-cancel");
  for (var i = 0; i < btnCancel.length; i++) {
      btnCancel[i].addEventListener('click', function() {
        var btnKey = this.getAttribute("data-key");
        var btnEntry = this.getAttribute("data-entry");
        var temp = [];
        for (var i = 0; i < newTasks[btnKey].length; i++) {
          if (newTasks[btnKey][i] != btnEntry ) {
            temp.push(newTasks[btnKey][i])
          }else {
            completedTasks.push(btnEntry+'-'+btnKey);
          }
        }
        // console.log(completedTasks);
        newTasks[btnKey] = temp;
        // console.log(temp);
        inflateDo(newTasks);
        inflateDone();
        document.cookie = "toDoList="+JSON.stringify(newTasks);
      });
  }
};

cancelListner();
