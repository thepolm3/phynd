import { getPlants } from '$root/utils/plants'

export async function load() {
    return {plants: getPlants()};
}
