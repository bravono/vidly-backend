const { describe } = require("joi/lib/types/lazy");
const { Genre } = require("../../models/genre");
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

  describe("GET/:id", async () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });

      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });
  });
});
