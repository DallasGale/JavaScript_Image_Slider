/* eslint-disable no-alert */
/* eslint-disable no-return-assign */
/* eslint-disable func-names */
/* eslint-disable prettier/prettier */

document.addEventListener('DOMContentLoaded', () => {


  // 1. Set initial variables

  let slideIndex = 0; // initial iterator for each slider to add 1 to
  let currentSlideIndex = 0; // initial slider to start first
  const slideArray = [];
  const slideEl = document.getElementById('a17-slider');

  // Pagination dots
  const pagination_1 = $('#pagination-one');
  const pagination_2 = $('#pagination-two');
  const pagination_3 = $('#pagination-three');
  const pagination_4 = $('#pagination-four');

  // Functions to add / remove active state to pagination dots
  const addActiveClass = (id) => {
    return id.addClass('pagination__dot--active');
  }
  const removeActiveClass = (id) => {
    return id.removeClass('pagination__dot--active');
  }

  // Set first pagination dot to active
  addActiveClass(pagination_1);



  // 2. Create a Slide object which can be re-used and pused into the above array

  function SlideObject(image) {
    this.image = image; // add and image key that is assigned to the image parameter
    this.id = `slider__${slideIndex}`;
    slideIndex++;

    slideArray.push(this);
  }




  // 3. Use above Object to crete indivisual Slides

  const photoOne = new SlideObject('../images/img1.jpeg');
  const photoTwo = new SlideObject('../images/img2.jpeg');
  const photoThree = new SlideObject('../images/img3.jpeg');
  const photoFour = new SlideObject('../images/img4.jpeg');





  // 4. As we are pushing the above 4 photo objects into the 'slideArray', we can now map over that array and build up html which will then be assigned via jquery to a DOM element.

  const mapOverPhotos = () => {
    let html = '';

    slideArray.map(
      slide =>
        (html += `<div class="a17-slide" id="${
          slide.id
        }" style="background-image: url('${slide.image}')"></div>`)
    );

    // Set the above mapped elements to <div id="a17-slider"></div>
    slideEl.innerHTML = html;

    document.getElementById(`slider__${currentSlideIndex}`).style.left = 0;
  }

  mapOverPhotos();

  // Function to progress each slide

  const nextSlide = () => {
    let nextSlideIndex;

    if (currentSlideIndex === slideArray.length - 1) {
      // if we get to the last slide '3' [0, 1, 2, 3]) start the slider at slide #0 again.
      // Length is 4 so to count for the starting 0, - 1.
      nextSlideIndex = 0;
    } else {
      // Progress through the array until the above condition is met.
      nextSlideIndex = currentSlideIndex + 1;
      console.log(nextSlideIndex);
    }

    // position next side into view
    document.getElementById(`slider__${nextSlideIndex}`).style.left = '100%';

    // position current slide out of view
    document.getElementById(`slider__${currentSlideIndex}`).style.left = 0;

    // next slide has a transiton class attached to smoothly appear
    document
      .getElementById(`slider__${nextSlideIndex}`)
      .setAttribute('class', 'a17-slide slideInRight');

    // next slide has a transiton class attached to smoothly disapear
    document
      .getElementById(`slider__${currentSlideIndex}`)
      .setAttribute('class', 'a17-slide slideOutLeft');

    currentSlideIndex = nextSlideIndex;


    // Pagination

    if (currentSlideIndex === 0) {
      addActiveClass(pagination_1);
      removeActiveClass(pagination_2);
      removeActiveClass(pagination_3);
      removeActiveClass(pagination_4);
    } else if (currentSlideIndex === 1) {
      addActiveClass(pagination_2);
      removeActiveClass(pagination_1);
      removeActiveClass(pagination_3);
      removeActiveClass(pagination_4);
    } else if (currentSlideIndex === 2) {
      addActiveClass(pagination_3);
      removeActiveClass(pagination_1);
      removeActiveClass(pagination_2);
      removeActiveClass(pagination_4);
    } else if (currentSlideIndex === 3) {
      addActiveClass(pagination_4);
      removeActiveClass(pagination_1);
      removeActiveClass(pagination_2);
      removeActiveClass(pagination_3);
    } else {
      return;
    }
  }



  // Function to go to previous slide
  const prevSlide = () => {
    let nextSlideIndex;

    if (currentSlideIndex === 0) {
      // if we get to the first slide '0' [0, 1, 2, 3]) start the slider at slide #3.
      nextSlideIndex = slideArray.length - 1;
    } else {
      nextSlideIndex = currentSlideIndex - 1;
    }

    // position next side into view
    document.getElementById(`slider__${nextSlideIndex}`).style.left = '-100%';

    // position current slide out of view
    document.getElementById(`slider__${currentSlideIndex}`).style.left = 0;

    // next slide has a transiton class attached to smoothly appear
    document
      .getElementById(`slider__${nextSlideIndex}`)
      .setAttribute('class', 'a17-slide slideInLeft');

    // next slide has a transiton class attached to smoothly disapear
    document
      .getElementById(`slider__${currentSlideIndex}`)
      .setAttribute('class', 'a17-slide slideOutRight');

    currentSlideIndex = nextSlideIndex;



    // Pagination

    if (currentSlideIndex === 0) {
      addActiveClass(pagination_1);
      removeActiveClass(pagination_2);
      removeActiveClass(pagination_3);
      removeActiveClass(pagination_4);
    } else if (currentSlideIndex === 1) {
      addActiveClass(pagination_2);
      removeActiveClass(pagination_1);
      removeActiveClass(pagination_3);
      removeActiveClass(pagination_4);
    } else if (currentSlideIndex === 2) {
      addActiveClass(pagination_3);
      removeActiveClass(pagination_1);
      removeActiveClass(pagination_2);
      removeActiveClass(pagination_4);
    } else if (currentSlideIndex === 3) {
      addActiveClass(pagination_4);
      removeActiveClass(pagination_1);
      removeActiveClass(pagination_2);
      removeActiveClass(pagination_3);
    } else {
      return;
    }
  }




  let sliderInterval = setInterval(() => {
    nextSlide();
    console.log('GO...')
  }, 4000);



  // To be assined to 'next' slider buttons
  $('#sliderNext').click(() => {
    clearInterval(sliderInterval);
    nextSlide();
  })

  // To be assined to 'prev' slider buttons
  $('#sliderPrev').click(() => {
    clearInterval(sliderInterval);
    prevSlide();
  })


  $('#a17-slider')
    .mouseover(() => {
      clearInterval(sliderInterval);
      $('#a17-slider').addClass('paused');
      console.log('...game off!')
    })
    .mouseout(() => {

      $('#a17-slider').removeClass('paused');
      sliderInterval = setInterval(() => {
        console.log('...game on!')
        nextSlide();
      }, 4000);
    });





  
});
