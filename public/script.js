const API_URL = "/tour";

const toursList = document.getElementById("tours-list");
const fetchButton = document.querySelector(".card button");

const createForm = document.getElementById("create-tour-form");
const updateForm = document.getElementById("update-tour-form");
const deleteForm = document.getElementById("delete-tour-form");

/* Create Tour */
createForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = createForm.querySelectorAll("input");

    const tour = {
        tour_id: inputs[0].value,
        title: inputs[1].value,
        description: inputs[2].value,
        pick_up: inputs[3].value,
        meeting_point: inputs[4].value,
        drop_off: inputs[5].value,
        duration: inputs[6].value,
        duration_unit: inputs[7].value,
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tour),
        }).then((res) => res.json()).then((data) => alert(data.message));
    } catch (error) {
        console.error("Error creating tour:", error);
        alert(error.message);
    }
});

/* Update Tour */
updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = updateForm.querySelectorAll("input");
    const tourid = inputs[0].value;
    const updatedTour = {};
    if (inputs[1].value) updatedTour.title = inputs[1].value;
    if (inputs[2].value) updatedTour.description = inputs[2].value;
    if (inputs[3].value) updatedTour.pick_up = inputs[3].value;
    if (inputs[4].value) updatedTour.meeting_point = inputs[4].value;
    if (inputs[5].value) updatedTour.drop_off = inputs[5].value;
    if (inputs[6].value) updatedTour.duration = inputs[6].value;
    if (inputs[7].value) updatedTour.duration_unit = inputs[7].value;

    if (Object.keys(updatedTour).length === 0) {
        alert("Please add value for one field at least for updating tour.");
        return;
    }

    try {
        await fetch(`${API_URL}/${tourid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTour),
        }).then((res) => res.json()).then((data) => alert(data.message));
    } catch (error) {
        console.error("Error updating tour:", error);
        alert(error.message);
    }
});

/* Delete Tour */
deleteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const tourid = deleteForm.querySelector("input").value;

    try {
        await fetch(`${API_URL}/${tourid}`, {
            method: "DELETE",
        }).then((res) => res.json()).then((data) => alert(data.message));
    } catch (error) {
        console.error("Error deleting tour:", error);
        alert(error.message);
    }
});
