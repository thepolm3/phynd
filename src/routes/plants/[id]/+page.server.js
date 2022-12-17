import { getPlantById } from '$root/utils/plants'

 /** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
    return {plant:  getPlantById(parseInt(params.id))};
  }
