class AuthControllers {
  constructor(service) {
    this.service = service;
  }

  async authRegistration(req, res) {
    try {
      return await this.service.authRegistration(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = AuthControllers;
