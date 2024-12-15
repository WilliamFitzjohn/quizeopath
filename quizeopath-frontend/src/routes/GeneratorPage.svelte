<script lang="ts">
  export let id: string;
  import { pb } from '../lib/pocketbase';
  import { onMount } from 'svelte';
  import { Generator } from '@models/Generator'
  import { fade } from 'svelte/transition';

  let generator = new Generator()
  let random_indices = []

  async function fetchGenerator() {
    return new Generator(await pb.collection('generators').getOne(id))
  }

  function generateRandomIndices() {
    //function to generate a random number in the range of values length for each category
    random_indices = generator.data.map((cat, i) => Math.floor(Math.random() * cat.values.length))
  }

  onMount(async() => {
    generator = await fetchGenerator()
    generateRandomIndices()
  })
</script>

<div class='main-body'>
  <h4>Generator</h4>
  {#if generator.data && generator.title}
    <h1>{generator.title}</h1>
    <button class="gen-button" on:click={generateRandomIndices}>Generate</button>
    <div>
      {#each generator.data as cat, index}
        <div>
          <div class="cat-title" transition:fade={{ duration: 500 }}>{cat.title}</div>
          <div class="cat-value" transition:fade={{ duration: 500 }}>{cat.values[random_indices[index]]}</div>
        </div>
      {/each}
    </div>
  {/if}
</div>
<style>@import './css/generators.css';</style>