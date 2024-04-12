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
			webview.loadURL(this.url);
		}
		webview.executeJavaScript(`
			var inputElement = document.querySelector('#APjFqb');
			inputElement.value = ${input};
		`)
	}

	static handleSubmit() {
		this.getWebview().executeJavaScript(`
		{
			var btn = document.querySelector("body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b"); 
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
							zoom:80%;
							font-size:14px;
							scrollbar-width: thin;
						}
						.L3eUgb{
							max-width:75%;
							margin:0 auto;
						}
					@media (max-width:320px){
						html,body{
							zoom:70%;
							font-size:12px;
						}
						.L3eUgb{
							max-width:70%;
							margin:0 auto;
						}
					}
					@media (max-width:275px){
						.L3eUgb{
							margin:0 auto 0 4rem;
						}
					}
					@media (max-width:220px){
						.L3eUgb{
							margin:0 auto 0 1.75rem;
						}
					}
					@media (max-width:210px){
						.L3eUgb{
							margin:0 auto 0 0;
						}
						.om7nvf {
							padding: 20px 0 !important;
						}
						.RNNXgb{
							width:0;
							max-width:354px !important;
						}
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
		return 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
	}

	static isEnabled() {
		return window.electron.electronStore.get(`${this.webviewId}Enabled`, true);
	}
}

module.exports = Google;
