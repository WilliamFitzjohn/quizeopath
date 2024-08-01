<script>
  export let id;
  import { pb } from '../lib/pocketbase';
  import { onMount } from 'svelte';

  let quiz = {}

  async function fetchQuiz() {
    return (await pb.collection('quizzes').getOne(id))
  }

  onMount(async() => {
    quiz = await fetchQuiz()
    console.log(quiz)
  })
</script>

<div class='main-body'>
  <h4>Quiz</h4>
  {#if quiz.data && quiz.name}
  <h1>{quiz.name}</h1>
  <div class="shadow-card">
    {#each quiz.data.questions as question}
    <div class="shadow-card question-card">
      <strong>{question.question}</strong>
      {#each question.answers as answer}
        <br><input type="checkbox"/>{answer}
      {/each}
    </div>
    {/each}
  </div>
  {/if}
</div>