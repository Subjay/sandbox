import mysql  from 'mysql2/promise';

export async function connectToDB(){
  try{
    const dbConnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    });
    
    return dbConnection;
  }
  catch( error ) {
    throw Error(`Error connectToDB : ${error.message}`);
  }
}

export async function closeConnection(dbConnection){
  try{
    await dbConnection.end();
  }
  catch( error ) {
    throw Error(`Error closeConnection : ${error.message}`);
  }
}

export async function executeQuery(query,values = []) {
  try{
    const dbConnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    });
    
    const check = dbConnection.prepare(query);

    if(check){
    }
    const [results] = await dbConnection.execute(query,values);
    
    await dbConnection.end();

    return JSON.parse(JSON.stringify(results));
  }
  catch( error ) {
    throw Error(`executeQuery : ${error.message}`);
  }
}

export async function deleteQuery( dbConnection, query, values = [] ){
  try{
    const check = dbConnection.prepare(query);

    if(check){
    }
    
    const [results] = await dbConnection.execute(query,values);
    
    return results;
  }
  catch( error ) {
    throw Error(`deleteQuery : ${error.message}`);
  }
}

export async function updateQuery( dbConnection, query, values = [] ){
  console.log('into updateQuery',dbConnection);
  console.log('query',query);
  try{
    const check = dbConnection.prepare(query);
    console.log('check', check);

    if(check){
    }

    const [results] = await dbConnection.execute(query,values);
    console.log('execute Done');
    
    return results;
  }
  catch( error ) {
    throw Error(`deleteQuery : ${error.message}`);
  }
}

export async function addQuery( dbConnection, query, values = [] ){
  try{
    const check = dbConnection.prepare(query);

    if(check){
    }

    const [results] = await dbConnection.execute(query,values);
    
    return results;
  }
  catch( error ) {
    throw Error(`deleteQuery : ${error.message}`);
  }
}