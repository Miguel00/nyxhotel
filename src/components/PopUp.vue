<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <button class="popup-close" @click="() => TogglePopup()"> <img style="wi" src="../assets/icons8-close.svg" alt=""> </button>
    </div>
  </div>
</template>

<script>
export default {
    props: ['TogglePopup']
}
</script>

<style>

.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}
.popup .popup-inner {
	background: #fff;
	padding: 32px;
    border-radius:5px;
    position: relative;
}
.popup-close {
    position: absolute;
    top:0;
    right: 0;
    border: 0;
    background: none;
}

</style>