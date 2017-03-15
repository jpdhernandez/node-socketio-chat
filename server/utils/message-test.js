const expect = require("expect");
const {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
  it("should generate the correct message object", () => {
    const message = generateMessage("Julian", "Hello!");
    expect(message.from).toBe("Julian");
    expect(message.text).toBe("Hello!");
    expect(message.createdAt).toBeA("number");
  });
});


describe("generateLocationMessage", () => {
  it("should generate the correct location object", () => {
    const message = generateLocationMessage("LocationMan", 1, 2);
    expect(message.from).toBe("LocationMan");
    expect(message.url).toBe("https://www.google.com/maps?q=1,2");
    expect(message.createdAt).toBeA("number");
  });
});