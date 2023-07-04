// Maneja la edición de doctores
const editDoctor = async () => {

    const formEdit = document.querySelector('#edit');
    const firstName = document.querySelector('#firstNameInput').value;
    const lastName = document.querySelector('#lastNameInput').value;
    const specialty = document.querySelector('#specialtySelectInput').value;
    const office = document.querySelector('#officeInput').value;
    const email = document.querySelector('#emailInput').value;
    
    const endPoint = `/doctor/${formEdit.dataset.id}`; 
    const body = JSON.stringify({ firstName, lastName, specialty, office, email });
    console.log(body);

    try {
        const data = await fetch(endPoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, specialty, office, email })
        })

        const response = await data.json()
        if (response.status) {
            message.innerHTML = `${response.element} `;
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            message.innerHTML = `Cannot update. ${response.element} `;
        }
    } catch (error) {
        console.log(error);
    }

}

// Maneja la edición de usuarios
const editUser = async () => {

    const formEdit = document.querySelector('#edit');
    const firstName = document.querySelector('#firstNameInput').value;
    const lastName = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    const phoneNumber = document.querySelector('#phoneNumberInput').value;

    const endPoint = `/user/${formEdit.dataset.id}`;
    const body = JSON.stringify({ firstName, lastName, age, phoneNumber });
    console.log(body);

    try {
        const data = await fetch(endPoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        })

        const response = await data.json()
        if (response.status) {
            message.innerHTML = `${response.element} `;
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            message.innerHTML = `Cannot update. ${response.element} `;
        }
    } catch (error) {
        console.log(error);
    }

}

// Maneja la edición de citas
const editAppointment = async () => {

    const formEdit = document.querySelector('#edit');
    const specialty = document.querySelector('#specialtySelectInput').value;

    const endPoint = `/appointment/${formEdit.dataset.id}`;
    const body = JSON.stringify({ specialty });
    console.log(body);

    try {
        const data = await fetch(endPoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        })

        const response = await data.json()
        if (response.status) {
            message.innerHTML = `${response.element} `;
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            message.innerHTML = `Cannot update. ${response.element} `;
        }
    } catch (error) {
        console.log(error);
    }

}