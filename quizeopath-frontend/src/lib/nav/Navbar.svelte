<script>
    import { Link } from 'svelte-routing';
    import { user } from '../pocketbase';
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
                    <span class="navbar-text">{$user.username}</span>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/login">Log out</Link>
                </li>
            {:else}
                <li class="nav-item">
                    <Link class="nav-link" to="/login">Log in</Link>
                </li>
            {/if}
        </ul>
    </div>
</nav>