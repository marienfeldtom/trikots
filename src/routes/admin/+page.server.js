import { addItem, deleteItem, getItems } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export function load({ cookies }) {
    return {
        items: getItems(),
        authenticated: cookies.get('admin_auth') === 'true'
    };
}

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const password = data.get('password');

        if (password === 'turam') {
            cookies.set('admin_auth', 'true', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 1 day
            });
            return { success: true };
        }

        return fail(401, { incorrect: true });
    },

    add: async ({ request, cookies }) => {
        if (!cookies.get('admin_auth')) return fail(401, { unauthorized: true });

        const data = await request.formData();
        const type = data.get('type');
        const size = data.get('size');
        const number = parseInt(data.get('number'));
        const gender = data.get('gender');
        const condition = data.get('condition');

        if (!type || !size || !number || !gender || !condition) {
            return fail(400, { missing: true });
        }

        try {
            addItem({ type, size, number, gender, condition });
            return { success: true };
        } catch (e) {
            return fail(500, { error: e.message });
        }
    },
    delete: async ({ request, cookies }) => {
        if (!cookies.get('admin_auth')) return fail(401, { unauthorized: true });

        const data = await request.formData();
        const id = data.get('id');
        if (!id) return fail(400, { missing: true });
        deleteItem(id);
        return { success: true };
    }
};
