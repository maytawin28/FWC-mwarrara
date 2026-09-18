const balloon = document.getElementById('balloon');

let size = 200;
const colors = ['red', 'green', 'blue'];
let colorIndex = 0;

function updateBalloon() {
    balloon.style.width = size + 'px';
    balloon.style.height = size + 'px';
    balloon.style.backgroundColor = colors[colorIndex];
}

// เมื่อคลิกที่ลูกโป่ง
balloon.addEventListener('click', function() {
    size += 10;
    colorIndex = (colorIndex + 1) % colors.length; // สลับสีตามลำดับ: red -> green -> blue

    // หากขนาดมากกว่า 420px ลูกโป่งจะระเบิดและรีเซ็ตกลับเป็นขนาดเดิม
    if (size > 420) {
        size = 200;
        colorIndex = 0;
    }

    updateBalloon();
});

// เมื่อเลื่อนเมาส์ออกจากลูกโป่ง
balloon.addEventListener('mouseleave', function() {
    size = Math.max(200, size - 5); // หดลง 5px (ห้ามต่ำกว่า 200px)
    colorIndex = (colorIndex - 1 + colors.length) % colors.length; // สลับสีข้อนกลับ: red -> blue -> green

    updateBalloon();
});
