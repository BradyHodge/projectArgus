const signInForm = document.getElementById('signInForm');
        const video = document.getElementById('video');
        const closeBtn = document.getElementById('closeBtn');
        const takePictureBtn = document.getElementById('takePictureBtn');
        const canvas = document.getElementById('canvas');
        const photo = document.getElementById('photo');
        const usernameInput = document.getElementById('username');
        const acceptBtn = document.getElementById('acceptBtn');

        signInForm.addEventListener('submit', (event) => {
            event.preventDefault();
            signInForm.style.display = 'none';
            video.style.display = 'block';
            closeBtn.style.display = 'block';
            takePictureBtn.style.display = 'block';

            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    video.srcObject = stream;
                    video.onloadedmetadata = () => {
                        video.play();
                    };
                })
                .catch(err => {
                    console.error('Error accessing camera:', err);
                    alert('Error accessing camera. Please try again.');
                    signInForm.style.display = 'block';
                    video.style.display = 'none';
                    closeBtn.style.display = 'none';
                    takePictureBtn.style.display = 'none';
                });
        });

        closeBtn.addEventListener('click', () => {
            video.style.display = 'none';
            closeBtn.style.display = 'none';
            takePictureBtn.style.display = 'none';
            signInForm.style.display = 'block';
            video.srcObject.getTracks().forEach(track => track.stop());
        });

        takePictureBtn.addEventListener('click', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            photo.src = canvas.toDataURL('image/png');
            photo.style.display = 'block';
            acceptBtn.style.display = 'block';
        });

        acceptBtn.addEventListener('click', () => {
            const photo64 = photo.src.split(',')[1];
            console.log(photo64);
            const username = usernameInput.value;
            console.log(username);
            submitUser(username, photo64);
        });

        function submitUser(username, base64Photo) {
            const apiUrl = '';
            const data = {
                username: username,
                photo: base64Photo,
            };
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
           .then(response => response.json())
           .then(data => {
                console.log('Success:', data);
            })
           .catch((error) => {
                console.error('Error:', error);
            });
        }

