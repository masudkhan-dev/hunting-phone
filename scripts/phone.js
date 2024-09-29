const loadPhone = async (searchValue = "p", isShowAll) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    );
    const data = await res.json();

    const phones = data.data;
    displayPhones(phones, isShowAll);
  } catch (error) {
    console.error("Found some error");
  }
};

// display the phones
const displayPhones = (phones, isShowAll) => {
  // 1. catch id
  const phoneContainer = document.getElementById("phone-container");
  // refresh the reload data
  phoneContainer.textContent = "";

  // search result ১২ টির বেশি হলে show all বাটন দেখাবে
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // display first 10 phones
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    //2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 w-72 shadow-xl`;
    // 3. set innerHTML
    phoneCard.innerHTML = `
            <figure>
                <img
                src="${phone.image}"
                alt="Shoes"
                />
            </figure>
            <div class="card-body text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <p>Price: 999$ </p>
                <div class="card-actions justify-center">
                    <button onclick='handleShowDetails("${phone.slug}"); show_details_modal.showModal()' class="btn btn-neutral">Show Detail</button>
                </div>
            </div>
    `;
    // 4. appendChild()
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpiiner(false);
};

// handle search
const handleSearch = (isShowAll) => {
  toggleLoadingSpiiner(true);

  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;

  loadPhone(searchValue, isShowAll);
};

// loading spinner
const toggleLoadingSpiiner = (isLoading) => {
  const loadingSpiiner = document.getElementById("loading-spinner");
  if (isLoading === true) {
    loadingSpiiner.classList.remove("hidden");
  } else {
    loadingSpiiner.classList.add("hidden");
  }
};

// handle show all
const handleShowAll = () => {
  handleSearch(true);
};

// show details
const handleShowDetails = async (id) => {
  console.log(id);

  // fetch single phn data
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phone/${id}`
    );
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
  } catch (error) {
    console.error("found single data fetching error");
  }
};

const showPhoneDetails = (phone) => {
  show_details_modal.showModal();
  console.log(phone);

  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
   <figure class = "flex justify-center items-center mt-2">
     <img src='${phone.image}' alt='${phone.brand}' />
   </figure>
    <p class='my-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.</p>
    <p class='my-2'>Storage: ${phone?.mainFeatures?.storage}</p>
    <p class='my-2'>Display Size: ${phone?.mainFeatures?.displaySize}</p>
    <p class='my-2'>Chipset: ${phone?.mainFeatures?.chipSet}</p>
    <p class='my-2'>Memory: ${phone?.mainFeatures?.memory}</p>
    <p class='my-2'>Slug: ${phone?.slug}</p>
    <p class='my-2'>Release Date: ${phone?.releaseDate}</p>
    <p class='my-2'>Brand: ${phone?.brand}</p>
    <p class='my-2'>GPS: ${phone?.others?.GPS || "No GPS aviable"}</p>
    <p class='my-2'>GPS: ${
      phone?.others?.GPS ? phone?.others?.GPS : "No GPS aviable"
    }</p>

  
  `;
};

// call the loadPhone() function
loadPhone();
