const seletected_type = document.getElementById("drop-down");
const file_input = document.getElementById("file-input");
const form = document.querySelector(".form");
const uploaded_item = document.querySelector("uploaded-item");
const file_img = document.getElementById("img");
const preview = document.getElementById("preview");
const modal = document.getElementById("modal-id");

form.addEventListener("click", function (e) {
  if (e.target === form) file_input.click();
});

seletected_type.addEventListener("change", function () {
  const file_type = document.getElementById("drop-down").value;
  file_input.accept = file_type;
});
file_input.onchange = ({ target }) => {
  const file = target.files[0];
  if (file) {
    let size = target.files[0].size;
    size /= 1000;
    size /= 1024;

    if (size > 10) {
      //10mb
      file_input.value = "";
      alert("File size must not exceed 10mb");
    } else {
      const filename = document.getElementById("file-name");
      modal.style.display = "block";
      filename.textContent = `${file.name}`;

      if (file.type === "application/pdf") {
        preview.addEventListener("click", (e) => {
          e.preventDefault();
          previewFile(file, "application/pdf");
        });
      } else if (file.type === "image/png") {
        preview.addEventListener("click", (e) => {
          e.preventDefault();
          previewFile(file, "image/png");
        });
      } else if (file.type === "image/jpeg") {
        preview.addEventListener("click", (e) => {
          e.preventDefault();
          previewFile(file, "image/jpeg");
        });
      }
    }
  }

  function previewFile(file, type) {
    var file_data = new Blob([file], { type: type });
    var fileURL = URL.createObjectURL(file_data);
    var win = window.open();
    win.document.write(
      '<iframe src="' +
        fileURL +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
    );
  }
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    modal.click();
    const uploadText = document.getElementById("upload_status");
    uploadText.textContent = `(${file.name})submitted`;
    uploadText.addEventListener("click", () => {
      previewFile(file, file.type);
    });
  });
};

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
