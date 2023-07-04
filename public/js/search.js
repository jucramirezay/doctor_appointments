// Maneja la busqueda de citas por el ID del usuario
const search = async () => {
    
    const idNumber = document.querySelector('#idInput').value;
    let endPoint = `/userAppointments/${idNumber}`;

    try {
        const data = await fetch(endPoint, {
            method: 'GET',
        });

        const response = await data.json();
        if (response.status) {
            console.log(response.element);
        } else {
            console.log(response.element);
        }

    } catch (error) {
      Window.alert(error);
    }
}

// Maneja el filtrado de citas por las especialidades
const filter = async () => {

    const specialty = document.querySelector('#specialtySelectInput').value;
    let endPoint = `/specialtyAppointments/${specialty}`;

    try {
        const data = await fetch(endPoint, {
            method: 'GET',
        });

        const response = await data.json();
        if (response.status) {
            console.log(response.element);
        } else {
            console.log(response.element);
        }

    } catch (error) {
      Window.alert(error);
    }

}