import Logger from "./Logger";

describe("Logger", () => {
  it("should instanciate", () => {
    const logger = new Logger("test");
    expect(logger).toBeDefined();
  });
  it("should have methods", () => {
    const logger = new Logger("test");
    expect(logger.emerg).toBeDefined();
    expect(logger.alert).toBeDefined();
    expect(logger.crit).toBeDefined();
    expect(logger.error).toBeDefined();
    expect(logger.warning).toBeDefined();
    expect(logger.notice).toBeDefined();
    expect(logger.info).toBeDefined();
    expect(logger.debug).toBeDefined();
  });

  it("should parse object", () => {
    const logger = new Logger("test");
    const parsedResult = '{"test":"123"}wow';
    const result = logger.parseObject("wow", { test: "123" });
    expect(result).toEqual(parsedResult);
  });

  it("should set correctly parser", () => {
    const logger = new Logger("test");

    function parser(object) {
      return `${object.info}${object.data}`;
    }

    logger.setFormat(parser);

    const testObject = {
      info: "wow",
      data: "123"
    };

    expect(logger.parseObject("inputstring", testObject)).toEqual(
      "wow123inputstring"
    );
  });
});
