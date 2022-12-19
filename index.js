var enForm = document.querySelector("#encryptForm");
var iv = CryptoJS.enc.Utf8.parse("101112131415161718191a1b1c1d1e1f");

enForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(enForm);
  let keys = formData.get("key");
  let key = CryptoJS.enc.Utf8.parse(keys);
  let message = formData.get("message");
  let msg = encryptMe(message, key);
  document.querySelector("#en-message").value = msg;
});

var deForm = document.querySelector("#decryptForm");

deForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(deForm);
  let keys = formData.get("key");
  let key = CryptoJS.enc.Utf8.parse(keys);
  let encrypted = formData.get("encrypted");
  let msg = decryptMe(encrypted, key);
  document.querySelector("#de-message").value = msg;
});

function encryptMe(mes, key) {
  return CryptoJS.AES.encrypt(mes, key, {
    iv: iv,
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding,
  });
}

function decryptMe(mes, key) {
  var bytes = CryptoJS.AES.decrypt(mes, key, {
    iv: iv,
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding,
  });
  return bytes.toString(CryptoJS.enc.Utf8);
}
