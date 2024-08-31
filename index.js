
// select action elements
const textInput = document.getElementById('text-input');
const countBtn = document.getElementById('count-btn');
const copyBtn = document.getElementById('copy-btn');
const pasteBtn = document.getElementById('paste-btn');
const wordCountDisplay = document.getElementById('word-count');
const uniqueKeywordsDisplay = document.getElementById('unique-keywords');

// envent added
countBtn.addEventListener('click', CheckKeywords);
textInput.addEventListener('keypress', pressEnter);
window.addEventListener('keypress', pressEnter);

// press enter when call action
function pressEnter(e) {
    if(e.key === 'Enter'){
        CheckKeywords();
    }
}

// keywords check
function CheckKeywords() {
    const text = textInput.value.trim();
    const wordCount = text.split(/\s+/).filter(word => word !== '').length;
    
    // Get unique keywords
    const keywordsArray = text.split(',').map(keyword => keyword.trim()).filter(keyword => keyword !== '');
    const uniqueKeywords = [...new Set(keywordsArray)];

    // Update text area to only show unique keywords
    textInput.value = uniqueKeywords.join(', ');

    // Display word count and unique keyword count
    wordCountDisplay.innerHTML = `<p id="word-count" class="text-sm font-bold mb-2">Word Count: <span class="text-red-500">${wordCount}</span></p>`;
    // wordCountDisplay.textContent = `Word Count: ${wordCount}`;
    uniqueKeywordsDisplay.innerHTML = `<p id="unique-keywords" class="text-sm font-bold mb-2">Unique Keywords: <span class="text-green-500">${uniqueKeywords.length}</span></p>`;
    // uniqueKeywordsDisplay.textContent = `Unique Keywords: ${uniqueKeywords.length}`;
}

// copy button action
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(textInput.value).then(() => {
        // Show Toastify copy successful message
        Toastify({
            text: "Keywords copy ",
            duration: 3000, // 3 seconds
            close: true,
            gravity: "top", // top or bottom
            position: "center", // left, center, or right
            backgroundColor: "#28a745",
            stopOnFocus: true // Prevents dismissing of toast on hover
        }).showToast();
    });
});

// paste button action
pasteBtn.addEventListener('click', () => {
    navigator.clipboard.readText().then(text => {
        textInput.value = text;
    });
});
