import PocketBase from 'pocketbase';

import { writable } from 'svelte/store';

const baseUrl = process.env.BACKEND_URL || 'https://quizeopath.fitzjohn.dev';
export const pb = new PocketBase(baseUrl);

export const user = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log('auth changed', auth);
    user.set(pb.authStore.model);
});
