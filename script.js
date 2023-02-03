let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '*', '/'];

const out = document.querySelector('.calc_screen p');

function clearAll () {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

function changeSign () {
    if (sign === '+') {
        sign = '-';
    }
    else {
        sign = '+';
    }
    out.textContent = 0;
}

function calcPercents () {
    if (b === '') {
        a = '';
    }
    else {
        b = (+a) * (+b) / 100;
        out.textContent = b;
    }
}

document.querySelector('.ac').onclick = clearAll;
document.querySelector('.plus-minus').onclick = changeSign;
document.querySelector('.percent').onclick = calcPercents;

document.querySelector('.calc_btns').onclick = (event) => {
    if (!event.target.classList.contains('calc_btns-item')) return;
    if (event.target.classList.contains('ac')) return;

    out.textContent = '';

    const key = event.target.textContent;

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
        } 
        else if (a !== '' && b!== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        }
        else {
            b += key;
            out.textContent = b;
        }
        return;
    }

    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        return;
    }

    if (key === '=') {
        switch (sign) {
            case '+':
                a = (+a) + (+b);
                break;
            case '-':
                a = (+a) - (+b);
                break;
            case '*':
                a = (+a) * (+b);
                break;
            case '/':
                if (b === '0') {
                    out.textContent = 'На ноль делить нельзя!';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                else {
                    a = (+a) / (+b);
                }
        }
        finish = true;
        out.textContent = a;
    }
}

