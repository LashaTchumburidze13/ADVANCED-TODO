import {v4} from 'uuid'

const form = document.querySelector('#form')
const input = document.querySelector('#todo-input')
const template = document.querySelector('#list-item-template')
const list = document.querySelector('#list')
const LOCAL = 'LOCALSTORAGE'
let todoArray = loadTodos()
todoArray.forEach(renderTodo)


document.addEventListener('change', e => {
    if(!e.target.matches('[data-list-item-checkbox]')) return;

    const parent = e.target.closest('.list-item')
const itemId = parent.dataset.itemId 
const todo = todoArray.find(t => t.id === itemId)
todo.complete = e.target.checked
    saveTodo()
 })

 document.addEventListener('click', e => {
    if(!e.target.matches('[data-button-delete]')) return

    const parent = e.target.closest('.list-item')
    const itemId = parent.dataset.itemId

    todoArray = todoArray.filter(t => t.id !== itemId)

    parent.remove()
    saveTodo()
})


form.addEventListener('submit', e => {
    e.preventDefault()

    const todoText = input.value
    const newTodo = {
        text: todoText,
        complete:false,
        id:v4()
    }
if(todoText === '') return
    renderTodo(newTodo)
    todoArray.push(newTodo)
    saveTodo()
})

function renderTodo(todo){
   const templateClone = template.content.cloneNode(true)
   const inputText = templateClone.querySelector('[data-list-item-text]')

   const container = templateClone.querySelector('.list-item')
   container.dataset.itemId = todo.id

   const checking = templateClone.querySelector('[data-list-item-checkbox]')
   checking.checked = todo.complete

   inputText.innerText = todo.text
   list.appendChild(templateClone)
}

function loadTodos(){
    const item = localStorage.getItem(LOCAL)
    return JSON.parse(item) || []
}

function saveTodo(){
  localStorage.setItem(LOCAL,JSON.stringify(todoArray))
}