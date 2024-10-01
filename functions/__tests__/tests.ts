const request = require("supertest");
import express, { Request, Response } from "express";
import { app } from "../src/index";
interface ApiResponse{ body: {
      data :  any;
    }
  }








describe("POST /api/users/newuser", () => {
  it("create a new user", () => {
    return request(app)
      .post("/api/users/newuser")
      .send({ username: `Carmen667`, name: "Carmen" })
      .expect(201)
      .then((res: any) => {
        expect(res.body.name).toBe("Carmen");
      });
  });
});
describe("get /api/users/:username", () => {
  it("user by id", () => {
    return request(app)
      .get("/api/users/Martin123")
      .expect(200)
      .then((res: any) => {
        expect(res.body.name).toBe("Martine");
      });
  });
});

describe("POST /api/users/:username/books", () => {
  it("posting 1 book info", () => {
    return request(app)
      .post("/api/users/joshua2410/books")
      .send( {
        "etag" :	"vopKxGlXTE8",
    "title": "Harry Potter and the Chamber of Secrets",
    "authors": [
      "J.K. Rowling"
    ],
    "publisher": "Pottermore Publishing",
    "publishedDate": "2015-12-08",
    "description": "\u003cp\u003e\u003ci\u003e'There is a plot, Harry Potter. A plot to make most terrible things happen at Hogwarts School of Witchcraft and Wizardry this year.'\u003c/i\u003e\u003cbr\u003e\u003cbr\u003eHarry Potter's summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft and Wizardry for his second year, Harry hears strange whispers echo through empty corridors - and then the attacks start. Students are found as though turned to stone... Dobby's sinister predictions seem to be coming true.\u003cbr\u003e\u003cbr\u003e\u003cbr\u003e\u003ci\u003eHaving become classics of our time, the Harry Potter eBooks never fail to bring comfort and escapism. With their message of hope, belonging and the enduring power of truth and love, the story of the Boy Who Lived continues to delight generations of new readers.\u003c/i\u003e\u003c/p\u003e",
    "industryIdentifiers": [
      {
        "type": "ISBN_10",
        "identifier": "1781100500"
      },
      {
        "type": "ISBN_13",
        "identifier": "9781781100509"
      }
    ],
    "readingModes": {
      "text": true,
      "image": true
    },
    "pageCount": 341,
    "printedPageCount": 344,
    "printType": "BOOK",
    "categories": [
      "Juvenile Fiction / Action & Adventure / General",
      "Juvenile Fiction / Fantasy & Magic",
      "Young Adult Fiction / Action & Adventure / General",
      "Young Adult Fiction / Fantasy / Wizards & Witches",
      "Young Adult Fiction / School & Education / Boarding School & Prep School",
      "Young Adult Fiction / Fantasy / Contemporary",
      "Young Adult Fiction / Fantasy / General",
      "Juvenile Fiction / Family / General",
      "Fiction / Action & Adventure",
      "Fiction / Fantasy / General",
      "Juvenile Fiction / School & Education"
    ],
    "averageRating": 4.5,
    "ratingsCount": 116,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": true,
    "contentVersion": "3.27.24.0.preview.3",
    "panelizationSummary": {
      "containsEpubBubbles": false,
      "containsImageBubbles": false
    },
    "imageLinks": {
      "smallThumbnail": "http://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72aaFrCXLSJRlzzPzsNOBj5FUDEW_qAeIMypARFxI1IcfjV_6ulo0eIMGqy0d8daXrQLED4ajns4l8XrvzJUz1IAIpiMYAJHRxlmenhiqFNwjQwLFQIBsb6PzdT1QvZ7BNHmKdj&source=gbs_api",
      "thumbnail": "http://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70sRzVIp8echD6sEjUxi3Dryqvez-BaHvzULulQ8rqBzP_SJ7A8xwgkj778BtmTvxCe8ozN2gFZ5CmnqYKSE0DULX4bSQz6hk_Hq036N4uZh7Y1mBAmu46egHt1e_4Vugx8-AEz&source=gbs_api",
      "small": "http://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE71HRJXanqyjZOyQ7HZp1di-PUOo8E_6UPOJeIkBYWXAaHtx4edd6o57bSTC9gF4sjI_DA7ybQril9YyEYWnUI4KiChxByZhSgih_svy417JekyZgYTGM80o7XC5ZNkORLrn3gSR&source=gbs_api",
      "medium": "http://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE71JgU2EP9eJ2KFe9vMDGpZWDCGVqbW91AUbwSPLJnYLRzR98uNhjL7SVrs1jJf-zHaSSGtqBfIYbKYb9aAzZXArELFvaOJecX1_kZyvFTExfeZ-ubD5KLpQX0oDuqozAGoylhPv&source=gbs_api",
      "large": "http://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE73IC2ETdtZtkYGmX_OUHgbHkMucwMqLoTS-8XDs6xs7LkrrP-8Zy1clskfHc964iD6WedfPHDbIH2lrK9pq5GibtCnmx22QJ01aJFsLO7HJVn5jUXwiQNNhizPeROUDo5QL-4MC&source=gbs_api",
      "extraLarge": "http://books.google.com/books/content?id=5iTebBW-w7QC&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE73fIaCmnENMZksZ-CsMtM1Hwtj5opwJnfjq71yQBDfLtv7Hx1KcM03tTYZHiHBmhlB9tAJDZPJeGQqZTtMpoXkjQ0nQPf9rpqQDGm7ZpNCYpr1MxNSLUdogpkleUp5qFza3pG8w&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com/books?id=5iTebBW-w7QC&hl=&source=gbs_api",
    "infoLink": "https://play.google.com/store/books/details?id=5iTebBW-w7QC&source=gbs_api",
    "canonicalVolumeLink": "https://play.google.com/store/books/details?id=5iTebBW-w7QC"
  })
      .expect(201)
      .then((res: any) => {
        expect(res.body.title).toBe("Harry Potter and the Chamber of Secrets");
      });
  })
})

describe.only("get /api/users/:username/books", () => {
  it("all books by username", () => {
    return request(app)
      .get("/api/users/joshua2410/books")
      .expect(200)
      .then((res: any) => {
        console.log(res.body)
        expect(Array.isArray(res.body)).toBe(true);
      });
  });
});