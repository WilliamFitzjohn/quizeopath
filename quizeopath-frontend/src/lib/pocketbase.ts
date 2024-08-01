import PocketBase from 'pocketbase';

import { writable } from 'svelte/store';

export const pb = new PocketBase('http://localhost:8051');

export const user = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log('auth changed', auth);
    user.set(pb.authStore.model);
});
