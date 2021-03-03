class UI{
    constructor(){
        this.authorInput = document.querySelector('#userNameInput');
        this.bodyInput = document.querySelector("#bodyInput")
        this.id = document.querySelector('#id');
        

        this.postsContainer = document.querySelector('#posts');
        this.postBtn = document.querySelector('.postBtn');
        this.formState = 'add';
    }

    

    displayPosts(posts){
        let output = '';

        posts.forEach(post => {
            output += `<div class="card text-white bg-primary mb-3 mainCard">
            <div class="card-header d-flex align-items-center"> 
              <div class="header mr-auto">
                <div class="header-main d-flex">
                  <img src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-avatar-icon-png-image_695765.jpg" alt="Avatar" class="avatar"> <span class="userName h4 mb-0 ml-4 align-self-center ">${post.author}</span>
                </div>
                
              </div>
              <div class="badges">
                <span  class="badge badge-pill badge-success p-2"><h5 class="p-1 m-0">Likes: <span class"likesElement">${post.likes}</span></h5> </span>
                <span class="badge badge-pill badge-danger"><h5 class="p-1 m-0">Dislikes: <span class"dislikesElement">${post.dislikes}</span></h5></span>
              </div>
            </div>
            <div class="card-body">
              <div id="post" class="mb-3">
               ${post.body}
              </div>
              <div  id="likeSection" >
                <div class="float-left">
                  <a style="color: red;" class="deleteBtn" data-id="${post.id}" href=""><i class="fas fa-trash fa-2x"></i> </a>
                  <a href=""  class="updateBtn" style="color: rgb(84, 240, 84);" data-id="${post.id}"><i class="fas fa-user-edit fa-2x"></i> </a>
                </div>
                <div class="float-right">
                  <a style="color: rgb(84, 240, 84);" class="likeBtn" data-id="${post.id}" href=""><i class="fas fa-thumbs-up fa-2x"></i> </a>
                  <a href="" class="dislikeBtn" style="color: red;" data-id="${post.id}"><i class="fas fa-thumbs-down fa-2x"></i> </a>
                </div>
              </div>
            </div>
          </div>`
        });

        
        this.postsContainer.innerHTML = output;
    }

    getInputData(){
        return {
            author: this.authorInput.value,
            body: this.bodyInput.value,
            likes:0,
            dislikes:0
        } 
    }

    fillForm(post){
      this.authorInput.value = post.author;
      this.bodyInput.value = post.body;
      //here settting the id
      this.id.value = post.id;

      this.changeFormState('edit');
       
    }
    clearIdInput(){
      this.id.value = '';
    }
    changeFormState(type){
      if(type ==='edit'){
          document.querySelector('.greeting').style.display ='none'; 
          document.querySelector('.question1').textContent = "Author:";
          document.querySelector('.question2').textContent = "Status:";

          this.postBtn.textContent = 'Update Post';
          this.postBtn.classList = 'post-submit btn btn-warning btn-block'
          const cancelBtn = document.createElement('btn');
          cancelBtn.className = 'post-cancel btn btn-light btn-block';
          cancelBtn.appendChild(document.createTextNode('Cancel Edit'));

          const form = this.postBtn.parentElement;
            const end = document.querySelector('.form-end')

            form.insertBefore(cancelBtn,end);
          

      }else{
          document.querySelector('.greeting').style.display ='block'; 
          this.postBtn.textContent = 'Post It';
          this.postBtn.classList = 'post-submit btn btn-primary btn-block';
          if(document.querySelector('.post-cancel')){
              document.querySelector('.post-cancel').remove();
          }
          //clear id from hidden field
          this.clearIdInput();

          this.clearFields();
      }

  }
    showAlert(text,className){
        const alertDiv = document.createElement('div');
    
        alertDiv.className =  className;
        
        alertDiv.appendChild(document.createTextNode(text));
        
        $(alertDiv).insertBefore('#posts');

        setTimeout(()=>{
        this.clearAlert();
        },4000)
    }
     clearAlert(){
         const currentAlert = document.querySelector('.alert');

         if(currentAlert){
             currentAlert.remove();
         }
     }

     clearFields(){
        this.authorInput.value = '';
         this.bodyInput.value = '';
    }
}


export const ui = new UI();