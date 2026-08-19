"use strict";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);

const now = new Date();
const currentYear = now.getFullYear();
const shortYear = String(currentYear).slice(-2);
const markElement = document.querySelector("[data-mark]");
const copyrightElement = document.querySelector("[data-copyright]");
const updatedElement = document.querySelector("[data-updated]");
const typingTitle = document.querySelector("[data-typing-title]");
const firstTypingLine = document.querySelector("[data-typing-first-line]");
const secondTypingLine = document.querySelector("[data-typing-second-line]");
const entries = document.querySelectorAll(".entry:has([data-entry-toggle])");
const entryToggleButtons = document.querySelectorAll("[data-entry-toggle]");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const revealPage = () => {
  document.body.classList.remove("intro-active");
};

if (markElement) {
  markElement.textContent = `ED/${shortYear}`;
}

if (copyrightElement) {
  copyrightElement.textContent = `© ${currentYear} Ethan Doan`;
}

if (updatedElement) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  updatedElement.textContent = `Last updated ${formatter.format(now).replace(/\//g, ".")}`;
}

const toggleEntry = (entry, button) => {
  const detail = document.getElementById(button.getAttribute("aria-controls"));
  const isExpanded = button.getAttribute("aria-expanded") === "true";
  const animationDuration = 340;

  if (!detail) {
    return;
  }

  button.setAttribute("aria-expanded", String(!isExpanded));

  if (isExpanded) {
    detail.style.maxHeight = `${detail.scrollHeight}px`;
    const hideDetail = () => {
      if (button.getAttribute("aria-expanded") === "false") {
        detail.hidden = true;
      }
    };

    window.requestAnimationFrame(() => {
      entry.classList.remove("entry-expanded");
      detail.style.maxHeight = "0px";
    });

    detail.addEventListener(
      "transitionend",
      (event) => {
        if (event.propertyName === "max-height") {
          hideDetail();
        }
      },
      { once: true },
    );

    window.setTimeout(() => {
      if (!detail.hidden) {
        hideDetail();
      }
    }, animationDuration + 80);

    return;
  }

  detail.hidden = false;
  detail.style.maxHeight = "0px";
  window.requestAnimationFrame(() => {
    entry.classList.add("entry-expanded");
    detail.style.maxHeight = `${detail.scrollHeight}px`;
  });

  detail.addEventListener(
    "transitionend",
    (event) => {
      if (event.propertyName === "max-height") {
        detail.style.maxHeight = "none";
      }
    },
    { once: true },
  );
};

entries.forEach((entry) => {
  const button = entry.querySelector("[data-entry-toggle]");

  entry.addEventListener("click", () => {
    toggleEntry(entry, button);
  });
});

const prepareHeroNameHover = () => {
  if (!typingTitle || !firstTypingLine || !secondTypingLine) {
    return;
  }

  const glyphs = ["#", "/", "+", "7", "%", "&", "?", "$", "0", "1"];

  const wrapLineLetters = (line, text) => {
    line.textContent = "";

    [...text].forEach((letter, index) => {
      const letterElement = document.createElement("span");
      letterElement.className = "name-letter";
      letterElement.textContent = letter;
      letterElement.dataset.letter = letter;
      letterElement.style.setProperty("--letter-index", index);
      line.append(letterElement);
    });
  };

  wrapLineLetters(firstTypingLine, "Ethan");
  wrapLineLetters(secondTypingLine, "Doan");
  typingTitle.classList.add("typing-hover-ready");

  let isFlipping = false;

  typingTitle.addEventListener("mouseenter", () => {
    if (prefersReducedMotion || isFlipping) {
      return;
    }

    isFlipping = true;
    let lastDelay = 0;

    typingTitle.querySelectorAll(".name-letter").forEach((letter, index) => {
      const originalLetter = letter.dataset.letter;
      const flipCount = 3 + Math.floor(Math.random() * 3);

      for (let flipIndex = 0; flipIndex < flipCount; flipIndex += 1) {
        const delay = index * 36 + flipIndex * 44;
        lastDelay = Math.max(lastDelay, delay);

        window.setTimeout(() => {
          letter.classList.add("is-flipping");
          letter.textContent =
            glyphs[Math.floor(Math.random() * glyphs.length)];
        }, delay);
      }

      const resetDelay = index * 36 + flipCount * 44 + 36;
      lastDelay = Math.max(lastDelay, resetDelay);

      window.setTimeout(() => {
        letter.textContent = originalLetter;
        letter.classList.remove("is-flipping");
      }, resetDelay);
    });

    window.setTimeout(() => {
      isFlipping = false;
    }, lastDelay + 120);
  });
};

if (
  typingTitle &&
  firstTypingLine &&
  secondTypingLine &&
  !prefersReducedMotion
) {
  const wait = (duration) =>
    new Promise((resolve) => {
      window.setTimeout(resolve, duration);
    });

  const randomDuration = (minimum, maximum) =>
    Math.round(minimum + Math.random() * (maximum - minimum));

  const typingDelay = () => {
    const baseDelay = randomDuration(68, 138);
    const hesitation = Math.random() < 0.18 ? randomDuration(45, 135) : 0;

    return baseDelay + hesitation;
  };

  const typeLine = async (element, text) => {
    for (let index = 0; index < text.length; index += 1) {
      element.textContent += text[index];
      await wait(typingDelay());
    }
  };

  const typeHeroTitle = async () => {
    firstTypingLine.textContent = "";
    secondTypingLine.textContent = "";

    typingTitle.classList.add("typing-first-line");
    await wait(randomDuration(180, 320));
    await typeLine(firstTypingLine, "Ethan");

    await wait(randomDuration(150, 280));
    typingTitle.classList.remove("typing-first-line");
    typingTitle.classList.add("typing-second-line");

    await wait(randomDuration(85, 180));
    await typeLine(secondTypingLine, "Doan");

    typingTitle.classList.remove("typing-second-line");
    typingTitle.classList.add("typing-complete");

    await wait(750);
    revealPage();
    prepareHeroNameHover();

    await wait(2550);
    typingTitle.classList.add("typing-caret-hidden");
  };

  typeHeroTitle();
} else {
  revealPage();
  prepareHeroNameHover();
}
