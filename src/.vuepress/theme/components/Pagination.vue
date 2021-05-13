<template>
  <div class="flex justify-center">
    <a v-if="$pagination.hasPrev" :href="$pagination.prevLink">Prev</a>
    <a v-if="$pagination.hasNext" :href="$pagination.nextLink" class="ml-6">Next</a>
  </div>
</template>
