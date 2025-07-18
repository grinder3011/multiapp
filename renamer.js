// DOM elements
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
const renamePatternInput = document.getElementById("renamePattern");
const previewBtn = document.getElementById("previewBtn");
const previewList = document.getElementById("previewList");
const downloadZipBtn = document.getElementById("downloadZipBtn");

let selectedFiles = [];
let renamedFiles = [];

// 1. Handle file selection
fileInput.addEventListener("change", (event) => {
  selectedFiles = Array.from(event.target.files);
  displayOriginalFilenames();
  previewList.innerHTML = "";
  downloadZipBtn.disabled = true;
});

// 2. Display original file names
function displayOriginalFilenames() {
  fileList.innerHTML = "<h3>Selected Files:</h3>";
  const ul = document.createElement("ul");
  selectedFiles.forEach((file) => {
    const li = document.createElement("li");
    li.textContent = file.name;
    ul.appendChild(li);
  });
  fileList.appendChild(ul);
}

// 3. Preview renamed files
previewBtn.addEventListener("click", () => {
  const pattern = renamePatternInput.value.trim();
  if (!pattern.includes("{num}")) {
    alert("Please include {num} in the rename pattern.");
    return;
  }

  renamedFiles = selectedFiles.map((file, index) => {
    const ext = file.name.split('.').pop();
    const newName = pattern.replace("{num}", index + 1).replace(/\.\w+$/, "") + "." + ext;
    return { file, newName };
  });

  showPreviewList();
  downloadZipBtn.disabled = false;
});

// 4. Show preview list
function showPreviewList() {
  previewList.innerHTML = "<h3>Preview Renames:</h3>";
  const ul = document.createElement("ul");
  renamedFiles.forEach(({ newName }) => {
    const li = document.createElement("li");
    li.textContent = newName;
    ul.appendChild(li);
  });
  previewList.appendChild(ul);
}

// 5. Download ZIP with renamed files
downloadZipBtn.addEventListener("click", async () => {
  const zip = new JSZip();
  const folder = zip.folder("renamed_files");

  for (let { file, newName } of renamedFiles) {
    const arrayBuffer = await file.arrayBuffer();
    folder.file(newName, arrayBuffer);
  }

  zip.generateAsync({ type: "blob" }).then((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "renamed_files.zip";
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
});
