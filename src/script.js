let firstOrder = -1;
let toGuess = -1;
let winStreak = 0;
let bestWinStreak = 0;
let numQuestions = 0;
let numCorrect = 0;
let traversalNames = ["Pre", "Post", "Level"];
let inorderTraversal = [];
let traversals = [];
let treeDiagram = "";
let randomInt = -1
let input = []
let startArr = []
let numIterations = -1
let sortsNames = ['Min Bubble Sort', 'Max Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quicksort'];

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        var newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }

        let current = this.root;
        while (current) {
            if (Math.floor(Math.random() * 2) === 0) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    preOrderHelper(list, curr) {
        if (curr === null) {
            return;
        }
        list.push(curr.value);
        this.preOrderHelper(list, curr.left);
        this.preOrderHelper(list, curr.right);
    }

    postOrderHelper(list, curr) {
        if (curr === null) {
            return;
        }
        this.postOrderHelper(list, curr.left);
        this.postOrderHelper(list, curr.right);
        list.push(curr.value);
    }

    inOrderHelper(list, curr) {
        if (curr === null) {
            return;
        }
        this.inOrderHelper(list, curr.left);
        list.push(curr.value);
        this.inOrderHelper(list, curr.right);
    }

    preOrder() {
        let preOrder = [];
        this.preOrderHelper(preOrder, this.root);
        return preOrder;
    }

    postOrder() {
        let postOrder = [];
        this.postOrderHelper(postOrder, this.root);
        return postOrder;
    }

    inOrder() {
        let inOrder = [];
        this.inOrderHelper(inOrder, this.root);
        return inOrder;
    }

    levelOrder() {
        let levelOrder = [];
        let q = [this.root];
        for (let i = 0; i < q.length; ++i) {
            if (q[i] === null) {
                continue;
            }
            levelOrder.push(q[i].value);
            q.push(q[i].left);
            q.push(q[i].right);
        }
        return levelOrder;
    }

    // This code was basically just used from the 281 lab 8 print_diagram() function for AVL Trees
    getDiagram() {
        const points = [];

        const traverseDepth = (node, p) => {
            if (node === null) {
                return;
            }
            traverseDepth(node.left, { depth: p.depth + 1, parentDir: 1 });
            points.push({ value: node.value, pos: p });
            traverseDepth(node.right, { depth: p.depth + 1, parentDir: -1 });
        };

        traverseDepth(this.root, { depth: 0, parentDir: 0 });

        let width = 2 * points.length;
        let height = 0;
        points.forEach(point => {
            height = Math.max(height, point.pos.depth);
        });
        height = height * 2 + 1;

        const buffer = Array.from({ length: width }, () => Array(height).fill(' '));

        points.forEach((point, i) => {
            const n = point.value;
            const d = point.pos.depth;
            buffer[2 * i + 1][d * 2] = String(n % 10);
            if (n >= 10) {
                buffer[2 * i][d * 2] = String(Math.floor((n / 10) % 10));
            }
        });

        points.forEach((point, i) => {
            const d = point.pos.depth;
            const dir = point.pos.parentDir;
            if (dir === 0) {
                return;
            }

            let targetIndex = i + dir;
            if (targetIndex >= 0 && targetIndex < points.length && points[targetIndex].pos.depth === d - 1) {
                buffer[2 * i + (dir > 0 ? 2 : 0)][d * 2 - 1] = dir > 0 ? '/ ' : '\\ ';
            }
            else {
                const start = 2 * i + (dir > 0 ? 2 : -1);
                buffer[start][d * 2 - 1] = dir > 0 ? '/ ' : '\\ ';
                buffer[start + dir][d * 2 - 2] = '.';
                for (let j = i + 2 * dir; points[j] && points[j].pos.depth !== d - 1; j += dir) {
                    buffer[2 * j][d * 2 - 2] = '.';
                    buffer[2 * j + 1][d * 2 - 2] = '.';
                }
            }
        });

        let total = "";
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                total += buffer[x][y];
            }
            total += "\n";
        }
        return total;
    }

}


document.addEventListener("DOMContentLoaded", () => {
    fetchHomepage();
});


function fetchHomepage() {
    fetch('/src/homepage.html')
        .then(response => response.text())
        .then(newHtml => {
            document.documentElement.innerHTML = newHtml;
            initializeHomepage();
        })
}

function initializeHomepage() {
    initializeLightDarkAndHomeButton();
    document.getElementById("sorting").addEventListener("click", function () {
        fetch('/src/sorting.html')
            .then(response => response.text())
            .then(newHtml => {
                document.body.innerHTML = newHtml;
                document.body.className = null;
                initializeSortingElements();
            })
    });
    document.getElementById("trees").addEventListener("click", function () {
        fetch('/src/binary-trees.html')
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

function resetStats() {
    winStreak = 0;
    bestWinStreak = 0;
    numQuestions = 0;
    numCorrect = 0;
}

function initializeStats() {
    resetStats();
    document.getElementById('total-questions').innerText = `Questions Attempted: ${numQuestions}`;
    document.getElementById('accuracy').innerText = `Accuracy: 0.00%`;
    document.getElementById('win-streak').innerText = `Current Win Streak: ${winStreak}`;
    document.getElementById('best-win-streak').innerText = `Best Win Streak: ${bestWinStreak}`;
    document.getElementById('answer-container').classList.add('hidden');
}

function initializeSortingElements() {
    initializeLightDarkAndHomeButton();
    initializeStats();

    document.getElementById('bubble-sort').addEventListener('click', () => {
        verifySort([0, 1]);
    });
    document.getElementById('selection-sort').addEventListener('click', () => {
        verifySort([2]);

    });
    document.getElementById('insertion-sort').addEventListener('click', () => {
        verifySort([3]);

    });
    document.getElementById('merge-sort').addEventListener('click', () => {
        verifySort([4]);

    });
    document.getElementById('quick-sort').addEventListener('click', () => {
        verifySort([5]);

    });

    document.getElementById('continue-button').addEventListener('click', () => {
        startSort();
    });

    startSort();
}

function initializeTreeElements() {
    initializeLightDarkAndHomeButton();
    initializeStats();

    document.getElementById('continue-button').addEventListener('click', () => {
        startBinaryTree();
    });

    document.getElementById('user-input').addEventListener('keypress', handleKeyPress);

    document.getElementById('try-again-user-input').addEventListener('keypress', handleKeyPress);

    startBinaryTree();
}

function startSort() {
    document.getElementById('answer-container').style.display = "none";
    document.getElementById('answer-selection').style.display = "block";
    document.getElementById('solution').innerText = "";
    numIterations = Math.floor(Math.random() * (6 - 3) + 3)
    input = []
    randomInt = Math.floor(Math.random() * 6);
    for (let i = 0; i < 12; i++) {
        x = Math.floor(Math.random() * 100);
        input.push(x);
    }
    startArr = [...input];
    if (randomInt === 0) {
        minBubble();
    }
    else if (randomInt === 1) {
        maxBubble();
    }
    else if (randomInt === 2) {
        selection();
    }
    else if (randomInt === 3) {
        insertion();
    }
    else if (randomInt === 4) {
        merge();
    }
    else if (randomInt === 5) {
        quick();
    }
    else {
        console.error("Random Integer not generated properly.");
    }
    document.getElementById('initial').innerText = "Start Array: [" + startArr.join(', ') + "]";
    document.getElementById('end').innerText = "End Array: [" + input.join(", ") + "]";
}

function minBubble(verify = false) {
    for (let i = 0; i < numIterations; i++) {
        for (let j = input.length - 1; j > i; j--) {
            if (input[j] < input[j - 1]) {
                const temp = input[j];
                input[j] = input[j - 1];
                input[j - 1] = temp;
                if (verify && JSON.stringify(input) === JSON.stringify(startArr)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function maxBubble(verify = false) {
    for (let i = 0; i < numIterations; i++) {
        for (let j = 0; j < input.length; j++) {
            if (input[j] > input[j + 1]) {
                const temp = input[j];
                input[j] = input[j + 1];
                input[j + 1] = temp;
                if (verify && JSON.stringify(input) === JSON.stringify(startArr)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function selection(verify = false) {
    for (let i = 0; i < numIterations; i++) {
        let minIndex = i;
        for (let j = i + 1; j < input.length; ++j) {
            if (input[j] < input[minIndex]) {
                minIndex = j;
            }
        }
        [input[minIndex], input[i]] = [input[i], input[minIndex]];
        if (verify && JSON.stringify(input) === JSON.stringify(startArr)) {
            return true;
        }
    }
    return false;
}

function insertion(verify = false) {
    for (let i = input.length - 1; i > 0; i--) {
        if (input[i] < input[i - 1]) {
            const temp = input[i];
            input[i] = input[i - 1];
            input[i - 1] = temp;
            if (verify && JSON.stringify(input) === JSON.stringify(startArr)) {
                return true;
            }
        }
    }
    for (let i = 2; i < numIterations + 2; i++) {
        temp = input[i];
        j = i;
        while (temp < input[j - 1]) {
            input[j] = input[j - 1];
            j--;
            if (verify && JSON.stringify(input) === JSON.stringify(startArr)) {
                return true;
            }
        }
        input[j] = temp;
        if (verify && JSON.stringify(input) === JSON.stringify(startArr)) {
            return true;
        }
    }
    return false;
}

function merge(verify = false, groupSize = [5]) {
    while (groupSize[0] === 5) {
        groupSize[0] = Math.floor(Math.random() * (7 - 2) + 2);
    }
    for (let j = 0; j < groupSize.length; ++j) {
        for (let i = 0; i < input.length; i += groupSize[j]) {
            const left = input.slice(0, i);
            const sorted = (input.slice(i, i + groupSize[j])).sort(function (a, b) {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            });
            const right = input.slice(i + groupSize[j]);
            input = left.concat(sorted).concat(right);
            if (verify && JSON.stringify(input) === JSON.stringify(startArr)) {
                return true;
            }
        }
    }
    return false;
}

function partition(left, right) {
    let pivot = --right;
    while (true) {
        while (input[left] < input[pivot]) {
            ++left;
        }
        while (left < right && input[right - 1] >= input[pivot]) {
            --right;
        }
        if (left >= right) {
            break;
        }
        let temp = input[left];
        input[left] = input[right - 1];
        input[right - 1] = temp;
    }
    let temp = input[pivot];
    input[pivot] = input[left];
    input[left] = temp;
    return left;
}

function iterativeQuickSort() {
    const stack = [];
    stack.push(0);
    stack.push(input.length - 1);

    while (stack.length > 0) {
        const high = stack.pop();
        const low = stack.pop();

        const p = partition(low, high + 1);

        if (p - 1 > low) {
            stack.push(low);
            stack.push(p - 1);
        }

        if (p + 1 < high) {
            stack.push(p + 1);
            stack.push(high);
        }

        if (JSON.stringify(input) === JSON.stringify(startArr)) {
            return true;
        }
    }
    return false;
}

function quick(left = 0, right = input.length, currIterations = Math.floor(Math.random() * 2)) {
    if (left == right) {
        return;
    }
    if (currIterations < 2) {
        ++currIterations;
        let pivot = partition(left, right);
        if (pivot - left < input.length - pivot) {
            quick(left, pivot, currIterations);
            quick(pivot + 1, right, currIterations);
        }
        else {
            quick(pivot + 1, right, currIterations);
            quick(left, pivot, currIterations);
        }
    }
}

function userAnswerWorks(type) {
    [startArr, input] = [input, startArr];
    let maxBubbleTemp = [...input];
    numIterations = input.length;
    if (type === 0) {
        if (minBubble(true)) {
            correctAnswer(0);
            return true;
        }
        input = [...maxBubbleTemp];
        if (maxBubble(true)) {
            correctAnswer(1);
            return true;
        }
    }
    else if (type === 2) {
        return selection(true);
    }
    else if (type === 3) {
        numIterations = input.length - 2; //have a loop that goes until i < numIterations - 2
        return insertion(true);
    }
    else if (type === 4) {
        return merge(true);
    }
    else if (type === 5) {
        return iterativeQuickSort();
    }
    return false;
}

function correctAnswer(typeIdx) {
    document.getElementById('answer-container').style.display = "block";
    document.getElementById('answer-selection').style.display = "none";
    document.getElementById('solution').style.color = "#0fa328";
    document.getElementById('solution').innerText = winStreak < 100 ? `Correct (Answer: ${sortsNames[typeIdx]})` : 'STD Wizard! (Merlinius, is that you?)';
    numCorrect++;
    winStreak++;
    bestWinStreak = Math.max(winStreak, bestWinStreak);
}

function verifySort(type) {
    numQuestions++;
    if (type.includes(randomInt) || JSON.stringify(input) === JSON.stringify(startArr) || JSON.stringify(input) === JSON.stringify([...startArr].sort(function (a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }))) {
        correctAnswer(randomInt);
    }
    else {
        if (userAnswerWorks(type[0])) {
            if (type[0] !== 0) {
                correctAnswer(type[0]);
            }
        }
        else {
            document.getElementById('answer-container').style.display = "block";
            document.getElementById('answer-selection').style.display = "none";
            document.getElementById('solution').style.color = "#ff2f2f";
            document.getElementById('solution').innerText = `Incorrect (Answer: ${sortsNames[randomInt]})`;
            winStreak = 0;
        }
    }
    document.getElementById('total-questions').innerText = `Questions Attempted: ${numQuestions}`;
    document.getElementById('accuracy').innerText = `Accuracy: ${(parseFloat(numCorrect) / parseFloat(numQuestions) * 100).toFixed(2)}%`;
    document.getElementById('win-streak').innerText = `Current Win Streak: ${winStreak}`;
    document.getElementById('best-win-streak').innerText = `Best Win Streak: ${bestWinStreak}`;
}

function generateTree() {
    let bTree = new BinaryTree();
    let l = [];
    for (let i = 0; i < 8; ++i) {
        let val = Math.floor(Math.random() * 100);
        while (l.includes(val)) {
            val = Math.floor(Math.random() * 100);
        }
        l.push(val);
    }
    l.forEach((elem) => bTree.insert(elem));
    let post = bTree.postOrder();
    let pre = bTree.preOrder();
    let ino = bTree.inOrder();
    let lev = bTree.levelOrder();
    treeDiagram = bTree.getDiagram();
    return [[pre, post, lev], ino];
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        if (document.getElementById('answer-selection').style.display === "block") {
            checkAnswer();
        }
        else {
            tryAgain();
        }
    }
}


function startBinaryTree() {
    document.getElementById('answer-container').style.display = "none";
    document.getElementById('answer-selection').style.display = "block";
    document.getElementById('solution').innerText = "";
    document.getElementById('try-again-user-input').value = "";
    firstOrder = Math.floor(Math.random() * 3);
    toGuess = firstOrder;
    while (toGuess === firstOrder) {
        toGuess = Math.floor(Math.random() * 3);
    }
    [traversals, inorderTraversal] = generateTree();
    document.getElementById('pptraversal').innerText = traversalNames[firstOrder] + "order Traversal: " + (traversals[firstOrder].join(', '));
    document.getElementById('inorder').innerText = "Inorder Traversal: " + inorderTraversal.join(', ');
    document.getElementById('give-the-blank-order-traversal').innerText = `Give the ${traversalNames[toGuess]}order traversal as a comma-separated list:`;
    document.getElementById('tree-diagram').innerText = "";
}

function checkAnswer() {
    ++numQuestions;
    let userAnswer = document.getElementById('user-input').value.trim();
    userAnswer = userAnswer.replace(/ |[\[{()}\]]/g, "");
    if (JSON.stringify(userAnswer) === JSON.stringify(traversals[toGuess].join(','))) {
        document.getElementById('answer-container').style.display = "block";
        document.getElementById('answer-selection').style.display = "none";
        document.getElementById('try-again-user-input').style.display = "none";
        document.getElementById('try-again-button').style.display = "none";
        document.getElementById('solution').style.color = "#0fa328";
        document.getElementById('solution').innerText = winStreak < 100 ? `Correct (Answer: ${traversals[toGuess].join(', ')})` : 'STD Wizard! (Merlinius, is that you?)';
        document.getElementById('tree-diagram').innerText = treeDiagram;
        document.getElementById('show-answer-container').style.display = "none";
        document.getElementById('show-tree-container').style.display = "none";
        numCorrect++;
        winStreak++;
        bestWinStreak = Math.max(winStreak, bestWinStreak);
    }
    else {
        document.getElementById('answer-container').style.display = "block";
        document.getElementById('answer-selection').style.display = "none";
        document.getElementById('solution').style.color = "#ff2f2f";
        document.getElementById('solution').innerText = `Incorrect ${traversalNames[toGuess]}order Traversal`;
        document.getElementById('try-again-user-input').style.display = "block";
        document.getElementById('try-again-button').style.display = "block";
        document.getElementById('continue-button-container').style.display = "none";
        document.getElementById('show-answer-container').style.display = "block";
        document.getElementById('show-tree-container').style.display = "block";
        document.getElementById('tree-diagram-header').style.display = "none";
        winStreak = 0;
    }

    document.getElementById('total-questions').innerText = `Questions Attempted: ${numQuestions}`;
    document.getElementById('accuracy').innerText = `Accuracy: ${(parseFloat(numCorrect) / parseFloat(numQuestions) * 100).toFixed(2)}%`;
    document.getElementById('win-streak').innerText = `Current Win Streak: ${winStreak}`;
    document.getElementById('best-win-streak').innerText = `Best Win Streak: ${bestWinStreak}`;
    document.getElementById('user-input').value = "";
}

function tryAgain() {
    let userAnswer = document.getElementById('try-again-user-input').value.trim();
    userAnswer = userAnswer.replace(/ |[\[{()}\]]/g, "");
    if (JSON.stringify(userAnswer) === JSON.stringify(traversals[toGuess].join(','))) {
        document.getElementById('answer-container').style.display = "block";
        document.getElementById('answer-selection').style.display = "none";
        document.getElementById('try-again-user-input').style.display = "none";
        document.getElementById('try-again-button').style.display = "none";
        document.getElementById('solution').style.color = "#0fa328";
        document.getElementById('solution').innerText = `Correct (Answer: ${traversals[toGuess].join(', ')})`;
        document.getElementById('continue-button-container').style.display = "block";
        document.getElementById('show-answer-container').style.display = "none";
        document.getElementById('show-tree-container').style.display = "none";
        showTreeDiagram();
        return;
    }
    document.getElementById('try-again-user-input').value = "";
}

function showAnswer() {
    document.getElementById('solution').innerText = `Answer: ${traversals[toGuess].join(', ')}`;
}

function showTreeDiagram() {
    document.getElementById('tree-diagram-header').style.display = "block";
    document.getElementById('tree-diagram').innerText = treeDiagram;
}