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
  editEmployee: async function editEmployee(req, res) {
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
        `UPDATE employees
         SET employee_id='${req.body.employeeID}',
         first_name='${req.body.firstName}',
         last_name='${req.body.lastName},
         email='${req.body.email},
         phone_number='${req.body.phoneNumber},
         hire_date=${req.body.hireDate},
         job_id='${req.body.jobID}',
         salary=${req.body.salary},
         commission_pct=${req.body.commissionPCT},
         manager_id=${req.body.managerID}
         department_id=${req.body.departmentID}
         where employee_id =${req.params.employeeID}
         
         COMMIT`
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
