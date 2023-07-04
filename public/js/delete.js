// Maneja la eliminación de doctores, usuarios y citas 
const deleteFunction = async (type = '') => {
    const delete_element = document.querySelector('.btn-danger');
    const message = document.querySelector('#message');
    let endPoint = '';

    if(type == 'doctor') {
        endPoint = `/doctor/${delete_element.dataset.id}`;
    } else if(type == 'user') {
        endPoint = `/user/${delete_element.dataset.id}`;
    } else if(type == 'appointment') {
        endPoint = `/appointment/${delete_element.dataset.id}`;
    }

    try {
        const data = await fetch(endPoint, {
            method: 'delete'
        });

        const response = await data.json();
        if (response.status) {
            message.innerHTML = `Deleting ${response.element} `;
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            message.innerHTML = `Cannot delete. ${response.element} `;
        }

    } catch (error) {
      console.log(error);
    }

}
