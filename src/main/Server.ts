// tslint:disable: no-console
import app from './App';

const host = app.get('host');
const port = app.get('port');

app.listen(port, host, () => {
    console.log(`\nServer running at: http://${host}:${port} in ${process.env.ENVIRONMENT || 'local'} mode 🚀`);
    console.log(`You can access the api documentation at: http://${host}:${port}/docs\n`);
});
