const oracledb = require("oracledb");
async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
      user: process.env.USER,
      password: process.env.PASSWORD,
      connectString: process.env.CONNECT_STRING,
    });
    console.log("connected to database");
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log("close connection success");
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

checkConnection();
