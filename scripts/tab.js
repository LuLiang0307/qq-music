document.addEventListener('click', function(e) {
    let target = e.target;
    if (target.dataset.role !== "tab") {
        return;
    }
    [].forEach.call(target.parentNode.children, (value) => {
        value.classList.remove('active')
    })
    target.classList.add('active')

    let content = document.querySelector(target.dataset.view);
    [].forEach.call(content.parentNode.children, (value) => {
        value.style.display = 'none'
    });
    content.style.display = 'block';
})