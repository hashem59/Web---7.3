import type { MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { json, type ActionFunctionArgs } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact Us" },
    { name: "description", content: "Contact Us" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const subject = formData.get("subject");
  const message = formData.get("message");
  const privacy = formData.get("privacy");

  const errors: Record<string, string> = {};
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.name = "Full name is required and must be at least 2 characters.";
  }
  if (
    !email ||
    typeof email !== "string" ||
    !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
  ) {
    errors.email = "A valid email address is required.";
  }
  if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
    errors.phone = "A valid phone number is required.";
  }
  if (!subject || typeof subject !== "string" || !subject) {
    errors.subject = "Please select a subject.";
  }
  if (!message || typeof message !== "string" || message.trim().length < 5) {
    errors.message = "Message is required and must be at least 5 characters.";
  }
  if (!privacy) {
    errors.privacy = "You must agree to the Privacy Policy.";
  }

  if (Object.keys(errors).length > 0) {
    return json({ success: false, errors }, { status: 400 });
  }

  return json({ success: true });
}

export default function Contact() {
  const actionData = useActionData<typeof action>();
  function isErrorRecord(errors: unknown): errors is Record<string, string> {
    return (
      typeof errors === "object" &&
      errors !== null &&
      Object.values(errors).every((v) => typeof v === "string")
    );
  }
  const hasFieldErrors =
    actionData &&
    "errors" in actionData &&
    isErrorRecord((actionData as any).errors);
  return (
    <div className="flex h-screen items-center justify-center">
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="shopDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <ul className="dropdown-menu" aria-labelledby="shopDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Fruits & Vegetables
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Meat & Seafood
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Bakery
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Dairy & Eggs
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Pantry
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      View All Categories
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="discoverDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Discover
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="discoverDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      New Arrivals
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Seasonal Specials
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Recipe Inspiration
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Health & Wellness
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Deals
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Gift Cards
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="contact-section py-5">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Contact Us
              </li>
            </ol>
          </nav>

          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card h-100 bg-white border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-chat-dots text-primary fs-1"></i>
                  </div>
                  <h4 className="card-title">Message Us</h4>
                  <p className="card-text">
                    Send us a message through our app and we'll get back to you
                    within 24 hours.
                  </p>
                  <a href="#" className="btn btn-outline-primary mt-3">
                    Open App
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 bg-white border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-robot text-primary fs-1"></i>
                  </div>
                  <h4 className="card-title">Chat to Us</h4>
                  <p className="card-text">
                    Our virtual assistant Olive is available 24/7 to help with
                    your questions.
                  </p>
                  <a href="#" className="btn btn-outline-primary mt-3">
                    Start Chat
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 bg-white border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-telephone text-primary fs-1"></i>
                  </div>
                  <h4 className="card-title">Call Us</h4>
                  <p className="card-text">
                    Speak directly with our customer service team during
                    business hours.
                  </p>
                  <a
                    href="tel:1800123456"
                    className="btn btn-outline-primary mt-3"
                  >
                    1800 123 456
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12">
              <div className="contact-form">
                <h2 className="mb-4">Send us a Message</h2>

                <Form method="post" noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className={`form-control bg-white${
                          hasFieldErrors && (actionData as any).errors?.name
                            ? " is-invalid"
                            : ""
                        }`}
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                      />
                      {hasFieldErrors && (actionData as any).errors?.name && (
                        <div className="invalid-feedback">
                          {(actionData as any).errors.name}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="text"
                        className={`form-control bg-white${
                          hasFieldErrors && (actionData as any).errors?.email
                            ? " is-invalid"
                            : ""
                        }`}
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                      />
                      {hasFieldErrors && (actionData as any).errors?.email && (
                        <div className="invalid-feedback">
                          {(actionData as any).errors.email}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className={`form-control bg-white${
                          hasFieldErrors && (actionData as any).errors?.phone
                            ? " is-invalid"
                            : ""
                        }`}
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                      />
                      {hasFieldErrors && (actionData as any).errors?.phone && (
                        <div className="invalid-feedback">
                          {(actionData as any).errors.phone}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="subject" className="form-label">
                        Subject
                      </label>
                      <select
                        className={`form-select bg-white${
                          hasFieldErrors && (actionData as any).errors?.subject
                            ? " is-invalid"
                            : ""
                        }`}
                        id="subject"
                        name="subject"
                      >
                        <option value="" defaultValue="" disabled>
                          Select a subject
                        </option>
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Related</option>
                        <option value="delivery">Delivery Issue</option>
                        <option value="product">Product Feedback</option>
                        <option value="other">Other</option>
                      </select>
                      {hasFieldErrors &&
                        (actionData as any).errors?.subject && (
                          <div className="invalid-feedback">
                            {(actionData as any).errors.subject}
                          </div>
                        )}
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className={`form-control bg-white${
                          hasFieldErrors && (actionData as any).errors?.message
                            ? " is-invalid"
                            : ""
                        }`}
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Enter your message"
                      ></textarea>
                      {hasFieldErrors &&
                        (actionData as any).errors?.message && (
                          <div className="invalid-feedback">
                            {(actionData as any).errors.message}
                          </div>
                        )}
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className={`form-check-input${
                            hasFieldErrors &&
                            (actionData as any).errors?.privacy
                              ? " is-invalid"
                              : ""
                          }`}
                          type="checkbox"
                          id="privacy"
                          name="privacy"
                        />
                        <label className="form-check-label" htmlFor="privacy">
                          I agree to the{" "}
                          <a href="#" className="text-decoration-none">
                            Privacy Policy
                          </a>{" "}
                          and consent to being contacted regarding my inquiry.
                        </label>
                        {hasFieldErrors &&
                          (actionData as any).errors?.privacy && (
                            <div className="invalid-feedback d-block">
                              {(actionData as any).errors.privacy}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        Send Message
                      </button>
                    </div>
                  </div>
                </Form>
                {actionData?.success && (
                  <div className="alert alert-success mt-3">
                    Your message has been sent successfully!
                  </div>
                )}
              </div>
            </div>
          </div>

          <section className="faq-section mt-5">
            <h2 className="mb-4">Frequently Asked Questions</h2>
            <div className="accordion" id="faqAccordion">
              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq1"
                  >
                    How do I track my order?
                  </button>
                </h3>
                <div
                  id="faq1"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    You can track your order by logging into your account and
                    visiting the "Order History" section. You'll receive a
                    tracking number via email once your order is shipped.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq2"
                  >
                    What is your return policy?
                  </button>
                </h3>
                <div
                  id="faq2"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    We accept returns within 14 days of delivery for most items.
                    Some products like fresh produce and dairy items are not
                    eligible for return. Please visit our Returns page for more
                    information.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq3"
                  >
                    Do you offer international shipping?
                  </button>
                </h3>
                <div
                  id="faq3"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Currently, we only ship within Australia. We're working on
                    expanding our shipping options to international destinations
                    in the future.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h3 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq4"
                  >
                    How can I change or cancel my order?
                  </button>
                </h3>
                <div
                  id="faq4"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    You can modify or cancel your order within 1 hour of placing
                    it by contacting our customer service team. After this
                    period, changes may not be possible as the order will be
                    processed.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
