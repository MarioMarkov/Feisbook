class UI{
    constructor(){
        this.authorInput = document.querySelector('#userNameInput');
        this.bodyInput = document.querySelector("#bodyInput")
        this.id = document.querySelector('#id');
        this.postsContainer = document.querySelector('#posts')
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
                <span  class="badge badge-pill badge-success p-2"><h5 class="p-1 m-0">Likes: ${post.likes}</h5> </span>
                <span class="badge badge-pill badge-danger"><h5 class="p-1 m-0">Dislikes: ${post.dislikes}</h5></span>
              </div>
            </div>
            <div class="card-body">
              <div id="post" class="mb-3">
               ${post.body}
              </div>
              <div  id="likeSection" >
                <div class="float-left">
                  <a style="color: red;" class="deleteBtn" data-id="${post.id}" href=""><i class="fas fa-trash fa-2x"></i> </a>
                  <a href=""n style="color: rgb(84, 240, 84);" data-id="${post.id}"><i class="fas fa-user-edit fa-2x"></i> </a>
                </div>
                <div class="float-right">
                  <a style="color: rgb(84, 240, 84);" data-id="${post.id}" href=""><i class="fas fa-thumbs-up fa-2x"></i> </a>
                  <a href=""n style="color: red;" data-id="${post.id}"><i class="fas fa-thumbs-down fa-2x"></i> </a>
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