import { http } from './http'
import { ui } from './UI'

document.querySelector('.postBtn').addEventListener('click',submitPost);
document.addEventListener('DOMContentLoaded',displayPosts)
document.querySelector('#posts').addEventListener('click',deletePost);

$('#userNameInput').on('keyup',(e)=>{
  var greeting = $('#greeting');
  greeting.text(e.target.value);

})


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
    ui.showAlert('Posted successfully','alert alert-success');
   }
   else{
    ui.showAlert('Please fill fields','alert alert-danger');
   }
    
  
  e.preventDefault();

}

function deletePost(e){
  e.preventDefault();
 if(e.target.parentElement.classList.contains('deleteBtn')){
   const id = e.target.parentElement.getAttribute('data-id');
    
   http.delete(`http://localhost:3000/posts/${id}`)
   .then(()=>{displayPosts()});
 }
}