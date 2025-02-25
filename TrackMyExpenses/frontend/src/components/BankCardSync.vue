<template>
  <div class="bank-card-sync">
    <h2>Synchroniser une Carte Bancaire</h2>
    <div class="bank-card">
      <div class="card-front">
        <div class="card-number">{{ formattedCardNumber }}</div>
        <div class="card-details">
          <div class="card-holder">{{ cardHolder || 'Nom du Titulaire' }}</div>
          <div class="expiry-date">{{ expiryDate || 'MM/AA' }}</div>
        </div>
      </div>
      <div class="card-back">
        <div class="cvv">{{ cvv || 'CVV' }}</div>
      </div>
    </div>
    <form @submit.prevent="submitCard">
      <label for="cardNumber">Numéro de Carte :</label>
      <input
        type="text"
        id="cardNumber"
        v-model="cardNumber"
        placeholder="1234 5678 9012 3456"
        required
      />

      <label for="expiryDate">Date d'Expiration :</label>
      <input
        type="text"
        id="expiryDate"
        v-model="expiryDate"
        placeholder="MM/AA"
        required
      />

      <label for="cvv">CVV :</label>
      <input
        type="text"
        id="cvv"
        v-model="cvv"
        placeholder="123"
        required
      />

      <label for="cardHolder">Nom du Titulaire :</label>
      <input
        type="text"
        id="cardHolder"
        v-model="cardHolder"
        placeholder="John Doe"
        required
      />

      <button type="submit">Synchroniser</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolder: "",
    };
  },
  computed: {
    formattedCardNumber() {
      return this.cardNumber.replace(/\d{4}(?=.)/g, '$& ');
    },
  },
  methods: {
    submitCard() {
      const cardData = {
        cardNumber: this.cardNumber,
        expiryDate: this.expiryDate,
        cvv: this.cvv,
        cardHolder: this.cardHolder,
      };
      this.$emit("card-synced", cardData);
    },
  },
};
</script>

<style scoped>
.bank-card-sync {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.bank-card {
  width: 300px;
  height: 180px;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  border-radius: 10px;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-front,
.card-back {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-number {
  font-size: 18px;
  letter-spacing: 2px;
}

.card-details {
  display: flex;
  justify-content: space-between;
}

.card-holder,
.expiry-date {
  font-size: 14px;
}

.cvv {
  font-size: 14px;
  text-align: right;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>