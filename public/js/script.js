document.addEventListener('DOMContentLoaded',function () {
    const searchBtn=document.querySelector('.searchBtn');
    const searchBar=document.querySelector('.searchBar');
    // const searchInput=document.getElementById('.searchInput');
    const searchClose=document.getElementById('searchClose');
     
    searchBtn.addEventListener('click',function(){
                searchBar.style.visibility = 'visible';
                searchBar.classList.add('open');
                this.setAttribute('aria-expanded','true');
            })
            searchClose.addEventListener('click', function () {
                searchBar.style.visibility = 'hidden';
                searchBar.classList.remove('open');
                searchBar.classList.add('close');
                this.setAttribute('aria-expanded', 'false');
            });
            
})


const deleteButtons = document.querySelectorAll('.btn-delete');
const confirmationModal = document.getElementById('confirmationModal');
const successModal = document.getElementById('successModal');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');
const closeSuccess = document.getElementById('closeSuccess');

let currentPostId = null;

// Open confirmation modal
deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentPostId = button.getAttribute('data-id'); // Get the post ID from the button
    console.log(currentPostId);
    
    confirmationModal.classList.remove('hidden'); // Show confirmation modal
  });
});

// Confirm delete action
confirmDelete.addEventListener('click', async () => {
  try {
    const response = await fetch(`/post-delete/${currentPostId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.message); // Success message

      confirmationModal.classList.add('hidden'); // Hide confirmation modal
      successModal.classList.remove('hidden'); // Show success modal
    } else {
      const error = await response.json();
      alert(error.error || 'Failed to delete the post.');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    alert('Something went wrong. Please try again.');
  }
});

// Cancel deletion
cancelDelete.addEventListener('click', () => {
  confirmationModal.classList.add('hidden');
});

// Close success modal
closeSuccess.addEventListener('click', () => {
  successModal.classList.add('hidden');
  window.location.reload(); // Reload to reflect changes
});




// document.addEventListener("DOMContentLoaded", () => {
//   const chatMessages = document.getElementById("chatMessages");
//   const chatForm = document.getElementById("chatForm");
//   const messageInput = document.getElementById("messageInput");

//   // Mock function to simulate receiving a message
//   const receiveMessage = (text) => {
//       const messageDiv = document.createElement("div");
//       messageDiv.classList.add("message", "received");
//       messageDiv.textContent = text;
//       chatMessages.appendChild(messageDiv);
//       chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
//   };

//   // Handle form submission
//   chatForm.addEventListener("submit", (e) => {
//       e.preventDefault();

//       // Get the message text
//       const messageText = messageInput.value.trim();

//       if (messageText === "") return;

//       // Display sent message
//       const messageDiv = document.createElement("div");
//       messageDiv.classList.add("message", "sent");
//       messageDiv.textContent = messageText;
//       chatMessages.appendChild(messageDiv);

//       // Scroll to the latest message
//       chatMessages.scrollTop = chatMessages.scrollHeight;

//       // Clear the input field
//       messageInput.value = "";

//       // Simulate receiving a response after a delay
//       setTimeout(() => {
//           receiveMessage("This is a response message!");
//       }, 1000);
//   });
// });
// // const chatBtn= document.getElementById("chatBtn");
// const chatBtn = document.getElementById("chatBtn");

// chatBtn.onclick = () => {
//   // Get the query parameter 'id' from the URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const id = urlParams.get('id'); // This gets the value of the 'id' query parameter
  
//   console.log(id); // Log the id to the console
// };

  
// //   res.render('/chatdashboard', { locals,id, layout: chatLayout });
  
// // }