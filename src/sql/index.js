const oracledb = require("oracledb");

module.exports = {
  selectAllEmployees: async function selectAllEmployees(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: process.env.USER,
        password: process.env.PASSWORD,
        connectString: process.env.CONNECT_STRING,
      });

      //
      console.log("connected to database");
      // run query to get all employees
      result = await connection.execute(`SELECT * FROM employees`);
      console.log(result);
    } catch (err) {
      //send error message
      return res.send(err.message);
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
      if (result.rows.length == 0) {
        //query return zero employees
        return res.send("query send no rows");
      } else {
        //send all employees
        return res.send(result.rows);
      }
    }
  },
  getEmployee: async function getEmployee(req, res) {
    console.log(req.params.employeeID);
    try {
      connection = await oracledb.getConnection({
        user: process.env.USER,
        password: process.env.PASSWORD,
        connectString: process.env.CONNECT_STRING,
      });

      //
      console.log("connected to database");
      // run query to get all employees
      result = await connection.execute(
        `SELECT * FROM employees WHERE employee_id = ${req.params.employeeID}`
      );
      console.log(result);
    } catch (err) {
      //send error message
      return res.send(err.message);
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
      if (result.rows.length == 0) {
        //query return zero employees
        return res.send("query send no rows");
      } else {
        //send all employees
        return res.send(result.rows);
      }
    }
  },
};
