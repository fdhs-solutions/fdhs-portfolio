const typingElement = document.querySelector('.typing-animation');
const roles = ['Creators', 'Developers', 'Visionaries', 'Innovators', 'Techies', 'Programmers', 'Designers'];
let roleIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < roles[roleIndex].length) {
        typingElement.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 120);
    } else {
        setTimeout(erase, 2000);
    }
}
function erase() {
    if (charIndex > 0) {
        typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 60);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 600);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});
