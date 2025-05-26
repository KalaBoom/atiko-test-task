<template>
  <main class="main">
    <FormScheme :scheme @submit="onSubmitForm" class="main__form-scheme" />
    <div v-show="result !== null" class="main__result">
      <span>Результат: {{ result }}</span>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import FormScheme from "@/components/FormScheme.vue";
import { scheme } from "@/assets/data/scheme";
import { calculateExpression } from "@/utils/calc";

const result = ref(null);

const onSubmitForm = (values) => {
  result.value = calculateExpression(values);
};
</script>

<style lang="scss">
.main {
  padding-top: 30px;
  &__form-scheme {
    width: 600px;
    margin: 0 auto;
    background-color: #edeffb;
    padding: 20px;
    border-radius: 5px;
  }
  &__result {
    margin-top: 30px;
    text-align: center;
    font-size: 26px;
    color: #2c3357;
  }
}
</style>
