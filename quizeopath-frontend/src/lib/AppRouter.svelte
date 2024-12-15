
<script>
    import { Router, Route, Link } from 'svelte-routing';
    // import Home from @routes/Home.svelte';
    // import About from @routes/About.svelte';
    import Navbar from '@lib/nav/Navbar.svelte';
    import Generators from '@routes/GeneratorsPage.svelte';
    import Generator from '@routes/GeneratorPage.svelte';
    import Quizzes from '@routes/QuizzesPage.svelte';
    import Quiz from '@routes/QuizPage.svelte';
    import QuizCreator from '@routes/QuizCreatorPage.svelte';
    import Login from '@lib/Login.svelte';
</script>

<Router>
    <Navbar/>
    <!-- <Route path="home" component={Home} />
    <Route path="about" component={About} /> -->
    <Route path="login" component={Login} />
    <Route path="generator/" component={Generators} />
    <Route path="generator/:generator_id" let:params>
        <Generator id={params.generator_id} />
    </Route>
    <Route path="quiz/" component={Quizzes} />
    <Route path="quiz/create/" component={QuizCreator} />
    <Route path="quiz/create/:quiz_id" let:params>
        <QuizCreator id={params.quiz_id} />
    </Route>
    <Route path="quiz/:quiz_id" let:params>
        <Quiz id={params.quiz_id} />
    </Route>
</Router>