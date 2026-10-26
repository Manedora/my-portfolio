// Small reveal effect for cards. The page still works if this feature is unsupported.
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card, .intro, .contact-panel");
  if ("IntersectionObserver" in window) {
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform += " translateY(12px)";
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = "opacity .65s ease, transform .65s ease";
          entry.target.style.opacity = "1";
          entry.target.style.transform = entry.target.style.transform.replace(" translateY(12px)", "");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    cards.forEach((card) => observer.observe(card));
  }
});
