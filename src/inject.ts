const createSidebar = () => {
  const rootElement = document.createElement("div");
  // remove potential global styles
  rootElement.style.setProperty("all", "initial");

  const className = "sidebar";
  const width = 400;
  const rootShadow = rootElement.attachShadow({ mode: "closed" });
  rootShadow.innerHTML = `
    <style>
      .${className} {
        height: 100vh;
        width: ${width}px;
        position: fixed;
        top: 0px;
        background-color: white;
        transition: right 0.15s ease-in;
        transition-delay: 0.3s;
        z-index: ${Number.MAX_SAFE_INTEGER}
      }
    </style>
    <div class="${className}">
      Hello there!
    </div>
  `;
  const sidebar: HTMLDivElement = rootShadow.querySelector(`.${className}`);
  sidebar.style.setProperty("right", `${-width}px`);

  let isMouseOverSidebar = false;
  {
    sidebar.addEventListener("mouseenter", () => {
      isMouseOverSidebar = true;
    });
    sidebar.addEventListener("mouseleave", () => {
      isMouseOverSidebar = false;
    });
  }

  {
    const activationAreaWidth = 100;
    window.addEventListener("mousemove", (event) => {
      if (event.pageX > window.innerWidth - activationAreaWidth) {
        sidebar.style.setProperty("right", "0px");
      } else if (!isMouseOverSidebar) {
        sidebar.style.setProperty("right", `${-width}px`);
      }
    });
  }

  // close sidebar when cursor leaves the window
  document.body.addEventListener("mouseout", (event) => {
    if (!event.relatedTarget) {
      sidebar.style.setProperty("right", `${-width}px`);
    }
  });

  return rootElement;
};

const main = () => {
  const rootElement = createSidebar();
  document.body.appendChild(rootElement);
};

main();
