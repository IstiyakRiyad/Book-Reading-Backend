const {getAuth} = require('firebase-admin/auth');
const createError = require('http-errors');

const userInfoByPhone = async (number) => {

    const {users} = await getAuth().listUsers();

    const user = users.find(({phoneNumber}) => phoneNumber === number);

    if(!user) throw createError(401, 'Do not have account in firebase');

    const {passwordHash, passwordSalt} = user;

    // Delete the account
    await getAuth().deleteUser(user.uid);

    return {passwordHash, passwordSalt};
}


module.exports = userInfoByPhone;