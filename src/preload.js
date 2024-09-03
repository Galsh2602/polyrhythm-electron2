// preload.js
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector);
      if (element) element.innerText = text;
    }
  
    for (const versionType of ['chrome', 'node', 'electron']) {
      replaceText(`${versionType}-version`, process.versions[versionType]);
    }
  });
  