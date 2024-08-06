import * as binary from './binaryTrees.mjs';
import * as sorting from './sorting.mjs';

export function fetchHomepage() {
    fetch('src/html/homepage.html')
        .then(response => response.text())
        .then(newHtml => {
            document.documentElement.innerHTML = newHtml;
            initializeHomepage();
        })
}

function initializeHomepage() {
    initializeLightDarkAndHomeButton();
    document.getElementById("sorting").addEventListener("click", function () {
        fetch('src/html/sorting.html')
            .then(response => response.text())
            .then(newHtml => {
                document.body.innerHTML = newHtml;
                document.body.className = null;
                initializeSortingElements();
            })
    });
    document.getElementById("trees").addEventListener("click", function () {
        fetch('src/html/binaryTrees.html')
            .then(response => response.text())
            .then(newHtml => {
                document.body.innerHTML = newHtml;
                document.body.className = null;
                initializeTreeElements();
            })


    });
}

function initializeLightDarkAndHomeButton() {
    const toggleBtn = document.getElementById('toggleBtn');
    const body = document.body;
    const homeBtn = document.getElementById('homeBtn');
    homeBtn.addEventListener('click', () => {
        fetchHomepage();
    })
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const mode = body.classList.contains('light-mode') ? 'light' : 'dark';
        toggleBtn.innerHTML = `<img src="src/images/moon_${mode.toLowerCase()}.png" alt="Moon">`;
        homeBtn.innerHTML = `<img src="src/images/home_${mode.toLowerCase()}.png" alt="Home">`
    });

}

function initializeStats() {
    binary.resetStats();
    sorting.resetStats();
    document.getElementById('total-questions').innerText = `Questions Attempted: ${0}`;
    document.getElementById('accuracy').innerText = `Accuracy: 0.00%`;
    document.getElementById('win-streak').innerText = `Current Win Streak: ${0}`;
    document.getElementById('best-win-streak').innerText = `Best Win Streak: ${0}`;
    document.getElementById('answer-container').classList.add('hidden');
}

function initializeSortingElements() {
    initializeLightDarkAndHomeButton();
    initializeStats();

    document.getElementById('bubble-sort').addEventListener('click', () => {
        sorting.verifySort([0, 1]);
    });
    document.getElementById('selection-sort').addEventListener('click', () => {
        sorting.verifySort([2]);

    });
    document.getElementById('insertion-sort').addEventListener('click', () => {
        sorting.verifySort([3]);

    });
    document.getElementById('merge-sort').addEventListener('click', () => {
        sorting.verifySort([4]);

    });
    document.getElementById('quick-sort').addEventListener('click', () => {
        sorting.verifySort([5]);

    });

    document.getElementById('continue-button').addEventListener('click', () => {
        sorting.startSort();
    });

    sorting.startSort();
}

function initializeTreeElements() {
    initializeLightDarkAndHomeButton();
    initializeStats();

    document.getElementById('continue-button').addEventListener('click', () => {
        binary.startBinaryTree();
    });

    document.getElementById('user-input-button').addEventListener('click', () => {
        binary.checkAnswer();
    });

    document.getElementById('try-again-button').addEventListener('click', () => {
        binary.tryAgain();
    });

    document.getElementById('user-input').addEventListener('keypress', binary.handleKeyPress);

    document.getElementById('try-again-user-input').addEventListener('keypress', binary.handleKeyPress);

    document.getElementById('show-tree').addEventListener('click', () => {
        binary.showTreeDiagram();
    });

    document.getElementById('show-answer').addEventListener('click', () => {
        binary.showAnswer();
    });

    binary.startBinaryTree();
}