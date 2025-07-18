const fileInput = document.getElementById('fileInput');
const filesInfo = document.getElementById('filesInfo');

fileInput.addEventListener('change', async (event) => {
  filesInfo.innerHTML = '';
  const files = event.target.files;

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const metadata = await musicMetadata.parseBlob(new Blob([arrayBuffer]));

    const { title, artist, album, genre } = metadata.common;

    const info = document.createElement('div');
    info.innerHTML = `
      <strong>${file.name}</strong><br>
      Title: ${title || 'N/A'}<br>
      Artist: ${artist || 'N/A'}<br>
      Album: ${album || 'N/A'}<br>
      Genre: ${genre ? genre.join(', ') : 'N/A'}
      <hr/>
    `;
    filesInfo.appendChild(info);
  }
});
