function loadMarkdownFile(filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const markdownContent = marked.parse(data);
            const announcementElement = document.getElementById('announcement');
            announcementElement.innerHTML = markdownContent;
        })
        .catch(error => {
            console.error('Error fetching Markdown file:', error);
        });
}
