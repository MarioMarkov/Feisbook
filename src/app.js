import { http } from './http'
import { ui } from './UI'

document.querySelector('.postBtn').addEventListener('click',submitPost);
document.addEventListener('DOMContentLoaded',displayPosts)

document.querySelector('#posts').addEventListener('click',deletePost);
document.querySelector('#posts').addEventListener('click',fillUpdateForm);
document.querySelector('#posts').addEventListener('click',like);
document.querySelector('#posts').addEventListener('click',dislike);


document.querySelector('.inputContainer').addEventListener('click',cancelEdit);

$('#userNameInput').on('keyup',(e)=>{
  var greeting = $('#greeting');
  greeting.text(e.target.value);
})

function like(e){
  e.preventDefault();
  if(e.target.parentElement.classList.contains('likeBtn')){
    const id = e.target.parentElement.getAttribute('data-id');
    ;
    http.get(`http://localhost:3000/posts/${id}`)
    .then(data=> {
      var updatedPost ={}
      updatedPost = data;
      updatedPost.likes++;
      http.put(`http://localhost:3000/posts/${id}`,updatedPost)
      .then(data => displayPosts())
    });   
    
  }
}
function dislike(e){
  e.preventDefault();
  if(e.target.parentElement.classList.contains('dislikeBtn')){
    const id = e.target.parentElement.getAttribute('data-id');
    ;
    http.get(`http://localhost:3000/posts/${id}`)
    .then(data=> {
      var updatedPost ={}
      updatedPost = data;
      updatedPost.dislikes++;
      http.put(`http://localhost:3000/posts/${id}`,updatedPost)
      .then(data => displayPosts())
    });   
    
  }
}


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
        //if ID has a value form = edit state
        //==> UPDATE POST
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
  if(e.target.parentElement.classList.contains('updateBtn')){
    const id = e.target.parentElement.getAttribute('data-id');
    http.get(`http://localhost:3000/posts/${id}`)
   .then(post=> ui.fillForm(post));
  }
}



function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add');
  }
  e.preventDefault();
}
