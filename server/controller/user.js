const User = require("../models/User");
const {setUser,getUser} = require("../services/auth");

async function  handleLogin(req,res){
    const username = req.body.email
    const password = req.body.password

    try{
        var user = await User.findOne({email:username})
        if(!user){
        return res.redirect("/login")
        } else{
        user.comparePasswords(password, (err,match) =>  {
            if(!match){
            return res.redirect("/login")
            } else{
            const token = setUser(user)
            return res.status(200).json({
                customToken: token,
            })
            }
        })
        }
    }catch(e){
        console.log(e);
    }
}

async function handleSignup(req,res){
    const user = new User({
        username:req.body.username,
        contact:req.body.contact,
        email:req.body.email,
        password:req.body.password,
        userImage:req.body.MyFile
    })
    
    user.save()
        .then((user) => {
        const token = setUser(user)
        return res.json({
            customToken: token,
            url: "/secret"
        })
        })
        .catch((error) => {
        return res.status(200).redirect("/signup")
        })
}

async function handleAuthentication(req,res){
    const tokenUser= getUser(req.body.userToken);
    if(tokenUser){
        const username = tokenUser.email
        try{
            var user = await User.findOne({email:username})
            if(!user){
            return res.redirect("/login")
            } else{
              return res.status(200).send();
            }
        } catch(e){
            console.log(e);
        }}
    return res.status(300).send();
}

module.exports = {handleLogin ,handleSignup ,handleAuthentication};