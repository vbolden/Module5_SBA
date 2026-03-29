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
// window.addEventListener('load', displayData);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addItem();
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

    let posts = JSON.parse(localStorage.getItem('posts') || []);
    posts.push(post);

    localStorage.setItem('posts', JSON.stringify(posts));

    createCard(post); // render it 
}

function createCard(post) {
    let postCard = document.createElement('div');
    postCard.classList.add("card-body")

    let postCardTitle = document.createElement('h4');
    postCardTitle.innerHTML = postTitle.value;

    let postCardBody = document.createElement('p');
    postCardBody.innerHTML = postText.value;

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

function deleteEntry(e) {
    if (e.target.classList.contains('delete')) {
        const post = e.target.closest('div')
        deleteModal.classList.remove('display-none')
        confirmDelBtn.addEventListener('click', () => {
            post.remove()
            deleteModal.classList.add('display-none')
        })
        cancelDelBtn.addEventListener('click', () => {
            deleteModal.classList.add('display-none')
        })

    }
}

function editEntry(e) {
    if (e.target.classList.contains('edit')) {
        editModal.classList.remove('display-none');
        let card = e.target.parentElement;
        let title = card.querySelector('h4')
        console.log(title.innerHTML);
        titleEdit.value = title.innerHTML;
        let text = card.querySelector('p')
        console.log(text.innerHTML);
        textEdit.value = text.innerHTML;
        confirmEdtBtn.onclick = () => {
            console.log(title.innerHTML);
            title.innerHTML = titleEdit.value;
            console.log(title.innerHTML);
            text.innerHTML = textEdit.value;
            editModal.classList.add('display-none')
        }
        cancelEdtBtn.onclick = () => {
            editModal.classList.add('display-none')
        }
    }
}