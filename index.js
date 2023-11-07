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
      show_data.innerHTML = `> Records: (${event.message.records.length})\n`;
      show_data.innerHTML = `> Records: (${event.message.records})\n`;
      for (const record of event.message.records) {
        const buffer = record.data.buffer;
        const dataView = new DataView(buffer);
        const dataBytes = dataView.getUint8(0, 8);
        show_data.innerHTML += "> Record data:  " + dataBytes + "\n";
      }
    };

    // ndef.addEventListener("readingerror", () => {
    //   alert("Argh! Cannot read data from the NFC tag. Try another one?");
    // });

    // ndef.addEventListener("reading", ({ message, serialNumber }) => {
    //   // show_data.innerHTML = `> Serial Number: ${serialNumber}\n> Records: (${message.records.length})\n`;
    //   for (const record of message.records) {
    //     const buffer = record.data.buffer;
    //     const dataView = new DataView(buffer);
    //     const dataBytes = dataView.getUint8(0, 8);
    //     show_data.innerHTML = `> Serial Number: ${serialNumber}\n> Records: (${message.records.length})\n`;
    //     show_data.innerHTML += "> Record data:  " + dataBytes + "\n";
    //   }
    // });
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
