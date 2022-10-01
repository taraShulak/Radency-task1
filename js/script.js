import {firstNote, firstCreateNote} from "./func.js";

const createBtn = document.querySelector('.create-button');
const newForm = document.querySelector('.newForm');
const noteList = document.querySelector('.noteList');
const categoryList = document.querySelector('.category__list');
const categoryTask = document.querySelector('.category__task');
const categoryIdea = document.querySelector('.category__idea');
const categoryRandom = document.querySelector('.category__random');
const noteArray = [];
const taskArray = []; let taskVisio = false;
const ideaArray = []; 
const randomArray = [];
let formVisio = false;
let globalNoteIndex;
let globalNoteParent;

firstNote.map(item => noteArray.push(item));

firstCreateNote(noteArray, noteList, "beforeend");
correctCategoryNumber();

createBtn.addEventListener('click', createForm);

let categoryForDelete; 
let chouseCategoryVisio = false;
let inputCategory;

function createForm (event, placeInsert, category, content) {  
  if (formVisio == false){
     content = content ? content : 'content....';
     category = category ? category : 'category'; 
    const formText = `
            <div class="formParent">
              <div class="create__category">
                <div class="create__category-list action-item" data-action="initCategory">${category}</div>
              </div>
              <textarea class="input__content" name="" id="" cols="50" rows="7">${content}</textarea>
              <button class="add-button action-item" id="add" data-action="createNote"><i class="fa-solid fa-file-edit"></i></button>
              <button class="delete-form-button action-item" data-action="deleteForm"><i class="fa-solid fa-trash"></i></button>
            </div>
              `
      if (placeInsert) {
        placeInsert.insertAdjacentHTML('afterbegin', formText);
      } else newForm.insertAdjacentHTML('afterbegin', formText);
      formVisio = true;
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
}

function correctLiNumber(list, array) {
  const indexList = list.querySelectorAll('.noteAdded__item')
  //console.log(indexList);  
  let k = 0;
  for (const li of indexList) {
    li.setAttribute('data-index', k)
    li.querySelector('.note__number').innerHTML = k + 1;
    k++;
  }
  k = 0;
  array.forEach((item, ind, arr) => item.index = k++);
}

class ListNote{
  constructor(elem, placeForCorrect){
    this.placeForCorrect = placeForCorrect;
    this._elem = elem;
    elem.onclick = this.formAction.bind(this);
  }

  correctNote(event){
    if (formVisio == false){
      const parent = event.target.closest('.noteAdded__item'); 
      globalNoteParent = parent;       
      globalNoteIndex = parent.dataset.index;       
      const currentIndex = parent.dataset.index;
      const category = noteArray[currentIndex].category;
      const content = noteArray[currentIndex].content;
      createForm(event, this.placeForCorrect, category, content );
    }
  }  
  
  archiveElem(event){
      const parent = event.target.closest('.noteAdded__item');
      const currentIndex = parent.dataset.index; 
      parent.remove();      
      let archiveItem = noteArray[currentIndex];
      archiveItem.status = 'archive';
      noteArray.splice(currentIndex, 1); 
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
  
  deleteArchive(event){    
      const parent = event.target.closest('.noteAdded__item');
      const currentIndex = parent.dataset.index; 
      parent.remove();      
      noteArray.splice(currentIndex, 1); 
      correctLiNumber(noteList, noteArray);
      correctCategoryNumber();     
  }

  formAction(event){
    let actionItem = event.target.classList.contains('.action-item')
    ? event.target
    : event.target.closest('.action-item');
    let action = actionItem ? actionItem.dataset.action : null;
    if (action){
      this[action](event);
    }
  }
}
new ListNote(noteList, newForm);

class Category{
  constructor(elem, array, divArchive, divActiv,  categoryName) {
    this.divActiv = divActiv;    
    this.categoryName = categoryName;
    this.array = array;
    this.divArchive = divArchive;
    this._elem = elem;
    elem.onclick = this.formAction.bind(this);
  }

  elemArchive(event){ 
    if(taskVisio == false){
      firstCreateNote(this.array, this.categoryName, 'beforeend');
      taskVisio = true;
      //console.log(event.target);
    } else  if(taskVisio == true){
                taskVisio = false;
                const list = this.categoryName.querySelectorAll('.noteAdded__item');
                for (const li of list) {
                  li.remove();
                }              
            }   
    correctLiNumber(this.categoryName, this.array); 
  }

  archiveElem (event) {
    const parent = event.target.closest('.noteAdded__item');
    const currentIndex = parent.dataset.index; 
    noteArray.push(this.array[currentIndex]);
    noteArray[noteArray.length - 1].index = noteArray.length - 1;
    const deArchiveItem = this.array.splice(currentIndex, 1);
    deArchiveItem[0].index = noteArray.length - 1;
    firstCreateNote(deArchiveItem ,noteList, 'beforeend');
    categoryList.querySelector(this.divArchive).innerHTML = this.array.length;
    const activion = categoryList.querySelector(this.divActiv).textContent;
    categoryList.querySelector(this.divActiv).innerHTML = +activion + 1;
    parent.remove();         
    correctLiNumber(this.categoryName, this.array);
}

  deleteArchive(event) {    
      const parent = event.target.closest('.noteAdded__item');   
      const currentIndex = parent.dataset.index; 
      this.array.splice(currentIndex, 1);
      categoryList.querySelector(this.divArchive).innerHTML = this.array.length;
      parent.remove();   
      correctLiNumber(this.categoryName, this.array);
      correctCategoryNumber();
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
new Category(categoryTask, taskArray, '.task__archive', '.task__active', categoryTask);
new Category (categoryIdea, ideaArray, '.idea__archive', '.idea__active', categoryIdea)
new Category(categoryRandom, randomArray, '.random__archive', '.random__active', categoryRandom)

class Form {
  constructor(elem) {
    this._elem = elem;
    elem.onclick = this.formAction.bind(this); 
  }

  deleteForm(event){
    const parent = event.target.closest('.formParent');
    parent.remove();  
    formVisio = false;     
  }    

  createNote(event){
      const inputContent = newForm.querySelector('.input__content');      
      const parent = event.target.closest('.formParent'); 
      const date = new Date();
      formVisio = false;
      if(globalNoteIndex < noteArray.length) {
        globalNoteParent.querySelector('.note__content').innerHTML = inputContent.value;
        globalNoteParent.querySelector('.note__category').innerHTML = inputCategory;
        globalNoteParent.querySelector('.others').innerHTML = date.toLocaleDateString();
      } else {                  
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
            firstCreateNote (noteArray.splice( noteArray.length - 1,1), noteList, 'beforeend')
          }
      parent.remove();               
      correctCategoryNumber();
      correctLiNumber(noteList, noteArray);
      //console.log(noteArray);   
     
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


