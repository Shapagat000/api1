const button = document.querySelector('.button');
const input = document.querySelector('.input');
const info = document.querySelector('.info');

button.addEventListener('click', () => {
    const query = input.value.trim();
    if (!query) return;

    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=1`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0) {
                info.innerHTML = '<p>No results found.</p>';
                return;
            }

            const track = data.results[0];
            info.innerHTML = `
                <h3>${track.trackName}</h3>
                <p>By: ${track.artistName}</p>
                <audio controls src="${track.previewUrl}"></audio>
            `;
        })
        .catch(error => {
            console.error(error);
            info.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        });
});
