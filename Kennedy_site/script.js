const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const chips = document.querySelectorAll(".chip");
const clips = document.querySelectorAll(".clip-card");
const reveals = document.querySelectorAll(".reveal");
const contactForm = document.querySelector(".contact-form");
const playableVideos = document.querySelectorAll("video[poster]:not(#directors-video)");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;

    chips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");

    clips.forEach((clip) => {
      const shouldShow = filter === "all" || clip.dataset.category === filter;
      clip.hidden = !shouldShow;
    });
  });
});

playableVideos.forEach((video) => {
  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    }
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("visible"));
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const button = contactForm.querySelector("button");
  const subject = encodeURIComponent("Kennedy Davis Talent Inquiry");
  const body = encodeURIComponent(
    [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Company / Organization: ${formData.get("company") || "Not provided"}`,
      `Reason for Contact: ${formData.get("reason")}`,
      "",
      "Message:",
      formData.get("message")
    ].join("\n")
  );

  window.location.href = `mailto:kennedydavistalent@gmail.com?subject=${subject}&body=${body}`;
  button.textContent = "Opening Email";
});

const directorsVideo = document.querySelector('#directors-video');
const directorsPlay = document.querySelector('.directors-play');
const directorsError = document.querySelector('.directors-error');
if (directorsVideo && directorsPlay && directorsError) {
  directorsPlay.hidden = false;
  const showPlaybackError = () => {
    directorsError.hidden = false;
    directorsPlay.hidden = false;
  };
  directorsPlay.addEventListener('click', async () => {
    directorsError.hidden = true;
    directorsPlay.hidden = true;
    try {
      await directorsVideo.play();
      directorsVideo.focus();
    } catch {
      showPlaybackError();
    }
  });
  directorsVideo.addEventListener('playing', () => {
    directorsPlay.hidden = true;
    directorsError.hidden = true;
  });
  directorsVideo.addEventListener('error', showPlaybackError);
}
