<script>
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" >
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header" class="bg-white text-dark">
            This is the default tile!
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            This is the default body!
          </slot>
        </section>

        <!-- <footer class="modal-footer">
          <slot name="footer">
            This is the default footer!
          </slot>
          <button
            type="button"
            class="btn-green"
            @click="close"
            aria-label="Close modal"
          >
            Close me!
          </button>
        </footer> -->
      </div>
    </div>
  </transition>
</template>

<style>

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    height: 550px;
    width: 950px;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    margin: 10px 220px;

  }

  .modal-header {
    padding: 15px;
    display: flex;
    font-weight: bold;
    /* background:rgba(56, 67, 83, 0.973); */
    background: rgb(17, 65, 177);
    /* background: rgb(240, 192, 62); */
  }

  .hdr {
    color: black;
  }

  .modal-footer {
    padding: 10px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #fdfbfb;
    justify-content: space-between;
    font-size:large;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #ffffff;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #3374a0;
    border: 1px solid #050505;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>