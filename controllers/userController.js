const signup = async function signup(req,res){
    res.json({
        message : "signup"
    })
}

const signin = async function signin(req,res){
    res.json({
        message : "signin"
    })
}

const mypurchases = async  function myPurchase(req,res){
    res.json({
        message : "Viewing my purchases"
    })
}
module.exports = {
    signup : signup,
    signin : signin,
    myPurchase : mypurchases
}