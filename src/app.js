import { http } from './http'
import { ui } from './UI'

document.querySelector('.postBtn').addEventListener('click',submitPost);
document.addEventListener('DOMContentLoaded',displayPosts)
document.querySelector('#posts').addEventListener('click',deletePost);
document.querySelector('#posts').addEventListener('click',fillUpdateForm);
document.querySelector('.inputContainer').addEventListener('click',updateSubmit)

document.querySelector('.inputContainer').addEventListener('click',cancelEdit);

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
   const id = document.querySelector('#id').value;
   if(data.author !== '' || data.body !==''){
    
      if(id === ''){
        http.post('http://localhost:3000/posts',data)
        .then(()=>{
          displayPosts();
          ui.clearFields();
        })
        .catch(err=> console.log(err));
        ui.showAlert('Posted successfully','alert alert-success');
      }else{
        //if it has a value form = edit state
        //UPDATE POST
        http.put(`http://localhost:3000/posts/${id}`,data)
        .then(() =>{
          ui.showAlert('Post updated succesfully','alert alert-success');
          ui.changeFormState('add');
          displayPosts();
        })
        .catch(err=> console.log(err));
      }
    
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
    if(confirm('Are you sure')){
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(()=>{displayPosts()});
    }
   
 }
}

function fillUpdateForm(e){
  e.preventDefault();
  console.log('click')
  if(e.target.parentElement.classList.contains('updateBtn')){
    const id = e.target.parentElement.getAttribute('data-id');
    http.get(`http://localhost:3000/posts/${id}`)
   .then(post=> ui.fillForm(post));
  }
}
//<input type="hidden" id="id" value="${post.id}">
function updateSubmit(e){
  if(e.target.classList.contains('updateBtnSubmit')){
    const id = document.querySelector('#id').value;
    const author = ui.authorInput;
    console.log(author);
    //http.put(`http://localhost:3000/posts/${id}`,data)
  }
}

function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add');
  }
  e.preventDefault();
}
