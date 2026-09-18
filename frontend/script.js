const BACKEND_URL = 'http://localhost:5001/api/users';

// Функция загрузки списка пользователей
async function fetchUsers() {
    const listElement = document.getElementById('users-list');
    try {
        const response = await fetch(BACKEND_URL);
        if (!response.ok) throw new Error('Ошибка ответа сервера');
        
        const users = await response.json();
        if (users.length === 0) {
            listElement.innerHTML = '<li>База данных пуста</li>';
            return;
        }
        
        listElement.innerHTML = users.map(user => `
            <li>
                <span>👤 ${user.name}</span>
                <span style="color: #7f8c8d; font-weight: normal;">${user.role}</span>
            </li>
        `).join('');
    } catch (error) {
        listElement.innerHTML = `<li style="color: #e74c3c; border-left-color: #e74c3c;">Не удалось подключиться к бэкенду.</li>`;
        console.error('API Error:', error);
    }
}

// ОБРАБОТЧИК НАЖАТИЯ КНОПКИ (ОТПРАВКА В БД)
document.getElementById('add-user-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Чтобы страница не перезагружалась

    const nameInput = document.getElementById('user-name');
    const roleInput = document.getElementById('user-role');

    const newUser = {
        name: nameInput.value,
        role: roleInput.value
    };

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            // Очищаем поля ввода
            nameInput.value = '';
            roleInput.value = '';
            // СРАЗУ обновляем список на экране, запрашивая свежие данные из БД
            await fetchUsers();
        } else {
            alert('Не удалось добавить пользователя');
        }
    } catch (error) {
        console.error('Error adding user:', error);
        alert('Ошибка соединения с бэкендом');
    }
});

// Первая загрузка при старте страницы
fetchUsers();
