import React from "react";

const resources = {
  linkGroups: [
    {
      title: "Customer Service",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Contact Us", href: "contact.html" },
        { label: "Delivery Info", href: "#" },
        { label: "Returns", href: "#" },
      ],
    },
    {
      title: "About Us",
      links: [
        { label: "Our Story", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Sustainability", href: "#" },
      ],
    },
  ],
  social: [
    { icon: "bi bi-facebook", href: "#" },
    { icon: "bi bi-twitter", href: "#" },
    { icon: "bi bi-instagram", href: "#" },
  ],
  appDownloads: [
    { icon: "bi bi-apple", label: "App Store", href: "#" },
    { icon: "bi bi-google-play", label: "Google Play", href: "#" },
  ],
  copyright: {
    text: "&copy; 2024 Grocery Shop. All rights reserved.",
  },
};

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row g-4">
          {resources.linkGroups.map((group) => (
            <div className="col-md-3" key={group.title}>
              <h5>{group.title}</h5>
              <ul className="list-unstyled">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-light text-decoration-none"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-md-3">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              {resources.social.map((item) => (
                <a href={item.href} className="text-light" key={item.icon}>
                  <i className={item.icon}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <h5>Download Our App</h5>
            <div className="d-flex flex-column gap-2">
              {resources.appDownloads.map((app) => (
                <a
                  href={app.href}
                  className="btn btn-outline-light"
                  key={app.label}
                >
                  <i className={app.icon}></i> {app.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <p
            className="mb-0"
            dangerouslySetInnerHTML={{ __html: resources.copyright.text }}
          />
        </div>
      </div>
    </footer>
  );
}
