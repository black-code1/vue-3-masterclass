<template>
<h1>Welcome to the forum</h1>
  <ForumList :forums="forums"/>
</template>

<script>
import ForumList from "@/components/ForumList.vue";
import sourceData from '@/data.json'
export default {
  components: {
    ForumList
  },
  data(){
    return{
      forums: sourceData.forums,
    }
  },

}
</script>
