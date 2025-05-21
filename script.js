function slider(startIndex = 0) {
  const elementList = document.querySelectorAll(".slide");
  let currentIndex = startIndex;
  let intervalId;

  function clearActiveClass() {
    elementList.forEach((slide) => slide.classList.remove("active"));
  }

  function setActiveSlide(index) {
    clearActiveClass();
    elementList[index].classList.add("active");
  }

  function autoSlide() {
    currentIndex = (currentIndex + 1) % elementList.length;
    setActiveSlide(currentIndex);
  }

  function startAutoSlide() {
     intervalId = setInterval(autoSlide, 2000); //изменение времени прокрутки
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  // Установить первый активный слайд
  setActiveSlide(currentIndex);

  // Обработчики клика
  elementList.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      currentIndex = index;
      setActiveSlide(currentIndex);
    });

    // Пауза при наведении
    slide.addEventListener("mouseenter", stopAutoSlide);
    slide.addEventListener("mouseleave", startAutoSlide);

    // ✅ Только активный может открыть fullscreen
    slide.addEventListener("dblclick", () => {
      if (!slide.classList.contains("active")) return;

      const style = window.getComputedStyle(slide);
      const backgroundImage = style.backgroundImage;
      const urlMatch = backgroundImage.match(/url\("?(.*?)"?\)/);

      if (urlMatch && urlMatch[1]) {
        const imageUrl = urlMatch[1];

        const img = document.createElement("img");
        img.src = imageUrl;
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.style.objectFit = "contain";
        img.style.transition = "opacity 0.5s ease";
        img.style.opacity = "0";

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.width = "100vw";
        container.style.height = "100vh";
        container.style.backgroundColor = "black";
        container.style.transition = "opacity 0.5s ease";
        container.style.opacity = "0";
        container.appendChild(img);

        document.body.appendChild(container);

        requestAnimationFrame(() => {
          container.style.opacity = "1";
          img.style.opacity = "1";
        });

        setTimeout(() => {
          if (container.requestFullscreen) {
            container.requestFullscreen();
          }
        }, 50);

        function exitHandler() {
          if (!document.fullscreenElement) {
            container.remove();
            document.removeEventListener("fullscreenchange", exitHandler);
          }
        }

        document.addEventListener("fullscreenchange", exitHandler);
      }
    });
  });

  // Запуск автопрокрутки
  startAutoSlide();
}

slider();
