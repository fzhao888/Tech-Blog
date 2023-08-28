const updatePostHandler = async(event) => {
    const title = document.querySelector('update-title').value.trim();
    const content = document.querySelector('update-content').value.trim();

    if(title && content){
        
    }
}

const deletePostHandler = async(event) => {

}

document    
    .querySelector('#update-post')
    .addEventListener(updatePostHandler);

document    
    .querySelector('#delete-post')
    .addEventListener(deletePostHandler);