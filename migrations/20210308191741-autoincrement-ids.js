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
  const columnPromise = db.addColumn("users", "cyf_city", {
    type: "string",
    notNull: true,
    length: 255,
  });
  const renamePromise = db.renameColumn("users", "user_githib", "user_github");

  return Promise.all([columnPromise, renamePromise]);
};

exports.down = function (db) {
  const columnPromise = db.removeColumn("users", "cyf_city");
  const renamePromise = db.renameColumn("users", "user_github", "user_githib");

  return Promise.all([columnPromise, renamePromise]);
};

exports._meta = {
  version: 1,
};
