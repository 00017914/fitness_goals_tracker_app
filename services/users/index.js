module.exports = {
    getAllUsers: async () => {
      return [{ id: 1, name: "Test User" }];
    },
    createUser: async (userData) => {
      console.log("User created:", userData);
    },
    getUserById: async (id) => {
      return { id, name: "Test User" };
    }
  };
  