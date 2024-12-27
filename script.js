document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const phone = document.getElementById('phone').value;
    const photo = document.getElementById('photo').files[0];

    if (!photo) {
        alert('Please upload a photo.');
        return;
    }

    // Convert photo to Base64
    const reader = new FileReader();
    reader.onload = async function () {
        const photoBase64 = reader.result;

        // Prepare data for GitHub
        const data = {
            name: name,
            dob: dob,
            phone: phone,
            photo: photoBase64,
        };

        try {
            // Replace the placeholders with your GitHub details
            const GITHUB_TOKEN = 'your_github_token';
            const REPO_NAME = 'your_repo_name';
            const USERNAME = 'your_github_username';

            const response = await fetch(
                `https://api.github.com/repos/${USERNAME}/${REPO_NAME}/contents/data/${Date.now()}.json`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${GITHUB_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: 'Added new user data',
                        content: btoa(JSON.stringify(data)),
                    }),
                }
            );

            if (response.ok) {
                alert('Details submitted successfully!');
            } else {
                alert('Failed to submit details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };
    reader.readAsDataURL(photo);
});