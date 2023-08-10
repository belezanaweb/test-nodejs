export function healthcheck() {
  if (Math.floor(process.uptime()) === 0) {
    throw new Error("Server isn't running");
  }

  return {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
}
