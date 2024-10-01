import { db } from "../connection";

exports.newUser = (userData: any) => {
  return db
    .collection("users")
    .doc(userData.username)
    .create({ name: userData.name, friends: [], friendRequests: [] })
    .then(() => {
      return db
        .collection("users")
        .doc(userData.username)
        .get()
        .then((user) => {
          return user.data();
        });
    });
};

exports.fetchUserById = (id: string) => {
  return db
    .collection("users")
    .doc(id)
    .get()
    .then((user) => {
      console.log(user);
      console.log(user.data());
      return user.data();
    });
};
