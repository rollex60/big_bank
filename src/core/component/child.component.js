export default class ChildComponent {
  /**
   * Render the child component content.
   * @return {HTMLElement}
   */
  render() {
    throw new Error('Render method must be implemented in the child class.')
  }
}