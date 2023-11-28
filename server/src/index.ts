import { app } from './app.js';

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});





// const port = 8081;
// const host = '10.6.128.69';

// app.listen(port, host, () => {
//   console.log(`Server started at http://${host}:${port}`);
// });