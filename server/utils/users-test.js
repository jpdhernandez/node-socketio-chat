const expect = require("expect");
const {Users} = require("./users");

describe("Users", () => {
  let users = [];

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: "1",
      name: "Julian",
      room: "Meditation"
    }, {
      id: "2",
      name: "James",
      room: "Philisophy"
    }, {
      id: "3",
      name: "John",
      room: "Philisophy"
    }, {
      id: "4",
      name: "Leo",
      room: "Meditation"
    }];
  });

  it("should add a new user", () => {
    const users = new Users();
    const user = {
      id: "testId",
      name: "Philip",
      room: "Bodybuilding"
    };
    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it("should remove a user", () => {
    const userToBeRemoved = users.users[3];
    const id = "4";
    const removedUser = users.removeUser(id);

    expect(removedUser).toInclude(userToBeRemoved);
    expect(users.users.length).toBe(3);
  });
  
  it("should not remove a user", () => {
    const id = "5";
    const emptyArray = [];
    const removedUser = users.removeUser(id);

    expect(removedUser).toEqual(emptyArray);
    expect(users.users.length).toBe(4);
  });
  
  it("should find a user", () => {
    const id = "1";
    const user = users.getUser(id);

    expect(user).toEqual(users.users[0]);
  });
  
  it("should not find a user", () => {
    const id = "5";
    const user = users.getUser(id);

    expect(user).toNotExist();
  });

  it("should return names who joined the Meditation room", () => {
    const userList = users.getUserList("Meditation");

    expect(userList).toEqual(["Julian", "Leo"]);
  });

  it("should return names who joined the Philisophy room", () => {
    const userList = users.getUserList("Philisophy");

    expect(userList).toEqual(["James", "John"]);
  });
});