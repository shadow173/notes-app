let addNoteForm = document.querySelector('#add-note')
let noteSection = document.querySelector('#notes-section')

const template = document.createElement('template');
template.innerHTML = `
  <div class="card note mt-3">
    <div class="container pt-2" style="background-color: darkseagreen; max-height: 3rem;">
        <div class="row" >
          <div class="text-center col-6">
            <h4 style="font-size: x-large;margin: auto;">Note Title</h4>
          </div>
          <div class="text-center col-6">
            <h4 class="id" style="font-size: x-large;margin: auto;">Note ID: #2</h4>
          </div>
        </div>
      </div>
    <div class="card-body">
        <p class='text'>Note contents</p>
        <button class="btn edit btn-primary">Edit Note</button>
        <button class="btn delete btn-danger">Delete Note</button>
    </div>
</div>
<style>
.mt-3 {
  margin-top: 1rem !important;
}
.card-body {
  flex: 1 1 auto;
  padding-left: 1rem;
  padding-bottom: 1rem;
}
.card {
  position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    max-width: 1000px;
    display: block;
    margin: auto;
    margin-bottom: 1rem;
}
.col-6 {
  flex: 0 0 auto;
  width: 50%;
  
}

.text-center {
  text-align: center !important;
}
.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.container {
  width: 100%;
    padding-right: 15px;
    padding-left: 15px;
   margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
  
}

.pt-2 {
  padding-top: 0.5rem !important;
}
.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}
.btn:hover {
  color: #212529;
}
.btn-check:focus + .btn, .btn:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.btn:disabled, .btn.disabled, fieldset:disabled .btn {
  pointer-events: none;
  opacity: 0.65;
}

.btn-primary {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.btn-primary:hover {
  color: #fff;
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}
.btn-danger:hover {
  color: #fff;
  background-color: #bb2d3b;
  border-color: #b02a37;
}
.btn-check:focus + .btn-danger, .btn-danger:focus {
  color: #fff;
  background-color: #bb2d3b;
  border-color: #b02a37;
  box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);
}
.btn-check:checked + .btn-danger, .btn-check:active + .btn-danger, .btn-danger:active, .btn-danger.active, .show > .btn-danger.dropdown-toggle {
  color: #fff;
  background-color: #b02a37;
  border-color: #a52834;
}
.btn-check:checked + .btn-danger:focus, .btn-check:active + .btn-danger:focus, .btn-danger:active:focus, .btn-danger.active:focus, .show > .btn-danger.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);
}
.btn-danger:disabled, .btn-danger.disabled {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

</style>

`;

class NotesSection extends HTMLElement {
  constructor() {
    super();

    // this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h4').innerText = this.getAttribute('title');
    this.shadowRoot.querySelector('p').innerText = this.getAttribute('text');
  }

 
}

window.customElements.define('note-item', NotesSection);



 // toggleInfo() {
  //   this.showInfo = !this.showInfo;

  //   const info = this.shadowRoot.querySelector('.info');
  //   const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

  //   if(this.showInfo) {
  //     info.style.display = 'block';
  //     toggleBtn.innerText = 'Hide Info';
  //   } else {
  //     info.style.display = 'none';
  //     toggleBtn.innerText = 'Show Info';
  //   }
  // }

  // connectedCallback() {
  //   this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
  // }

  // disconnectedCallback() {
  //   this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  // }

addNoteForm.onsubmit = function(e){
    addNote(e)
};


let notes = JSON.parse(localStorage.getItem(localStorage))

let addNote = (e) => {
    e.preventDefault();
    let notes = JSON.parse(localStorage.getItem("allNotes"));
    let newNote = {};
    let title = document.querySelector('#note-title').value
    let note = document.querySelector('#note-content').value
    if(title == '' || note == ''){
      return alert('Please enter items in both fields!');
    } else {
      newNote.title = title;
      newNote.note = note;
    }
    
    if(notes === null){
        notes = [];
    }
    
    localStorage.setItem('note', JSON.stringify(newNote))
    notes.push(newNote)
    localStorage.setItem('allNotes', JSON.stringify(notes))

}

// Creating the notes on the webpage
let renderNotes = () => {
  let noteElement = document.createElement('div').classList.add('container')
  let test = document.createElement('div').classList.add = ('card', 'note')
  noteElement.appendChild(test)
  let current = document.querySelector('#notes-section')
    let notesArr = JSON.parse(localStorage.getItem('allNotes'))
    notesArr.forEach((element, index) => {
      console.log(element.title) // 100, 200, 300
      console.log(index); // 0, 1, 2
      
  });



}
// Making notes 




function addElement () {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newContent = document.createTextNode("Hi there and greetings!");

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
}
renderNotes()