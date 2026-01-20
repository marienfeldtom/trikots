import { addItem, deleteItem, getItems } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export function load() {
    return {
        items: getItems()
    };
}

export const actions = {
    add: async ({ request }) => {
        const data = await request.formData();
        const type = data.get('type');
        const size = data.get('size');
        const number = parseInt(data.get('number'));
        const gender = data.get('gender');

        if (!type || !size || !number || !gender) {
            return fail(400, { missing: true });
        }

        try {
            addItem({ type, size, number, gender });
            return { success: true };
        } catch (e) {
            return fail(500, { error: e.message });
        }
    },
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        if (!id) return fail(400, { missing: true });
        deleteItem(id);
        return { success: true };
    }
};
