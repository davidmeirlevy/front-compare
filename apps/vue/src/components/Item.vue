<template>
	<p>
		<span @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">{{ item.content }}</span>
		<span v-if="showTooltip" class="tooltip">this is the tooltip of id: {{ item.id }}</span>
	</p>
</template>

<script setup>
import { ref } from 'vue';

defineProps([ 'item' ]);

const showTooltip = ref(false);

</script>

<style scoped>
p {
	position: relative;
}
.tooltip {
		position: absolute;
		bottom: 100%;
		left: 0;
		background-color: black;
		color: #fff;
		padding: 10px;
		border-radius: 5px;
}
</style>
