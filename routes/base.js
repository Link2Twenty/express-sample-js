export default class BaseRoute {
  constructor(path, router) {
    if (!path) {
      throw new Error('Path is required');
    }

    if (!router) {
      throw new Error('Router is required');
    }

    this.path = path;
    this.router = router;
    this.init();
  }

  /**
   * Initializes the route.
   */
  init() {
    // This method should be overridden in subclasses
    throw new Error('init() method must be implemented in subclass');
  }

  all(path, ...props) {
    this.router.all(`${this.path}${path}`, ...props);
  }

  get(path, ...props) {
    this.router.get(`${this.path}${path}`, ...props);
  }

  post(path, ...props) {
    this.router.post(`${this.path}${path}`, ...props);
  }

  put(path, ...props) {
    this.router.put(`${this.path}${path}`, ...props);
  }

  delete(path, ...props) {
    this.router.delete(`${this.path}${path}`, ...props);
  }

  patch(path, ...props) {
    this.router.patch(`${this.path}${path}`, ...props);
  }

  options(path, ...props) {
    this.router.options(`${this.path}${path}`, ...props);
  }

  head(path, ...props) {
    this.router.head(`${this.path}${path}`, ...props);
  }
}
