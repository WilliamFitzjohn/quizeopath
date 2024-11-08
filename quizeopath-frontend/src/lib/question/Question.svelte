<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { QuestionType, type Question } from '../../models/Quiz';
  import { createEventDispatcher } from 'svelte';

  export let question: Question;
  export let answersQuestion: Question | null = null;
  export let editMode: boolean = false;
  export let showFeedback: boolean = false;
  const dispatch = createEventDispatcher();

  // Generate a UUID
  $: qUUID = uuidv4();

  function propagateChange() {
    dispatch('change', { question });
  }

  $: computedAnswersQuestion = answersQuestion ? (answersQuestion) : (question);
  $: computedClass = (answerIndex: number) => {
    if (showFeedback){
      if (question.answer.includes(answerIndex) && answersQuestion?.answer.includes(answerIndex)) {
        return 'q-correct';
      } else if (question.answer.includes(answerIndex) && !answersQuestion?.answer.includes(answerIndex)) {
        return 'q-incorrect';
      } else if (!question.answer.includes(answerIndex) && answersQuestion?.answer.includes(answerIndex)) {
        return 'q-missed';
      }
      console.log('No feedback');
    }
    return '';
  }
</script>
<div>
  <div class="shadow-card question-card">
    {#if editMode}
    <input 
      type="text" 
      placeholder="Question"
      bind:value={question.question} 
      on:change={propagateChange}/>
    {:else}
    <strong>{question.question}</strong>
    {/if}
    {#if editMode}
      <select bind:value={question.type} on:change={propagateChange}>
        <option value="{QuestionType.Single}">Single-select</option>
        <option value="{QuestionType.MultiSelect}">Multi-select</option>
      </select>
    {/if}
    {#each question.answers as answer, answerIndex}
    <div class="q-answer {computedClass(answerIndex)}">
      {#if question.type === 'single'}
      <input type="radio"
        name="answerq{qUUID}"
        id="answerq{qUUID}-{answerIndex}"
        bind:group={computedAnswersQuestion.answer[0]} 
        value={answerIndex}
        disabled={showFeedback}
        on:change={propagateChange}
      />
      {:else}
      <input type="checkbox"
        name="answerq{qUUID}"
        id="answerq{qUUID}-{answerIndex}"
        bind:group={computedAnswersQuestion.answer} 
        value={answerIndex} 
        disabled={showFeedback}
        on:change={propagateChange}
      />
      {/if}
      {#if editMode}
      <input 
        type="text" 
        name="answerq{qUUID}"
        id="answerq{qUUID}-{answerIndex}"
        placeholder="Answer"
        bind:value={answer}
      />
      {#if question.answers.length > 1}
      <button type="button" on:click={() => {question.deleteAnswer(answerIndex);propagateChange()}}>Delete</button>
      {/if}
      {:else}
      <label for="answerq{qUUID}-{answerIndex}">{answer}</label>
      {/if}
    </div>
    {/each}
    {#if editMode}
    <button type="button" on:click={() => {question.addAnswer();propagateChange()}}>Add Response</button>
    {/if}
    
  </div>
</div>
<style>@import './question.css';</style>