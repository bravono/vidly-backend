const auth = require("../../../middleware/auth");
const { User } = require("../../../models/user");
const mongoose = require("mongoose");

describe("auth middleware", () => {
  it("should populate req.user with the payload of a valid JWT", () => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const token = new User(user).generateAuthToken();
    const res = {};
    const next = jest.fn();
    const req = { header: jest.fn().mockReturnValue(token) };
    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});
