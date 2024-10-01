const request = require("supertest");
import express, { Request, Response } from "express";
import { app } from "../src/index";

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
  it.only("user by id", () => {
    return request(app)
      .get("/api/users/Martin123")
      .expect(200)
      .then((res: any) => {
        expect(res.body.name).toBe("Martine");
      });
  });
});
