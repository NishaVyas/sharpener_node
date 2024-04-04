document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('expenseForm');
    form.addEventListener('submit', handleFormSubmit);
    fetchExpenses();
  });
  
  function handleFormSubmit(event) {
    event.preventDefault();
    
    const amount = document.getElementById('expenseamount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
  
    fetch('/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, description, category }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create expense');
      }
      return response.json();
    })
    .then(data => {
      const li = document.createElement('li');
      li.textContent = `${data.id}: $${amount} - ${description} (${category})`;
      document.getElementById('expenseList').appendChild(li);
    })
    .catch(error => console.error('Error:', error));
  }
  
  function fetchExpenses() {
    fetch('/expenses')
    .then(response => response.json())
    .then(data => {
      const expenseList = document.getElementById('expenseList');
      data.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.id}: $${expense.amount} - ${expense.description} (${expense.category})`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
          deleteExpense(expense.id, li);
        });
        
        li.appendChild(deleteBtn);
        expenseList.appendChild(li);
      });
    })
    .catch(error => console.error('Error:', error));
  }
  
  function deleteExpense(id, element) {
    fetch(`/expenses/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      element.remove();
    })
    .catch(error => console.error('Error:', error));
  }
  