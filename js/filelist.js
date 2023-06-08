function getFileList(jsonFile) {
    const fileListElement = document.getElementById('file-list');
    const searchInput = document.getElementById('search-input');

    let allJsonFiles = []; // 存储所有 JSON 文件的数组
    let allFiles = []; // 存储所有文件的数组

    // 加载所有 JSON 文件列表
    function loadAllJsonFiles() {
        allJsonFiles.forEach(json => {
            fetch(json)
                .then(response => response.json())
                .then(data => {
                    const fileList = data.fileList;

                    fileList.forEach(file => {
                        allFiles.push(file); // 将文件添加到 allFiles 数组中
                    });
                })
                .catch(error => {
                    console.error('Error fetching JSON file:', error);
                });
        });
    }

    // 显示特定的文件列表
    function showSpecificFiles() {
        fileListElement.innerHTML = '';

        fetch(jsonFile)
            .then(response => response.json())
            .then(data => {
                const fileList = data.fileList;

                fileList.forEach(file => {
                    const listItem = createListItem(file);
                    fileListElement.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching JSON file:', error);
            });
    }

    // 根据关键字搜索文件
    function searchFiles(keyword) {
        fileListElement.innerHTML = '';

        const filteredFiles = allFiles.filter(file => file.name.toLowerCase().includes(keyword.toLowerCase()));

        if (filteredFiles.length > 0) {
            filteredFiles.forEach(file => {
                const listItem = createListItem(file);
                fileListElement.appendChild(listItem);
            });
        } else {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = '未找到匹配的文件';
            fileListElement.appendChild(noResultsMessage);
        }
    }

    // 创建文件列表项
    function createListItem(file) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'align-items-center');

        const logoImg = document.createElement('img');
        logoImg.src = file.logo;
        logoImg.alt = file.alt;
        logoImg.width = 30;
        logoImg.height = 30;
        listItem.appendChild(logoImg);

        const fileNameLink = document.createElement('a');
        fileNameLink.href = file.link;
        fileNameLink.textContent = file.name;
        listItem.appendChild(fileNameLink);

        const fileStatus = document.createElement('div');
        fileStatus.classList.add('ms-auto');

        const statusSpan = document.createElement('span');
        statusSpan.classList.add('status', file.status === 'available' ? 'green-bg' : 'red-bg');
        statusSpan.textContent = file.status === 'available' ? '下载可用' : '维护';
        fileStatus.appendChild(statusSpan);

        const updateDate = document.createElement('small');
        updateDate.classList.add('text-muted');
        updateDate.textContent = '    ' + file.updateDate;
        fileStatus.appendChild(updateDate);

        listItem.appendChild(fileStatus);

        return listItem;
    }

    // 执行搜索操作
    function performSearch() {
        const keyword = searchInput.value.trim();
        if (keyword !== '') {
            searchFiles(keyword);
        } else {
            showSpecificFiles();
        }
    }

    // 监听搜索输入框输入事件
    searchInput.addEventListener('input', performSearch);

    // 加载所有 JSON 文件列表
    fetch('list/FileList.json') // 包含所有 JSON 文件路径的 JSON 文件
        .then(response => response.json())
        .then(data => {
            allJsonFiles = data.jsonFiles;
            loadAllJsonFiles();
        })
        .catch(error => {
            console.error('Error fetching JSON file:', error);
        });

    // 默认显示特定的文件列表
    showSpecificFiles();
}
