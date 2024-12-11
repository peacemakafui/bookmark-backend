const Bookmark = require('../model/Bookmark');

// Create a new bookmark
const createBookmark = async (req, res) => {
    const { title, url, description } = req.body;
    if (!title || !url) {
        return res.status(400).send("Title and URL are required");
    }

    try {
        const newBookmark = new Bookmark({
            user: req.user.id, // Retrieved from the JWT
            title,
            description,
            url,
        });
        await newBookmark.save();
        res.status(201).send({ message: "Bookmark added", bookmark: newBookmark });
        } catch (err) {
        res.status(500).send("Error saving bookmark");
        console.log(err)
        }
};

// Get all bookmarks for the authenticated user
const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ user: req.user.id }); // Fetch only the user's bookmarks
        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bookmarks', error: error.message });
    }
};

const deleteBookmark = async (req, res) => {
    const {id} = req.params;

    try {
        const bookmark = await Bookmark.findOneAndDelete({
          _id: id,
          user: req.user.id, // Ensure the user owns the bookmark
        });
    
        if (!bookmark) {
          return res.status(404).send("Bookmark not found or not owned by you");
        }
    
        res.status(200).send({ message: "Bookmark deleted", bookmark });
      } catch (err) {
        res.status(500).send("Error deleting bookmark");
        console.log(err)
      }

};
module.exports = { createBookmark, getBookmarks, deleteBookmark };

  
  
//   // Delete a Bookmark
//   app.delete("/bookmarks/:id", authenticate, async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const bookmark = await Bookmark.findOneAndDelete({
//         _id: id,
//         user: req.user.user, // Ensure the user owns the bookmark
//       });
  
//       if (!bookmark) {
//         return res.status(404).send("Bookmark not found or not owned by you");
//       }
  
//       res.status(200).send({ message: "Bookmark deleted", bookmark });
//     } catch (err) {
//       res.status(500).send("Error deleting bookmark");
//     }
//   });