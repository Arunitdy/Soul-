
//line rendering

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
                setTimeout(typeChar, 50);
            } else {
                charIndex = 0;
                lineIndex++;
                setTimeout(typeLine, 500); 
            }
        }
        
        typeChar();
    }
    
    typeLine();
}
window.addEventListener('load', typeWriter);

//Yes or No

document.querySelectorAll(".answer").forEach(item=>{
    item.addEventListener('click',response);
});
function response(event){
    const result = event.target.innerHTML;
    console.log(result);
    
   // sendmail(result);
    if(result.includes("yes")){
        //fall 
       setInterval(createSnowflake, 300);

       console.log('maile');
       // Create a new div for the mail section
       const mailDiv = document.createElement("div");
       mailDiv.classList.add("mail");

       // Create and append the close button
       const closeButton = document.createElement("button");
       closeButton.classList.add("closebutton");
       closeButton.innerHTML = "&times;";
       closeButton.onclick = closeMail;
       mailDiv.appendChild(closeButton);

       // Create and append the input box
       const mailInput = document.createElement("input");
       mailInput.classList.add("mailBox");
       mailInput.type = "text";
       mailInput.placeholder = "Do you have anything for your boyfriend?";
       mailDiv.appendChild(mailInput);

       // Create and append the send button
       const sendButton = document.createElement("button");
       sendButton.classList.add("send_button");
       sendButton.innerHTML = "Send";
       sendButton.onclick = mailSend;
       mailDiv.appendChild(sendButton);

       // Append the newly created mail div to the body
       document.body.insertBefore(mailDiv, document.body.firstChild); // Insert at the start

    }
}

// close mail function
function closeMail(){
    const mailDiv = document.querySelector(".mail");
    mailDiv.remove();  // Remove the mail div from the DOM
    console.log("Mail section closed");
 }
// mail send function
function mailSend(){
   console.log("mailSend start");
   sendmail(document.querySelector(".mailBox").value);
   
   console.log("mailSend end");
   closeMail();

}

//mail api
function sendmail(a){
    let parms={
        name:"soul",
        email:"arunmumdakkal2003@gmail.com",
        subject:"love",
        message:a
    }
   const r= emailjs.send("service_g5rz57g","template_ew8u8u5",parms).then(alert("mail send"));
    console.log(r);
}

//rain
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snow');
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 6 + 's';
    snowflake.innerHTML = "🩷";
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 9000);
}

