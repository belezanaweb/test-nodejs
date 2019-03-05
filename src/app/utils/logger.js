const Reset = '\x1b[0m';

const FgRed = '\x1b[31m';
const FgGreen = '\x1b[32m';
const FgYellow = '\x1b[33m';

const BgBlack = '\x1b[40m';

const error = (message) => {
  console.log(BgBlack + FgRed + message + Reset);
};

const success = (message) => {
  console.log(FgGreen + message + Reset);
};

const warning = (message) => {
  console.log(FgYellow + message + Reset);
};

module.exports = {
  error: error,
  success: success,
  warning: warning,
};
