import { NextFunction } from "express";
import express, { Request, Response } from "express";
import { object } from "firebase-functions/v1/storage";

const { newUser, fetchUserById } = require("../Models/usersModels");

exports.postUser = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  console.log("you made it");
  newUser(body)
    .then((newUser: object) => {
      res.status(201).send(newUser);
    })
    .catch((err: any) => {
      console.log(err);
      next(err);
    });
};

exports.getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params;
  fetchUserById(username)
    .then((user: object) => {
      res.status(200).send(user);
    })
    .catch((err: any) => {
      console.log(err);
      next(err);
    });
};
