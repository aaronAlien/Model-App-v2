const form = document.getElementById('item-form');
const successModal = document.getElementById('success-modal');
const successMessage = document.getElementById('success-message');
const searchForm = document.getElementById('search-form');

// Send an AJAX request upon submission
if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation(); // event bubbling - prevent triggering other events

    let formData = new FormData(form);

    fetch('/insert_item', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // create list
        let recentList = document.getElementById('recent-list');

        // add recent added to list
        data.forEach((item) => {
          let listItem = document.createElement('li');
          listItem.textContent = `Name: ${item.name}, Description: ${item.description}`;
          recentList.appendChild(listItem);
        });
      })
      .catch((error) => console.error('Error:', error));
  });
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  const column = document.getElementById('search-column').value;
  const searchTerm = document.getElementById('search-value').value;

  fetch(`/search_results?column=${column}&search_term=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = ''; // Clear the div

      data.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
          `;
        outputDiv.appendChild(card);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
