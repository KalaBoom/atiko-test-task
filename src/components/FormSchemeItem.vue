<template>
  <div class="form-scheme-item" :class="{ error: invalid }">
    <template v-if="schemeItem.type === 'number'">
      <input type="text" v-model="model" @input="onInput" @blur="onBlur" />
    </template>

    <template v-else-if="schemeItem.type === 'select'">
      <select v-model="model" @blur="onBlur">
        <option selected disabled :value="null">Выберите операцию...</option>
        <option :value="option.value" v-for="option in schemeItem.options">
          {{ option.value }}
        </option>
      </select>
    </template>
  </div>
</template>

<script setup>
const props = defineProps(["schemeItem", "invalid"]);
const emits = defineEmits(["blur"]);
const model = defineModel();

const onBlur = () => {
  emits("blur", props.schemeItem.name);
};

const onInput = (e) => {
  const value = Number(e.target.value);
  if (Number.isNaN(value)) {
    const arrayStr = e.target.value.split("");
    arrayStr.pop();
    e.target.value = arrayStr.join("");
    model.value = e.target.value;
  }
};
</script>

<style lang="scss">
.form-scheme-item {
  input,
  select {
    border: 1px solid black;
    border-radius: 5px;
    transition: 0.25s;
    padding: 2.5px 5px;
    width: 100%;
    box-sizing: border-box;
    font-size: 18px;
    color: #2b3085;
  }
  select {
    cursor: pointer;
  }
  &.error {
    input,
    select {
      color: red;
      border: 1px solid red;
    }
  }
}
</style>
