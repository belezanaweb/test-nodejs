import App from './App';

const app = new App();

if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
}

app.startApp(process.env.PORT || '3333');
