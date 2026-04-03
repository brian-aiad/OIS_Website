/** Fire this to open the Quotzal modal from anywhere */
export function openQuoteModal() {
  window.dispatchEvent(new Event("openQuoteModal"));
}
