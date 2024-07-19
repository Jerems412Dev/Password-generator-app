const btn_span = document.querySelector("#btn_span");
const btn_copy = document.querySelector("#btn_copy");
const range = document.querySelector("#rangeContent");
const range_span = document.querySelector("#range_span");
const characterLengthNumber = document.querySelector("#characterLengthNumber");
const btn_elementList = document.querySelectorAll(".btn_elementList");
const strength_span = document.querySelectorAll(".strength_span");
const right_strength_text = document.querySelector(".right_strength_text");
const inputPasswordGenerated = document.querySelector("#inputPasswordGenerated");

let isDragging = false;
let includes = [false,false,false,false];

btn_elementList.forEach((element,index) => {
    element.addEventListener("click", function() {
        if(element.classList.contains("activate")) {
            element.classList.remove("activate");
            includes[index] = false;
        }else {
            element.classList.add("activate");
            includes[index] = true;
        }
      });
});

//for desktop range

btn_span.addEventListener('mousedown', (e) => {
    isDragging = true;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});
  
const onMouseMove = (e) => {
    if (!isDragging) return;
    const rect = range.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;   
    let rectWidth = rect.width -25; 
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rectWidth) offsetX = rectWidth;
    btn_span.style.left = `${offsetX}px`; 
    range_span.style.width = `${offsetX}px`; 
    const rangeValue = parseInt((offsetX / rectWidth) * 20);
    characterLengthNumber.innerText = `${rangeValue}`;
};
  
const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
};

range.addEventListener("click", (e) => {
  const rect = range.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  let rectWidth = rect.width -25; 
  if (offsetX < 0) offsetX = 0;
  if (offsetX > rectWidth) offsetX = rectWidth;
  btn_span.style.left = `${offsetX}px`; 
  range_span.style.width = `${offsetX}px`; 
  const rangeValue = parseInt((offsetX / rectWidth) * 20);
  characterLengthNumber.innerText = `${rangeValue}`;
});

//for mobile and tablet range

btn_span.addEventListener('touchstart', (e) => {
    isDragging = true;
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
});
  
const onTouchMove = (e) => {
    if (!isDragging) return;
    const rect = range.getBoundingClientRect();
    let offsetX = e.touches[0].clientX - rect.left;  
    let rectWidth = rect.width -25;  
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rectWidth) offsetX = rectWidth;
    btn_span.style.left = `${offsetX}px`; 
    range_span.style.width = `${offsetX}px`; 
    const rangeValue = parseInt((offsetX / rectWidth) * 20);
    characterLengthNumber.innerText = `${rangeValue}`;
};
  
const onTouchEnd = () => {
    isDragging = false;
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
};

function isGenerated() {
    return (parseInt(characterLengthNumber.innerText) > 0 && (includes[0] == true || includes[1] == true || includes[2] == true || includes[3] == true))? true : false;
}

function generate() {
    if(isGenerated()) {
        let includesCharacters = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz","1234567890","~`!@#$%^&*()_-=+\|]}[{';:,<.>/?"];
        let characters = "";
        for (let i = 0; i < includesCharacters.length; i++) {
            (includes[i])?characters += includesCharacters[i] : null;
        }
        let length = parseInt(characterLengthNumber.innerText);
        let result = "";
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
            counter += 1;
        }
        inputPasswordGenerated.value = result;
        inputPasswordGenerated.style.color = "#e6e5ea";
        btn_copy.innerText = "";
        strength();
    }else {
        btn_copy.innerText = "";
    }
}

function CopyText() {
    if(isGenerated() && inputPasswordGenerated.value.length > 0) {
        navigator.clipboard.writeText(inputPasswordGenerated.value);
        btn_copy.innerText = "COPIED";
    }
}

function strength() {
    cleanStrength();
    let rating = 0;
    for (let i = 0; i < includes.length; i++) {
        (includes[i])? rating += 3 : null;
    }
    rating += parseInt(characterLengthNumber.innerText)/2.5;
    if(rating > 0 && rating<= 5) {
        right_strength_text.innerText = "TOO WEAK !";
        strength_span[0].classList.add("activate","strength_one");
    }else if(rating > 5 && rating<= 12) {
        right_strength_text.innerText = "WEAK";
        for (let i = 0; i < 2; i++) {
            strength_span[i].classList.add("activate", "strength_two");
        }
    }else if(rating > 12 && rating<= 17) {
        right_strength_text.innerText = "MEDIUM";
        for (let i = 0; i < 3; i++) {
            strength_span[i].classList.add("activate", "strength_three");
        }
    }else if(rating > 17 && rating<= 20) {
        right_strength_text.innerText = "STRONG";
        for (let i = 0; i < 4; i++) {
            strength_span[i].classList.add("activate", "strength_four");
        }
    }else {
        right_strength_text.innerText = "NUL";
    }
}

function cleanStrength() {
    right_strength_text.innerText = "NUL";
    for (let i = 0; i < 4; i++) {
        strength_span[i].classList.remove("activate", "strength_four","strength_three","strength_two","strength_one");
    }
}
