help:
	cat makefile

build: build-firefox build-chrome
	true

build-firefox: copyfiles
	rm -rf $(CURDIR)/save-gptchat-as-pdf-firefox.zip
	cp manifest_firefox.json /tmp/save-chatgpt-to-pdf/manifest.json
	cd /tmp/save-chatgpt-to-pdf/ && zip -r $(CURDIR)/save-gptchat-as-pdf-firefox.zip .

build-chrome: copyfiles
	rm -rf $(CURDIR)/save-gptchat-as-pdf-chrome.zip
	cp manifest_chrome.json /tmp/save-chatgpt-to-pdf/manifest.json
	cd /tmp/save-chatgpt-to-pdf/ && zip -r $(CURDIR)/save-gptchat-as-pdf-chrome.zip .


copyfiles:
	rm -rf /tmp/save-chatgpt-to-pdf/
	mkdir /tmp/save-chatgpt-to-pdf/
	rsync -q -av --exclude-from=exclude.txt . /tmp/save-chatgpt-to-pdf/
