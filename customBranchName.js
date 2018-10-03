// ==UserScript==
// @name         Bitbucket: Custom branch name
// @version      1.1
// @match        https://bitbucket.org/branch/create*
// @grant        none
// ==/UserScript==

(function() {
  "use strict";
  const issueKey = (window.location.href.match(/\?issueKey=([^&amp;]+)/) ||
    [])[1];
  const issueType = (window.location.href.match(/&issueType=([^&]+)&/) ||
    [])[1];
  const branchNameInput = document.getElementsByName("branchName")[0];
  const issueSummary = (branchNameInput.value.match(/[^-]+-\d+-(.*)/) || [])[1];

  let type = "";
  let key = issueKey;
  switch (issueType) {
    case "Bug":
      type = "patches";
      break;
    case "Sub-task":
      type = "subtasks";
      key = `<parent_issue_code>/${key}`;
      break;
    case "Sub-bug":
      type = "patches";
      key = `<parent_issue_code>/${key}`;
      break;
    default:
      type = "features";
      break;
  }
  const summary = issueSummary.replace(/-/g, "_");

  setTimeout(() => {
    branchNameInput.value = `${type}/${key}/${summary}`;
    branchNameInput.onchange();
  }, 1000);
})();
