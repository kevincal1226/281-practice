document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById('toggleBtn');
    const body = document.body;

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const mode = body.classList.contains('light-mode') ? 'light' : 'dark';
        toggleBtn.innerHTML = `<img src="src/images/moon_${mode.toLowerCase()}.png" alt="Moon">`;

    });
    document.getElementById("sorting").addEventListener("click", function () {
        window.location.href = "https://kevincal1226.github.io/281-Sorting/";
    });
    document.getElementById("trees").addEventListener("click", function () {
        window.location.href = "https://kevincal1226.github.io/281-Tree-Deduction/";
    });


});
