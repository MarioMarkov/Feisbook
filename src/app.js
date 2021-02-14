import { http } from './http'
import { ui } from './UI'
document.querySelector('#userNameInput').addEventListener('keyup',updateGreeting)
document.querySelector('.postBtn').addEventListener('click',submitPost);
document.addEventListener('DOMContentLoaded',displayPosts)

function updateGreeting(e){

  const greeting = document.querySelector('#greeting');
  greeting.textContent = e.target.value

  e.preventDefault();
}

function displayPosts(){
   http.get('http://localhost:3000/posts')
   .then(posts=> ui.displayPosts(posts));
}

function submitPost(e){
   const data = ui.getInputData();
  
   if(data.author !== '' || data.body !==''){
      http.post('http://localhost:3000/posts',data)
    .then(()=>{
      displayPosts();
      ui.clearFields();
    });
   }
   else{
     ui.showAlert('Please fill fields','alert alert-danger');
   }
    
  
  e.preventDefault();

}