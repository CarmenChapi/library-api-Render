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

exports.newBookLibrary = (book: any, username: string) => {
  console.log( book.etag, typeof book.etag)
  console.log("we made it!!")
  return db
  .collection("users")
  .doc(username)
  .collection("books")
  .doc(book.industryIdentifiers[0].identifier)
  .set(book)
  .then(() => {
    return db
    .collection("users") 
    .doc(username)
    .collection("books")
    .doc(book.industryIdentifiers[0].identifier)
    .get()
      .then((book) => {
        return book.data();
      })
      
  });
}

exports.fetchBooksById =(username: string) => {
  return db
    .collection("users")
    .doc(username)
    .collection("books")
    .get()
    .then((books : any) => {
      const bookArray : any[]= []
      books.forEach((book : any) => {
        bookArray.push(book.data())
      })
      return bookArray;
    });
};