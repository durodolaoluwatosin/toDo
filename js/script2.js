"use strict";

//get the store tasks


//  have two objects
// 1. incomplete tasks
// var newTasks = ['buy sugar', 'go to church', 'kill your spouse'];
// var newTasks = {'buy sugar' : '3pm', 'go to church': "3pm", 'kill your spouse' :"3pm"};
var newTasks ={};  //format :{'9pm':['buy sugar', 'steal meat']};


// 2. completed tasks
var completedTasks = [];


// get save list from cookies
var savedToDo = getSavedToDo() ;
if (savedToDo != undefined) {
 newTasks = savedToDo
 inflateDo(newTasks);

}
// alert(newTasks[0])

// var terminateAt =  newTasks.length - 1;
// // console.log(terminateAt);
// while (terminateAt >= 0) {
//  console.log(newTasks[terminateAt]);
//  terminateAt--;
// }

// console.log(document.getElementById('nod').innerHTML);
var buttonObj = document.getElementById('addTask');

buttonObj.addEventListener("click", newTaskAction);

function newTaskAction() {
   // var d = new Date(); // for now
   // var time = d.getHours()+':'+d.getMinutes();
   // console.log(time);
   // console.log('worked')
   var newtodo = document.getElementById('newtodo');
   // var timeToDo = document.getElementById('time').value; // u can format this later
   var timeToDo = "9:00 AM";
   if (newtodo.value != '') {
     // console.log(newtodo.value+' '+timeToDo.value);
     if (newTasks[timeToDo/*'9:00'*/] == undefined) { // if if that timeToDo has not been added to the object newTasks
       newTasks[timeToDo/*'9:00'*/] = [newtodo.value];
       console.log('here');
     }else {
       var timeIndex = [];
       timeIndex = newTasks[timeToDo/*'9:00'*/];
       console.log(timeIndex);
       if (timeIndex.indexOf(newtodo.value) < 0) {
         timeIndex.push(newtodo.value);
       }else {
         alert('"'+newtodo.value+'"\n'+'has already been added to the your to do list');
       }
     }
     // console.log(JSON.stringify(newTasks));
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
