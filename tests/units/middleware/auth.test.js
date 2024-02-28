const auth = require("../../../middleware/auth");
const { User } = require("../../../models/user");

describe("auth middleware", () => {
  it("should populate req.user with the payload of a valid JWT", () => {
    const token = new User().generateAuthToken();
    const res = {};
    const next = jest.fn();
    const req = { header: jest.fn().mockReturnValue(token) };
    auth(req, res, next);

    expect(req.user).toBeDefined();
  });
});
