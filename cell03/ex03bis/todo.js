$(document).ready(function() {
    const $ftList = $('#ft_list');

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

    function saveList() {
        const items = [];
        $ftList.children('div').each(function() {
            items.push($(this).text());
        });
        setCookie('todo_list', JSON.stringify(items), 7);
    }

    function createTodoItem(text) {
        const $todoDiv = $('<div></div>').text(text);
        $todoDiv.click(function() {
            if (confirm('Do you really want to remove this TO DO?')) {
                $(this).remove();
                saveList();
            }
        });
        return $todoDiv;
    }

    function addTodo(text) {
        if (!text || $.trim(text) === '') return;
        const $item = createTodoItem(text);
        $ftList.prepend($item);
        saveList();
    }

    function loadList() {
        const saved = getCookie('todo_list');
        if (saved) {
            try {
                const items = JSON.parse(saved);
                for (let i = items.length - 1; i >= 0; i--) {
                    const $item = createTodoItem(items[i]);
                    $ftList.append($item);
                }
            } catch (e) {
                console.error("Error parsing todo cookie", e);
            }
        }
    }

    $('#new_btn').click(function() {
        const text = prompt('Enter a new TO DO:');
        if (text !== null) {
            addTodo(text);
        }
    });

    loadList();
});
