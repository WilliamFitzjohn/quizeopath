<script lang="ts">
  import { pb, user } from '../lib/pocketbase';
  import { onMount } from 'svelte';
  import Question from '@lib/question/Question.svelte';
  import { Quiz } from '@models/Quiz';
  export let id: string = '';
  
  let originalquiz = new Quiz();
  let quiz: Quiz = originalquiz;
  let showConfirmDelete = false;
  
  async function createQuiz() {
    try {
      quiz.author = user.id;
      const { 
        updated: emptyUpdated,
        collectionId: emptyCollectionId,
        collectionName: emptyCollectionName,
        ...quizWithoutIdAndUpdated 
      } = quiz;
      const createdQuiz = await pb.collection('quizzes').create(quizWithoutIdAndUpdated);
      console.log('Created quiz:', createdQuiz);
      id = createdQuiz.id
      quiz = await fetchQuiz()
      window.location.href = `/quiz/create/${id}`;
    } catch (err) {
      console.error(err)
    }
  }
  
  async function fetchQuiz(): Quiz {
    if (id) {
      let rawquiz: Object = await pb.collection('quizzes').getOne(id)
      console.log(rawquiz)
      originalquiz = new Quiz(rawquiz)
      return new Quiz(originalquiz)
    }
    return quiz
  }
  
  async function updateQuiz() {
    try {
      console.log(quiz, JSON.stringify(quiz))
      if (JSON.stringify(quiz) === JSON.stringify(originalquiz)) {
        console.log("No changes, ignoring update")
      } else {
        const updatedQuiz = await pb.collection('quizzes').update(id, {...quiz});
        console.log('Updated quiz:', updatedQuiz);
        quiz = await fetchQuiz();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteQuiz() {
    try {
      await pb.collection('quizzes').delete(id);
      console.log('Quiz deleted');
      showConfirmDelete = false;
      setTimeout(() => {
        window.location.href = '/quiz';
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  }

  function confirmSubmit() {
    showConfirmSubmit = true;
  }

  function cancelSubmit() {
    showConfirmSubmit = false;
  }

  function confirmDelete() {
    showConfirmDelete = true;
  }

  function cancelDelete() {
    showConfirmDelete = false;
  }

  async function handleSubmit(event: Event) {
    // event.preventDefault();
    // const formData = new FormData(event.target);
    // const answers = {};
    // for (let [key, value] of formData.entries()) {
    //   answers[key] = value;
    // }
    // console.log('Submitted answers:', answers);
    // Add your form submission logic here
  }
  
  async function resetInputs() {
    quiz = new Quiz(originalquiz);
  }

  onMount(async() => {
    if (id) {
      quiz = await fetchQuiz()
    } else {
      originalquiz = new Quiz()
      quiz = new Quiz(originalquiz)
    }
    console.log(quiz)
  })
</script>

<div class='main-body'>
  <div class="header-container">
    <h1>Quiz Creator</h1>
    <button on:click={confirmDelete}>Delete</button>
    {#if showConfirmDelete}
      <div class="confirm-delete">
        <p>Are you sure you want to delete this quiz?</p>
        <button on:click={deleteQuiz}>Confirm</button>
        <button on:click={cancelDelete}>Cancel</button>
      </div>
    {/if}
  </div>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="shadow-card">
      <h3>Quiz settings</h3>
      <div style="display:flex;">
        <div>Name: </div>
        <input type="text" bind:value={quiz.name}/>
      </div>
      <div style="display:flex;">
        <div>Public: </div>
        <input type="checkbox" bind:checked={quiz.public}/>
      </div>
      <div style="display:flex;">
        <div>One question per page: </div>
        <input type="checkbox" bind:checked={quiz.one_question_mode}/>
      </div>
      <div style="display:flex;">
        <div>Immediate feedback: </div>
        <input type="checkbox" bind:checked={quiz.immediate_feedback}/>
      </div>
    </div>
    <div class="shadow-card">
      <h3>Questions</h3>
      {#if quiz.data}
      {#each quiz.data.questions as question, questionIndex}
      <Question question={question} editMode={true} on:change={()=>{quiz = quiz.validate()}}/>
      {#if quiz.data.questions.length > 1}
      <button type="button" on:click={() => {quiz = quiz.deleteQuestion(questionIndex)}}>Delete Question</button>
      {/if}
      {/each}
      {/if}
      <button type="button" on:click={() => {quiz = quiz.addQuestion()}}>Add Question</button>
    </div>
    
    {#if id}
      <button on:click={updateQuiz}>Update</button>
    {:else}
      <button on:click={createQuiz}>Create</button>
    {/if}
    <button on:click={resetInputs}>Reset</button>
  </form>
</div>

<style>
  .confirm-delete {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    padding: 10px;
    margin-top: 10px;
  }
  .confirm-delete p {
    margin: 0;
    padding: 0;
  }
  .confirm-delete button {
    margin-right: 5px;
  }
</style>