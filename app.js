// alert()

const loadServices = () => {
    fetch("https://testing-8az5.onrender.com/services/")
        .then((res) => res.json())
        .then((data) => displayService(data))
        .catch((err) => console.log(err));
};

const displayService = (services) => {
    const parent = document.getElementById("service-container");
    services.forEach((service) => {
        const li = document.createElement("li");
        li.classList.add("col-3");
        li.innerHTML = `
            <div class="card shadow h-100 opacity-100 service-img">
                        <div class="ratio ratio-16x9">
                            <img src=${service.image
            } class="card-img-top" loading="lazy" alt="...">
                        </div>
                        <div class="card-body p-3 p-xl-5">
                            <h3 class="card-title h5">${service.name}</h3>
                            <p class="card-text">${service?.description.slice(
                0,
                200
            )}</p>
                            <div><a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
        `;
        parent.append(li);
    });
};

const loadDoctors = (search) => {
    let parentDiv = document.getElementById("doctor-card-parent");
    parentDiv.innerHTML = ''
    Loading("d-block");

    fetch(
        `https://testing-8az5.onrender.com/doctor/list/?search=${search ? search : ""
        }`
    )
        .then((res) => res.json())
        .then((doctors) => {
            // console.log(doctors)
            parentDiv.innerHTML = "";
            doctors.results.forEach((doctor) => {
                const div = document.createElement("div");
                div.innerHTML = `
                    <div class="card">
                        <img src=${doctor.image} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${doctor.full_name}</h5>
                            <p>${doctor?.specialization?.map((sp) => {
                    return `<button class='btn btn-sm btn-primary m-1' disabled>${sp}</button>`;
                })}</p>
                        <a class="btn btn-outline-warning" target="_blank" href="details.html?doctorId=${doctor.id
                    }">Details</a>
                        </div>
                    </div>
                `;
                div.classList.add = "col";
                parentDiv.append(div);
            });


            console.log(doctors.results.length)
            if (doctors.results.length == 0) {
                const div = document.createElement('div')
                div.classList.add('text-center')
                console.log(doctors.results.length)
                div.innerHTML = `
                <img src="Images/nodata.png" />
                `
                parentDiv.append(div)
            }
            Loading("d-none");
        });
};

const loadDesignation = () => {
    const parentUl = document.getElementById("flush-collapseTwo");
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            data.forEach((item) => {
                const li = document.createElement("li");
                li.classList.add("dropdown-item", "item-cursor", "py-1", "my-1");

                li.addEventListener(
                    "click",
                    (handleSearch = () => {
                        loadDoctors(item.name);
                    })
                );
                li.innerText = item.name;

                parentUl.append(li);
            });
        });
};

const loadSpecialization = () => {
    const parentUl = document.getElementById("flush-collapseThree");
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const li = document.createElement("li");
                li.classList.add("dropdown-item", "item-cursor", "py-1", "my-1");
                li.innerText = item.name;
                // li.style()
                li.addEventListener(
                    "click",
                    (handleSearch = () => {
                        loadDoctors(item.name);
                    })
                );
                parentUl.append(li);
            });
        });
};

const searchHandle = () => {
    const value = document.getElementById("serach-box");
    loadDoctors(value.value);
    value.value = "";
};

const loadReview = () => {
    fetch("https://testing-8az5.onrender.com/doctor/review/")
        .then((res) => res.json())
        .then((data) => displayReview(data));
};

const displayReview = (reviews) => {
    console.log(reviews);
    const parentDiv = document.getElementById("review-container");
    reviews.forEach((review) => {
        const div = document.createElement("div");
        div.classList.add("my-card", "opacity-100", "border", "bg-white");
        div.innerHTML = `
                <div class="card-head">
                    <img src="Images/card-2.jpg" class="card-img" alt="">
                    <div class="card-head-text">
    
                        <h1 style="font-weight: 700;">${review.reviewer}</h1>
                        <p style="margin: 0px;">${review.rating}</p>
                    </div>
                </div>
                <div class="card-body">
                    <h3>${review.doctor}</h3>
                    <p>${review.body}</p>
                </div>
    `;
        parentDiv.append(div);
    });
};

const Loading = (cls) => {
    const divParent = document.getElementById("doctor-card-parent");
    const div = document.createElement('div')
    div.classList.add(`${cls}`, 'd-flex', 'justify-content-center')
    div.innerHTML = `
        <h1 class="fw-bold my-5">Loading...</h1>
    `;
    divParent.append(div)

};


loadServices();
loadDoctors();
loadDesignation();
loadSpecialization();
loadReview();
