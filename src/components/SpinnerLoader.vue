<template>
  <teleport to="#loader">
    <div class="spinContainer">
      <div class="spinner"></div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: "SpinnerLoader",
};
</script>

<style scoped>
.spinner {
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  border: 5px solid transparent;
  border-top-color: rgba(245, 212, 66, 0.932);
  border-left-color: rgba(245, 212, 66, 0.932);
  background: transparent;
  border-radius: 50%;
  animation: spin 1s infinite;
  display: inline-block;
  position: absolute;
}

.spinContainer {
  background-color: black;
  height: 100%;
  width: 100%;
  display: block;
  position: absolute;
  top: 0px;
  opacity: 0.5;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
