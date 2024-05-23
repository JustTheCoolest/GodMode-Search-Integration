const Provider = require('./provider');

class Google extends Provider {
	static webviewId = 'webviewGOOGLE';
	static fullName = 'Google Search';
	static shortName = 'Google';

	static url = 'https://www.google.com/';

	static handleInput(input) {
		let webview = this.getWebview();
		input = JSON.stringify(input);
		console.log(webview.getURL(), this.url);
		if (!webview.getURL().startsWith(this.url)) {
			webview.loadURL(this.url)
			.catch(e => {
				console.log(e);
			});
		}
		webview.executeJavaScript(`
			var inputElement = document.querySelector('#tsf > div:nth-child(1) > div.A7Yvie.Epl37 > div.zGVn2e > div.SDkEP > div > textarea');
			inputElement.value = ${input};
		`)
	}

	static handleSubmit() {
		this.getWebview().executeJavaScript(`
		{
			var btn = document.querySelector("#tsf > div:nth-child(1) > div.A7Yvie.Epl37 > div.zGVn2e > button.Tg7LZd.search_button_suggest"); 
			if (!btn) btn = document.querySelector('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf.emcav > div.UUbT9.EyBRub > div.aajZCb > div.lJ9FBc > center > input.gNO89b'); 
			if (!btn) btn = document.querySelector('#tsf > div:nth-child(1) > div.A8SBwf > div.RNNXgb > button');
			if (btn) {
				btn.focus();
				btn.disabled = false;
				btn.click();
			}
		}`)
	}

		static handleCss() {
		this.getWebview().addEventListener('dom-ready', () => {
			this.getWebview().insertCSS(`
						html,body{
							zoom:70%;
							font-size:12px;
						}
			`);
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
		return 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36 Edg/125.0.0.0';
	}

	static isEnabled() {
		return window.electron.electronStore.get(`${this.webviewId}Enabled`, true);
	}
}

module.exports = Google;
