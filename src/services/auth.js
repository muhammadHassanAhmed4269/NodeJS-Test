const { isNotFound } = require("entity-checker");
const sendResponse = require("../utilities/send-response");

class AuthServices {
  constructor(repository) {
    this.repository = repository;
  }

  async authRegistration(req, res) {
    try {
      const { username, email, password } = req.body;
      const existingUser = await this.repository.findOne({
        $or: [{ email }, { username }],
      });
      if (isNotFound(existingUser)) {
        const formData = { username, email, password };
        const newUser = await this.repository.create(formData);
        return sendResponse(res, 201, "User registered successfully", newUser);
      }
      return sendResponse(res, 409, "User already exists");
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = AuthServices;
