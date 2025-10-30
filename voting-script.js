// Save this as voting-script.js
document.addEventListener('DOMContentLoaded', () => {
    const voteButtons = document.querySelectorAll('.vote-btn');
    const confirmationMessage = document.getElementById('confirmation-message');
    
    voteButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the candidate name from the button's data attribute
            const candidateName = button.getAttribute('data-candidate');

            // Show a native browser confirmation dialog
            const isConfirmed = confirm(`Are you sure you want to vote for ${candidateName}? \n\nThis action is final and cannot be undone.`);
            
            if (isConfirmed) {
                // Disable all buttons to prevent multiple votes
                voteButtons.forEach(btn => {
                    btn.disabled = true;
                    btn.textContent = 'Voted';
                });
                
                // Style the selected button
                button.textContent = 'Vote Cast!';
                button.classList.add('selected');
                
                // Show the final success message
                confirmationMessage.classList.remove('hidden');
            }
        });
    });
});
