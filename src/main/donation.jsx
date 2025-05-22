import { useState } from "react";
import "./donation.css";
import apiClient from "../api/utils";
import paystackLogo from "../assets/paystack.svg";
import flutterwaveLogo from "../assets/flutterwave.svg";
import fincraLogo from "../assets/fincra.svg";
import bankLogo from "../assets/bank.svg";

export default function Donation({ onClose, campaign }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    amount: "",
    comment: "",
    anonymous: false,
    provider: "paystack",
  });
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProceedToPayment = async () => {
    try {
      setLoading(true);

      const fullName = form.anonymous ? "Anonymous" : form.fullName.trim();
      const [firstName, ...rest] = fullName.split(" ");
      const lastName = rest.join(" ");

      const payload = {
        currency: "NGN",
        amount: parseFloat(form.amount),
        redirectUrl: "https://frontend.example.com/checkout",
        productIds: [campaign.id],
        provider: form.provider,
        category: "CAMPAIGN",
        subCategory: "DONATION",
        splitPayment: false,
        metaData: {
          firstName,
          lastName,
          email: form.email,
          phone: form.phone,
          paymentMethod: "online",
          comment: form.comment,
        },
      };

      const res = await apiClient.post("/transaction/initiate", payload);
      setPaymentLink(res.data.data.paymentLink);
      setStep(4);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation">
      <div className="donation-inner">
        <button className="donation-close" onClick={onClose}>
          ✖
        </button>

        {step === 1 && (
          <form className="donation-form">
            <h3>Make Donation</h3>

            <div className="donation-group">
              <label htmlFor="fullName">Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                disabled={form.anonymous}
              />
            </div>

            <div className="donation-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="donation-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="donation-group">
              <label htmlFor="amount">Amount</label>
              <input
                name="amount"
                placeholder="Amount"
                type="text"
                value={form.amount}
                onChange={handleChange}
              />
            </div>

            <div className="donation-group">
              <label htmlFor="comment">Comment</label>
              <textarea
                name="comment"
                placeholder="Comment"
                value={form.comment}
                onChange={handleChange}
              />
            </div>
            <div className="toggle-group">
              <label htmlFor="anonymous">Donate anonymously</label>
              <label className="toggle">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={form.anonymous}
                  onChange={handleChange}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 0",
                alignItems: "center",
              }}
            >
              <button
                onClick={onClose}
                disabled={loading}
                className="cancel-btn"
              >
                Cancel
              </button>

              <button
                onClick={() => setStep(2)}
                disabled={!form.email || !form.amount}
                className="proceed-btn"
              >
                Proceed
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="donation-form">
            <h3>Select Payment Method</h3>
            <div className="donation-form">
              <label className="payment-option">
                <img
                  src={paystackLogo}
                  alt="Paystack"
                  className="payment-logo"
                />
                <span>PAYSTACK</span>
                <input
                  type="radio"
                  name="provider"
                  value="paystack"
                  checked={form.provider === "paystack"}
                  onChange={handleChange}
                />
              </label>

              <label className="payment-option">
                <img
                  src={flutterwaveLogo}
                  alt="Flutterwave"
                  className="payment-logo"
                />
                <span>FLUTTERWAVE (Coming soon)</span>
                <input
                  type="radio"
                  name="provider"
                  value="flutterwave"
                  checked={form.provider === "flutterwave"}
                  onChange={handleChange}
                />
              </label>

              <label className="payment-option">
                <img src={fincraLogo} alt="Fincra" className="payment-logo" />
                <span>FINCRA (Coming soon)</span>
                <input
                  type="radio"
                  name="provider"
                  value="fincra"
                  checked={form.provider === "fincra"}
                  onChange={handleChange}
                />
              </label>

              <label className="payment-option">
                <img
                  src={bankLogo}
                  alt="Bank Transfer"
                  className="payment-logo"
                />
                <span>BANK TRANSFER (Coming soon)</span>
                <input
                  type="radio"
                  name="provider"
                  value="bank"
                  checked={form.provider === "bank"}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 0",
                alignItems: "center",
              }}
            >
              <button onClick={() => setStep(1)} className="cancel-btn">
                Back
              </button>
              <button
                onClick={handleProceedToPayment}
                disabled={loading}
                className="proceed-btn"
              >
                {loading ? "Loading..." : "Proceed"}
              </button>
            </div>
          </form>
        )}

        {step === 4 && paymentLink && (
          <>
            <h3>Redirecting to Paystack...</h3>
            <p>
              If you are not redirected,{" "}
              <a href={paymentLink} target="_blank" rel="noopener noreferrer">
                click here
              </a>
              .
            </p>
            <script>{(window.location.href = paymentLink)}</script>
          </>
        )}
      </div>
    </div>
  );
}
