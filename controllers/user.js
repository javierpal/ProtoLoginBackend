function getUser(req, res){
    return res.status(200).send(req.user);
}

module.exports = {
    getUser,
};