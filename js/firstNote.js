
export const firstNote = [
  {
      time: '22.09.2022',
      category: 'task',
      content: 'Buy a bread',
      status: 'active',
      index: 0
  },
  {
    time: '20.09.2022',
    category: 'task',
    content: 'Go to gym',
    status: 'active',
    index: 1
},
{
  time: '22.09.2022',
  category: 'idea',
  content: 'Find a new mat for yoga',
  status: 'active',
  index: 2
},
{
  time: '22.09.2022',
  category: 'random ',
  content: 'read Byron in the evening',
  status: 'active',
  index: 3
},
{
  time: '22.09.2022',
  category: 'idea',
  content: 'Barbeky',
  status: 'active',
  index: 4
},
{
  time: '18.09.2022',
  category: 'task',
  content: 'Find the movie for tommorow',
  status: 'active',
  index: 5
},
{
  time: '22.09.2022',
  category: 'idea',
  content: 'relax in the forest',
  status: 'active',
  index: 6
}
]

export function firstCreateNote (array, placeInsert, situation) {
  array.map ( (item, index, arr) => {
    const textNote = `
      <li class="noteAdded__item"  data-index=${index}>        
          <p class="note__number">${index + 1}</p>  
          <p class="time">${item.time}</p>
          <p class="note__content">${item.content}</p> 
          <p class="note__category">${item.category}</p>           
          <p class="others"> others</p> 
          <button class="delete-note-button"><i class="fa-solid fa-trash"></i></button>
          <button class="edit-note-button"><i class="fa-solid fa-pen"></i></button>
          <button class="archive-note-button"><i class="fa-sharp fa-solid fa-folder"></i></button>   
      </li>
    `
    placeInsert.insertAdjacentHTML(situation, textNote);
  })
}

