window.onload = function () {
  const body = document.body;

  console.log(body);

  // ---------------------------- PART 2 ---------------------------------

  // 6. Now we will organize this better. Let's create a "function" called createDuck() that does everything in 1-4 and "returns" the duck object
  const createDuck = () => {
    // 1. Create a <div> with the class "duck" and add it to the body.  Do this step by step
    // ( 1. create the element
    const newDuckDiv = document.createElement('div');
    //   2. add a class to the element
    newDuckDiv.classList.add('duck');
    //   3. append the element to the body )
    document.body.appendChild(newDuckDiv);

    // 2. Next, use setInterval to toggle the "flap" class on the duck every 250 ms (1/4 second)
    // https://www.w3schools.com/jsref/met_win_setinterval.asp
    setInterval(() => {
      newDuckDiv.classList.toggle('flap');
    }, 250);

    // 8. The ducks are overlapping.  Modify createDuck so each time it creates a duck, it appears in a random location
    // HINT: You may want to create a `randomPosition()` function that you can use to set the ducks' initial locations and in your `moveDuck()` function;
    const randomPosition = () => {
      let x = Math.floor(Math.random() * (window.innerWidth + 1));
      let y = Math.floor(Math.random() * (window.innerHeight + 1));

      return [x, y];
    }

    // 3. Now, let's move the duck using CSS "top" and "left". Create a function `moveDuck` that takes a duck object as an argument and sets the "top" and "left" CSS properties.
    // HINT: Use Math.random() * window.innerWidth    for "left"
    //       And Math.random() * window.innerHeight   for "top"
    let x = 0, y = 0;
    const moveDuck = duckDiv => {
      const [left, top] = randomPosition();
      let prevX = x;
      let prevY = y;
      x = left;
      y = top;
      
      // 13. BONUS: The ducks are moving pretty erratically, can you think of a way to adjust the ducks speed based on how far needs to move?
      const hypotenuse = Math.sqrt((x-prevX)**2 + (y-prevY)**2)
      let speed = hypotenuse/100 //Math.abs(Math.ceil(hypotenuse/((x-prevX) - (y-prevY))));
      speed > 100 ? speed = speed+'ms' : speed = speed +'s'
      // console.log(speed)
      // console.log(x-prevX)
      duckDiv.style.transitionDuration = speed
      duckDiv.style.left = x + 'px';
      duckDiv.style.top = y + 'px';

      // 14. BONUS: Add the "left" and "right" class to the duck based on the direction the duck is flying and change the way the duck is facing
      prevX < x ? duckDiv.classList.add('right') : duckDiv.classList.remove('right');
    }

    // 4. Try making the duck move to a different location every second (what did we use to do this several lines up??)
    setInterval(() => {
      moveDuck(newDuckDiv);
    }, 1000);

    // 10. BOOM. Attach a "click" handler that adds the "shot" class to the duck when you click on it!
    newDuckDiv.addEventListener('click', () => {
      newDuckDiv.classList.add('shot');
    
      // 11. After a duck has been clicked on, remove it from the DOM after a short delay (1 second) 
      //Hint Hint...use setTimeout; as for removing the element check out https://dzone.com/articles/removing-element-plain
      setTimeout(() => {
        newDuckDiv.remove();
        checkForWinner();
      }, 1000);
    });
  }

  // 7. Now, let's create lots of ducks!  Use a "for" loop to create 5 ducks using our fancy new createDuck() function
  for(let i = 0; i < 5; i++) {
    createDuck();
  }

  // --------------------------- PART 3 ------------------------------------

  // 12. Create a new function named checkForWinner() that reads the DOM to see if there are any ducks left. (How can we check the DOM for more than one element?, and how can we see how many elements we get back) If not, alert "YOU WIN!"
  const checkForWinner = () => {
    const numOfDucks = document.querySelectorAll('.duck').length;
  
    if(numOfDucks == 0)
      alert('YOU WIN! 🎉');
  }

  // Done, you have accomplish another level of skill
};
