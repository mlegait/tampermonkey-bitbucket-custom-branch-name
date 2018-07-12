// ==UserScript==
// @name         Bitbucket: Custom branch name
// @version      1.0
// @match        https://bitbucket.org/branch/create*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const issueKey = (window.location.href.match(/\?issueKey=([^&amp;]+)/) || [])[1];
  const issueType = (window.location.href.match(/&issueType=([^&]+)&/) || [])[1];
  const issueSummary = (document.getElementById('id_branch_name').value.match(/[^-]+-\d+-(.*)/) || [])[1];

  let type = '';
  let key = issueKey;
  switch(issueType)
  {
      case 'Bug':
          type = 'patches';
          break;
      case 'Sub-task':
          type = 'subtasks';
          key= `<parent_issue_code>/${key}`;
          break;
      case 'Sub-bug':
          type = 'patches';
          key= `<parent_issue_code>/${key}`;
          break;
      default:
          type = 'features';
          break;
  }
  const summary = issueSummary.replace(/-/g , "_");

  $('#id_branch_name').val(`${type}/${key}/${summary}`).trigger('change');
})();
