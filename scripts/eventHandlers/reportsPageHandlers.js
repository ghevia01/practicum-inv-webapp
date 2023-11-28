import { reportsPageBackButton } from "../utils/reportsPageElements.js";
import { navigateToIndexPage } from "../utils/navigationUtils.js";

export function handleReportsPageEvents() {
  // Handle navigation back to the index page
  reportsPageBackButton.addEventListener("click", navigateToIndexPage);
}