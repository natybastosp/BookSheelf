<template>
  <button
    class="relative group transition-all duration-300 ease-in-out"
    :class="tabClasses"
    @click="$emit('click')"
  >
    <!-- Tab shape with CSS styling to look like a real bookmark -->
    <div
      class="relative px-6 py-3 flex items-center gap-2 font-medium text-sm tracking-wide"
    >
      <!-- Icon for the tab -->
      <span class="text-base" v-if="tab.icon">{{ tab.icon }}</span>

      <!-- Tab name/label -->
      <span>{{ tab.name }}</span>

      <!-- Active indicator (small dot) -->
      <div
        v-if="isActive"
        class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"
      ></div>
    </div>

    <!-- Hover effect overlay -->
    <div
      class="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-50 transition-opacity duration-200 rounded-t-lg"
      v-if="!isActive"
    ></div>

    <!-- Tab shadow for depth -->
    <div
      class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-30"
      v-if="!isActive"
    ></div>
  </button>
</template>

<script setup>
// Define the component's props - these are the inputs the component receives
const props = defineProps({
  tab: {
    type: Object,
    required: true,
    // Expected structure: { name: String, path: String, icon?: String }
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

// Define what events this component can emit
const emit = defineEmits(["click"]);

// Computed property for dynamic CSS classes based on component state
const tabClasses = computed(() => {
  const baseClasses = [
    "border-t-2",
    "border-l",
    "border-r",
    "rounded-t-lg",
    "transform",
    "transition-all",
    "duration-300",
    "hover:scale-105",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-blue-300",
  ];

  if (props.isActive) {
    // Active tab styling - should stand out and look "selected"
    return [
      ...baseClasses,
      "bg-white",
      "border-blue-400",
      "text-blue-700",
      "shadow-lg",
      "z-10",
      "translate-y-0",
      "border-b-white", // This creates the illusion that the tab connects to the page
    ].join(" ");
  } else {
    // Inactive tab styling - subtle and subdued
    return [
      ...baseClasses,
      "bg-slate-50",
      "border-slate-300",
      "text-slate-600",
      "shadow-md",
      "translate-y-1",
      "hover:translate-y-0",
      "hover:bg-slate-100",
      "hover:text-slate-800",
    ].join(" ");
  }
});
</script>

<style scoped>
/* Additional custom styles for fine-tuning the tab appearance */

/* Create a subtle texture effect on tabs */
button {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.15) 1px,
    transparent 0
  );
  background-size: 20px 20px;
}

/* Ensure tabs look good on different screen sizes */
@media (max-width: 640px) {
  .px-6 {
    /* Reduce padding on mobile for more tabs to fit */
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .text-sm {
    /* Slightly smaller text on mobile */
    font-size: 0.75rem;
  }
}

/* Add a subtle glow effect for active tabs */
.z-10 {
  filter: drop-shadow(0 4px 6px rgba(59, 130, 246, 0.15));
}
</style>
