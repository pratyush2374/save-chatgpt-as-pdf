'use strict';

function saveOptions(event) {
    event.preventDefault();

    const zoom_el = document.getElementById('zoom');
    if(zoom_el.value < 30) {
        zoom_el.value = 30;
    } else if(zoom_el.value > 300) {
        zoom_el.value = 300;
    }

    let options = {};
    const keys = Object.getOwnPropertyNames(pdfcrowdShared.defaultOptions);
    keys.forEach(key => {
        const item = document.getElementById(key);
        if(item.type == "checkbox") {
            options[item.name] = item.checked;
        } else {
            options[item.name] = item.value;
        }
    });

    chrome.storage.sync.set({ options: options }, function() {
        const status = document.getElementById('status');
        status.style.display = 'inline';
        setTimeout(function() {
            status.style.display = 'none';
        }, 2500);
    });
}

function restoreOptions() {
    pdfcrowdShared.getOptions(function(options) {
        const keys = Object.getOwnPropertyNames(pdfcrowdShared.defaultOptions);
        keys.forEach(key => {
            const item = document.getElementById(key);
            if(item.type == "checkbox") {
                item.checked = options[key];
            } else {
                item.value = options[key];
            }
        });
    });
}

function resetOptions(event) {
    const options = pdfcrowdShared.defaultOptions;
    const keys = Object.getOwnPropertyNames(options);
    keys.forEach(key => {
        const item = document.getElementById(key);
        if(item.type == "checkbox") {
            item.checked = options[item.name];
        } else {
            item.value = options[item.name];
        }
    });

    saveOptions(event);
}

function onChange() {
    document.getElementById('status').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('reset').addEventListener('click', resetOptions);
document.querySelectorAll('input,select').forEach((input) => {
    input.addEventListener('change', onChange);
});
