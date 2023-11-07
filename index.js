const btn = document.getElementById("btn_scan");

const ndef = new NDEFReader();

btn.addEventListener("click", async () => {
  //   check if NFC is supported
  if ("NDEFReader" in window) {
    try {
      await ndef.write("Hello world!");
      console.log("Message written");
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("NFC not supported");
  }
});
