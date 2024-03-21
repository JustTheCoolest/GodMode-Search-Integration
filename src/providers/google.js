const Provider = require('./provider');

class Google extends Provider {
	static webviewId = 'webviewGOOGLE';
	static fullName = 'Google Search';
	static shortName = 'Google';

	static url = 'https://google.com/';

	static handleInput(input) {
		const fullName = this.fullName;
		this.getWebview().executeJavaScript(`{
    var inputElement = document.querySelector('#APjFqb');
		if (inputElement) {
			inputElement.innerHTML = \`${input}\`
		}
	}`);
	}

	static handleSubmit() {
		this.getWebview().executeJavaScript(`{
		var btn = document.querySelector("body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b"); 
    if (!btn) var btn = document.querySelector('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf.emcav > div.UUbT9.EyBRub > div.aajZCb > div.lJ9FBc > center > input.gNO89b'); 
    if (!btn) var btn = document.querySelector('#tsf > div:nth-child(1) > div.A8SBwf > div.RNNXgb > button > div > span > svg');
		if (btn) {
			btn.focus();
			btn.disabled = false;
			btn.click();
		}
  }`);
	}

	static handleCss() {
		this.getWebview().addEventListener('dom-ready', () => {
			// hide message below text input, sidebar, suggestions on new chat
			setTimeout(() => {
				this.getWebview().insertCSS(`
        /* hide the claude avatar in response */
        .p-1.w-9.h-9.shrink-0 {
          display: none;
        }
        /* reduce claude prompt margins */
        .mx-4.md\:mx-12.mb-2.md\:mb-4.mt-2.w-auto {
          margin: 0 !important;
        }

        `);
			}, 1000);
			setTimeout(() => {
				this.getWebview().executeJavaScript(`{
				// hide welcome back title
				document.querySelector('h2').style.display = 'none';
				}`);
			}, 1000);
		});
	}

	static handleDarkMode(isDarkMode) {
		if (isDarkMode) {
			this.getWebview().insertCSS(`
				body {
					background-color: #1d1d1d !important;
					filter: invert(100%) hue-rotate(180deg);
				}
			`);
		} else {
			this.getWebview().insertCSS(`
				body {
					background-color: #ffffff !important;
					filter: none;
				}
			`);
		}
	}

	static getUserAgent() {
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
	}

	static isEnabled() {
		return window.electron.electronStore.get(`${this.webviewId}Enabled`, true);
	}
}

module.exports = Google;
