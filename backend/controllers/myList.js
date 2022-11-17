// We import the Model to communicate with the Database
const List = require('../models/MyList')

async function getAllMoviesOrShows(req,res) {
    const allMoviesOrShows = await MovieOrShow.find()
    res.json(allMoviesOrShows)
}

async function createMoviesOrShows(req,res) {
    console.log('Req Body!', req.body)
    // Method 3
    // MovieOrShow.create({
    //     name: req.body.name,
    //     content: req.body.content
    // })
    MovieOrShow.create(req.body)
    .then(newMovieOrShow => res.json(newMovieOrShow))
    .catch(err => res.json(err))
}
    // Method 2
//     await MovieOrShow.create({
//         name: req.body.name,
//         content: req.body.content
//     })
//     // Method 1
//     let newMovieOrShow = new MovieOrShow({
//         name: req.body.name,
//         content: req.body.content
// })
//     await newMovieOrShow.save()
// }

async function updateMoviesOrShows(req, res) {

    try {
    await MovieOrShow.findByIdAndUpdate(req.params._id,req.body
         // form of req.body {content:req.body.content})

    )
    res.status(200).json({message:'MovieOrShow updated Successfuly!'})
    // res.json(updateMovieOrShow)
} catch(err){
    res.json(err)
    }
}

async function deleteMoviesOrShows(req, res) {
    try {
        await MovieOrShow.findByIdAndDelete(req.params._id)
        res.json({message: 'MovieOrShow Deleted Successfully'})
    } catch(err) {
        res.json(err)
    }
}

// Exporting/Sharing our functions
module.exports = {
    getAllMoviesOrShows,
    createMoviesOrShows,
    updateMoviesOrShows,
    deleteMoviesOrShows
}