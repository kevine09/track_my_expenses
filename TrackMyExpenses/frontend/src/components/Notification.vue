<template>
    <div v-if="visible" :class="['notification', type]">
      {{ message }}
      <button @click="hideNotification">×</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        type: 'success', // Par défaut, le type est 'success'
      };
    },
    methods: {
      showNotification(message, type = 'success') {
        this.message = message;
        this.type = type;
        this.visible = true;
  
        // Masquer la notification après 3 secondes
        setTimeout(() => {
          this.hideNotification();
        }, 3000);
      },
      hideNotification() {
        this.visible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .notification.success {
    background-color: #4caf50;
  }
  
  .notification.error {
    background-color: #f44336;
  }
  
  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
  }
  </style>