<template>
	<h1>{{ msg }}</h1>
</template>

<script>
	export default {
	  name: 'Main',
	  data () {
	    return {
	      msg: '主体部分'
	    }
	  }
	}
</script>

<style scoped>
	h1, h2 {
	  font-weight: normal;
	}
</style>
