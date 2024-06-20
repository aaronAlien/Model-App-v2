// Send an AJAX request when the form is submitted
document
  .getElementById('item-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    fetch('/insert_item', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the success message in the modal
        document.getElementById('success-message').innerHTML = data.message;
        document.getElementById('success-modal').style.display = 'block';

        // Automatically close the modal after 2 seconds
        setTimeout(function () {
          document.getElementById('success-modal').style.display = 'none';
        }, 2000); // 2 seconds
      })
      .catch((error) => console.error('Error:', error));
  });

document.getElementById('search-form').addEventListener('submit', (e) => {
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
