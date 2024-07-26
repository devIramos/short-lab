function generatePasswords() {
    const loader = document.getElementById('loader');
    const outputElement = document.getElementById('output');
    const modeElements = document.querySelectorAll('.modes input[type="checkbox"]:checked');
    
    if (modeElements.length === 0) {
        alert('Selecciona al menos un modo');
        return;
    }

    outputElement.innerHTML = ''; // Clear previous passwords
    loader.style.display = 'block';

    setTimeout(() => {
        const algorithm = document.getElementById('algorithm').value;
        const exclude = document.getElementById('exclude').value.split('');
        const numOfPass = parseInt(document.getElementById('numOfPass').value);
        const minPassLen = parseInt(document.getElementById('minPassLen').value);
        const maxPassLen = parseInt(document.getElementById('maxPassLen').value);

        let modes = {
            'S': false,
            'N': false,
            'C': false,
            'L': false
        };
        modeElements.forEach(el => {
            modes[el.value] = true;
        });

        const specialSymbols = "!@#$%^&*()_+[]{}|;:,.<>?/~`";
        const numerals = "0123456789";
        const capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";

        let passwordCharacters = '';

        if (modes.S) passwordCharacters += specialSymbols;
        if (modes.N) passwordCharacters += numerals;
        if (modes.C) passwordCharacters += capitals;
        if (modes.L) passwordCharacters += lowercase;

        passwordCharacters = passwordCharacters.split('').filter(char => !exclude.includes(char)).join('');

        function generatePassword(length) {
            let password = '';
            while (password.length < length) {
                const char = passwordCharacters.charAt(Math.floor(Math.random() * passwordCharacters.length));
                password += char;
            }
            return password;
        }

        let passwords = [];
        for (let i = 0; i < numOfPass; i++) {
            const passLen = Math.floor(Math.random() * (maxPassLen - minPassLen + 1)) + minPassLen;
            passwords.push(generatePassword(passLen));
        }

        passwords.forEach(password => {
            const passwordLine = document.createElement('div');
            passwordLine.className = 'password-line';
            passwordLine.innerText = password;
            passwordLine.onclick = () => copyToClipboard(password);
            outputElement.appendChild(passwordLine);
        });

        loader.style.display = 'none';
    }, 1500);
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert(`Contraseña copiada al portapales`);
}
