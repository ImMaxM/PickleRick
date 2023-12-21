import logger from "pino";

const log = logger({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      ignore: "pid,hostname",
      translateTime: "yyyy-mm-dd HH:MM:ss",
    },
  },
});

export default log;
