const connection = require('./connection');

const getNewUser = (userData) => {
  const { id, firstName, lastName, email, password } = userData;

  const fullName = [firstName, lastName].join(' ');

  return {
    id,
    name: fullName,
    email,
    password,
  };
};

const findByEmail = async (emailParam) => {
  return connection()
    .then((session) => session.getSchema('cookmaster'))
    .then((db) => (
      db
        .getTable('users')
        .select(['id', 'first_name', 'last_name', 'email', 'password'])
        .where('email = :email')
        .bind('email', emailParam)
        .execute()
    ))
    .then((results) => results.fetchAll())
    .then((users) => (
      users.map(([id, firstName, lastName, email, password]) =>
        getNewUser({ id, firstName, lastName, email, password }),
      )[0]
    ));
};

const findById = async (idParam) => {
  return connection()
    .then((session) => session.getSchema('cookmaster'))
    .then((db) => (
      db
        .getTable('users')
        .select(['id', 'first_name', 'last_name', 'email', 'password'])
        .where('id = :id')
        .bind('id', idParam)
        .execute()
    ))
    .then((results) => results.fetchAll())
    .then((users) => (
      users.map(([id, firstName, lastName, email, password]) =>
        getNewUser({ id, firstName, lastName, email, password }),
      )[0]
    ));
};

const registerNewUser = async (userData) => {
  const { email, password, firstName, lastName } = userData;

  return connection()
    .then((session) => session.getSchema('cookmaster'))
    .then((db) => (
      db
        .getTable('users')
        .insert(['first_name', 'last_name', 'email', 'password'])
        .values([firstName, lastName, email, password])
        .execute()
    ));
};

module.exports = {
  findByEmail,
  findById,
  registerNewUser,
};
