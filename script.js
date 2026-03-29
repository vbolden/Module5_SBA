// VALUES
let form = document.getElementById('form');
let postTitle = document.getElementById("post-title");
let postText = document.getElementById("textbox");
let addPostBtn = document.getElementById("addButton");
let blogCards = document.getElementById('cards-container');
let deleteModal = document.getElementById('delete-modal');
let editModal = document.getElementById('edit-modal');
let confirmDelBtn = document.getElementById('confirm-delete');
let confirmEdtBtn = document.getElementById('confirm-edit');
let cancelDelBtn = document.getElementById('cancel-delete');
let cancelEdtBtn = document.getElementById('cancel-edit');
let titleEdit = document.getElementById('titleEdit');
let textEdit = document.getElementById('textEdit');


// EVENT LISTENERS
window.addEventListener('load', () => {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach(post => createCard(post));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addPost();
    clearInput();
});


addPostBtn.addEventListener('click', () => {
    postTitle.addEventListener('input', (e) => {
        if (postTitle.validity.valueMissing) {
            postTitle.setCustomValidity("Please enter a title");
            postTitle.reportValidity();
        } else {
            postTitle.setCustomValidity('')
        }
    })


})

// FUCNTIONS
function addPost() {
    let post = {
        id: Date.now(), // creates unique ID
        title: postTitle.value,
        body: postText.value
    };

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);

    localStorage.setItem('posts', JSON.stringify(posts));

    createCard(post); // render it 
}

function createCard(post) {
    let postCard = document.createElement('div');
    postCard.classList.add("card-body");

    postCard.dataset.id = post.id;

    let postCardTitle = document.createElement('h4');
    postCardTitle.innerHTML = post.title;

    let postCardBody = document.createElement('p');
    postCardBody.innerHTML = post.body;

    let editPost = document.createElement('button');
    editPost.classList.add('edit');
    editPost.innerHTML = "Edit Post"

    let deletePost = document.createElement('button');
    deletePost.classList.add("delete")
    deletePost.innerHTML = "Delete Post"

    postCard.append(postCardTitle, postCardBody, editPost, deletePost);
    blogCards.appendChild(postCard);
    console.log(postCard);

    deletePost.addEventListener('click', deleteEntry);
    editPost.addEventListener('click', editEntry);
}

function clearInput() {
    postTitle.value = '';
    postText.value = '';
}

let currentCard = null;

function deleteEntry(e) {
    if (e.target.classList.contains('delete')) {
        currentCard = e.target.closest('.card-body');

        deleteModal.classList.remove('display-none');
    }
}

confirmDelBtn.onclick = () => {
    if (currentCard) {
        let id = Number(currentCard.dataset.id);

        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.filter(post => post.id !== id);

        localStorage.setItem('posts', JSON.stringify(posts));

        currentCard.remove();
        currentCard = null;
    }

    deleteModal.classList.add('display-none');
};

cancelDelBtn.onclick = () => {
    deleteModal.classList.add('display-none');
    currentCard = null;
};

function editEntry(e) {

    if (e.target.classList.contains('edit')) {
        currentCard = e.target.closest('.card-body');

        let title = currentCard.querySelector('h4')
        let text = currentCard.querySelector('p');

        titleEdit.value = title.innerHTML;
        textEdit.value = text.innerHTML;

        editModal.classList.remove('display-none');
    }
}
 
confirmEdtBtn.onclick = () => {
    if(currentCard) {
        let id = Number(currentCard.dataset.id);

        let titleEl = currentCard.querySelector('h4');
        let textEl = currentCard.querySelector('p');

        // UPDATE DOM
        titleEl.innerHTML = titleEdit.value;
        textEl.innerHTML = textEdit.value;

        // UPDATE STORAGE
        let posts = JSON.parse(localStorage.getItem('posts')) || [];

        let updatedPosts = posts.map(post => {
            if(post.id === id) {
                return {
                    ...post,
                    title: titleEdit.value,
                    body: textEdit.value
                };
            }
            return post;
        })
        localStorage.setItem('posts', JSON.stringify(updatedPosts));

        currentCard = null;
    }
    editModal.classList.add('display-none');
};

cancelEdtBtn.onclick = () => {
    editModal.classList.add('display-none');
    currentCard = null;
};