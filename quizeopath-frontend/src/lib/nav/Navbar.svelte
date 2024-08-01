<script>
    import { Router, Route, Link } from 'svelte-routing';
    import { user } from '../pocketbase';
</script>

<nav class="navbar-container">
    <Link to="/"><h2>Quizeopath</h2></Link>
    <Link class="navlink" to="/quiz">Quizzes</Link>
    <Link class="navlink" to="/about">About</Link>
{#if $user}
    <p class="float-end">{$user.username}</p>
    <Link class="navlink" to="/login">Log out</Link>
{:else}
    <Link class="float-end navlink" to="/login">Log in</Link>
{/if}
</nav>