<script>
    import { Link } from 'svelte-routing';
    import { pb, user } from '../pocketbase';

    function logout() {
        pb.authStore.clear();
        user.set(null);
        window.location.href = '/login';
    }
</script>

<nav class="navbar mb-2 navbar-expand-lg navbar-dark bg-dark">
    <Link class="navbar-brand" to="/">Quizeopath</Link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <Link class="nav-link" to="/quiz">Quizzes</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/generator">Generators</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/about">About</Link>
            </li>
        </ul>
        <ul class="navbar-nav">
            {#if $user}
                <li class="nav-item">
                </li>
                <li class="nav-item d-flex">
                    <button class="nav-link btn btn-link mr-2" on:click={logout}>Log out</button>
                    <span class="navbar-text">{$user.username}</span>
                </li>
            {:else}
                <li class="nav-item">
                    <Link class="nav-link" to="/login">Log in</Link>
                </li>
            {/if}
        </ul>
    </div>
</nav>