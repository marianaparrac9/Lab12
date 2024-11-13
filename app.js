document.addEventListener('DOMContentLoaded', loadContacts);

const form = document.getElementById('contactForm');
const contactsContainer = document.getElementById('contactsContainer');
let editingIndex = null;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();

  if (name === '' || phone === '') {
    alert('Por favor, completa los campos de Nombre y Teléfono.');
    return;
  }

  const newContact = { name, phone, email, address };
  let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

  if (editingIndex !== null) {
    contacts[editingIndex] = newContact;
    editingIndex = null;
  } else {
    contacts.push(newContact);
  }

  localStorage.setItem('contacts', JSON.stringify(contacts));
  form.reset();
  loadContacts();
});

function loadContacts() {
  contactsContainer.innerHTML = '';
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

  contacts.forEach((contact, index) => {
    const contactCard = document.createElement('div');
    contactCard.classList.add('contact-card');

    contactCard.innerHTML = `
      <div class="contact-info">
        <p><strong>${contact.name}</strong></p>
        <p>Tel: ${contact.phone}</p>
        <p>Email: ${contact.email || 'N/A'}</p>
        <p>Dirección: <br> ${contact.address || 'N/A'}</p>
      </div>
      <div class="contact-actions">
        <button onclick="editContact(${index})">Editar</button>
        <button class="delete" onclick="deleteContact(${index})">Eliminar</button>
      </div>
    `;

    contactsContainer.appendChild(contactCard);
  });
}

function editContact(index) {
  const contacts = JSON.parse(localStorage.getItem('contacts'));
  const contact = contacts[index];

  document.getElementById('name').value = contact.name;
  document.getElementById('phone').value = contact.phone;
  document.getElementById('email').value = contact.email;
  document.getElementById('address').value = contact.address;
  editingIndex = index;
}

function deleteContact(index) {
  let contacts = JSON.parse(localStorage.getItem('contacts'));
  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  loadContacts();
}
