const HOST_ID = "yuika@zackguard.com";

let registered = false;

function registerProvider() {
    browser.runtime.sendMessage(HOST_ID, {
        type: "register",
    }).then(isSuccess => {
        registered = isSuccess;
    });
}

browser.runtime.onStartup.addListener(registerProvider);
browser.runtime.onInstalled.addListener(registerProvider);

browser.runtime.onMessageExternal.addListener((message, sender, respond) => {
    if (sender.id !== HOST_ID) return;

    if (message.type === "host-query") {
        return new Promise(async resolve => {
            const { apiKey } = await browser.storage.local.get("apiKey");
            const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${message.data.text}&lang=en`;
            const body = await fetch(url).then(body => body.json());
            resolve({
                type: "list",
                items: [{
                    tags: [body.lang.split("-").join(" → ")],
                    text: body.text[0],
                }],
            });
        });
    } else {
        respond(null);
    }
});
