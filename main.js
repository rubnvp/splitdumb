const { createApp, ref, computed } = Vue;

createApp({
  setup: () => {
    const participants = ref([
      { name: 'Angélica', payed: 13 },
      { name: 'Bubango', payed: 52 },
      { name: 'Jota', payed: 114 },
      { name: 'Irene', payed: 4.5 },
      { name: 'Rubén', payed: 165 },
    ]);

    const total = computed(() => {
      return participants.value.reduce((acc, participant) =>  acc + participant.payed, 0);
    });

    const payments = computed(() => {
      const average = total.value / participants.value.length;
      const payers = [];
      const receivers = [];
      participants.value.forEach(participant => {
        const debt = average - participant.payed;
        if (debt > 0) {
          payers.push({ name: participant.name, debt });
        } else {
          receivers.push({ name: participant.name, debt });
        }
      });
      payers.sort((a, b) => b.debt - a.debt);
      receivers.sort((a, b) => a.debt - b.debt);
      const payments = [];
      payers.forEach(payer => {
        while (payer.debt > 0) {
          if (receivers.length === 0) break;
          const receiver = receivers[0];
          const amount = Math.min(payer.debt, Math.abs(receiver.debt));
          payer.debt -= amount;
          receiver.debt += amount;
          if (receiver.debt === 0) {
            receivers.shift();
          }
          payments.push({ payer: payer.name, receiver: receiver.name, amount });
        }
      });
      return payments;
    });

    return {
      participants,
      total,
      payments,
    };
  },
}).mount("#app");