import { http } from './http'
import { ui } from './UI'

document.querySelector('.postBtn').addEventListener('click',submitPost);
document.addEventListener('DOMContentLoaded',displayPosts)


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