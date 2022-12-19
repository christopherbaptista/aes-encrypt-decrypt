var enForm = document.querySelector("#encryptForm");

enForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(enForm);
  let keys = formData.get("key");
  let key = CryptoJS.enc.Utf8.parse(keys);
  let message = formData.get("message");
  let ivs = formData.get("iv");
  let iv = CryptoJS.enc.Utf8.parse(ivs);
  let msg = encryptMe(message, key, iv);
  document.querySelector("#en-message").value = msg;
});

var deForm = document.querySelector("#decryptForm");

deForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(deForm);
  let keys = formData.get("key");
  let key = CryptoJS.enc.Utf8.parse(keys);
  let encrypted = formData.get("encrypted");
  let ivs = formData.get("iv");
  let iv = CryptoJS.enc.Utf8.parse(ivs);
  let msg = decryptMe(encrypted, key, iv);
  document.querySelector("#de-message").value = msg;
});

function encryptMe(mes, key, iv) {
  return CryptoJS.AES.encrypt(mes, key, {
    iv: iv,
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding,
  });
}

function decryptMe(mes, key, iv) {
  var bytes = CryptoJS.AES.decrypt(mes, key, {
    iv: iv,
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding,
  });
  return bytes.toString(CryptoJS.enc.Utf8);
}
