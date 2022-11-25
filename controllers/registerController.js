const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data){this.users = data}
}

const fsPromises = require('fs').promises;
const  path = require('path');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) =>{
     const {fullName, conPwd, pwd, accountNumber, email} = req.body;
     if(!fullName || !pwd || !conPwd || !accountNumber || !email) return res.status(400).json({'message':'missing parameters, check of fullName, pw, conPwd, accountNumber, email are available'});

     //password confirmation
      if(pwd !== conPwd)  return res.status(409).json({'message': `pwd is not a match`})


        const duplicate = usersDB.users.find(person => person.fullName === fullName);
        if(duplicate) return res.status(409).json({'message': `${fullName} is a duplicate user`});
   
      try{
           //encrypt
           const hasedPwd = await bcrypt.hash(pwd, 10);
           //store new user
           const newUser = {"fullName": fullName, "password": hasedPwd}
           usersDB.setUsers([...usersDB.users, newUser]);
           await fsPromises.writeFile(
               path.join(__dirname, '..', 'model', 'users.json'),
               JSON.stringify(usersDB.users)
           )
           console.log(usersDB.users)
           res.status(201).json({'sucess': `New user ${fullName} created...`})
     }catch(err){
        res.status(500).json({'message': err.message});
     }
}

module.exports = {handleNewUser};

