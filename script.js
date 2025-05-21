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
    intervalId = setInterval(autoSlide, 2000);
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
  });

  // Запуск автопрокрутки
  startAutoSlide();
}

// Запуск
slider();
