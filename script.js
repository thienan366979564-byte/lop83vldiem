document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const loginSection = document.getElementById('login-section');
    const adminSection = document.getElementById('admin-section');
    const historySection = document.getElementById('history-section');
    const scoreTableBody = document.getElementById('score-table-body');
    const addStudentForm = document.getElementById('add-student-form');
    const addMessage = document.getElementById('add-message');
    const historyList = document.getElementById('history-list');

    let scores = JSON.parse(localStorage.getItem('scores')) || [
        { name: 'Nguyễn Văn A', score: 9.5 },
        { name: 'Trần Thị B', score: 8.0 }
    ];
    let history = JSON.parse(localStorage.getItem('history')) || [];
    const ADMIN_USER = 'admin83';
    const ADMIN_PASS = 'admin123admin';

    function renderScores() {
        scoreTableBody.innerHTML = '';
        scores.sort((a, b) => b.score - a.score); // Sắp xếp giảm dần
        scores.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${student.name}</td><td>${student.score}</td>`;
            scoreTableBody.appendChild(row);
        });
    }

    function renderHistory() {
        historyList.innerHTML = '';
        history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            historyList.appendChild(li);
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem('scores', JSON.stringify(scores));
        localStorage.setItem('history', JSON.stringify(history));
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === ADMIN_USER && password === ADMIN_PASS) {
            loginSection.classList.add('hidden');
            adminSection.classList.remove('hidden');
            historySection.classList.remove('hidden');
            loginMessage.textContent = 'Đăng nhập thành công!';
        } else {
            loginMessage.textContent = 'Sai tên đăng nhập hoặc mật khẩu!';
        }
    });

    addStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('student-name').value;
        const score = parseFloat(document.getElementById('student-score').value);
        const reason = document.getElementById('reason').value;

        let existingStudent = scores.find(student => student.name === name);
        if (existingStudent) {
            const oldScore = existingStudent.score;
            existingStudent.score = score;
            history.push(`${new Date().toLocaleString()}: Cập nhật điểm cho "${name}" từ ${oldScore} lên ${score}. Lý do: ${reason}.`);
        } else {
            scores.push({ name: name, score: score });
            history.push(`${new Date().toLocaleString()}: Thêm học sinh mới "${name}" với điểm số ${score}. Lý do: ${reason}.`);
        }
        
        saveToLocalStorage();
        renderScores();
        renderHistory();
        addStudentForm.reset();
        addMessage.textContent = 'Cập nhật thành công!';
    });

    // Khởi tạo trang web
    renderScores();
    renderHistory();
});