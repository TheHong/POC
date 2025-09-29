<template>
  <Accordion multiple>
    <AccordionPanel
      v-for="(source, index) in props.sources"
      :key="index"
      :value="index"
    >
      <AccordionHeader>
        <h5>{{ source.title }} (p. {{ source.page }})</h5>
      </AccordionHeader>
      <AccordionContent>
        <p class="m-0">{{ source.pageContent }}</p>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionContent from "primevue/accordioncontent";
import AccordionHeader from "primevue/accordionheader";
import AccordionPanel from "primevue/accordionpanel";

import type { Source } from "../services/schemas/aiService";

const props = defineProps<{ sources: Source[] }>();
</script>
