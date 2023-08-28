const addCommentHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();

    const message = document.querySelector('#content').value.trim();

    if (title && content) {
        const response = await fetch(`/api/comments/:id`, {
            method: 'POST',
            body: JSON.stringify({ title, message }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/blogPost/:id');
        }
    }


}

document
.querySelector('#submit-comment')
.addEventListener('submit',addCommentHandler);