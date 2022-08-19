const {Comment, User}=require('../models')

const createComment = async (req, res)=>{
try {
        const {user_id, location_id, rating, content}= req.body
    
        const comment = await Comment.create({
            user_Id: user_id,
            location_Id: location_id,
            rating: rating,
            content: content
        })

        const commentWcreator = await Comment.findByPk(comment.id, {
            include: [{model: User, as: 'commentCreator'}]
        })
    
        res.send(commentWcreator)
} catch (error) {
    throw error
}
}

const updateComment = async (req, res)=>{
try {
    const {comment_id}=req.params

    await Comment.update(req.body, 
        {where: {id: comment_id},
        returning: true
        })

    const commentWcreator = await Comment.findByPk(comment_id,{
        include: [{model: User, as: 'commentCreator'}]
    })
        
    res.send(commentWcreator)
} catch (error) {
    throw error
}
}

const likeButton = async (req,res)=>{
    try {
        const {comment_id}=req.params
        const comment = await Comment.findByPk(comment_id);
        comment.likes +=1;
        comment.save()
        
        res.send(comment)
    } catch(error){
        throw error
    }
}

const dislikeButton = async (req, res)=>{
    try {
        const {comment_id}=req.params
        const comment = await Comment.findByPk(comment_id);
        comment.likes -=1;
        comment.save()
        
        res.send(comment)
    } catch(error){
        throw error
    }
}

const deleteComment = async (req, res)=>{
    try {
        const {comment_id}=req.params
        await Comment.destroy({where: {id: comment_id}})
        res.send({message: `Comment with id ${comment_id} has been deleted`})
    } catch (error) {
        throw error
    }
}

module.exports = {
    createComment, updateComment, deleteComment, likeButton, dislikeButton
}