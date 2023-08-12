function showTab(tabId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

