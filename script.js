function typeWriter() {
    const lines = document.querySelectorAll('.poem-line');
    let lineIndex = 0;
    let charIndex = 0;
    
    function typeLine() {
        if (lineIndex >= lines.length) {
            const lastLine = lines[lines.length - 1];
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            lastLine.appendChild(cursor);
            return;
        }
        
        const currentLine = lines[lineIndex];
        const text = currentLine.textContent;
        currentLine.textContent = '';
        currentLine.style.visibility = 'visible';
        
        function typeChar() {
            if (charIndex < text.length) {
                const char = document.createTextNode(text[charIndex]);
                const span = document.createElement('span');
                span.appendChild(char);
                span.className = 'visible-char';
                currentLine.appendChild(span);
                charIndex++;
                setTimeout(typeChar, 50); // Speed of typing
            } else {
                charIndex = 0;
                lineIndex++;
                setTimeout(typeLine, 500); // Delay between lines
            }
        }
        
        typeChar();
    }
    
    typeLine();
}

// Start the animation when page loads
window.addEventListener('load', typeWriter);