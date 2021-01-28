const oracledb = require("oracledb");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

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
      var sql = `UPDATE employees SET first_name='${
        req.body.firstName
      }', last_name='${req.body.lastName}', email='${
        req.body.email
      }', phone_number='${req.body.phoneNumber}', job_id='${
        req.body.jobID
      }', manager_id=${req.body.managerID}, salary=${
        req.body.salary
      }, commission_pct=${+req.body.commissionPCT}, department_id=${
        req.body.departmentID
      } WHERE employee_id=${req.params.employeeID}`;
      console.log({ sql });
      result = await connection.execute(sql);

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
  deleteEmployee: async function addEmployee(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: process.env.USER,
        password: process.env.PASSWORD,
        connectString: process.env.CONNECT_STRING,
      });

      //
      console.log("connected to database");
      // run query to get all employees
      var sql1 = `alter table departments disable constraint DEPT_MGR_FK`;
      console.log({ sql1 });
      result = await connection.execute(sql1);
      var sql2 = `alter table employees disable constraint EMP_MANAGER_FK`;
      console.log({ sql2 });
      result2 = await connection.execute(sql2);
      var sql3 = `DELETE FROM employees WHERE employee_id = ${req.params.employeeID}`;
      result3 = await connection.execute(sql3);
      console.log(result3);
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
  addEmployee: async function addEmployee(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: process.env.USER,
        password: process.env.PASSWORD,
        connectString: process.env.CONNECT_STRING,
      });

      //
      console.log("connected to database");
      // run query to get all employees
      var sql = `INSERT INTO employees (EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, HIRE_DATE, JOB_ID, SALARY, COMMISSION_PCT, MANAGER_ID, DEPARTMENT_ID) VALUES(${req.body.employeeID}, '${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.phoneNumber}', '94/06/07', '${req.body.jobID}', ${req.body.salary}, ${req.body.commissionPCT}, ${req.body.managerID}, ${req.body.departmentID})`;
      console.log({ sql });
      result = await connection.execute(sql);

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
