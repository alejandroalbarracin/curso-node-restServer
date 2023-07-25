const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.googleClientId);

async function googleVerify(token = '') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.googleClientId,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const {email, picture, name} = ticket.getPayload();

  return{
    email, 
    picture, 
    name
  }



  //const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
//verify().catch(console.error);
module.exports = { googleVerify }