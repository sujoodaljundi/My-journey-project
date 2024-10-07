"use strict"


const apiKey = "541762d6602b4cced6df30433a317bd5a27307ac3f57154b6aebde96ad2c311e";

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const countryName = getQueryParam('country');

/********************************************************************************************* */

document.addEventListener("DOMContentLoaded", getData);

document.querySelector(".filter-btn").addEventListener('click', getData);
document.querySelector(".foodButton").addEventListener('click', getFoods);

async function getData(hotelName = countryName, checkIn = "2024-10-10", checkOut = "2024-10-20", adults = 1, children = 0) {
    const apiUrl = `https://serpapi.com/search.json?engine=google_hotels&q=${encodeURIComponent(hotelName)}&check_in_date=${checkIn}&check_out_date=${checkOut}&adults=${adults}&children=${children}&currency=JOD&gl=us&hl=en&api_key=${apiKey}&q=${countryName}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        const result = data.properties || [];

        console.log(result);

        let divHtml = document.querySelector(".resort-list");


        if (result.length === 0) {
            divHtml.innerHTML = `<p>No Hotels Available</p>`;
        } else {
            const divContent = result.map(function (element) {

                const hotelData = {
                    name: element.name,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    adults: adults,
                    children: children,
                    total_rate: element.total_rate?.lowest || "JOD 400",
                    type: "hotel"
                };

                return `
                    <div class="resort-item">
                        <h2 class="hotel-name">${element.name ? element.name : ""}</h2>
                        <img src="${element.images[1]?.original_image || element.images[2]?.original_image}" alt="${element.name}" class="resort-img">
                        <div class="resort-details">
                            <p>Rating: ⭐ ${element.overall_rating || "N/A"}</p>
                            <ul class="amenities">
                                <li>${element.amenities && element.amenities.length > 5 ? element.amenities[5] : ""}</li>
                                <li>${element.amenities && element.amenities.length > 1 ? element.amenities[1] : ""}</li>
                            </ul>
                            <div class="price"> Price: ${element.total_rate?.lowest || "JOD 400"}</div>
                        </div>
                        <button class="view-btn" data-hotel='${JSON.stringify(hotelData)}'>Book Now</button>
                    </div>
                `;
            }).join("");


            divHtml.innerHTML = divContent;

            const bookNowButtons = divHtml.querySelectorAll(".view-btn");
            bookNowButtons.forEach(button => {
                button.addEventListener('click', (event) => {

                    const hotelData = JSON.parse(event.target.dataset.hotel);

                    const bookingDetails = {
                        hotelName: hotelData.name,
                        checkIn: hotelData.checkIn,
                        checkOut: hotelData.checkOut,
                        adults: hotelData.adults,
                        children: hotelData.children,
                        totalPrice: hotelData.total_rate.lowest ? hotelData.total_rate.lowest : "JOD 400",
                        bookTime: new Date().toLocaleString(),
                        type: "hotel"
                    };




                    const email = localStorage.getItem("loggedInUserEmail");
                    const users = JSON.parse(localStorage.getItem("users"));
                    const user = users.find(u => u.email === email);

                    if (user) {
                        let userBookings = user.bookings || [];
                        userBookings.push(bookingDetails);

                        user.bookings = userBookings;
                        localStorage.setItem("users", JSON.stringify(users));

                        Swal.fire({
                            title: 'Booking Confirmed!',
                            html: `
                        <p>You have successfully booked <strong>${bookingDetails.hotelName}</strong>.</p>
                        <p>Check-in: ${bookingDetails.checkIn}</p>
                        <p>Check-out: ${bookingDetails.checkOut}</p>
                        <p>Adults: ${bookingDetails.adults} | Children: ${bookingDetails.children}</p>
                        <p>Total Price: ${bookingDetails.totalPrice}</p>
                        <p>Booking Time: ${bookingDetails.bookTime}</p>
                    `,
                            icon: 'success',
                            confirmButtonText: 'Great'
                        });
                    } else {
                        console.error("User not found");
                    }
                });
            });
        }

    } catch (error) {
        console.error('Error fetching hotels:', error);
    }
}


document.getElementById('search-btn').addEventListener('click', function () {
    const hotelName = document.getElementById('hotel-name').value;
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;

    if (hotelName && checkIn && checkOut) {
        getData(hotelName, checkIn, checkOut, adults, children);
    } else {
        alert("Please fill in all fields.");
    }
});
/******************************************************************** */
async function getFoods() {
    const apiUrl = `https://serpapi.com/search.json?engine=google_food&q=restaurant&location=${countryName}&api_key=${apiKey}`;

    try {
        let response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        let data = await response.json();
        const result = data.local_results || [];
        console.log(data);

        let divHtml = document.querySelector(".resort-list");

        if (result.length === 0) {
            divHtml.innerHTML = `<p>No Restaurants Available</p>`;
        } else {
            let divContent = result.map(function (element) {

                const restData = {
                    name: element.title,
                    rating: element.rating || 'N/A',
                    address: element.address || 'No address available',
                    hours: element.hours || 'No hours available',
                    type: "restaurant"
                };

                return `
                    <div class="coffee-item">
                        <img src="${element.images?.[0] || 'default-image-url.jpg'}" alt="${element.title}" class="coffee-img">
                        <div class="coffee-details">
                            <h2 class="coffee-name">${element.title}</h2>
                            <p class="coffee-rating">${element.rating || 'N/A'} ⭐</p>
                            <p class="coffee-address">${element.address || 'No address available'}</p>
                            <p class="coffee-open">${element.hours || 'No hours available'}</p>
                            <div class="coffee-actions">
                                <button class="view-btn" data-rest='${JSON.stringify(restData)}'>Book Now</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join("");

            divHtml.innerHTML = divContent;


            const restButtons = divHtml.querySelectorAll(".view-btn");
            restButtons.forEach(button => {
                button.addEventListener('click', (event) => {

                    const restAdded = JSON.parse(event.target.dataset.rest);

                    const bookingDetails = {
                        name: restAdded.name,
                        rating: restAdded.rating,
                        address: restAdded.address,
                        hours: restAdded.hours,
                        bookTime: new Date().toLocaleString(),
                        type: "restaurant"
                    };

                    const email = localStorage.getItem("loggedInUserEmail");
                    const users = JSON.parse(localStorage.getItem("users"));
                    const user = users.find(u => u.email === email);

                    if (user) {
                        let userBookings = user.bookings || [];
                        userBookings.push(bookingDetails);

                        user.bookings = userBookings;
                        localStorage.setItem("users", JSON.stringify(users));

                        Swal.fire({
                            title: 'Booking Confirmed!',
                            html: `
                                <p>You have successfully booked <strong>${restAdded.name}</strong>.</p>
                                <p>Rating: ${restAdded.rating} ⭐</p>
                                <p>Address: ${restAdded.address}</p>
                                <p>Booking Time: ${bookingDetails.bookTime}</p>
                            `,
                            icon: 'success',
                            confirmButtonText: 'Great!'
                        });
                    } else {
                        console.error("User not found");
                    }
                });
            });
        }

    } catch (error) {
        console.error('Error fetching restaurants:', error);
        alert(`Error fetching restaurants: ${error.message}`);
    }
}
