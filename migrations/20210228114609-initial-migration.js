"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  const userPromise = db.createTable("users", {
    user_id: { type: "int", primaryKey: true, autoIncremen: true },
    first_name: { type: "string", notNull: true, length: 255 },
    last_name: { type: "string", notNull: true, length: 255 },
    user_role: { type: "string", notNull: true, length: 255 },
    user_email: { type: "string", notNull: true, length: 255, unique: true },
    user_slack: { type: "string", length: 255 },
    user_github: { type: "string", length: 255 },
    cyf_city: { type: "string", notNull: true, length: 255 },
    class_id: { type: "int", notNull: true },
    github_id: { type: "int", notNull: true, unique: true },
  });

  const learningObjectivePromise = db.createTable("learning_objective", {
    id: { type: "int", primaryKey: true, autoIncremen: true },
    skill: { type: "string", notNull: true, length: 255 },
    description: { type: "string", notNull: true, length: 255 },
  });

  const achievementsPromise = db.createTable("achievements", {
    id: { type: "int", primaryKey: true, autoIncremen: true },
    student_id: {
      type: "int",
      foreignKey: {
        name: "users_id_achievements_student_id_fk",
        table: "users",
        rules: {
          onDelete: "CASCADE",
        },
        mapping: {
          student_id: "user_id",
        },
      },
    },
    learning_obj_id: {
      type: "int",
      foreignKey: {
        name: "learning_obj_id_achievements_learning_ id_fk",
        table: "learning_objective",
        rules: {
          onDelete: "CASCADE",
        },
        mapping: {
          learning_obj_id: "id",
        },
      },
    },

    ability: { type: "int" },

    date_added: {
      type: "date",
      notNull: true,
      defaultValue: new String("current_date"),
    },
  });

  return Promise.all([
    userPromise,
    learningObjectivePromise,
    achievementsPromise,
  ]);
};

exports.down = function (db) {
  const userPromise = db.dropTable("users");
  const learningObjectivePromise = db.dropTable("learning_objective");
  const achievementsPromise = db.dropTable("achievements");

  return Promise.all([
    userPromise,
    learningObjectivePromise,
    achievementsPromise,
  ]);
};

exports._meta = {
  version: 1,
};
