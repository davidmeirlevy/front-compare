<template>
	<div>
		<Item v-for="row in shownItems" :key="row.id" :item="row"/>
	</div>
</template>

<script setup>
import { computed, onUnmounted, ref, watch } from 'vue';
import Item from './Item.vue';

const props = defineProps({
	items: Array
})


const length = ref(100);
watch(() => props.items, () => length.value = 100)

const shownItems = computed(() => props.items.slice(0, length.value));


function onScroll() {
	if (document.scrollingElement.scrollTop < (document.scrollingElement.offsetHeight - window.innerHeight - 50)) {
		return;
	}
	if (length.value < props.items.length) {
		length.value += 100;
	} else {
		document.removeEventListener('scroll', onScroll);
	}
}

document.addEventListener('scroll', onScroll);
onUnmounted(() => document.removeEventListener('scroll', onScroll));


</script>

<style scoped>

</style>
