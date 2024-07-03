const getParams = () => {
  const param = new URLSearchParams(window.location.search).get("doctorId");
  fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
    .then((res) => res.json())
    .then((data) => showDoctorDetails(data))
    .catch((err) => console.log(err));
};

const showDoctorDetails = (doctor) => {
  console.log(doctor);
  const doctorDetails = document.getElementById("doctor-details-id");
  doctorDetails.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add(
    "details-head",
    "d-flex",
    "col-8",
    "mx-auto",
    "align-items-center"
  );

  div.innerHTML = `
        <div style="height: 277px ;width: 277px;">
                <img src=${doctor?.image} alt="" style="height: 277px;
            width: 277px;
            border-radius: 100%;
            box-shadow: 0px 0px 12px 1px gray;
            background-color: white;

            ">
            </div>
            <div class="details-text">
                <h2 class="appointment-head-title">${doctor?.full_name}</h2>
                <div class="d-flex gap-2 py-2">
                    ${doctor?.specialization.map((spe) => {
                      return `<h4 class="appointment-head-subtitle">${spe}</h4>`;
                    })}
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum earum nemo excepturi quia. Itaque voluptas, numquam incidunt impedit magni molestias quibusdam hic commodi ut iusto dignissimos rem quis alias fugit!</p>
                <h5 class="appointment-head-price">Fees: 2000 BDT</h5>
                <button type="button" class="appointment-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Take Appointment</button>
                
            </div>



            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Take appointment to ${
                      doctor?.full_name
                    }</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <div class="py-2">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Online">
                   <label class="form-check-label" for="option1">
                      Online
                    </label>
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Offline">
                  <label class="form-check-label" for="option2">
                      Offline
                    </label>
                  </div>
                  <textarea class="form-control" aria-label="With textarea" id="appointment-text" placeholder="Enter your text"></textarea>
                  <select class="form-select my-2" aria-label="Default select example" id="appointment-time">
                    <option selected>Select a time solt</option>
                    ${doctor?.available_time?.map((element,count) => {
                      return `<option value=${count}>${element}</option>`
                    })
                    }
                  </select>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="getDataFromForm()" data-bs-dismiss="modal">Take Appointment</button>
                  </div>
                </div>
              </div>
            </div>
  `;

  doctorDetails.append(div);
};

const getDataFromForm=()=>{
  const status = document.getElementsByName('inlineRadioOptions')
  const param = new URLSearchParams(window.location.search).get("doctorId");

  const select = Array.from(status).find(btn=>btn.checked)

  const text = document.getElementById('appointment-text').value
  
  const index = document.getElementById('appointment-time').options.selectedIndex
  console.log(select.value)
  const info = {
    appointment_type: select.value,
    appointment_status: "Pending",
    time: index,
    symptom: text,
    cancel: false,
    patient: 1,
    doctor: param,
  };

  fetch('https://testing-8az5.onrender.com/appointment/',{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify(info)
  })
  .then(res=>res.json())
  .then(data=>console.log(data))
  .then(err=>console.log(err))

}

getParams();
