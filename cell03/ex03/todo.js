const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

// ฟังก์ชันจัดการ Cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

// บันทึกรายการทั้งหมดลงใน Cookie
function saveList() {
    const items = [];
    const todoDivs = ftList.querySelectorAll('div');
    todoDivs.forEach(div => {
        items.push(div.textContent);
    });
    setCookie('todo_list', JSON.stringify(items), 7);
}

// ฟังก์ชันสร้าง TO DO Item ใหม่ไว้ด้านบนสุด
function addTodo(text) {
    if (!text || text.trim() === '') return;

    const todoDiv = document.createElement('div');
    todoDiv.textContent = text;

    // ลบรายการเมื่อคลิก
    todoDiv.addEventListener('click', function() {
        if (confirm('Do you really want to remove this TO DO?')) {
            todoDiv.remove();
            saveList();
        }
    });

    // แทรกไว้ด้านบนสุดของ ft_list
    ftList.insertBefore(todoDiv, ftList.firstChild);
    saveList();
}

// โหลดรายการจาก Cookie เมื่อเปิดหน้าเว็บ
function loadList() {
    const saved = getCookie('todo_list');
    if (saved) {
        try {
            const items = JSON.parse(saved);
            // โหมดย้อนกลับเพื่อรักษาลำดับเดิม
            for (let i = items.length - 1; i >= 0; i--) {
                const todoDiv = document.createElement('div');
                todoDiv.textContent = items[i];
                todoDiv.addEventListener('click', function() {
                    if (confirm('Do you really want to remove this TO DO?')) {
                        todoDiv.remove();
                        saveList();
                    }
                });
                ftList.appendChild(todoDiv);
            }
        } catch (e) {
            console.error("Error parsing todo cookie", e);
        }
    }
}

// คลิกปุ่ม New เพื่อเปิด Prompt
newBtn.addEventListener('click', function() {
    const text = prompt('Enter a new TO DO:');
    if (text !== null) {
        addTodo(text);
    }
});

// เรียกทำงานเมื่อโหลดหน้า
loadList();
