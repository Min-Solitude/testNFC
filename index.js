const id = new URLSearchParams(location.search).get("id");

console.log(id); // 1
console.log(typeof id); // 1

const btn_scan = document.getElementById("btn_scan");
const btn_write = document.getElementById("btn_write");
const btn_read = document.getElementById("btn_read");

const show_data = document.getElementById("Show_data");
const show_log = document.getElementById("Show_log");

btn_scan.addEventListener("click", async () => {
  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    alert("Vui lòng đặt thẻ vào điện thoại");

    ndef.addEventListener("readingerror", () => {
      alert("Argh! Cannot read data from the NFC tag. Try another one?");
    });

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      alert(serialNumber);

      for (const record of message.records) {
        if (record.recordType === "text") {
          const textBytes = new Uint8Array(record.data.buffer);
          const text = new TextDecoder("utf-8").decode(textBytes);
          show_data.innerHTML = text;
          alert(`> Text: ${text}`);
        } else {
          const textBytes = new Uint8Array(record.data.buffer);

          const text = new TextDecoder("utf-8").decode(textBytes);

          show_data.innerHTML = text;

          alert(`> Text: ${text}`);
        }
      }
    });
  } catch (error) {
    alert("Argh! " + error);
  }
});

btn_write.addEventListener("click", async () => {
  alert("Vui lòng đặt thẻ vào điện thoại");

  const ndef = new NDEFReader();

  await ndef.write({
    records: [{ recordType: "text", data: id }],
  });

  alert("Truyền dữ liệu thành công");

  ndef.addEventListener("readingerror", () => {
    alert("Địt mẹ lỗi! Vui lòng thử lại?");
  });
});
