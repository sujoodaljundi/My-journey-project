document.addEventListener("DOMContentLoaded", () => {
    /***************************Current User************************/
    const email = localStorage.getItem("loggedInUserEmail");
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(user => user.email === email);
    console.log(user);

    /***************************Set User Data************************/
    document.getElementById("user-name").textContent = user.username;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-loc").textContent = user.country;
    document.getElementById("user-det-name").textContent = user.username;
    document.getElementById("user-det-email").textContent = user.email;

    /***************************Display Bookings************************/
    if (typeof user.bookings === "undefined") {
        user.bookings = [];
    }

    const bookings = user.bookings;

    const hotelContainer = document.querySelector('.hotels');
    const restaurantContainer = document.querySelector('.restaurants');


    if (bookings.length === 0) {
        hotelContainer.innerHTML = '<p>No hotel bookings found.</p>';
        restaurantContainer.innerHTML = '<p>No restaurant bookings found.</p>';
    } else {
        bookings.forEach((booking, index) => {
            const bookingItem = document.createElement('div');
            bookingItem.classList.add('booking-item');

            // Render Hotels
            if (booking.type === "hotel") {
                bookingItem.innerHTML = `
                    <h3 class="country-name">${booking.hotelName}</h3>
                    <p class="booking-date">Check-in: ${booking.checkIn}</p>
                    <p class="booking-date">Check-out: ${booking.checkOut}</p>
                    <p class="booking-description">
                    Booking for ${booking.adults} adult(s) and ${booking.children} child(ren).
                    </p>
                    <p>Total Price: ${booking.totalPrice}</p>
                    <div class="guest-info">
                        <div class="guest-card">
                            <p><strong>Adults:</strong> ${booking.adults}</p>
                            <p><strong>Children:</strong> ${booking.children}</p>
                        </div>
                    </div>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                `;
                hotelContainer.appendChild(bookingItem);
            }

            // Render Restaurants
            if (booking.type === "restaurant") {
                bookingItem.innerHTML = `
                    <h3 class="rest-name">${booking.name}</h3>
                    <p class="rest-rating">Rating: ${booking.rating} ⭐</p>
                    <p class="rest-address">Address: ${booking.address}</p>
                    <p class="rest-hours">Opening Hours: ${booking.hours}</p>
                    <p>Booking Time: ${booking.bookTime}</p>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                `;
                restaurantContainer.appendChild(bookingItem);
            }


            const deleteButton = bookingItem.querySelector('.delete-btn');
            if (deleteButton) {
                deleteButton.style.cursor = 'pointer';
                deleteButton.style.padding = '10px 20px';
                deleteButton.style.border = 'none';
                deleteButton.style.backgroundColor = '#6998AB';
                deleteButton.style.borderRadius = '5px';
                deleteButton.style.color = 'white';

                deleteButton.addEventListener('mouseover', () => {
                    deleteButton.style.backgroundColor = '#f5f5f5';
                    deleteButton.style.color = '#6998AB';
                    deleteButton.style.transform = 'scale(1.05)';
                    deleteButton.style.transition = 'background-color 0.3s ease, transform 0.2s';
                });

                deleteButton.addEventListener('mouseout', () => {
                    deleteButton.style.backgroundColor = '#6998AB';
                    deleteButton.style.color = 'white';
                    deleteButton.style.transform = 'scale(1)';
                });

                deleteButton.addEventListener('mousedown', () => {
                    deleteButton.style.transform = 'scale(0.95)';
                });

                deleteButton.addEventListener('mouseup', () => {
                    deleteButton.style.transform = 'scale(1)';
                });
            }
        });

        /*****************************************Delete Booked info*************************************/
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const email = localStorage.getItem('loggedInUserEmail');
                const users = JSON.parse(localStorage.getItem('users'));
                const user = users.find(u => u.email === email);

                if (user) {
                    const index = event.target.dataset.index;
                    if (user.bookings && user.bookings.length > 0) {
                        Swal.fire({
                            title: 'Booking Deleted!',
                            html: `
                        <p>Your Deletion is Succesful.</p>
                    `,
                            icon: 'success',
                            confirmButtonText: 'Okay'
                        });
                        user.bookings.splice(index, 1);
                        localStorage.setItem('users', JSON.stringify(users));

                        event.target.parentElement.remove();


                        if (user.bookings.length === 0) {
                            hotelContainer.innerHTML = '<p>No hotel bookings found.</p>';
                            restaurantContainer.innerHTML = '<p>No restaurant bookings found.</p>';
                        }
                    }
                } else {
                    console.error('User not found');
                }
            });
        });
    }
});
