<script lang="ts">
  import { Generator } from '@models/Generator';
  import { pb, user } from '../lib/pocketbase';
  import { onMount } from 'svelte';

  let generators: Generator[] = []

  async function fetchGenerators(): Promise<Generator[]> {
    return (await pb.collection('generators').getList()).items.map(item => (new Generator(item)))
  }

  onMount(async() => {
    console.log($user)
    generators = await fetchGenerators()
    console.log(generators)
  })
</script>

<div class='main-body'>
  <div class="header-container">
    <h1>Generators</h1>
    <a href="/generator/create/">
      <button class='shadow-card primary-button'>New Generator</button>
    </a>
  </div>
  <div class="shadow-card">
    {#each generators as generator}
    <a href="/generator/{generator.id}">
    <div class="shadow-card generator-card">
      <div>
        {generator.title}
      </div>
{#if $user && generator.author == $user.id}
      <a href="/generator/create/{generator.id}">
        edit
      </a>
{/if}

    </div>
    </a>
    {/each}
  </div>
</div>