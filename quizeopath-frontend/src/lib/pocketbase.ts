import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

const baseUrl = 'https://quizeopath.fitzjohn.dev';
export const pb = new PocketBase(baseUrl);

export const user = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log('auth changed', auth);
    user.set(pb.authStore.model);
});

async function checkAuth() {
    try {
        if(pb.authStore.token && !pb.authStore.isValid){
            await pb.collection('users').authRefresh();
        }
        // Attempt to refresh the token
    } catch (error) {
        // If the token is invalid, clear the auth store and redirect to login
        pb.authStore.clear();
        user.set(null);
        
        //javascript redirect to login page
        window.location.href = '/login';
    }
}

// Check the authentication status when the application initializes
checkAuth();