
window.onload = function () {

function checkPassword() {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var error = document.getElementById('error');

    if (password !== confirmPassword) {
      error.textContent = 'Passwords do not match!';
    } else {
      error.textContent = '';
    }
}

};