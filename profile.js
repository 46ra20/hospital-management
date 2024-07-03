const profile=()=>{
    const user_id = localStorage.getItem('user_id')
    fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
    .then(r=>r.json())
    .then(d=>{
        document.title=d.username
        // console.log(d)
        if(user_id){
        fetch(`https://testing-8az5.onrender.com/appointment/?patient_id=1`)
        .then(r=>r.json())
        .then(d=>{
            console.log(d)
            const table = document.getElementById("table-container")
            
            d.forEach(app=>{
                const tr = document.createElement("tr")
                tr.innerHTML=`
                    <th scope="row">${app.id}</th>
                    <td>${app.symptom}</td>
                    <td>${app.appointment_type}</td>
                    <td>${app.appointment_status}</td>
                    ${app.appointment_status=="Pending"?
                        `<td><p class="d-inline shadow btn btn-danger bg-danger px-2 py-1 text-white fw-bold rounded-circle">X<p></td>`:
                        `<td>x</td>`
                    }
                `
                table.appendChild(tr)
            })
            
        })}

    })
}

profile()