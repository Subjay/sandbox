import bcrypt from 'bcrypt';

export async function hashString( unHashPass: string ) {
  var hashPass = '';

  await bcrypt.genSalt(10)
    .then( (salt: string) => {
      return bcrypt.hash(unHashPass, salt)
    })
    .then( (hash: string) => {
      hashPass = hash;
    })
    .catch(err => console.error(err.message));

  return hashPass;
}

export async function isSameString( unHashPass: string, hashPass: string ) {
  var isSame = false;
  
  await bcrypt.compare(unHashPass,hashPass)
    .then( (result: boolean) => {
      isSame = result;
    });

  return isSame;
}