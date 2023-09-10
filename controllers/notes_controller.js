const Note = require('../models/note');
const fs = require("fs");
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.uploadNotes = async (req, res) => {
    console.log(req.files);
    console.log(req.body);
    if (req.files) {
        // upload the files in a folder and its details in the database
        var file = req.files.note;
        var filename = file.name;
        var fileLocation = __dirname+"/../assets/uploads/"+req.body.userId+"/"+filename;
        console.log(fs.existsSync(fileLocation));
        if (fs.existsSync(fileLocation)==true) {
            // let the user know to change the filename
            console.log("file already exists");
            return res.redirect("back");
        } else {
            file.mv(fileLocation, async function(err) {
                if (err) {console.log("Error in saving file: ", err); return res.redirect("back");}
                console.log("File saved successfully");
                var newNote = await Note.create({
                    name: filename,
                    about: req.body.about,
                    fileLocation: fileLocation,
                    author: req.body.userId
                });
                var user = await User.findById(req.body.userId);
                await user.notesList.push(newNote.id);
                await user.save();
                return res.redirect("back");
            });
        }
    } else {
        // notify the user
        console.log("files were not uploaded properly");
        return res.redirect("back");
    }
    console.log("this is the upload notes controller");
}

module.exports.getAllNotes = async function(req, res) {
    try {
        var user_id = req.query.userId;
        var user = await User.findById(user_id);
        var allNotes = [];
        for (var i=0; i<user.notesList.length; i++) {
            var noteReturn = {};
            var noteId = user.notesList[i];
            var note = await Note.findById(noteId).populate('author').populate({path: 'parentComments'});
            // var note = await Note.findById(noteId);
            console.log(note);
            allNotes.push(note);

        }
        return res.status(200).send({success: true, data: allNotes});
    } catch(err) {
        return res.status(500).send({success: false, data: "some error happened"});
    }
}

module.exports.likeNote = async function(req, res) {
    var userId = req.query.userId;
    var noteId = req.query.noteId;
    console.log(noteId, userId);
    var user = await User.findById(userId);
    var note = await Note.findById(noteId);
    if (note.likedUsers.includes(userId)) { //the person has already liked it
        console.log("inside if condition");
        var likedUsers = note.likedUsers.filter(function (x) {
            return x != userId;
        });
        note.likedUsers = likedUsers;
        await note.save();
        var likedNotes = user.likedNotes.filter(function (x) {
            return x != noteId;
        });
        user.likedNotes = likedNotes;
        await user.save();
        return res.status(200).send({success: true, message: "disliked" });
    } else {
        note.likedUsers.push(userId);
        user.likedNotes.push(noteId);
        await user.save();
        await note.save();
        return res.status(200).send({success: true, message: "liked" });
    }
}

module.exports.addComment = async function(req, res) {
    var userId = req.query.userId;
    var parentId = req.query.parentId;
    var content = req.query.content;
    var comment = await Comment.create({
        content: content,
        user: userId,
        parent: parentId
    });
    console.log(userId, noteId, content);
    console.log(comment);
    var note = await Note.findById(noteId);
    note.parentComments.push(comment.id);
    await note.save();
    return res.status(200).send({"success": true});
}