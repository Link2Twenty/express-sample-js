import BaseRoute from './base.js';

const { DEMO_KEY } = Object.assign({ DEMO_KEY: 'DEMO_KEY' }, process.env);

/**
 * Astronomy Picture of the Day (APOD) route.
 */
class ApodRoute extends BaseRoute {
  /**
   * Creates an instance of the ApodRoute class.
   *
   * @param {object} router - The Express router instance.
   */
  constructor(router) {
    super('/apod', router);
  }

  init() {
    this.get('/list/:count', this.getApod);
    this.get('/image', this.getRandomImage);
  }

  /**
   * @catogory API
   * @summary GET ./apod/list/:count
   * @desc Retrieves the Astronomy Picture of the Day (APOD).
   *
   * @param {string} req.params.count - The number of APOD entries to retrieve.
   *
   * @returns 200 - Success - Returns an object with 'data' and 'error' properties.
   * @returns 500 - Internal Server Error - An error occurred while processing the request.
   *
   * @example Request:
   * GET http://localhost:5000/apod/list/1
   *
   * @example Success response:
   * {
   *  "data": [
   *    {
   *      "title": "Galaxy Wars: M81 versus M82",
   *      "explanation": "In this stunning cosmic vista, galaxy M81 is on the left surrounded by blue spiral arms.  On the right marked by massive gas and dust clouds, is M82.  These two mammoth galaxies have been locked in gravitational combat for the past billion years.   The gravity from each galaxy dramatically affects the other during each hundred million-year pass.  Last go-round, M82's gravity likely raised density waves rippling around M81, resulting in the richness of M81's spiral arms.  But M81 left M82 with violent star forming regions and colliding gas clouds so energetic the galaxy glows in X-rays.  In a few billion years only one galaxy will remain.",
   *      "hdurl": "https://apod.nasa.gov/apod/image/0604/M81_M82_schedler_c80.jpg",
   *      "copyright": "Panther Observatory",
   *      "date": "2006-04-15",
   *    },
   *  ],
   *  "error": null
   * }
   *
   * @example Error response:
   * {
   *  "data": null,
   *  "error": "An error occurred."
   * }
   */
  async getApod(req, res) {
    const { count } = req.params;

    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${DEMO_KEY}&count=${count}`);

    const json = await response.json();

    // validate the response
    if (!response.ok) throw new Error(response.statusText);
    if (!json || !Array.isArray(json)) throw new Error('Invalid response format.');
    if (json.length === 0) throw new Error('No data found.', { cause: { status: 404 } });

    // transform the data to match the expected format
    const data = json.map((item) => ({
      title: item.title,
      explanation: item.explanation,
      hdurl: item.hdurl,
      copywrite: item.copyright,
      date: item.date
    }));

    res.json({ data, error: null });
  }

  /**
   * @category API
   * @summary GET ./apod/image
   * @desc Retrieves a random image from the Astronomy Picture of the Day (APOD).
   *
   * @returns 200 - Success - Returns the image stream.
   * @returns 500 - Internal Server Error - An error occurred while processing the request.
   *
   * @example Request:
   * GET http://localhost:5000/apod/image
   */
  async getRandomImage(req, res) {
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${DEMO_KEY}&count=1`);

      const json = await response.json();

      // validate the response
      if (!response.ok) throw new Error(response.statusText);
      if (!json || !Array.isArray(json)) throw new Error('Invalid response format.');
      if (json.length === 0) throw new Error('No data found.', { cause: { status: 404 } });

      const imageResponse = await fetch(json[0].hdurl);

      if (!imageResponse.ok) throw new Error(imageResponse.statusText);

      const imageBuffer = await imageResponse.arrayBuffer();

      // Set the content type
      res.setHeader('Content-Type', imageResponse.headers.get('content-type'));

      // Send the buffer to the client
      res.send(Buffer.from(imageBuffer));
    } catch (error) {
      if (!error?.cause?.status) console.error(error.stack);

      res.status(500).send('An error occurred.');
    }
  }
}

export default ApodRoute;
