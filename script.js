// VALUES
let postTitle = document.getElementById("post-title");
let postText = document.getElementById("textbox");
let addPostBtn = document.getElementById("addButton");
let blogCards = document.getElementById('cards-container');


// EVENT LISTENERS
addPostBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Hello there");

    addItem();
    clearInput();
});


// FUCNTIONS
function addItem() {
    let postCard = document.createElement('div');
    postCard.classList.add("card-body")

    let postCardTitle = document.createElement('h4');
    postCardTitle.innerHTML = postTitle.value;

    let postCardBody = document.createElement('p');
    postCardBody.innerHTML = postText.value;

    let editPost = document.createElement('button');
    editPost.id = "edit"
    editPost.innerHTML = "Edit Post"

    let removePost = document.createElement('button');
    removePost.id = "remove"
    removePost.innerHTML = "Remove Post"

    postCard.appendChild(postCardTitle);
    postCard.appendChild(postCardBody);
    postCard.appendChild(editPost);
    postCard.appendChild(removePost);
    blogCards.appendChild(postCard);
}

function clearInput() {
    postTitle.value = '';
    postText.value =  '';
}