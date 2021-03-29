import { Router } from "express";
import { Connection } from "./db";
import { mentorsOnly } from "./middleware/mentorsOnly";
const router = new Router();
import validInfo from "./middleware/validInfo";
import authorization from "./middleware/authorization";
import exchangeCodeForGithubUser from "./utils/exchangeCodeForGithubUser";

router.get("/", (_, res, next) => {
  Connection.connect((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Hello, world!" });
  });
});

router.get("/", (_, res, next) => {
  Connection.connect((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Welcome to Knowledge Checklist" });
  });
});
// <---------------get endpoint to all learning Objectives in CalculateAverageScore ---------->

router.get("/abilities/:id", authorization, mentorsOnly, (req, res) => {
  const userId = Number(req.params.id);
  const queryLo = `select lo.id, lo.skill, description, ability, date_added, a.student_id  from learning_objective lo 
  left join achievements a on lo.id = a.learning_obj_id and a.student_id =$1
  where (a.student_id = $1 or a.student_id is null) order by lo.id;`;

  Connection.query(queryLo, [userId], (err, results) => {
    if (err) {
      console.log(err);
    }
    res.json(results.rows);
  });
});
//<--Get endpoint for learning objectives students view------------------>

router.get("/learningobjectives/:skill", authorization, (req, res) => {
  const skill = req.params.skill;

  const userId = req.session.user.id;

  const queryLo = `select lo.id, lo.skill, description, ability, date_added, a.student_id  from learning_objective lo 
  left join achievements a on lo.id = a.learning_obj_id and a.student_id = $2
  where lo.skill = $1 and (a.student_id = $2 or a.student_id is null) order by lo.id;`;

  Connection.query(queryLo, [skill, userId], (err, results) => {
    if (err) {
      console.log(err);
    }
    res.json(results.rows);
  });
});

//<------------Get mentors endpoint fo learning objectives in Editbox--------------->

router.get(
  "/learningobjectives/:skill",
  authorization,
  mentorsOnly,
  (req, res) => {
    let skill = req.params.skill;
    const queryLearningOb = `SELECT * FROM learning_objective  where skill = $1 order by id`;
    Connection.query(queryLearningOb, [skill], (err, results) => {
      if (!err) {
        res.json(results.rows);
      }
    });
  }
);

//<-------------------- get list of students for mentorview------------------------->

router.get("/students", authorization, mentorsOnly, async (req, res) => {
  const query = `select user_id, first_name, last_name from users where user_role = 'Student' order by first_name asc`;
  try {
    const results = await Connection.query(query);
    res.json(results.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

//<-------------------Edit end point from learning objective------------------------>
router.put(
  "/learningobjectives/:id",
  authorization,
  mentorsOnly,
  (req, res) => {
    let id = req.params.id;
    let description = req.body.description;
    Connection.query(
      "update learning_objective set description = $1 where id = $2 ",
      [description, id],
      function (err, results) {
        if (!err) {
          if (results.rowCount == 0) {
            res
              .status(404)
              .json(`Learning objective with the id: ${id} does not exist`);
          } else {
            res.json("Learing objective has been updated");
          }
        }
      }
    );
  }
);

//<------------------post endpoint for learning objective--------------------------->
router.post("/learningobjectives", authorization, mentorsOnly, (req, res) => {
  const { skill, description } = req.body;
  Connection.query(
    "INSERT INTO learning_objective (skill, description)" + "values($1, $2)",
    [skill, description],
    (err, results) => {
      if (!err) {
        res.json({
          message: "your data has been inserted",
          table: "Into the learning objective table",
        });
      }
    }
  );
});

//<-------------------------------Endpoint abilities Skills tracker.js------------------------------->

router.post("/abilities", authorization, async (req, res) => {
  const learning_obj_id = Number(req.body.learning_obj_id);
  const ability = req.body.ability;
  const student_id = req.session.user.id;
  const querySelect = `SELECT * from achievements where learning_obj_id = $1 
                       and student_id = $2  `;
  const queryPost = `INSERT INTO achievements (ability, learning_obj_id, student_id)
                     values($1, $2, $3)`;

  const queryUpdate = `update achievements set  ability= $1
                      where learning_obj_id = $2 and student_id =$3`;

  const results = await Connection.query(querySelect, [
    learning_obj_id,
    student_id,
  ]);

  if (results.rowCount > 0) {
    await Connection.query(queryUpdate, [ability, learning_obj_id, student_id]);
    res.json("updated");
  } else {
    await Connection.query(queryPost, [ability, learning_obj_id, student_id]);
    res.json("inserted");
  }
});

//<-------------------Delete end point from learning objective---------------------->
router.delete(
  "/learningobjectives/:id",
  authorization,
  mentorsOnly,
  (req, res) => {
    const id = Number(req.params.id);
    Connection.query(
      "delete from achievements where learning_obj_id = $1",
      [id],
      (err, results) => {
        if (!err) {
          Connection.query(
            "delete from learning_objective where id =$1",
            [id],
            (err, results) => {
              if (!err) {
                res.json({
                  message: `The learning objective with the id: ${id} has been deleted`,
                  table: "From learning objective",
                });
              } else {
                res.json("Id not found");
              }
            }
          );
        }
      }
    );
  }
);

//<------------------------Post request for signup form----------------------------->

router.post("/register", validInfo, async (req, res) => {
  const {
    firstName,
    lastName,
    userRole,
    userEmail,
    userSlack,
    userGithub,
    userClassId,
    cyfCity,
  } = req.body;

  try {
    const user = await Connection.query(
      "SELECT * FROM users WHERE github_id = $1",
      [req.session.githubId]
    );
    if (user.rows.length !== 0) {
      return res.status(401).json({ error: "User already exist!" });
    }

    let newUser = await Connection.query(
      "INSERT INTO users (first_name, last_name, user_role,user_email,github_id,user_slack,user_github,class_id, cyf_city)" +
        " VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *",
      [
        firstName,
        lastName,
        userRole,
        userEmail,
        req.session.githubId,
        userSlack,
        userGithub,
        userClassId,
        cyfCity,
      ]
    );

    req.session.user = {
      id: newUser.rows[0].user_id,
      role: newUser.rows[0].user_role,
      name: newUser.rows[0].first_name,
    };

    res.json({
      message: "Registered",
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).send({ error: "Server error" });
  }
});

///github authorization

router.get("/githubAuth", async (req, res) => {
  const {
    id: githubId,
    login: githubUserName,
  } = await exchangeCodeForGithubUser(req.query.code);
  try {
    const user = await Connection.query(
      "select * from users where github_id=$1",
      [githubId]
    );

    if (user.rows.length === 0) {
      req.session.githubId = githubId;
      const params = new URLSearchParams({
        githubUserName,
        githubId,
      }).toString();

      res.redirect(`/signup?${params}`);
      return;
    }

    req.session.user = {
      id: user.rows[0].user_id,
      name: user.rows[0].first_name,
      role: user.rows[0].user_role,
    };

    res.redirect(
      req.session.user.role === "Student" ? "/skills" : "/MentorsView"
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("server error auth");
  }
});

router.get("/verify", authorization, async (req, res) => {
  try {
    res.set("cache-control", "no-store");
    res.json(req.session.user);
  } catch (err) {
    console.error("error", err.message);
    res.status(500).send("Server error");
  }
});
//Logout
router.all("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

//callback github link

router.get("/github-client-id", (req, res) => {
  res.json({
    github_client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
  });
});
export default router;
