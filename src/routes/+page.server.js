import { getItems, getSets } from '$lib/server/db';

export function load() {
    return {
        items: getItems(),
        sets: getSets()
    };
}
