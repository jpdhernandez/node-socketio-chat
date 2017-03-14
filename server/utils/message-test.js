const expect = require("expect");
const {generateMessage} = require("./message");

describe("generateMessage", () => {
  it("should generate the correct message object", () => {
    const message = generateMessage("Julian", "Hello!");
    expect(message.from).toBe("Julian");
    expect(message.text).toBe("Hello!");
    expect(message.createdAt).toBeA("number");
  });
});