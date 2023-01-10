<template>
    <div class="flex flex-row justify-between p-8 w-full h-full bg-gray-200">
        <div class="w-3/4 flex justify-around flex-wrap overflow-auto" v-if="posts">
            <div v-for="post in posts" :key="post.id" class="bg-orange-300 w-2/5 rounded mb-4 px-4 py-2">
                <p>
                    Title: {{ post.title }}
                </p>
                <p>
                    Text: {{ post.text }}
                </p>
                <div class="text-xs text-right">{{ post.updatedAt.slice(0, 10) }} | {{ post.updatedAt.slice(11, 16) }}
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center w-1/4">
            <div class="flex flex-col">
                <label>Title:</label>
                <input type="text" v-model="title" class="py-2 rounded px-1" />
            </div>
            <div class="flex flex-col mt-4">
                <label>Text:</label>
                <textarea type="text" v-model="text" class="py-2 rounded px-1" />
            </div>
            <button class="mt-4 bg-orange-400 py-2 px-4 rounded" @click="createPost">Create Post</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useGetPosts } from './Queries'
import { useCreatePost } from './Mutations'
import { useQueryClient } from '@tanstack/vue-query';
const { data: posts } = useGetPosts();
const client = useQueryClient()

const { mutate } = useCreatePost();

const title = ref();
const text = ref();

const createPost = () => {
    mutate({ title: title.value, text: text.value }, {
        onSuccess: () => {
            title.value = '';
            text.value = '';
            client.invalidateQueries(['posts'])
        },
    })
}

</script>
