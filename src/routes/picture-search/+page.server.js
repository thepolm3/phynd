import { getPictures } from '$root/utils/plants'

export async function load() {
    return {pictures: getPictures()};
}
