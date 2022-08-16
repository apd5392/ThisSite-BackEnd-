const { User } = require('../models')

const createUser = async (req, res) =>{
    try{
        const user = await User.create(req.body)
        res.send(user)
    }catch(error){
    throw error
  }
}
<<<<<<< HEAD

module.exports = {
  createUser,
  login
}
=======
}

const login = async () =>{
try{    
    const user = await User.findOne({where:{userName: req.body.userName}})

    if(!user){
         res.send({message: "user does not exist"})
    }else{
        if(req.body.password === user.password){ 
            res.send(user)
        }else{
        res.send({message: "incorrect password"})
    }}
}catch(error){
    throw error
}
}

const updateUser = async ()=>{
    const {id}=req.params
    const user = await User.update(req.body, {where:{id: id}, returning: true})
    res.send(user)
}

const deleteUser = async ()=>{
    const {id}=req.params
    await User.destroy({where: {id: id}})
    res.send({message: `User with id of ${id} deleted`})
}

module.exports = {
    createUser, login, updateUser, deleteUser
}