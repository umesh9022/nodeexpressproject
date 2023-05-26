//const express = require("express");
import express from 'express';

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/diligentic1", (req, res) => {
  res.send("Hello World! diligentic 1");
});

app.get("/diligentic2", (req, res) => {
  res.send("Hello World! diligentic 2");
});

app.get("/post", (req, res) => {
  res.send("Hello World! diligentic ok boss3");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
