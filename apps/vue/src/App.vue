<script setup>
import { nextTick, ref } from 'vue';
import { getList } from './data-list';
import List from './components/List.vue';

const list = ref([]);
const loadTime = ref(0);
const clearTime = ref(0);

function loadList() {
	list.value = getList();
	const startTime = performance.now();
	nextTick(() => {
		const endTime = performance.now();
		loadTime.value = endTime - startTime;
	});
}

function clearList() {
	list.value = [];
	const startTime = performance.now();
	nextTick(() => {
		const endTime = performance.now();
		clearTime.value = endTime - startTime;
	});
}

</script>

<template>
	<div class="options">
		<button @click="loadList">Load list</button>
		<button @click="clearList">Clear list</button>
		<span>load time: {{ loadTime }}</span>
		<span>clear time: {{ clearTime }}</span>
	</div>
	<div>
		<List :items="list"/>
	</div>
</template>

<style scoped>
.options {
		display: flex;
		justify-content: space-between;
}
</style>
