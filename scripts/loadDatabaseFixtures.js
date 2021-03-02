require("dotenv").config();
const { config } = require("../server/db");
const fs = require("fs");
const path = require("path");
const pgp = require("pg-promise")({
  capSQL: true, // generate capitalized SQL
});

const getFixtures = () => {
  let jsonData = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../db_data/learningOjectiveData.json")
    )
  );

  return jsonData;
};

const loadFixturesToDb = () => {
  const db = pgp(config);
  const cs = new pgp.helpers.ColumnSet(["id", "skill", "description"], {
    table: "learning_objective",
  });
  let data = getFixtures();
  const insert = pgp.helpers.insert(data, cs);
  const update =
    ' ON CONFLICT ON CONSTRAINT "learning_objective_pkey" DO UPDATE SET skill = excluded.skill, description = excluded.description';
  db.none(insert + update)
    .then(() => {
      console.log("success");
    })
    .catch((error) => {
      console.log(error);
    });
  //let queryString = `insert into learning_objective(id, skill, description) values ?`;
  //   let refineData = data
  //     .map((x) => `(${x.id}, '${x.skill}', '${x.description}')`)
  //     .join(",");
};
if (require.main === module) {
  loadFixturesToDb();
}
