class User {
    constructor(id, email, password) {
      this.id = id;
      this.email = email;
      this.password = password;
    }
  }
  
  // A mock user database for demonstration purposes
  const users = [
    // Add mock user objects here
  ];
  
  module.exports = { User, users };