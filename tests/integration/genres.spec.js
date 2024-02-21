const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");
const request = require("supertest");
let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(() => {
    server.close();
  });
  describe("GET /", () => {
    it("should get the list of genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
        { name: "genre3" },
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      await Genre.remove({});
    });
  });
  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
      await Genre.remove({});
    });
  });
  describe("GET /:id", () => {
    it("Should return 404 if invalid ID is passed", async () => {
      const res = await request(server).get("/api/genre/1");
      expect(res.status).toBe(404);
    });
  });
  describe("POST /", () => {
    it("should return a 401 if client is not logged in", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "genre1" });
      expect(res.status).toBe(401);
    });
  });
  describe("POST /", () => {
    it("should return 400 if the genre is less than 5 character", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "1234" });

      expect(res.status).toBe(400);
    });
  });
  describe("POST /", () => {
    it("should return 400 if the genre is more than 50 characters", async () => {
      const token = new User().generateAuthToken();

      const name = new Array(52).join("a");

      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: name });

      expect(res.status).toBe(400);
    });
  });
});
