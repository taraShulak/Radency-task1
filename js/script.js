import {firstNote, firstCreateNote} from "./func.js";

const createBtn = document.querySelector('.create-button');
const newForm = document.querySelector('.newForm');
const correctForm = document.querySelector('.correct__item');
const noteList = document.querySelector('.noteList');
const categoryList = document.querySelector('.category__list');
const categoryTask = document.querySelector('.category__task');
const categoryTaskItem = document.querySelector('.category__task-item');
const categoryIdea = document.querySelector('.category__idea');
const categoryRandom = document.querySelector('.category__random');
const noteArray = [];
const taskArray = []; let taskVisio = false;
const ideaArray = []; let ideaVisio = false;
const randomArray = []; let randomVisio = false;
let formVisio = false;
let correctVisio = false;
firstNote.map(item => noteArray.push(item));

firstCreateNote(noteArray, noteList, "beforeend");
correctCategoryNumber();

createBtn.addEventListener('click', createForm);
noteList.addEventListener('click', deleteNote);
noteList.addEventListener('click', archiveNote);
noteList.addEventListener('click', correctNote);
categoryTask.addEventListener('click', taskArchive);
categoryIdea.addEventListener('click', ideaArchive);
categoryRandom.addEventListener('click', randomArchive)

let categoryForDelete; 
let chouseCategoryVisio = false;
let inputCategory;

function deleteArchive (event, array, place) {
  if (event.target.className === "fa-solid fa-trash") {    
    const parent = event.target.closest('.noteAdded__item');
    console.log(parent);
    const currentIndex = parent.dataset.index; 
    array.splice(currentIndex, 1);
    categoryList.querySelector(place).innerHTML = array.length;
    parent.remove();   
  }
}

function taskArchive(event){ 
  if(event.target.className === "task__archive" && taskVisio == false){
    firstCreateNote(taskArray, categoryTask, 'beforeend');
    taskVisio = true;
    console.log(event.target);
  } else  if(event.target.className === "task__archive" && taskVisio == true){
              taskVisio = false;
              const list = categoryTask.querySelectorAll('.noteAdded__item');
              for (const li of list) {
                li.remove();
              }
              //console.log(event.target);
          }
  if (event.target.className == "fa-sharp fa-solid fa-folder") {   
    deArchiveElem(event, taskArray, '.task__archive');    
  }  
  if (event.target.className === "fa-solid fa-trash") {    
    deleteArchive (event, taskArray, '.task__archive');  
  }
  correctLiNumber(categoryTask, taskArray);
}

function ideaArchive(event){ 
  if(event.target.className === "idea__archive" && ideaVisio == false){
    firstCreateNote(ideaArray, categoryIdea, 'beforeend');
    ideaVisio = true;
  } else  if(event.target.className === "idea__archive" && ideaVisio == true){
              ideaVisio = false;
              const list = categoryIdea.querySelectorAll('.noteAdded__item');
              for (const li of list) {
                li.remove();
              }
    //console.log(event.target);
          }
  if (event.target.className == "fa-sharp fa-solid fa-folder") {   
    deArchiveElem(event, ideaArray, '.idea__archive');    
  }  
  if (event.target.className === "fa-solid fa-trash") {    
    deleteArchive (event, ideaArray, '.idea__archive');  
  }
  correctLiNumber(categoryIdea, ideaArray);
}

function randomArchive(event){ 
  if(event.target.className === "random__archive" && randomVisio == false){
    firstCreateNote(randomArray, categoryRandom, 'beforeend');
    randomVisio = true;
  } else  if(event.target.className === "random__archive" && randomVisio == true){
              randomVisio = false;
              const list = categoryRandom.querySelectorAll('.noteAdded__item');
              for (const li of list) {
                li.remove();
              }
          }
  if (event.target.className == "fa-sharp fa-solid fa-folder") {   
    deArchiveElem(event, randomArray, '.random__archive');    
  }  
  if (event.target.className === "fa-solid fa-trash") {    
    deleteArchive (event, randomArray, '.random__archive');  
  }
  correctLiNumber(categoryRandom, randomArray);
}

function deArchiveElem (event, array, place) {
    const parent = event.target.closest('.noteAdded__item');
    const currentIndex = parent.dataset.index; 
    noteArray.push(array[currentIndex]);
    noteArray[noteArray.length - 1].index = noteArray.length - 1;
    const deArchiveItem = array.splice(currentIndex, 1);
    deArchiveItem[0].index = noteArray.length - 1;
    firstCreateNote(deArchiveItem ,noteList, 'beforeend');
    console.log(deArchiveItem);
    categoryList.querySelector(place).innerHTML = array.length;
    parent.remove();         
    correctCategoryNumber();
}

function correctNote(event){
  if (event.target.className === "fa-solid fa-pen" && correctVisio == false){
    correctVisio = true;
    const parent = event.target.closest('.noteAdded__item');    
    const currentIndex = parent.dataset.index; 
    const correctText = `
        <div class="correctParent">
          <textarea class="correct__category" cols="25" rows="2" >${noteArray[currentIndex].category}</textarea>        
          <textarea class="correct__content" name="" id="" cols="75" rows="5">${noteArray[currentIndex].content}</textarea>
          <div class="correct-button"><i class="fa-solid fa-file-edit"></i></div>
        </div>
          `
    correctForm.insertAdjacentHTML('afterbegin', correctText);
    const correctItem = correctForm.querySelector('.correctParent')
    correctItem.addEventListener('click', (event) =>  {
      if (event.target.className === "fa-solid fa-file-edit"){                
        const correctContent = correctForm.querySelector('.correct__content');
        const correctCategory = correctForm.querySelector('.correct__category');  
        noteArray[currentIndex].content = correctContent.value;
        parent.querySelector('.note__content').innerHTML = correctContent.value;
        if (correctCategory.value == 'task') { 
          noteArray[currentIndex].category = 'task';
        } else if (correctCategory.value == 'idea'){
          noteArray[currentIndex].category = 'idea';
        } else { 
            noteArray[currentIndex].category = 'random';
          }
        parent.querySelector('.note__category').innerHTML = noteArray[currentIndex].category;
        correctItem.remove();
        correctCategoryNumber();
        correctVisio = false;
      }  
    })
    
  }
}

function archiveNote(event){
  if (event.target.className === "fa-sharp fa-solid fa-folder"){
    const parent = event.target.closest('.noteAdded__item');
    const currentIndex = parent.dataset.index; 
    parent.remove();      
    let archiveItem = noteArray[currentIndex];
    archiveItem.status = 'archive';
    noteArray.splice(currentIndex, 1); 
    //console.log('archiveItem  ', archiveItem);
    //console.log('archiveItem.category  ', archiveItem.category);   
    if (archiveItem.category === "task") {
      taskArray.push(archiveItem); 
    }else   if (archiveItem.category === 'idea') {
      ideaArray.push(archiveItem);
    } else { 
      randomArray.push(archiveItem);
    }
    correctLiNumber(noteList, noteArray);
    correctCategoryNumber();
  }
}

function correctCategoryNumber() {  
  let taskActive = 0;
  let ideaActive = 0;
  let randomActive = 0;
  for (const item of noteArray) {
    if (item.category === "task"){ 
      taskActive++;      
    }else if (item.category === "idea"){
       ideaActive++;
      } else {
         randomActive++;      
        }    
  }
  categoryList.querySelector('.task__active').innerHTML = taskActive;
  categoryList.querySelector('.idea__active').innerHTML = ideaActive;
  categoryList.querySelector('.random__active').innerHTML = randomActive;
  categoryList.querySelector('.task__archive').innerHTML = taskArray.length;
  categoryList.querySelector('.idea__archive').innerHTML = ideaArray.length;
  categoryList.querySelector('.random__archive').innerHTML = randomArray.length;
    
    //console.log(p.value);    
    //console.log(p);    
}

function correctLiNumber(list, array) {
  const indexList = list.querySelectorAll('.noteAdded__item')
  //console.log(indexList);  
  let k = 0;
  for (const li of indexList) {
    li.setAttribute('data-index', k)
    li.querySelector('.note__number').innerHTML = k + 1;
    k++;
    //console.log(p.value);    
    //console.log(li);    
  }
  k = 0;
  array.forEach((item, ind, arr) => item.index = k++);
}

function deleteNote(event){
  //console.log(event.target);
  if (event.target.className === "fa-solid fa-trash") {    
    const parent = event.target.closest('.noteAdded__item');
    const currentIndex = parent.dataset.index; 
    parent.remove();      
    noteArray.splice(currentIndex, 1); 
    correctLiNumber(noteList, noteArray);
    correctCategoryNumber();
    //console.log(parent);
    //console.log(currentIndex);
    
  }
}

class Form {
  constructor(elem) {
    this._elem = elem;
    elem.onclick = this.formAction.bind(this); // (*)
  }

  deleteForm(event){
    const parent = event.target.closest('.formParent');
    parent.remove();  
    formVisio = false;     
  }    

  createNote(event){
      formVisio = false;
      const parent = event.target.closest('.formParent');
      const inputContent = newForm.querySelector('.input__content');    
      const date = new Date();
      if(inputCategory == undefined){ inputCategory = 'random thougth'}
      const note = {
        time: date.toLocaleDateString(),
        category: inputCategory,
        content: inputContent.value,
        status: 'active',
        index: 0
      }
      noteArray.push(note);
      noteArray[noteArray.length-1].index = noteArray.length - 1;
      inputCategory = undefined;
      const textNote = `
        <li class="noteAdded__item"  data-index=${noteArray.length - 1}>        
            <p class="note__number">${noteArray.length}</p>  
            <p class="time">${note.time}</p>
            <p class="note__content">${note.content}</p> 
            <p class="note__category">${note.category}</p>           
            <p class="others"></p> 
            <button class="delete-note-button"><i class="fa-solid fa-trash"></i></button>
            <button class="edit-note-button"><i class="fa-solid fa-pen"></i></button>
            <button class="archive-note-button"><i class="fa-sharp fa-solid fa-folder"></i></button>   
        </li>
      `
      noteList.insertAdjacentHTML('beforeend', textNote);
      parent.remove(); 
      correctCategoryNumber();
  }

  selectCat (event) {    
      this.createCategoryItem.innerHTML = event.target.textContent;
      categoryForDelete.remove();
      chouseCategoryVisio = false;
      inputCategory = event.target.textContent;
  }

  initCategory(event) {  
    console.log('yes');
    this.createCategoryItem = newForm.querySelector('.create__category-list');
    console.log(event.target);
    if (chouseCategoryVisio == false){
      //console.log(createCategoryItem);
      chouseCategoryVisio = true;
      const text = `
              <div class="category-for-delete">  
                <div class="chouse-task action-item" data-action="selectCat">task</div>
                <div class="chouse-idea action-item" data-action="selectCat">idea</div>
                <div class="chouse-random action-item"  data-action="selectCat">random thougth</div>
              </div>  
              `
          this.createCategoryItem.insertAdjacentHTML('afterend', text);
          categoryForDelete = newForm.querySelector('.category-for-delete');
    }
    /*if ( event.target.className === 'chouse-task'){
      createCategoryItem.innerHTML = 'task';
      categoryForDelete.remove();
      chouseCategoryVisio = false;
      inputCategory = 'task';
    }
    if ( event.target.className === 'chouse-idea'){
      createCategoryItem.innerHTML = 'idea';
      categoryForDelete.remove();
      chouseCategoryVisio = false;
      inputCategory = 'idea';
    }
    if ( event.target.className === 'chouse-random'){
      createCategoryItem.innerHTML = 'random thougth';
      categoryForDelete.remove();
      chouseCategoryVisio = false;
      inputCategory = 'random thougth';
    }*/
  }

  formAction(event){
    let actionItem = event.target.classList.contains('action-item') 
      ? event.target 
      : event.target.closest('.action-item');
    let action =  actionItem ? actionItem.dataset.action : null;
    if (action) {
      this[action](event);
    }
  }
}
new Form(newForm);

function createForm (event) {  
  if (formVisio == false){
      const formText = `
            <div class="formParent">
              <div class="create__category">
                <div class="create__category-list action-item" data-action="initCategory">category</div>
              </div>
              <textarea class="input__content" name="" id="" cols="50" rows="7"></textarea>
              <button class="add-button action-item" id="add" data-action="createNote"><i class="fa-solid fa-file-edit"></i></button>
              <button class="delete-form-button action-item" data-action="deleteForm"><i class="fa-solid fa-trash"></i></button>
            </div>
              `
      newForm.insertAdjacentHTML('afterbegin', formText);
      formVisio = true;
  }
}
/*
function timeForUs(date) {
  let Y = date.getFullYear();
  let M = addZero(date.getDate());
  let D = addZero(date.getDate());

  function addZero (d){
    return(d < 10) ? '0' + d : d;
  }
  return ` ${D} ${M} ${Y}` ;
}
*/