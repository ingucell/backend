const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data){this.users = data}
}

const bcrypt = require('bcrypt')

const handleLogin = async (req, res) =>{
    const {fullName, password} = req.body;
    if(!user || !pwd) return res.status(400).json({'message':'name & pwd are required'});
    const foundUser = usersDB.users.find(person => person.fullName === user);
    if(!foundUser) return res.sendStatus(401)//Unauthorized

    //eval passwd

    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        res.json({'sucess': `User ${user} is logged in!`})
    }else{
        res.sendStatus(401);
    }

}

module.exports = {handleLogin}; 