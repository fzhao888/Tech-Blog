const updatePostHandler = async(event) => {
    event.preventDefault();

    const title = document.querySelector('update-title').value.trim();
    const content = document.querySelector('update-content').value.trim();

    if(title && content){
        const response = await fetch('/api/blogposts/:id', {
            method: 'PUT',
            body: JSON.stringify({title, content}),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
    }

    if(response.ok){
        document.location.replace('/blogPost/:id');
    }
}

const deletePostHandler = async(event) => {
    event.preventDefault();

    const reponse = await fetch('api/blogposts/:id', {
        method: 'DELETE' 
    })

    if(response.ok){
        document.location.replace('/profile');
    }
}

document    
    .querySelector('#update-post')
    .addEventListener('submit',updatePostHandler);

document    
    .querySelector('#delete-post')
    .addEventListener('submit',deletePostHandler);