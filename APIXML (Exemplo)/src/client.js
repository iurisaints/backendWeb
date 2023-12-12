document.addEventListener('DOMContentLoaded', () => {
    const userListElement = document.getElementById('userList');
  
    fetch('http://localhost:3000/api/users')
      .then(response => response.json())
      .then(data => {
        const users = data.users.user;
  
        users.forEach(user => {
          const listItem = document.createElement('li');
          listItem.textContent = `ID: ${user.id}, Nome: ${user.name}, Email: ${user.email}`;
          userListElement.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Erro ao obter a lista de usuários:', error);
      });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const userListElement = document.getElementById('userList');
  
    fetch('http://localhost:3000/api/users')
      .then(response => response.json())
      .then(data => {
        const users = data.users.user;
  
        users.forEach(user => {
          const listItem = document.createElement('li');
          listItem.textContent = `ID: ${user.id}, Nome: ${user.name}, Email: ${user.email}`;
          userListElement.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Erro ao obter a lista de usuários:', error);
      });
  });
    