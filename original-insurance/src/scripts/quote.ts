document.querySelectorAll<HTMLElement>('[data-review-gallery]').forEach((gallery) => {
  const reviews = [...gallery.querySelectorAll<HTMLElement>('[data-review]')];
  let index = 0;
  const show = () => {
    reviews.forEach((review, i) => {
      review.hidden = i !== index;
      if (i === index) review.classList.add('review-enter');
    });
    gallery.querySelector('[data-review-count]')!.textContent =
      `0${index + 1} / 0${reviews.length}`;
  };
  gallery.querySelector<HTMLElement>('.review-controls')!.hidden = false;
  gallery.querySelector('[data-review-prev]')!.addEventListener('click', () => {
    index = (index + reviews.length - 1) % reviews.length;
    show();
  });
  gallery.querySelector('[data-review-next]')!.addEventListener('click', () => {
    index = (index + 1) % reviews.length;
    show();
  });
  show();
});
