// แจ้งเตือน 'Please, use me...' ทุกๆ 30 วินาที
setInterval(function() {
    alert('Please, use me...');
}, 30000);

document.getElementById('calcForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const leftStr = document.getElementById('left').value.trim();
    const op = document.getElementById('op').value;
    const rightStr = document.getElementById('right').value.trim();

    // ฟังก์ชันตรวจสอบว่าเป็นจำนวนเต็มบวก (>= 0) หรือไม่
    const isPositiveInteger = (str) => /^\d+$/.test(str);

    if (!isPositiveInteger(leftStr) || !isPositiveInteger(rightStr)) {
        alert('Error :(');
        return;
    }

    const leftNum = parseInt(leftStr, 10);
    const rightNum = parseInt(rightStr, 10);

    // ตรวจสอบการหารหรือโมดูโลด้วย 0
    if ((op === '/' || op === '%') && rightNum === 0) {
        alert("It's over 9000!");
        console.log("It's over 9000!");
        return;
    }

    let result;
    switch (op) {
        case '+':
            result = leftNum + rightNum;
            break;
        case '-':
            result = leftNum - rightNum;
            break;
        case '*':
            result = leftNum * rightNum;
            break;
        case '/':
            result = leftNum / rightNum;
            break;
        case '%':
            result = leftNum % rightNum;
            break;
    }

    alert(result);
    console.log(result);
});
