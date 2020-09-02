# sketch-drawing-ml

In development:
`npm install`
`npm start`

In production:
`npm install --production`
`npm run build && npm run prod`

`http://localhost:3000` serves an index.html file with canvas.
`http://localhost:3000/upload` is used for image upload. Images are saved to `/uploads` directory.
The response is sent back after a JSON file with image URLs is created in `/data` dir.
