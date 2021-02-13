import { http } from './http'

document.querySelector('#userName').addEventListener('keyup',updateGreeting)

function updateGreeting(e){

  const greeting = document.querySelector('#greeting');
  greeting.textContent = e.target.value

  e.preventDefault();
}