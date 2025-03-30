import BaseRoute from './base.js';

/**
 * @module routes:testCrud
 * @description Test CRUD route.
 */

export default class TestCrudRoute extends BaseRoute {
  constructor(router) {
    super('/test-crud', router);
  }

  init() {
    this.get('/test/:id', this.getAll);
    this.post('/test', this.testPost);
  }

  /**
   * @member
   *
   * @summary GET ./test-crud/test/:id
   * @desc Retrieves data for a test based on its ID.
   *
   * @param {string} req.params.id - The ID of the test to retrieve.
   *
   * @returns 200 - Success - Returns an object with 'data' and 'error' properties.
   * @returns 404 - Not Found - Test not found.
   * @returns 500 - Internal Server Error - An error occurred while processing the request.
   *
   * @example Request:
   * GET http://localhost:5000/test-crud/test/123
   *
   * @example Success response:
   * {
   *  "data": "string",
   *  "error": null
   * }
   *
   * @example Error response:
   * {
   *   "data": null,
   *   "error": "Not found."
   * }
   */
  getAll(req, res) {
    const { id } = req.params;

    if (Math.random() > 0.7) throw new Error('Test error', { cause: { status: 404, message: 'Not found.' } });

    res.json({ data: id, error: null });
  }

  /**
   * @member
   *
   * @summary POST ./test-crud/test
   * @desc Creates a new test.
   *
   * @param {string} req.body.id - The ID of the test to create.
   *
   * @returns 200 - Success - Returns an object with 'data' and 'error' properties.
   * @returns 404 - Not Found - Test not found.
   * @returns 500 - Internal Server Error - An error occurred while processing the request.
   *
   * @example Request:
   * POST http://localhost:5000/test-crud/test
   *
   * @example Request body:
   * {
   *  "id": "123"
   * }
   *
   * @example Success response:
   * {
   *  "data": "string",
   *  "error": null
   * }
   *
   * @example Error response:
   * {
   *   "data": null,
   *   "error": "Not found."
   * }
   */
  testPost(req, res) {
    const { id } = req.body || {};

    if (!id) throw new Error('Missing id from body', { cause: { status: 400 } });

    if (Math.random() > 0.7) throw new Error('Not found', { cause: { status: 404 } });

    res.json({ data: id, error: null });
  }
}
