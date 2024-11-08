<script>
  import { pb, user } from '../lib/pocketbase';
  import { onMount } from 'svelte';

  let quizzes = []

  async function fetchQuizzes() {
    return (await pb.collection('quizzes').getList()).items
  }

  onMount(async() => {
    console.log($user)
    quizzes = await fetchQuizzes()
    console.log(quizzes)
  })
</script>

<div class='main-body'>
  <div class="header-container">
    <h1>Quizzes</h1>
    <a href="/quiz/create/">
      <button class='shadow-card primary-button'>New Quiz</button>
    </a>
  </div>
  <div class="shadow-card">
    {#each quizzes as quiz}
    <a href="/quiz/{quiz.id}">
    <div class="shadow-card quiz-card">
      <div>
        {quiz.name}
      </div>
{#if $user && quiz.author == $user.id}
      <a href="/quiz/create/{quiz.id}">
        edit
      </a>
{/if}

    </div>
    </a>
    {/each}
  </div>
</div>