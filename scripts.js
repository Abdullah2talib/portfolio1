// Handle form submission with Fetch API
document.querySelector('.form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(this);

    // Send form data using Fetch API
    const response = await fetch('/submit-form', {
        method: 'POST',
        body: new URLSearchParams(formData)
    });

    // Check if submission was successful
    if (response.ok) {
        alert('Form submitted successfully!');
        this.reset(); // Reset the form fields
    } else {
        alert('An error occurred while submitting the form. Please try again.');
    }
});