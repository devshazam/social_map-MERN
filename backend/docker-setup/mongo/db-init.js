db.createUser({
  user: "qwerty",
  pwd: "1029384756",
  roles: [
    {
      role: "readWrite",
      db: "davseloc",
    },
  ],
});
