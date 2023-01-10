<template>
    <div class="flex flex-col items-center w-1/4">
        <div class="flex flex-col">
            <label>Title:</label>
            <input type="text" v-model="title" class="py-2 rounded px-1" />
        </div>
        <div class="flex flex-col mt-4">
            <label>Text:</label>
            <textarea type="text" v-model="text" class="py-2 rounded px-1" />
        </div>
        <button class="mt-4 bg-orange-400 py-2 px-4 rounded" @click="submit">Create Post</button>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const title = ref();
const text = ref();

const emit = defineEmits(['submit'])

const submit = () => {
    emit.submit({ title: title.value, text: text.value })
}

</script>
