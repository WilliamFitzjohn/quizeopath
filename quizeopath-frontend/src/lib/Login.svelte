<script>
    import { pb } from './pocketbase';
    import { user } from './pocketbase';

    let username = '';
    let password = '';
    let error = '';

    async function login() {
        try {
            await pb.collection('users').authWithPassword(username, password);
            user.set(pb.authStore.model);
            window.location.href = '/';
        } catch (err) {
            error = 'Invalid username or password';
        }
    }
    

    async function signup() {
      try {
        const data = {
          username,
          password,
          passwordConfirm: password,
          name: username,
        };
        const createdUser = await pb.collection('users').create(data);
        await login();
      } catch (err) {
        console.error(err)
      }
    }

    function signOut() {
      pb.authStore.clear();
    }
</script>

<div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 100%; max-width: 400px;">
        <h2 class="text-center mb-4">Login</h2>
        {#if error}
            <div class="alert alert-danger" role="alert">
                {error}
            </div>
        {/if}
        <form on:submit|preventDefault={login}>
            <div class="form-group mb-3">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" bind:value={username} required>
            </div>
            <div class="form-group mb-3">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" bind:value={password} required>
            </div>
            <button type="submit" class="btn btn-primary btn-block mb-3">Login</button>
            <button type="button" class="btn btn-secondary btn-block" on:click={signup}>Sign up</button>
        </form>
    </div>
</div>

<style>
    .vh-100 {
        height: 100vh;
    }
</style>