document.getElementById('renameBtn').addEventListener('click', () => {
  const files = document.getElementById('fileInput').files;
  const prefix = document.getElementById('prefix').value.trim();
  const output = document.getElementById('output');
  output.innerHTML = '';

  if (!files.length) {
    output.innerText = 'Please select some files.';
    return;
  }

  let renamed = Array.from(files).map((file, i) => {
    const ext = file.name.split('.').pop();
    const newName = `${prefix}${String(i + 1).padStart(3, '0')}.${ext}`;
    return `<div>${file.name} → <strong>${newName}</strong></div>`;
  });

  output.innerHTML = `<h3>Preview:</h3>` + renamed.join('');
});
