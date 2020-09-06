<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import TemplateDisplay from '@/components/TemplateDisplay.vue'
import TemplateForm from '@/components/TemplateForm.vue'

import temps from './templates'
import TemplateService from '@/templates/TemplateService'

import Test from '@/components/Test.vue'
export default defineComponent({
  name: 'App',
  components: { TemplateDisplay, TemplateForm, Test },
  setup() {
    return {
      testTemplate: new TemplateService(...temps.test),
    }
  },
})
</script>

<template>
  <a-space>
    <a-card>
      <template-display :template="testTemplate"></template-display>
    </a-card>
    <a-card>
      <template-form :template="testTemplate"></template-form>
    </a-card>
    <test />
  </a-space>
</template>
