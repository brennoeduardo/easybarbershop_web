<template>
  <v-dialog
    v-model="enableValue"
    :width="width"
    :height="height"
    min-width="400px"
    scrollable
    :persistent="persistent"
    max-width="1000px"
    @click:outside="handleClickOutside"
    :transition="transition"
  >
    <v-card :max-height="maxHeight" class="modal">
      <v-card-title class="modal-header">
        <v-row no-gutters justify="space-between">
          <v-col cols="auto"> </v-col>

          <v-col cols="auto">
            <span class="modal-title">{{ title }}</span>
          </v-col>

          <v-col cols="auto" class="d-flex justify-end">
            <v-icon @click.stop="enableValue = false">mdi-close</v-icon>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card flat class="modal-content-box">
        <div
          class="modal-content"
          :style="contentPadless ? 'padding: 0px!important' : ''"
        >
          <slot name="content" />
        </div>
      </v-card>

      <v-card-actions
        class="modal-actions"
        v-if="!noFooter || actions.length > 0"
      >
        <slot name="actions">
          <v-row justify="center" v-if="actions.length > 0">
            <v-btn
              v-for="(action, index) in actions"
              :text="action.text"
              :key="index"
              width="80%"
              :color="getColor(action.type)"
              @click="action.click"
              v-show="showAction(action.show)"
              :loading="loadingAction(action.loading)"
              :disabled="action.disabled"
              :append-icon="action.icon"
              variant="flat"
              class="action-button"
            >
              <b>{{ action.title }}</b>
            </v-btn>
          </v-row>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
const props = defineProps({
  enable: { type: Boolean, default: false },
  transition: { type: String, default: "dialog-bottom-transition" },
  closeClickingOutside: { type: Boolean, default: true },
  persistent: { type: Boolean, default: false },
  title: { type: String, default: "Título" },
  actions: { type: Array, default: [] },
  width: { type: String, default: "auto" },
  height: { type: String, default: "auto" },
  maxHeight: { type: String, default: "auto" },
  isLoading: { type: Boolean, default: false },
  slotable: { type: Boolean, default: false },
  slots: { type: Array, default: [] },
  defaultSlot: { type: String, default: null },
  noFooter: { type: Boolean, default: true },
  contentPadless: { type: Boolean, default: false },
  defaultContent: { type: Boolean, default: false },
});

const emit = defineEmits(["update:enable", "update:defaultSlot"]);

const enableValue = computed({
  get: () => props.enable,
  set: (value) => emit("update:enable", value),
});

const handleClickOutside = () => {
  if (!props.closeClickingOutside || props.persistent) return;
  enableValue.value = false;
};

const colors = {
  confirm: "primary",
  cancel: "secondary",
  grey: "#AAA",
  info: "info",
  success: "green",
  error: "error",
};

const getColor = (type) => colors[type] || "#0000";

const getActionColor = (slot) =>
  currentSlot.value == slot.name ? slot.color ?? "#0000" : "#ccc";

const currentSlot = computed({
  get: () =>
    props.slotable && props.slots.length > 0
      ? props.defaultSlot || props.slots[0].name
      : "",
  set: (value) => emit("update:defaultSlot", value),
});
const setCurrentSlot = (slot) => {
  if (currentSlot.value == slot) return;

  currentSlot.value = slot;
  showFade.value = false;
  setTimeout(() => (showFade.value = true), 5);
};

const showAction = (action) => (action != undefined ? action : true);

const loadingAction = (action) => (action != undefined ? action : false);
</script>
<style scoped>
.modal {
  max-height: 810px;
  overflow-y: hidden;
}
.modal-header {
  background-color: black;
  color: white;
  padding: 10px 15px !important;
  height: auto;
}
.modal-title {
  font-weight: bold;
  color: white;
}
.modal-content-box {
  display: flex;
  flex-direction: row;
  height: 100%;
  max-height: 700px;
  overflow: auto;
  border-radius: 0px;
}
.modal-content {
  width: 100%;
  padding: 20px !important;
}
.modal-actions {
  background-color: #f0f0f0;
  width: 100%;
  height: auto;
  bottom: 0;
  z-index: 20;
}
.slot-actions {
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0px;
  border-left: 1px solid #ccc;
}
.action-button {
  padding: 0 16px !important;
}
.modal-loaded-content {
  height: calc(100% - 52px - 52px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>