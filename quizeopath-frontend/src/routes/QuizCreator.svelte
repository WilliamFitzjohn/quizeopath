<script>
  import { pb, user } from '../lib/pocketbase';
  import { onMount } from 'svelte';

  export let id;
  
  let quiz = {}

  async function createQuiz() {
    try {
      const data = {
        author: user.id,
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

  async function fetchQuiz() {
    if (id) {
      return (await pb.collection('quizzes').getOne(id))
    }
    return {}
  }

  onMount(async() => {
    quiz = await fetchQuiz()
  })
</script>

<div class='main-body'>
  <div class="header-container">
    <h1>Quiz Creator</h1>
  </div>
  <div class="shadow-card">
    <h3>Quiz settings</h3>
    <div style="display:flex;">
      <div>Name: </div>
      <input type="text" bind:value={quiz.name}/>
    </div>
    <div style="display:flex;">
      <div>Public: </div>
      <input type="checkbox"/>
    </div>
    <div style="display:flex;">
      <div>One question per page: </div>
      <input type="checkbox"/>
    </div>
    <div style="display:flex;">
      <div>Immediate feedback: </div>
      <input type="checkbox"/>
    </div>
  </div>
  <div class="shadow-card">
    <h3>Questions</h3>
     <div>
      Add question
     </div>
  </div>
  <button on:click={createQuiz}>Create</button>
  <button on:click={updateQuiz}>Update</button>
  <button on:click={clearInputs}>Clear</button>
</div>