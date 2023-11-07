const btn_scan = document.getElementById("btn_scan");
const btn_write = document.getElementById("btn_write");
const btn_read = document.getElementById("btn_read");

const show_data = document.getElementById("Show_data");

btn_scan.addEventListener("click", async () => {
  alert("User clicked scan button");

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    alert("> Scan started");

    ndef.onreadingerror = (event) => {
      alert("Error! Cannot read data from the NFC tag. Try a different one?");
    };
    ndef.onreading = (event) => {
      alert("NDEF message read.");
      // I want to show value text in record.data
      show_data.innerHTML = event.message.records[0].data;
      alert("show_data: " + show_data.innerHTML);
      ndef.close();
    };
  } catch (error) {
    alert("Argh! " + error);
  }
});

btn_write.addEventListener("click", async () => {
  alert("User clicked write button");

  try {
    const ndef = new NDEFReader();
    await ndef.write("Hello world!");
    alert("> Message written");
  } catch (error) {
    alert("Argh! " + error);
  }
});

btn_read.addEventListener("click", async () => {
  alert("User clicked make read-only button");

  try {
    const ndef = new NDEFReader();
    await ndef.makeReadOnly();
    alert("> NFC tag has been made permanently read-only");
  } catch (error) {
    alert("Argh! " + error);
  }
});
