const {User, Location} = require('../models')

const createUser = async (req, res) =>{
    try{
        const user = await User.create(req.body)
        res.send(user)
    }catch(error){
    throw error
}
}

const login = async (req, res) =>{
try{    
    const user = await User.findOne({where:{userName: req.body.userName}, include: [{model: Location, as: "host"}]})

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

const updateUser = async (req, res)=>{
    const {id}=req.params
    const user = await User.update(req.body, {where:{id: id}, returning: true})
    res.send(user)
}

const deleteUser = async (req, res)=>{
    const {id}=req.params
    await User.destroy({where: {id: id}})
    res.send({message: `User with id ${id} has been deleted`})
}

module.exports = {
    createUser, login, updateUser, deleteUser
}