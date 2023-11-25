// postImage.steps.js

const { Given, When, Then } = require('cucumber');
import { postImage } from '../../src/routers/image/post';

let req;
let res;

Given('the request body with title {string}', (title) => {
  req = {
    body: { title },
    files: {
      file: {
        data: Buffer.from('test image data'),
        mimetype: 'image/jpeg',
      },
    },
  };
});

Given('a file with image data and MIME type {string}', (mimetype) => {
  req.files.file.mimetype = mimetype;
});

Given('the Image model save method throws an error', () => {
  const originalSave = Image.prototype.save;
  Image.prototype.save = jest.fn().mockRejectedValue(new Error('Test error'));

  // Restore the original save method after the scenario
  afterAll(() => {
    Image.prototype.save = originalSave;
  });
});

When('the postImage function is called', async () => {
  res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };

  await postImage(req, res);
});

Then('it should respond with status {int}', (status) => {
  expect(res.status).toHaveBeenCalledWith(status);
});

Then('the response should contain the image with title {string}', (title) => {
  expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ imageTitle: title }));
});

Then('the response should contain an error message', () => {
  expect(res.send).toHaveBeenCalledWith({
    msg: 'No se añadió correctamente la imagen',
    error: expect.any(Error),
  });
});
