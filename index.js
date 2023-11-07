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

    ndef.addEventListener("readingerror", () => {
      alert("Argh! Cannot read data from the NFC tag. Try another one?");
    });

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      alert(serialNumber);

      for (const record of message.records) {
        alert(record.data.toString());

        const buffer = record.data.buffer;
        const dataView = new DataView(buffer);
        alert(dataView.getUint8(0));

        const json = JSON.parse(record.data);
        alert(JSON.stringify(json, null, 2));
      }
    });
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
