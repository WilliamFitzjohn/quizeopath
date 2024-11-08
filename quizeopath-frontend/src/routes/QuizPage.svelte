<script lang="ts">
  export let id: string;
  import { pb } from '../lib/pocketbase';
  import { onMount } from 'svelte';
  import { Quiz } from '@models/Quiz'
  import Question from '@lib/question/Question.svelte';

  let quiz = new Quiz()
  let answersQuiz = new Quiz(quiz)
  let showFeedback = false
  let showSingleQuestionFeedback = false
  let questionIndex = 0
  let showConfirmSubmit = false

  async function fetchQuiz() {
    return new Quiz(await pb.collection('quizzes').getOne(id))
  }

  function nextQuestion() {
    showSingleQuestionFeedback = false
    if (questionIndex < quiz.data.questions.length - 1) {
      questionIndex += 1;
    }
  }

  function prevQuestion() {
    if (questionIndex > 0) {
      questionIndex -= 1;
    }
  }

  function submitQuiz() {
    console.log(answersQuiz)
    showFeedback = true
  }
  
  function confirmSubmit() {
    showConfirmSubmit = true;
  }

  function cancelSubmit() {
    showConfirmSubmit = false;
  }

  function submitAnswer() {
    showSingleQuestionFeedback = true
  }

  function reset() {
    showFeedback = false
    showSingleQuestionFeedback = false
    answersQuiz = new Quiz(quiz).purgeAnswers()
    questionIndex = 0
    showConfirmSubmit = false
  }

  onMount(async() => {
    quiz = await fetchQuiz()
    reset()
  })

  // Computed property for button text
  $: buttonText = quiz.data && (!quiz.one_question_mode || questionIndex + 1 === quiz.data.questions.length) ? "Submit Quiz" : "Next Question";
  $: computedQuestions = quiz.data ? (quiz.one_question_mode ? [quiz.data.questions[questionIndex]] : quiz.data.questions) : []
  $: computedScore = () => {
    let score:number = 0;
    for (let i = 0; i < quiz.data.questions.length; i++) {
      if (quiz.data.questions[i].answer.toString() === answersQuiz.data.questions[i].answer.toString()) {
        score += 1;
      }
      console.log(quiz.data.questions[i].answer, answersQuiz.data.questions[i].answer)
    }
    return score;
  }
  $: computedCorrectAnswer = () => {
    return quiz.data.questions[questionIndex].answer.toString() === answersQuiz.data.questions[questionIndex].answer.toString()
  }
  $: answeredQs = () => {
    return answersQuiz.data.questions.filter(q => q.answer.length != 1 || q.answer[0] != -1).length
  }

</script>

<div class='main-body'>
  <h4>Quiz</h4>
  {#if quiz.data && quiz.name}
    <h1>{quiz.name}</h1>
    <form>
      <div class="shadow-card">
        {#if quiz.one_question_mode}
          <h3>Question {questionIndex + 1} of {quiz.data.questions.length}</h3>
        {/if}
        {#each quiz.data.questions as question, i}
          {#if !quiz.one_question_mode || questionIndex == i || showFeedback}
            <Question 
              question={question}
              answersQuestion={answersQuiz.getQuestion(i)}
              editMode={false} 
              showFeedback={showFeedback || showSingleQuestionFeedback}
              on:change={()=>{quiz = quiz.validate()}}
            />
          {/if}
        {/each}
      </div>
      <div>
        {#if quiz.one_question_mode && quiz.data.questions.length > 1 && !showFeedback}
          <div>
            {#if quiz.immediate_feedback && !showSingleQuestionFeedback}
              <button type="button" on:click={() => {submitAnswer()}}>Submit Answer</button>
            {/if}
            {#if !quiz.immediate_feedback && !showSingleQuestionFeedback}
            <button type="button" on:click={prevQuestion} disabled={questionIndex === 0}>Prev</button>
            <button type="button" on:click={nextQuestion} disabled={questionIndex === quiz.data.questions.length - 1}>Next</button>
            {/if}
          </div>
        {/if}
        
        {#if showSingleQuestionFeedback && !showFeedback}
          <div class="feedback">
            <h3>{computedCorrectAnswer() ? "Correct!" : "Incorrect"}</h3>
            {#if questionIndex === quiz.data.questions.length - 1}
              <button type="button" on:click={submitQuiz}>See Results</button>
            {:else}
              <button type="button" on:click={nextQuestion}>Next</button>
            {/if}
          </div>
        {/if}
        {#if showFeedback}
        <h3>Your score: {computedScore()} / {quiz.data.questions.length}</h3>
        <button type="button" on:click={reset}>Retry Quiz</button>        {:else if showConfirmSubmit}
        <div class="confirm-delete">
          <p>Are you sure you want to submit this quiz?</p>
          <p>You have answered {answeredQs()}/{quiz.data.questions.length}</p>
          <button type="button" on:click={submitQuiz}>Confirm</button>
          <button type="button" on:click={cancelSubmit}>Cancel</button>
        </div>
        {:else if !quiz.one_question_mode || !quiz.immediate_feedback}
          <button type="button" on:click={() => {confirmSubmit()}}>Submit Quiz</button>
        {/if}
      </div>
    </form>
  {/if}
</div>