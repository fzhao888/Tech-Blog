const updatePostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#update-title').value.trim();
    const content = document.querySelector('#update-content').value.trim();



    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        let response; 

        if (title || content) {
            if (!content) {
                 response = await fetch(`/api/blogposts/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ title }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            else if (!title) {
                 response = await fetch(`/api/blogposts/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ content }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            else {
                 response = await fetch(`/api/blogposts/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ title, content }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }


            if (response.ok) {
                console.log(document.location);
                document.location.replace(`../profile`);

            }
        }
    }
}

const deletePostHandler = async (event) => {
    event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        console.log(id)
        const response = await fetch(`/api/blogposts/${id}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            document.location.replace('/profile');
        }
    }
}

document
    .querySelector('.editPost-form')
    .addEventListener('submit', updatePostHandler);

document
    .querySelector('#delete-post')
    .addEventListener('click', deletePostHandler);