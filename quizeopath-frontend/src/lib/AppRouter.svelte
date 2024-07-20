
<script>
    import { Router, Route, Link } from 'svelte-routing';
    // import Home from './routes/Home.svelte';
    // import About from './routes/About.svelte';
    import Quiz from '../routes/Quiz.svelte';
</script>

<Router>
    <nav>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
    </nav>
    <!-- <Route path="home" component={Home} />
    <Route path="about" component={About} /> -->
    <Route path="quiz/:quiz_id" let:params>
        <Quiz id={params.quiz_id} />
    </Route>
</Router>