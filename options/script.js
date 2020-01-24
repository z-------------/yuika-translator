document.getElementById("btn-save").addEventListener("click", () => {
    const newOpts = {};
    const optInputs = document.querySelectorAll("[data-key]");
    for (const inputEl of optInputs) {
        newOpts[inputEl.dataset.key] = inputEl.value;
    }
    browser.storage.local.set(newOpts).then(() => {
        alert("Saved.");
    });
});

browser.storage.local.get(null, r => {
    for (const key in r) {
        const inputEl = document.querySelector(`[data-key=${key}]`);
        if (!inputEl) continue;
        inputEl.value = r[key];
    }
});
