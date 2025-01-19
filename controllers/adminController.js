const signup = async function(req,res){
    res.json({
        message : "Admin has made an account"
    })
}
const signin = async function(req,res){
    res.json({
        message : "Admin logged in"
    })
}

const addcourse = async function(req,res){
    res.json({
        message : "Course added success"
    })
}


const updatecourse = async function(req,res){
    res.json({
        message : "course updated"
    })
}

const viewcourse = async function(req,res){
    res.json({
        message : "viewing all the courses"
    })
}

module.exports = {
    signup : signup,
    signin : signin,
    addcourse : addcourse,
    updatecourse : updatecourse,
    viewcourse : viewcourse
}
