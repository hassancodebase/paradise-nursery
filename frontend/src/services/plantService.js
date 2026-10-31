
const API_URL = 'http://localhost:5000/api/plants';

export async function getPlants() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch plants');
    }

    const data = await response.json();

    return data.plants;
}

export async function getPlantById(id) {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch plant');
    }

    const data = await response.json();

    return data.plant;
}
