<template>
  <div class="form-scheme">
    <div class="form-scheme__items">
      <div v-for="item in scheme">
        <label :for="item.name" :class="{ error: hasInvalid(item.name) }"
          >{{ item.label }}:
        </label>

        <FormSchemeItem
          :schemeItem="item"
          :invalid="hasInvalid(item.name)"
          v-model="modelFields[item.name]"
          @blur="checkValidation"
        />

        <div
          v-show="modelErrors[item.name] && modelErrors[item.name].length > 0"
        >
          <div
            class="form-scheme-error error"
            v-for="message in modelErrors[item.name]"
          >
            {{ message }}
          </div>
        </div>
      </div>
    </div>
    <div class="form-scheme__btns">
      <button
        class="submit"
        :class="{ disabled: formIsInvalid }"
        :disabled="formIsInvalid"
        @click="onClickSubmit"
      >
        Рассчитать
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import FormSchemeItem from "@/components/FormSchemeItem.vue";

const props = defineProps(["scheme"]);
const emit = defineEmits(["submit"]);

const modelFields = ref(
  props.scheme.reduce((acc, item) => {
    acc[item.name] = null;
    return acc;
  }, {})
);

const modelErrors = ref(
  props.scheme.reduce((acc, item) => {
    acc[item.name] = [];
    return acc;
  }, {})
);

const formIsInvalid = computed(() =>
  Object.values(modelErrors.value).some((i) => i.length > 0)
);

const checkAllFields = () => {
  Object.keys(modelFields.value).forEach((key) => checkValidation(key));
};

const checkValidation = (nameField) => {
  const schemeItem = props.scheme.find((i) => i.name === nameField);
  const valueField = modelFields.value[nameField] || null;

  if (!schemeItem) {
    console.error(`Field dont find: '${nameField}'`);
    return;
  }

  const { validations } = schemeItem;

  modelErrors.value[nameField] = getErrors(validations, valueField);
};

const getErrors = (validations, valueField) => {
  const result = [];

  Object.entries(validations).forEach(([keyValid, valueValid]) => {
    // Здесь добавляются новые правила валидации
    switch (keyValid) {
      case "required":
        if (!valueField) {
          result.push("Обязательное поле");
        }
        break;

      case "min":
        if (valueField < valueValid) {
          result.push(`Минимальное значение: ${valueValid}`);
        }
        break;

      case "max":
        if (valueField > valueValid) {
          result.push(`Максимальное значение: ${valueValid}`);
        }
        break;
      default:
        console.error(`'${keyValid}' dont validation key`);
    }
  });

  return result;
};

const hasInvalid = (nameField) => modelErrors.value[nameField].length > 0;

const onClickSubmit = () => {
  checkAllFields();

  if (formIsInvalid.value) {
    return;
  }

  emit("submit", Object.values(modelFields.value));
};
</script>

<style lang="scss">
.form-scheme {
  &__items {
    display: flex;
    flex-direction: column;
    gap: 20px;
    label {
      font-size: 24px;
      color: #3a4460;
    }
    .form-scheme-item {
      margin-top: 5px;
    }
    .form-scheme-error {
      margin-top: 5px;
    }
  }

  &__btns {
    margin-top: 20px;
    text-align: center;
  }

  .submit {
    border: 1px solid #475ec8;
    border-radius: 5px;
    background-color: #475ec8;
    color: #fff;
    transition: 0.25s;
    padding: 5px 10px;
    font-size: 24px;
    cursor: pointer;
    &:hover {
      background-color: #3953c8;
    }
  }

  .disabled {
    opacity: 0.5;
    cursor: default;
  }

  .error {
    color: red;
  }
}
</style>
