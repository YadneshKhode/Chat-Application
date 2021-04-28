function loadRazorpay(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

async function displayRazorpay() {
  const res = await loadRazorpay(
    "https://checkout.razorpay.com/v1/checkout.js"
  );
  console.log("halo");
  if (!res) {
    alert("Razorpay SDK failed to load");
    return;
  }
  const dataReceived = await fetch("https://yadnesh-chat-app.herokuapp.com/razorpay", {
    method: "POST",
  }).then((data) => data.json());

  console.log(dataReceived);

  const options = {
    key: process.env.key_id, // Enter the Key ID generated from the Dashboard
    amount: dataReceived.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: dataReceived.currency,
    name: "Yadnesh Corp",
    description: "Test Transaction",
    // image: "https://example.com/your_logo",
    order_id: dataReceived.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      alert(
        "Payment Successful \n Payment Id = " +
          response.razorpay_payment_id +
          " \n Order Id = " +
          response.razorpay_order_id +
          " \n Signature = " +
          response.razorpay_signature
      );
    },
    prefill: {
      name: "Yadnesh Khode Creator",
      email: "yadneshkhode@gmail.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#358FEF",
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

export default displayRazorpay;
