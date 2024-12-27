document.getElementById('submitButton').addEventListener('click', function () {
    const name = document.getElementById('nameInput').value;
    if (name.trim() !== '') {
        document.getElementById('greeting').textContent = `Hello ${name}!`;
    } else {
        document.getElementById('greeting').textContent = 'Please enter your name!';
    }
});