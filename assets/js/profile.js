var id = window.location.href;
id = id.substring(id.indexOf('profile')+8);
console.log(id);
window.localStorage.setItem("user_id", id);
document.cookie = "user_id="+id;

var userId = document.getElementById("userId");
userId.value = id;

var logout = document.getElementById("logout");
logout.addEventListener("click", function() {
    window.localStorage.removeItem("user_id");
    document.cookie = "user_id" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = "http://18.119.130.95:3000/auth/logout/?user_id="+id;
    console.log(id);
    // fetch('http://18.119.130.95:3000/auth/logout/?user_id='+id, {
    //     method: 'GET'
    //     // headers: {
    //     //     'Content-Type': 'application/x-www-form-urlencoded'
    //     // },
    //     // body: data
    // })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error(error));
})

var verify_mobile_link = document.getElementById("verify_mobile_link");
verify_mobile_link.setAttribute("href", "/auth/verify-mobile/?user_id="+id);

// function printChildComments(comment) {    
//     // display the content of this comment
//     for (let i=0; i<comment.childComments.length; i++) {
//         printChildComments(comment.childComments[i]);
//     }
// }

function displayNotes(data) {
    function changeLikeButtonColor(noteId, data) {
        console.log(noteId, data);
        var likeButton = document.getElementById(noteId);
        if (data.message=="liked") {
            likeButton.style.color = "red";
        } else {
            likeButton.style.color = "black";
        }
    }
    var notes = data.data;
    console.log(notes);
    var showNotes = document.getElementById("showNotes");
    showNotes.innerHTML = "";
    // var span = document.createElement("span");
    // var h4 = document.createElement("h4");
    for (var i=0; i<notes.length; i++) {
        var fileLocation = notes[i].fileLocation;
        fileLocation = fileLocation.substring(fileLocation.indexOf("assets")+7);
        if (notes[i].likedUsers.includes(id)) {
            showNotes.innerHTML += `<span>
                <h4 class="red">${notes[i].name}</h4>
                <p class="blue">${notes[i].about}</p>
                <button style="color: red;" class="like_button" id="${notes[i].id}">like</button>
                <a target="_blank" href="http://18.119.130.95:3000/${fileLocation}">go to this note</a>
                <textarea data-textAreaId="${notes[i].id}"></textarea>
                <button class="commentButton" data-noteId="${notes[i].id}">add comment</button>
            </span>`
            // showNotes.innerHTML += addComments(notes[i].parentComments);
        } else {
            showNotes.innerHTML += `<span>
                <h4 class="red">${notes[i].name}</h4>
                <p class="blue">${notes[i].about}</p>
                <button class="like_button" id="${notes[i].id}">like</button>
                <a target="_blank" href="http://18.119.130.95:3000/${fileLocation}">go to this note</a>
                <textarea data-textAreaId="${notes[i].id}"></textarea>
                <button class="commentButton" data-noteId="${notes[i].id}">add comment</button>
            </span>`
        }
        for (let j=0; j<notes[i].parentComments.length; j++) {
            showNotes.innerHTML += `
                <div>
                    <p style="display: inline-block">${notes[i].parentComments[j].content}</p>
                    <button class="deleteComment" data-commentId="${notes[i].parentComments[j]._id}">delete</button>
                    <textarea data-textAreaId="${notes[i].parentComments[j]._id}"></textarea>
                    <button class="commentButton" data-commentId="${notes[i].parentComments[j]._id}">add child comment</button>
                </div>
            `
            // showNotes.innerHTML += printChildComments(notes[i].parentComments[j]);
        }
    }
    var likeButtons = document.getElementsByClassName("like_button");
    console.log(likeButtons);
    for (let i=0; i<likeButtons.length; i++) {
        likeButtons[i].addEventListener("click", function(e) {
            var noteId = likeButtons[i].getAttribute("id");
            fetch('http://18.119.130.95:3000/notes/like/?userId='+id+'&noteId='+noteId, {
                method: 'POST'
                })
                .then(response => response.json())
                .then(data => changeLikeButtonColor(noteId, data))
                .catch(error => console.error(error));
        });
    }
    var commentButtons = document.getElementsByClassName("commentButton");
    for (let i=0; i<commentButtons.length; i++) {
        commentButtons[i].addEventListener("click", function(e) {
            var noteId = commentButtons[i].getAttribute("data-noteId");
            var content = document.querySelector(`textarea[data-textAreaId="${noteId}"]`);
            fetch('http://18.119.130.95:3000/notes/comment/?userId='+id+'&parentId='+noteId+'&content='+content.value, {
                method: 'POST'
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
        });
    }
}

var fetchNotes = document.getElementById("fetchNotes");
fetchNotes.addEventListener("click", function() {
    fetch('http://18.119.130.95:3000/notes/get-all-notes/?userId='+id, {
        method: 'GET'
        })
        .then(response => response.json())
        .then(data => displayNotes(data))
        .catch(error => console.error(error));
});

